'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { useEffect, useState } from "react";
import { revenueByMonthAction } from "@/modules/sale/actions/sale.action";
import { ActionResponseType } from "@/types/action.type";
import { revenueByMonthType } from "@/modules/sale/types";
import { DayPicker } from "react-day-picker";
import { Label } from "./label";
import { Input } from "./input";
import YearPicker from "./year-picker";

const chartConfig = {
    value: {
        label: "Total Sales",
        color: "#2563eb",
    },
} satisfies ChartConfig

const currYear = new Date().getFullYear();

export function MonthlyRevenueChart() {
    const [year, setYear] = useState(currYear);
    const [chartData, setChartData] = useState<revenueByMonthType>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRevenue = async (year: number) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.set('year', year.toString());

        const res = await revenueByMonthAction({} as ActionResponseType<revenueByMonthType>, formData);
        
        if (res.success) {
            setChartData(res.data ?? []);
        } else {
            setChartData([]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getRevenue(year); 
    }, [year]);

    const onYearChange = (value: string) => {
        setYear(Number(value));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Monthly Revenue
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2 mb-2">
                    <Label>Select Year</Label>
                    <YearPicker
                        onValueChange={onYearChange}
                    />
                </div>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
