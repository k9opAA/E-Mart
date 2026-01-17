import { useState, useEffect } from "react";

const Upload = () => {

    const [categories, setCategories] = useState([]);

    const [productFormFields, setProductFormFields] = useState({
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
            .then(data => setCategories(data))
            .catch(err => console.log("Error fetching categories:", err));
    }, []);

    const changeProductInput = (e) => {
        setProductFormFields({
            ...productFormFields,
            [e.target.name]: e.target.value
        });
    };

    const addProduct = async (e) => {
        e.preventDefault();

        const dataToSend = {
            name: productFormFields.name,
            description: productFormFields.description,
            category: productFormFields.category,
            price: Number(productFormFields.price),
            InStock: Number(productFormFields.InStock),
            brand: productFormFields.brand,
            images: [productFormFields.image], 
            isFeatured: productFormFields.isFeatured === "Yes"
        };

        try {
            const response = await fetch("http://localhost:4000/api/products/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Product Uploaded Successfully!");
                console.log(result);
            } else {
                alert("Failed to upload: " + (result.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Upload Error:", error);
            alert("Network error. Check console.");
        }
    };


    const [catformFields, catsetFormFields] = useState({
        name: '',
        images: '',
        color: ''
    });

    const changeCategoryInput = (e) => {
        catsetFormFields({
            ...catformFields,
            [e.target.name]: e.target.value
        });
    };
    
    const addCategory = async (e) => {
        e.preventDefault();
        
        const categoryData = {
            name: catformFields.name,
            images: [catformFields.images],
            color: catformFields.color
        };

        try {
            const response = await fetch("http://localhost:4000/api/category/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                alert("Category Added");
                catsetFormFields({ 
                    name: '', 
                    images: '', 
                    color: ''
                });
            } else {
                alert("Failed to add category");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

  return (
    <div className="space-y-6">

     <div className="bg-white shadow rounded p-6">
                <h2 className="font-medium text-lg mb-6">Product Upload</h2>

                <form className="space-y-6" onSubmit={addProduct}>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input type="text" name="name" onChange={changeProductInput} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea rows="4" name="description" onChange={changeProductInput} className="w-full border rounded px-3 py-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input type="text" name="image" onChange={changeProductInput} className="w-full border rounded px-3 py-2" placeholder="Paste image link here" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select name="category" onChange={changeProductInput} className="w-full border rounded px-3 py-2 bg-white">
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input type="number" name="price" onChange={changeProductInput} className="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Product Stock</label>
                            <input type="number" name="InStock" onChange={changeProductInput} className="w-full border rounded px-3 py-2" placeholder="0" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Brand</label>
                            <input type="text" name="brand" onChange={changeProductInput} className="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Is Featured</label>
                            <select name="isFeatured" onChange={changeProductInput} className="w-full border rounded px-3 py-2 bg-white">
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                            Upload Product
                        </button>
                    </div>
                </form>
            </div>
    
    
    
    
    
    
    
    
        <div className="bg-white shadow rounded p-6 mt-10">
        <h2 className="font-medium text-lg mb-6">Category Upload</h2>

        <form className="space-y-6" onSubmit={addCategory}>
          <div>
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" name="name"
              value={catformFields.name} onChange={changeCategoryInput}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" name="images" value={catformFields.images} onChange={changeCategoryInput}/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" name="color" value={catformFields.color}  onChange={changeCategoryInput}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-white px"
            >
              Upload Category
            </button>
          </div>
        </form>
      </div>
    
    
    </div>
    
  );
};

export default Upload;
