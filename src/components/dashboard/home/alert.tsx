import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wind, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const windSpeed = 3;
const isHighWind = false;
const limite = 5;

export function WindSpeedAlert() {
  return (
      <Card
        className={cn(
          "transition-all duration-500 w-full h-full p-6 flex flex-col",
          isHighWind ? "bg-red-200" : ""
        )}
      >
        <CardHeader className="pb-2 px-0 pt-0">
          <CardTitle className="flex items-center gap-2 text-2xl font-medium">
            <Wind
              className={cn(isHighWind ? "text-red-600" : "text-blue-600")}
              size={28}
            />
            <span>Monitoramento de velocidade do vento</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-grow flex flex-col justify-between">
          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between">
              <span>Limite: {limite} kmh</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={cn(
                  "h-3 rounded-full transition-all duration-500",
                  isHighWind
                    ? "bg-red-600"
                    : windSpeed > limite * 0.7
                    ? "bg-yellow-400"
                    : "bg-green-400"
                )}
                style={{ width: `${Math.min(100, (windSpeed / 30) * 100)}%` }}
              ></div>
            </div>

            <div className="text-center my-8">
              <span
                className={cn(
                  "text-5xl font-bold transition-colors",
                  isHighWind ? "text-red-600" : "text-blue-700"
                )}
              >
                {windSpeed}
              </span>
              <span className="text-2xl text-slate-500"> kmh</span>
            </div>
          </div>

          {isHighWind && (
            <Alert className="bg-red-200 border-red-400 p-3 mt-4">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 ml-2">
                Alerta de vento forte! A velocidade atual do vento excede o
                limite de segurança.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter
          className={cn(
            "px-0 pb-0 pt-4 mt-auto italic text-sm",
            isHighWind ? "text-red-700" : "text-blue-700"
          )}
        >
          Última atualização: {new Date().toLocaleTimeString()}
        </CardFooter>
      </Card>
  );
}
