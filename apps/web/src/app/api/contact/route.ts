import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

const ADMIN_EMAIL = "casadelyesoartistico@hotmail.com";
const FROM = "La Casa del Yeso Artístico <onboarding@resend.dev>";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Email al administrador
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Nueva consulta de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F5F0EB;border-radius:12px;">
          <h1 style="font-size:20px;color:#1A1A2E;margin-bottom:4px;">Nueva consulta desde el sitio web</h1>
          <p style="color:#C9A96E;font-size:12px;margin-bottom:24px;text-transform:uppercase;letter-spacing:0.05em;">La Casa del Yeso Artístico</p>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #1A1A2E15;color:#1A1A2E99;font-size:13px;width:110px;">Nombre</td>
              <td style="padding:8px 0;border-bottom:1px solid #1A1A2E15;color:#1A1A2E;font-size:13px;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #1A1A2E15;color:#1A1A2E99;font-size:13px;">Email</td>
              <td style="padding:8px 0;border-bottom:1px solid #1A1A2E15;color:#1A1A2E;font-size:13px;">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #1A1A2E15;color:#1A1A2E99;font-size:13px;">Teléfono</td>
              <td style="padding:8px 0;border-bottom:1px solid #1A1A2E15;color:#1A1A2E;font-size:13px;">${phone || "No indicado"}</td>
            </tr>
          </table>

          <div style="background:white;border-radius:8px;padding:16px;border:1px solid #1A1A2E10;">
            <p style="color:#1A1A2E99;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Mensaje</p>
            <p style="color:#1A1A2E;font-size:14px;line-height:1.6;margin:0;">${message.replace(/\n/g, "<br/>")}</p>
          </div>

          <a href="mailto:${email}?subject=Re: Tu consulta en La Casa del Yeso Artístico"
             style="display:inline-block;margin-top:20px;background:#1A1A2E;color:#F5F0EB;
                    text-decoration:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;">
            Responder a ${name}
          </a>

          <hr style="border:none;border-top:1px solid #1A1A2E15;margin:24px 0;" />
          <p style="color:#1A1A2E66;font-size:11px;text-align:center;margin:0;">
            Mensaje enviado desde lacasadelyesoartistico.com
          </p>
        </div>
      `,
    });

    // Email de confirmación al cliente
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Recibimos tu mensaje — La Casa del Yeso Artístico",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#F5F0EB;border-radius:12px;">
          <h1 style="font-size:20px;color:#1A1A2E;margin-bottom:4px;">¡Gracias, ${name}!</h1>
          <p style="color:#C9A96E;font-size:12px;margin-bottom:20px;text-transform:uppercase;letter-spacing:0.05em;">Hemos recibido tu mensaje</p>

          <p style="color:#1A1A2E;font-size:14px;line-height:1.6;">
            Nos pondremos en contacto contigo a la brevedad. Si tu consulta es urgente,
            puedes escribirnos directamente por WhatsApp.
          </p>

          <a href="https://wa.me/593939603613"
             style="display:inline-flex;align-items:center;gap:8px;margin-top:20px;
                    background:#25D366;color:white;text-decoration:none;
                    padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;">
            Escribir por WhatsApp
          </a>

          <hr style="border:none;border-top:1px solid #1A1A2E15;margin:24px 0;" />
          <p style="color:#C9A96E;font-size:11px;text-align:center;margin:0;">
            La Casa del Yeso Artístico · Loja, Ecuador
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact error:", error);
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 });
  }
}
