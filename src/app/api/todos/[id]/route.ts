import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as Yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();
  if (!user) {
    return null;
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (todo?.userId !== user.id) {
    return null;
  }
  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo)
    return NextResponse.json(
      { error: `${params.id} Not Found` },
      { status: 404 }
    );

  return NextResponse.json(todo);
}

const schemaUpdatedTodo = Yup.object({
  complete: Yup.boolean().optional(),
  description: Yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo)
    return NextResponse.json(
      { error: `${params.id} Not Found` },
      { status: 404 }
    );

  try {
    const { complete, description } = await schemaUpdatedTodo.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: {
        id: params.id,
      },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
