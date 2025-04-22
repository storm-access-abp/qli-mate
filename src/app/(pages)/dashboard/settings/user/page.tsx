import React from "react";
import { ChangePassword } from "@/components/dashboard/settings/user/ChangePassword";
import { ChangeEmail } from "@/components/dashboard/settings/user/ChangeEmail";

export default function page() {
  return (
    <div>
      <h1 className="text-3xl mb-5">Altere seus dados cadastrais</h1>
      <div className="max-w-72">
        <ChangeEmail />
        <br />
        <hr />
        <br />
        <ChangePassword />
      </div>
    </div>
  );
}
