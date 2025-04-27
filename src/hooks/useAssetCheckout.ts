
import { useState } from 'react';
import { useAssets, AssetType } from "@/context/AssetContext";
import { useToast } from "@/hooks/use-toast";

export const useAssetCheckout = () => {
  const { assets, submitCheckoutRequest } = useAssets();
  const { toast } = useToast();
  const [outwardDate, setOutwardDate] = useState<Date>(new Date());
  const [expectedReturnDate, setExpectedReturnDate] = useState<Date>();
  const [daysCount, setDaysCount] = useState<number>(0);
  const [mediaType, setMediaType] = useState<AssetType | "">("");
  const [assetId, setAssetId] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

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
      employeeName: "John Doe", // Mock data
      employeeCode: "100", // Mock data
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

  return {
    outwardDate,
    expectedReturnDate,
    daysCount,
    mediaType,
    assetId,
    purpose,
    availableAssets,
    setOutwardDate,
    calculateDays,
    setMediaType,
    setAssetId,
    setPurpose,
    handleSubmit,
  };
};
