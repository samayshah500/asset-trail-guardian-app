
import { createContext, useContext, useState, ReactNode } from "react";

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

  const submitCheckoutRequest = (request: Omit<CheckoutRequest, "id" | "date" | "time" | "status">) => {
    const now = new Date();
    const newRequest: CheckoutRequest = {
      ...request,
      id: (checkoutRequests.length + 1).toString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: "pending"
    };
    
    setCheckoutRequests([...checkoutRequests, newRequest]);
    
    // Update asset availability
    setAssets(
      assets.map(asset => 
        asset.name === request.asset ? { ...asset, isAvailable: false } : asset
      )
    );
  };

  const approveRequest = (id: string) => {
    setCheckoutRequests(
      checkoutRequests.map(request => 
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  const rejectRequest = (id: string) => {
    const request = checkoutRequests.find(req => req.id === id);
    
    setCheckoutRequests(
      checkoutRequests.map(req => 
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
    
    // Make the asset available again if rejected
    if (request) {
      setAssets(
        assets.map(asset => 
          asset.name === request.asset ? { ...asset, isAvailable: true } : asset
        )
      );
    }
  };

  const returnAsset = (id: string) => {
    const request = checkoutRequests.find(req => req.id === id);
    
    setCheckoutRequests(
      checkoutRequests.map(req => 
        req.id === id ? { ...req, status: "returned" } : req
      )
    );
    
    // Make the asset available again when returned
    if (request) {
      setAssets(
        assets.map(asset => 
          asset.name === request.asset ? { ...asset, isAvailable: true } : asset
        )
      );
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
        returnAsset 
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
