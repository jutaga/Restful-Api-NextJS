// Forzar que la pagina se vuelva a renderizar en el servidor en cada request
export const dynamic = "force-dynamic";

// Tiempo en segundos que se va a cachear la pagina
// si se pone en 0, se vuelve a renderizar en cada request
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();

  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  return (
    <div>
      <span className="text-3xl mb-10 font-bold underline">Server Actions</span>
      <div className="w-full px-3 mx-7 mb-5 ">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
