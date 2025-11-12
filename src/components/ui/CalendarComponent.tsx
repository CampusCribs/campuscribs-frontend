import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownNavProps, DropdownProps } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type props = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};
const CalendarComponent = ({ value, onChange }: props) => {
  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };
  return (
    <div className="w-full flex justify-center items-center">
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !value && "text-muted-foreground"
              )}
              type="button"
            >
              {value ? format(value, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto" align="start">
          <Calendar
            mode="single"
            hidden={{ before: new Date() }}
            selected={value}
            onSelect={onChange}
            className="rounded-lg border border-border p-2 bg-background"
            captionLayout="dropdown-months"
            defaultMonth={new Date()}
            startMonth={new Date(1980, 6)}
            components={{
              DropdownNav: (props: DropdownNavProps) => {
                return (
                  <div className="flex w-full items-center justify-center gap-3 [&>span]:text-sm [&>span]:font-medium">
                    {props.children}
                  </div>
                );
              },
              MonthsDropdown: (props: DropdownProps) => {
                return (
                  <Select
                    value={String(props.value)}
                    onValueChange={(value) => {
                      if (props.onChange) {
                        handleCalendarChange(value, props.onChange);
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-fit font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                      {props.options?.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={String(option.value)}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarComponent;
