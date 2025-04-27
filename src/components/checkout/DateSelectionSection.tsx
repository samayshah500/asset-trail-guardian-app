
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateSelectionSectionProps {
  outwardDate: Date;
  expectedReturnDate?: Date;
  daysCount: number;
  onOutwardDateChange: (date: Date) => void;
  onExpectedReturnDateChange: (date: Date) => void;
}

export const DateSelectionSection = ({
  outwardDate,
  expectedReturnDate,
  daysCount,
  onOutwardDateChange,
  onExpectedReturnDateChange,
}: DateSelectionSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Outward Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !outwardDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {outwardDate ? format(outwardDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={outwardDate}
              onSelect={(date) => date && onOutwardDateChange(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Expected Return Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !expectedReturnDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expectedReturnDate ? format(expectedReturnDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={expectedReturnDate}
              onSelect={(date) => date && onExpectedReturnDateChange(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Days Count</Label>
        <Input type="text" value={daysCount} disabled className="bg-gray-50" />
      </div>
    </>
  );
};
