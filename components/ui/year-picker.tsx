import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

type Props = {
    onValueChange: (value: string) => void;
}

export default function YearPicker({ onValueChange }: Props) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 80 }, (_, i) => `${currentYear - i}`);

    const [year, setYear] = useState<string>("");

    const onYearChange = (value: string) => {
        setYear(value);
        onValueChange(value);
    }

    return (
        <div className="w-40">
            <Select value={year} onValueChange={onYearChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((yr) => (
                        <SelectItem key={yr} value={yr}>
                            {yr}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}