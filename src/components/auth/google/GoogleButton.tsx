"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon } from "@/components/ui/google-icon";
import { LoaderCircle } from "lucide-react";

export default function GoogleButton() {

const [loading, setLoading] = useState(false);

const handleAuth = async () => {
  await authClient.signIn.social(
    {
      provider: "google",
      callbackURL: "/dashboard",
    },
    {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
      },
      onError: (ctx: any) => {
        setLoading(false);
        console.log(ctx.error);
      },
    }
  );
};

  return (
    <Button
      type="submit"
      className="w-full cursor-pointer"
      disabled={loading}
      onClick={handleAuth}
    >
      {loading ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : (
        <>
          <GoogleIcon />
          <span>Continuar com Google</span>
        </>
      )}
    </Button>
  );
}
