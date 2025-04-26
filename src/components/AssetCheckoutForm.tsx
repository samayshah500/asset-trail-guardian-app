
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const AssetCheckoutForm = () => {
  const [outwardDate, setOutwardDate] = useState<Date>(new Date());
  const [expectedReturnDate, setExpectedReturnDate] = useState<Date>();
  const [daysCount, setDaysCount] = useState<number>(0);

  // Mock data - replace with actual data from your backend
  const mockMediaTypes = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Headphone' },
    { id: 3, name: 'Monitor' },
  ];

  const mockAssets = [
    { id: 1, name: 'SSPL-LT-56' },
    { id: 2, name: 'SSPL-LT-57' },
    { id: 3, name: 'SSPL-HP-12' },
  ];

  // Calculate days between dates
  const calculateDays = (returnDate: Date) => {
    setExpectedReturnDate(returnDate);
    const timeDiff = returnDate.getTime() - outwardDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysCount(daysDiff);
  };

  return (
    <form className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Outward Date */}
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
                onSelect={(date) => date && setOutwardDate(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time */}
        <div className="space-y-2">
          <Label>Current Time</Label>
          <Input 
            type="text" 
            value={format(new Date(), "hh:mm a")} 
            disabled 
            className="bg-gray-50"
          />
        </div>

        {/* Media Type */}
        <div className="space-y-2">
          <Label>Media Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select media type" />
            </SelectTrigger>
            <SelectContent>
              {mockMediaTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Asset Information */}
        <div className="space-y-2">
          <Label>Asset/Media Information</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select asset" />
            </SelectTrigger>
            <SelectContent>
              {mockAssets.map((asset) => (
                <SelectItem key={asset.id} value={asset.id.toString()}>
                  {asset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employee Code */}
        <div className="space-y-2">
          <Label>Employee Code</Label>
          <Input type="text" value="100" disabled className="bg-gray-50" />
        </div>

        {/* Employee Name */}
        <div className="space-y-2">
          <Label>Employee Name</Label>
          <Input type="text" value="John Doe" disabled className="bg-gray-50" />
        </div>

        {/* Purpose */}
        <div className="space-y-2 col-span-2">
          <Label>Purpose</Label>
          <Input type="text" placeholder="Enter purpose of checkout" />
        </div>

        {/* Expected Return */}
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
                onSelect={(date) => date && calculateDays(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Days Count */}
        <div className="space-y-2">
          <Label>Days Count</Label>
          <Input type="text" value={daysCount} disabled className="bg-gray-50" />
        </div>
      </div>

      <Button type="submit" className="w-full">Submit Checkout Request</Button>
    </form>
  );
};

export default AssetCheckoutForm;
