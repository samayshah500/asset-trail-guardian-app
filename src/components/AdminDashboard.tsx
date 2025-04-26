
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldX, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "./Navigation";
import { useAssets } from "@/context/AssetContext";

const AdminDashboard = () => {
  const { checkoutRequests, approveRequest, rejectRequest, returnAsset } = useAssets();
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    approveRequest(id);
    toast({
      title: "Request Approved",
      description: `Request #${id} has been approved successfully.`,
    });
  };

  const handleReject = (id: string) => {
    rejectRequest(id);
    toast({
      title: "Request Rejected",
      description: `Request #${id} has been rejected.`,
    });
  };

  const handleReturn = (id: string) => {
    returnAsset(id);
    toast({
      title: "Asset Returned",
      description: `Asset has been marked as returned and is now available.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">Asset Checkout Requests</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Expected Return</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkoutRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.time}</TableCell>
                        <TableCell>
                          {request.asset}
                          <br />
                          <span className="text-sm text-gray-500">{request.assetType}</span>
                        </TableCell>
                        <TableCell>
                          {request.employeeName}
                          <br />
                          <span className="text-sm text-gray-500">{request.employeeCode}</span>
                        </TableCell>
                        <TableCell>{request.purpose}</TableCell>
                        <TableCell>{request.expectedReturn}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium
                            ${request.status === 'pending' ? 'bg-yellow-50 text-yellow-800' : 
                              request.status === 'approved' ? 'bg-green-50 text-green-800' : 
                              request.status === 'rejected' ? 'bg-red-50 text-red-800' :
                              'bg-blue-50 text-blue-800'}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {request.status === 'pending' && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600 hover:text-green-700"
                                  onClick={() => handleApprove(request.id)}
                                >
                                  <ShieldCheck className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleReject(request.id)}
                                >
                                  <ShieldX className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {request.status === 'approved' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReturn(request.id)}
                              >
                                <User className="h-4 w-4 mr-1" />
                                <span>Return</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
