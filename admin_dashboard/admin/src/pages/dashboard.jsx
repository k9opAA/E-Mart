import Product from "./product";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <img
        src="/src/assets/e-mart-logo.png" alt="E-mart logo" className="mb-4 h-16"     />

      <div className="bg-white p-4 rounded shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex gap-3">
            <Link to="/orders">
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                Manage Orders
              </button>
            </Link>
            <Link to="/upload">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Upload Product
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Product/>

    </>
  );
};

export default Dashboard;
