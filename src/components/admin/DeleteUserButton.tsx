"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "better-auth";

export default function DeleteUserButton({ user }: { user: User }) {
  const router = useRouter(); 

  const deleteUser = async () => {
    await authClient.admin.removeUser(
      { userId: user.id },
      {
        onRequest: () => {
        },
        onSuccess: () => {
          toast.success("Conta deletada com sucesso");
          router.refresh();
        },
        onError: () => {
          toast.error("Erro ao deletar conta.");
        },
      }
    );
  };

  return <Button onClick={deleteUser}>Deletar</Button>;
}
