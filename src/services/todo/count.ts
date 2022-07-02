import { prisma } from "lib/prisma";

export const countTodos = async () => await prisma?.todo.count();
