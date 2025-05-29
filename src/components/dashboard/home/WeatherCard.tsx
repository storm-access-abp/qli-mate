import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface WeatherCardProps {
    title: string;
    value: string | number;
    unit: string;
    icon: LucideIcon;
    color: string;
}

export function WeatherCard({ title, value, unit, icon: Icon, color }: WeatherCardProps) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-5 w-5" style={{ color }} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold" style={{ color }}>
                    {value}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
                </div>
            </CardContent>
        </Card>
    );
}