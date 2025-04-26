
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AssetCheckoutForm from "./AssetCheckoutForm";
import Navigation from "./Navigation";
import { useAssets } from "@/context/AssetContext";

const UserDashboard = () => {
  const { checkoutRequests } = useAssets();
  
  // Get only current user's requests (in production, filter by actual user ID)
  const userCode = "100";
  const userRequests = checkoutRequests.filter(req => req.employeeCode === userCode);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Asset Checkout System</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Tabs defaultValue="new-request" className="space-y-4">
            <TabsList>
              <TabsTrigger value="new-request">New Request</TabsTrigger>
              <TabsTrigger value="my-requests">My Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-request" className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">New Asset Checkout Request</h2>
                <AssetCheckoutForm />
              </div>
            </TabsContent>
            
            <TabsContent value="my-requests" className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">My Checkout Requests</h2>
                <div className="overflow-x-auto">
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
                              {request.asset}
                              <br />
                              <span className="text-sm text-gray-500">{request.assetType}</span>
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
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            You have no checkout requests.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
