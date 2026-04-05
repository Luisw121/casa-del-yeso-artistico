/**
 * Crea un usuario ADMIN en la DB.
 * Uso: DATABASE_URL="..." ADMIN_EMAIL="..." ADMIN_PASSWORD="..." npx tsx prisma/create-admin.ts
 */
import { PrismaClient } from "../src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL ?? "" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@narvek.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin2026!";
  const name = process.env.ADMIN_NAME ?? "Administrador";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Si ya existe, solo asegura que sea ADMIN
    await prisma.user.update({ where: { email }, data: { role: "ADMIN" } });
    console.log(`Usuario existente actualizado a ADMIN: ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, name, password: hashed, role: "ADMIN" },
  });

  console.log("✅ Admin creado:");
  console.log(`   Email:      ${email}`);
  console.log(`   Contraseña: ${password}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
