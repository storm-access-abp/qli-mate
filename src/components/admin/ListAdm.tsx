import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { User } from "lucide-react";
import DeleteUserButton from "./DeleteUserButton";

export default async function UsersPage() {
  const response = await auth.api.listUsers({
    headers: await headers(),
    query: {
      limit: 10,
      offset: 0,
    },
  });

  const users = response.users;

  if (!users || users.length === 0) {
    return (
      <div className="space-y-4">
        <p>Não foram encontrados usuários.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableCaption>Lista de usuários</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead className="w-[100px]">E-mail</TableHead>
            <TableHead className="w-[100px]">Criado em</TableHead>
            <TableHead className="w-[100px]">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex items-center">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                    <User className="h-4 w-4" />
                  </div>
                  {user.name}
                </TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell className="font-medium">{user.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">
                  <DeleteUserButton user={user} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
