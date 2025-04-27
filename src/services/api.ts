
import { Asset, CheckoutRequest } from "@/context/AssetContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const assetService = {
  // Fetch all assets
  getAllAssets: async (): Promise<Asset[]> => {
    const response = await fetch(`${API_BASE_URL}/assets`);
    if (!response.ok) throw new Error('Failed to fetch assets');
    return response.json();
  },

  // Fetch all checkout requests
  getAllCheckoutRequests: async (): Promise<CheckoutRequest[]> => {
    const response = await fetch(`${API_BASE_URL}/checkout-requests`);
    if (!response.ok) throw new Error('Failed to fetch checkout requests');
    return response.json();
  },

  // Submit a new checkout request
  submitCheckoutRequest: async (request: Omit<CheckoutRequest, "id" | "date" | "time" | "status">): Promise<CheckoutRequest> => {
    const response = await fetch(`${API_BASE_URL}/checkout-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to submit checkout request');
    return response.json();
  },

  // Update request status
  updateRequestStatus: async (id: string, status: "approved" | "rejected" | "returned"): Promise<CheckoutRequest> => {
    const response = await fetch(`${API_BASE_URL}/checkout-requests/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update request status');
    return response.json();
  },
};
