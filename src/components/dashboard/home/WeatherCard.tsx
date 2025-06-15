import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface WeatherCardProps {
  title: string;
  value?: string | number;
  unit?: string;
  icon?: LucideIcon;
  color?: string;
  children?: React.ReactNode;
}

export function WeatherCard({
  title,
  value,
  unit,
  icon: Icon,
  color = '#000',
  children,
}: WeatherCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5" style={{ color }} />}
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
  {value !== undefined ? (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-2xl font-bold" style={{ color }}>
        {value}
        <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
      </div>
    </div>
  ) : (
    children
  )}
</CardContent>
    </Card>
  );
}