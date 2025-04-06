"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    value: Date;
    onChangeAction: (date: Date) => void;
    className?: string;
    placeholder?: string;
}

export function DatePicker({value, onChangeAction, className, placeholder = "Select Date"}: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="lg"
                    className={cn("w-full justify-start text-left font-normal px-3", !value && "text-muted-foreground", className)}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(newDate) => onChangeAction(newDate as Date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker;