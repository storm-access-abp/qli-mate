// lib/utils/uvUtils.ts
export function formatUVLevel(uvValue: number): string {
  let level = "";
  if (uvValue >= 0 && uvValue < 100) level = "Muito Baixo";
  else if (uvValue >= 100 && uvValue < 300) level = "Baixo";
  else if (uvValue >= 300 && uvValue < 600) level = "Médio";
  else if (uvValue >= 600 && uvValue < 900) level = "Alto";
  else if (uvValue >= 900) level = "Muito Alto";
  else return "--";
  
  return `${level}`;
}