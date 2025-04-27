
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navigation />
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground/90">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage asset checkout requests and track assets</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-card-foreground">Asset Checkout Requests</h2>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {checkoutRequests.length} Requests
              </span>
            </div>
            <div className="rounded-lg border">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Date & Time</TableHead>
                      <TableHead className="font-semibold">Asset Details</TableHead>
                      <TableHead className="font-semibold">Employee</TableHead>
                      <TableHead className="font-semibold">Purpose</TableHead>
                      <TableHead className="font-semibold">Expected Return</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkoutRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="font-medium">{request.date}</div>
                          <div className="text-sm text-muted-foreground">{request.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{request.asset}</div>
                          <div className="text-sm text-muted-foreground">{request.assetType}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{request.employeeName}</div>
                              <div className="text-sm text-muted-foreground">{request.employeeCode}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{request.purpose}</TableCell>
                        <TableCell>{request.expectedReturn}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            request.status === 'pending' ? 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20' : 
                            request.status === 'approved' ? 'bg-green-50 text-green-800 ring-1 ring-inset ring-green-600/20' : 
                            request.status === 'rejected' ? 'bg-red-50 text-red-800 ring-1 ring-inset ring-red-600/20' :
                            'bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-600/20'
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
                                variant="outline"
                                size="sm"
                                onClick={() => handleReturn(request.id)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
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
