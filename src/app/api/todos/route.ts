import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as Yup from "yup";

/**
 * GET /api/todos
 *
 * Devuelve una lista de tareas. Se pueden especificar los parámetros
 * de consulta "take" y "skip" para paginar los resultados.
 *
 * @param {Request} request
 *
 * @returns {Promise<NextResponse>}
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(skip))
    return NextResponse.json(
      { error: "Invalid Skip, must be a number" },
      { status: 400 }
    );

  if (isNaN(take))
    return NextResponse.json(
      { error: "Invalid take, must be a number" },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = Yup.object({
  description: Yup.string().required(),
  complete: Yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({ data: { complete, description, userId: user.id } });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
        userId: user.id,
      },
    });
    return NextResponse.json(
      { message: "All Completed has been deleted successfully", status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
