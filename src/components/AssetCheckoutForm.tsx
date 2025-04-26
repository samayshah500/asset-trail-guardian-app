
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
import { useToast } from '@/hooks/use-toast';
import { useAssets, AssetType } from "@/context/AssetContext";

const AssetCheckoutForm = () => {
  const { assets, submitCheckoutRequest } = useAssets();
  const { toast } = useToast();
  const [outwardDate, setOutwardDate] = useState<Date>(new Date());
  const [expectedReturnDate, setExpectedReturnDate] = useState<Date | undefined>();
  const [daysCount, setDaysCount] = useState<number>(0);
  const [mediaType, setMediaType] = useState<AssetType | "">("");
  const [assetId, setAssetId] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

  // User info - would come from authentication in production
  const employeeCode = "100";
  const employeeName = "John Doe";

  // Filter available assets by type
  const availableAssets = assets.filter(
    asset => asset.isAvailable && (mediaType === "" || asset.type === mediaType)
  );

  // Calculate days between dates
  const calculateDays = (returnDate: Date) => {
    setExpectedReturnDate(returnDate);
    const timeDiff = returnDate.getTime() - outwardDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysCount(daysDiff);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!mediaType) {
      toast({
        title: "Error",
        description: "Please select a media type",
        variant: "destructive",
      });
      return;
    }
    
    if (!assetId) {
      toast({
        title: "Error",
        description: "Please select an asset",
        variant: "destructive",
      });
      return;
    }
    
    if (!purpose) {
      toast({
        title: "Error",
        description: "Please enter a purpose for checkout",
        variant: "destructive",
      });
      return;
    }
    
    if (!expectedReturnDate) {
      toast({
        title: "Error",
        description: "Please select an expected return date",
        variant: "destructive",
      });
      return;
    }

    const selectedAsset = assets.find(asset => asset.id === assetId);
    if (!selectedAsset) {
      toast({
        title: "Error",
        description: "Selected asset not found",
        variant: "destructive",
      });
      return;
    }
    
    // Submit the request
    submitCheckoutRequest({
      asset: selectedAsset.name,
      assetType: selectedAsset.type,
      employeeName,
      employeeCode,
      purpose,
      expectedReturn: `${daysCount} day${daysCount !== 1 ? 's' : ''}`
    });
    
    // Show success message
    toast({
      title: "Success",
      description: "Your checkout request has been submitted successfully.",
    });
    
    // Reset form
    setMediaType("");
    setAssetId("");
    setPurpose("");
    setExpectedReturnDate(undefined);
    setDaysCount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
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
          <Select value={mediaType} onValueChange={(value) => setMediaType(value as AssetType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select media type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Headphone">Headphone</SelectItem>
              <SelectItem value="Monitor">Monitor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Asset Information */}
        <div className="space-y-2">
          <Label>Asset/Media Information</Label>
          <Select value={assetId} onValueChange={setAssetId} disabled={mediaType === ""}>
            <SelectTrigger>
              <SelectValue placeholder="Select asset" />
            </SelectTrigger>
            <SelectContent>
              {availableAssets.map((asset) => (
                <SelectItem key={asset.id} value={asset.id}>
                  {asset.name}
                </SelectItem>
              ))}
              {availableAssets.length === 0 && (
                <SelectItem value="none" disabled>
                  No available assets of this type
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Employee Code */}
        <div className="space-y-2">
          <Label>Employee Code</Label>
          <Input type="text" value={employeeCode} disabled className="bg-gray-50" />
        </div>

        {/* Employee Name */}
        <div className="space-y-2">
          <Label>Employee Name</Label>
          <Input type="text" value={employeeName} disabled className="bg-gray-50" />
        </div>

        {/* Purpose */}
        <div className="space-y-2 col-span-2">
          <Label>Purpose</Label>
          <Input 
            type="text" 
            placeholder="Enter purpose of checkout"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
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
