import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password || password.length < 8) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const record = await db.passwordResetToken.findUnique({ where: { token } });

    if (!record || record.expires < new Date()) {
      return NextResponse.json(
        { error: "El enlace ha expirado o no es válido" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    await db.user.update({
      where: { email: record.email },
      data: { password: hashed },
    });

    await db.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("reset-password error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
