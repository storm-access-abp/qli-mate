"use client";

import { ArrowUpRight, SquareArrowOutUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from 'next/link'

export function Hero() {
  return (
    <div className="relative isolate flex min-h-[85vh] w-full items-center justify-center px-6 py-20 sm:px-12 lg:px-24">
      <div className="absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      <div className="grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            ☀️ Seu site para controle de clima
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-8xl">
            Qli-mate
          </h1>
          <p className="text-xl text-muted-foreground">
            Tenha controle sobre as principais mudanças climáticas perto de você, com atualizações em tempo real e dados confiáveis.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <Button size="lg" className="w-full sm:w-auto cursor-pointer px-6 py-3 text-base">
            <Link href="/login">Comece agora</Link>
              </Button>
            <Button size="lg" className="w-full sm:w-auto cursor-pointer px-6 py-3 text-base" variant="outline">
              <Link href="/saiba">Saiba mais</Link>
              <SquareArrowOutUpRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Image
            src="/qli-mascote.png"
            width={450}
            height={450}
            alt="Mascote QLI-MATE"
            className="object-contain transition-all duration-500 hover:scale-105 drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
