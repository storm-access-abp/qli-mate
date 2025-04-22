import Image from "next/image";
import represa from "../../../public/represaFurnas.jpg";
import qliLogo from "../../../public/qli-mate-app.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function About() {
  return (
    <section className="pt-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="relative w-full h-[450px] rounded-2xl shadow-xl">
              <Image
                src={represa}
                alt="Represa de Furnas"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
            </div>
            <div className="absolute -right-4 -bottom-6 w-44 h-44 border-4 rounded-xl border-white shadow-lg transition-transform duration-300 group-hover:scale-105 bg-white">
              <div className="relative w-full h-full">
                <Image
                  src={qliLogo}
                  alt="Logo Qli-Mate"
                  fill
                  quality={100}
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="space-y-8 lg:pl-6">
            <div className="space-y-2">
              <div className="w-20 h-1.5 bg-sky-500 rounded-full"></div>
              <h2 className="text-4xl font-bold tracking-tight">
                SOBRE O PROJETO
              </h2>
            </div>
            <div className="space-y-6 text-slate-700 text-justify">
              <p className="text-lg leading-relaxed">
                <span className="font-semibold text-sky-500">Qli-Mate</span>{" "}
                é uma plataforma desenvolvida pelo grupo <span className="font-medium text-sky-500">Storm Access</span> da Fatec
                Jacareí para promover a segurança e o bem-estar das comunidades
                ao redor do Lago de Furnas.
              </p>
              <p className="leading-relaxed">
                Integrando dados de estações meteorológicas, o app fornece
                informações climáticas confiáveis e alertas em tempo real sobre
                ventos extremos. Com visualizações intuitivas e notificações
                precisas, o Qli-Mate ajuda a prevenir acidentes e apoia
                atividades econômicas como turismo e pesca.
              </p>
              <p className="leading-relaxed">
                Sua interface amigável e foco na prevenção fazem dele uma
                ferramenta essencial para os 34 municípios da região.
              </p>
              <Button className="mt-4">
                Saiba mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}