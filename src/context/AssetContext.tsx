import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { assetService } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

// Define types
export type AssetType = "Laptop" | "Headphone" | "Monitor";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  isAvailable: boolean;
}

export interface CheckoutRequest {
  id: string;
  date: string;
  time: string;
  asset: string;
  assetType: AssetType;
  employeeName: string;
  employeeCode: string;
  purpose: string;
  expectedReturn: string;
  status: "pending" | "approved" | "rejected" | "returned";
}

interface AssetContextType {
  assets: Asset[];
  checkoutRequests: CheckoutRequest[];
  submitCheckoutRequest: (request: Omit<CheckoutRequest, "id" | "date" | "time" | "status">) => void;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  returnAsset: (id: string) => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

// Mock data
const initialAssets: Asset[] = [
  { id: "1", name: "SSPL-LT-56", type: "Laptop", isAvailable: true },
  { id: "2", name: "SSPL-LT-57", type: "Laptop", isAvailable: true },
  { id: "3", name: "SSPL-HP-12", type: "Headphone", isAvailable: true },
  { id: "4", name: "SSPL-MN-23", type: "Monitor", isAvailable: true },
];

const initialRequests: CheckoutRequest[] = [
  {
    id: "1",
    date: "2025-04-19",
    time: "11:58 AM",
    asset: "SSPL-LT-56",
    assetType: "Laptop",
    employeeName: "John Doe",
    employeeCode: "100",
    purpose: "Meeting",
    expectedReturn: "1 day",
    status: "pending"
  },
  {
    id: "2",
    date: "2025-04-19",
    time: "02:30 PM",
    asset: "SSPL-HP-12",
    assetType: "Headphone",
    employeeName: "Jane Smith",
    employeeCode: "101",
    purpose: "Training",
    expectedReturn: "2 days",
    status: "approved"
  }
];

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [checkoutRequests, setCheckoutRequests] = useState<CheckoutRequest[]>(initialRequests);
  const { toast } = useToast();

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetsData, requestsData] = await Promise.all([
          assetService.getAllAssets(),
          assetService.getAllCheckoutRequests(),
        ]);
        setAssets(assetsData);
        setCheckoutRequests(requestsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again later.",
          variant: "destructive",
        });
      }
    };
    fetchData();
  }, []);

  const submitCheckoutRequest = async (request: Omit<CheckoutRequest, "id" | "date" | "time" | "status">) => {
    try {
      const newRequest = await assetService.submitCheckoutRequest(request);
      setCheckoutRequests(prev => [...prev, newRequest]);
      setAssets(prev =>
        prev.map(asset =>
          asset.name === request.asset ? { ...asset, isAvailable: false } : asset
        )
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit checkout request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const approveRequest = async (id: string) => {
    try {
      const updatedRequest = await assetService.updateRequestStatus(id, "approved");
      setCheckoutRequests(prev =>
        prev.map(req => (req.id === id ? updatedRequest : req))
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const rejectRequest = async (id: string) => {
    try {
      const updatedRequest = await assetService.updateRequestStatus(id, "rejected");
      setCheckoutRequests(prev =>
        prev.map(req => (req.id === id ? updatedRequest : req))
      );
      
      const request = checkoutRequests.find(req => req.id === id);
      if (request) {
        setAssets(prev =>
          prev.map(asset =>
            asset.name === request.asset ? { ...asset, isAvailable: true } : asset
          )
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const returnAsset = async (id: string) => {
    try {
      const updatedRequest = await assetService.updateRequestStatus(id, "returned");
      setCheckoutRequests(prev =>
        prev.map(req => (req.id === id ? updatedRequest : req))
      );
      
      const request = checkoutRequests.find(req => req.id === id);
      if (request) {
        setAssets(prev =>
          prev.map(asset =>
            asset.name === request.asset ? { ...asset, isAvailable: true } : asset
          )
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to return asset. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AssetContext.Provider
      value={{
        assets,
        checkoutRequests,
        submitCheckoutRequest,
        approveRequest,
        rejectRequest,
        returnAsset,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
