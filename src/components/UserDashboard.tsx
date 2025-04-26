
import AssetCheckoutForm from "./AssetCheckoutForm";
import Navigation from "./Navigation";

const UserDashboard = () => {
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
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">New Asset Checkout Request</h2>
              <AssetCheckoutForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
