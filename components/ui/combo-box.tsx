"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ClientItem } from "@/modules/pharmacy/types"

type Props = {
    handleChange: (value: string) => void,
    handleSelectItem: (item: ClientItem) => void,
    items: ClientItem[]
}

export default function Combobox({ handleChange, items = [], handleSelectItem }: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const handleOnSelect = (currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue)
        setOpen(false)

        const currItem = items.find(i => i.id.toString() == currentValue);

        currItem && handleSelectItem(currItem)
    }

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[100%] justify-between"
                    >
                        {value
                            ? items.find((itm) => itm.id.toString() === value)?.name
                            : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command shouldFilter={false}>
                        <CommandInput placeholder="Search framework..." onValueChange={handleChange} />
                        <CommandList>
                            <CommandEmpty>No items found.</CommandEmpty>
                            <CommandGroup>
                                {items.length > 0 && items.map((framework) => (
                                    <CommandItem
                                        key={framework.id}
                                        value={framework.id.toString()}
                                        onSelect={(currentValue) => {
                                            handleOnSelect(currentValue);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.id.toString() ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
