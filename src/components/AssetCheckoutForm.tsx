
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateSelectionSection } from "./checkout/DateSelectionSection";
import { AssetSelectionSection } from "./checkout/AssetSelectionSection";
import { useAssetCheckout } from "@/hooks/useAssetCheckout";

const AssetCheckoutForm = () => {
  const {
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
  } = useAssetCheckout();

  // Mock user info - would come from authentication in production
  const employeeCode = "100";
  const employeeName = "John Doe";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-6">
        <DateSelectionSection
          outwardDate={outwardDate}
          expectedReturnDate={expectedReturnDate}
          daysCount={daysCount}
          onOutwardDateChange={setOutwardDate}
          onExpectedReturnDateChange={calculateDays}
        />

        <AssetSelectionSection
          mediaType={mediaType}
          assetId={assetId}
          availableAssets={availableAssets}
          onMediaTypeChange={setMediaType}
          onAssetIdChange={setAssetId}
        />

        <div className="space-y-2">
          <Label>Employee Code</Label>
          <Input type="text" value={employeeCode} disabled className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Employee Name</Label>
          <Input type="text" value={employeeName} disabled className="bg-gray-50" />
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Purpose</Label>
          <Input 
            type="text" 
            placeholder="Enter purpose of checkout"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">Submit Checkout Request</Button>
    </form>
  );
};

export default AssetCheckoutForm;
