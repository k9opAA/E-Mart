import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete product?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setProducts(products.filter((product) => product._id !== id)); // successful hola product remove 
          alert("Product Deleted!");
        } else {
          alert("Failed to delete product.");
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mt-6">
      <p className="text-lg font-semibold mb-4">Product List</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">InStock</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>


          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                
                <td className="p-3 font-medium">{item.name}</td>
             <td className="p-3">{item.category?.name}</td>

                <td className="p-3">{item.brand}</td>
                <td className="p-3 font-semibold">${item.price}</td>
                <td className="p-3">{item.InStock}</td>

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Link to={`/product/edit/${item._id}`}>
                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        Edit
                      </button>
                    </Link>

                    <button 
                        onClick={() => handleDelete(item._id)} 
                        className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition"
                        title="Delete Product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Product;