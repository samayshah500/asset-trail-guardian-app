
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, ShieldCheck, ShieldX, User } from "lucide-react";

const AdminDashboard = () => {
  // Mock data - replace with actual data from backend later
  const requests = [
    {
      id: 1,
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
      id: 2,
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

  return (
    <div className="min-h-screen bg-gray-50">
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
                    {requests.map((request) => (
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
                              'bg-red-50 text-red-800'}`}>
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
                                  onClick={() => console.log('Approve', request.id)}
                                >
                                  <ShieldCheck className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => console.log('Reject', request.id)}
                                >
                                  <ShieldX className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {request.status === 'approved' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => console.log('Return', request.id)}
                              >
                                <User className="h-4 w-4" />
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
