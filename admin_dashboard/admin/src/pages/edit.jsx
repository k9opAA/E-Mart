import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [categories, setCategories] = useState([]);
    const [formFields, setFormFields] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        InStock: "", 
        brand: "",
        image: "", 
        isFeatured: "No"
    });

    useEffect(() => {
        fetch('http://localhost:4000/api/category')
            .then(res => res.json())
            .then(data => setCategories(data));

        fetch(`http://localhost:4000/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormFields({
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    price: data.price,
                    InStock: data.InStock,
                    brand: data.brand,
                    image: data.images[0],
                    isFeatured: data.isFeatured ? "Yes" : "No"
                });
            });
    }, [id]);

    const changeInput = (e) => {
        setFormFields({ 
            ...formFields,
            [e.target.name]: e.target.value
        });
    };

    const updateProduct = async (e) => {
        e.preventDefault();

        const dataToSend = {
            name: formFields.name,
            description: formFields.description,
            category: formFields.category, 
            price: Number(formFields.price),
            InStock: Number(formFields.InStock),
            brand: formFields.brand,
            images: [formFields.image], 
            isFeatured: formFields.isFeatured === "Yes"
        };

        try {
            const respons = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (respons.ok) {
                alert("Product Updated!");
                navigate("/");
            } else {
                alert("Failed to update");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="bg-white shadow rounded p-6 m-4">
            <h2 className="font-medium text-lg mb-6">Edit Product</h2>

            <form className="space-y-6" onSubmit={updateProduct}>
                <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input type="text" name="name" value={formFields.name} onChange={changeInput} className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea rows="4" name="description" value={formFields.description} onChange={changeInput} className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input type="text" name="image" value={formFields.image} onChange={changeInput} className="w-full border rounded px-3 py-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select name="category" value={formFields.category?._id || formFields.category} onChange={changeInput} className="w-full border rounded px-3 py-2 bg-white">
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input type="number" name="price" value={formFields.price} onChange={changeInput} className="w-full border rounded px-3 py-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">InStock</label>
                        <input type="number" name="InStock" value={formFields.InStock} onChange={changeInput} className="w-full border rounded px-3 py-2" />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => navigate('/')} className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;