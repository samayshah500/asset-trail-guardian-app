
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AssetCheckoutForm from "./AssetCheckoutForm";
import Navigation from "./Navigation";
import { useAssets } from "@/context/AssetContext";

const UserDashboard = () => {
  const { checkoutRequests } = useAssets();
  const userCode = "100";
  const userRequests = checkoutRequests.filter(req => req.employeeCode === userCode);
  
  return (
    <div className="main-container">
      <Navigation />
      <header className="page-header">
        <div className="content-container">
          <h1 className="page-title">Asset Checkout System</h1>
        </div>
      </header>
      <main className="content-container">
        <Tabs defaultValue="new-request" className="space-y-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="new-request">New Request</TabsTrigger>
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-request" className="card-container">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">New Asset Checkout Request</h2>
              <AssetCheckoutForm />
            </div>
          </TabsContent>
          
          <TabsContent value="my-requests" className="card-container">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">My Checkout Requests</h2>
              <div className="table-container">
                <div className="table-wrapper">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Expected Return</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRequests.length > 0 ? (
                        userRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{request.date}</TableCell>
                            <TableCell>
                              <div className="font-medium">{request.asset}</div>
                              <div className="text-sm text-muted-foreground">{request.assetType}</div>
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
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            You have no checkout requests.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserDashboard;
