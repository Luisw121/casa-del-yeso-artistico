import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });

    // Respuesta genérica aunque el usuario no exista (seguridad)
    if (!user || !user.password) {
      return NextResponse.json({ ok: true });
    }

    // Invalidar tokens anteriores del mismo email
    await db.passwordResetToken.deleteMany({ where: { email } });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await db.passwordResetToken.create({
      data: { email, token, expires },
    });

    const baseUrl =
      process.env.NEXTAUTH_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    const resend = new Resend(process.env.RESEND_API_KEY ?? "");
    await resend.emails.send({
      from: "La Casa del Yeso Artístico <noreply@casadelyesoartistico.com>",
      to: email,
      subject: "Recupera tu contraseña",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#F5F0EB;border-radius:12px;">
          <h1 style="font-size:22px;color:#1A1A2E;margin-bottom:8px;">Recupera tu contraseña</h1>
          <p style="color:#1A1A2E99;font-size:14px;margin-bottom:24px;">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta.
            El enlace es válido por <strong>1 hora</strong>.
          </p>
          <a href="${resetUrl}"
             style="display:inline-block;background:#1A1A2E;color:#F5F0EB;text-decoration:none;
                    padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;">
            Restablecer contraseña
          </a>
          <p style="color:#1A1A2E66;font-size:12px;margin-top:24px;">
            Si no solicitaste esto, puedes ignorar este correo. Tu contraseña no cambiará.
          </p>
          <hr style="border:none;border-top:1px solid #1A1A2E15;margin:24px 0;" />
          <p style="color:#C9A96E;font-size:11px;text-align:center;">
            La Casa del Yeso Artístico · Loja, Ecuador
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("forgot-password error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
