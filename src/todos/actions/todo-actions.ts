"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number = 0) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    throw `Todo id ${id} not found`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const addTodo = async (
  description: string,
  userId: string
): Promise<Todo | { message: string }> => {
  try {
    const todo = await prisma.todo.create({
      data: { complete: false, description , userId },
    });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return {
      message: "Error creando todo: " + error,
    };
  }
};

export const deleteCompleted = async (): Promise<boolean> => {
  await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });
  revalidatePath("/dashboard/server-todos");
  return true;
};
