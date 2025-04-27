
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asset, AssetType } from "@/context/AssetContext";

interface AssetSelectionSectionProps {
  mediaType: AssetType | "";
  assetId: string;
  availableAssets: Asset[];
  onMediaTypeChange: (value: AssetType) => void;
  onAssetIdChange: (value: string) => void;
}

export const AssetSelectionSection = ({
  mediaType,
  assetId,
  availableAssets,
  onMediaTypeChange,
  onAssetIdChange,
}: AssetSelectionSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Media Type</Label>
        <Select value={mediaType} onValueChange={(value) => onMediaTypeChange(value as AssetType)}>
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

      <div className="space-y-2">
        <Label>Asset/Media Information</Label>
        <Select value={assetId} onValueChange={onAssetIdChange} disabled={mediaType === ""}>
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
    </>
  );
};
