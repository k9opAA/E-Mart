import Product from "./product";

const Dashboard = () => {
  return (
    <>
      <img
        src="../../assets/e-mart-logo.png" alt="E-mart logo"     />

      <div className="bg-white p-4 rounded shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <Product/>

    </>
  );
};

export default Dashboard;
