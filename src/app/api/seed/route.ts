import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@testing.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Tarea 1", complete: true }, { description: "Tarea 2" },
          { description: "Tarea 3" }, { description: "Tarea 4" }, 
        ],
      },
    },
  });

  return NextResponse.json({ message: "Seed executed" });
}
