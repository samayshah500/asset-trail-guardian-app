
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
    <div className="main-container">
      <Navigation />
      <header className="page-header">
        <div className="content-container">
          <h1 className="page-title">Admin Dashboard</h1>
        </div>
      </header>
      <main className="content-container">
        <div className="card-container">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Asset Checkout Requests</h2>
            <div className="table-container">
              <div className="table-wrapper">
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
                          <div className="font-medium">{request.asset}</div>
                          <div className="text-sm text-muted-foreground">{request.assetType}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{request.employeeName}</div>
                          <div className="text-sm text-muted-foreground">{request.employeeCode}</div>
                        </TableCell>
                        <TableCell>{request.purpose}</TableCell>
                        <TableCell>{request.expectedReturn}</TableCell>
                        <TableCell>
                          <span className={`status-badge ${
                            request.status === 'pending' ? 'status-pending' : 
                            request.status === 'approved' ? 'status-approved' : 
                            request.status === 'rejected' ? 'status-rejected' :
                            'status-returned'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {request.status === 'pending' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleApprove(request.id)}
                                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <ShieldCheck className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReject(request.id)}
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <ShieldX className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {request.status === 'approved' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReturn(request.id)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <User className="h-4 w-4 mr-1" />
                                Return
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
