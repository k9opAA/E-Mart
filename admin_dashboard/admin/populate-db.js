// Script to populate the database with sample categories and products
// Run this with: node populate-db.js

const categories = [
  {
    name: "Fashion",
    images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=400"],
    color: "#FF6B9D"
  },
  {
    name: "Electronics",
    images: ["https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400"],
    color: "#4A90E2"
  },
  {
    name: "Footwear",
    images: ["https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400"],
    color: "#F5A623"
  },
  {
    name: "Watch",
    images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400"],
    color: "#7ED321"
  },
  {
    name: "Mobile",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"],
    color: "#BD10E0"
  },
  {
    name: "Laptop",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"],
    color: "#50E3C2"
  }
];

const products = [
  // Fashion products
  { name: "Men's Cotton T-Shirt", description: "Comfortable cotton t-shirt for everyday wear", category: "Fashion", price: 29.99, InStock: 150, brand: "StyleCo", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"], isFeatured: true },
  { name: "Women's Denim Jacket", description: "Classic denim jacket with modern fit", category: "Fashion", price: 79.99, InStock: 85, brand: "TrendWear", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"], isFeatured: false },
  { name: "Casual Summer Dress", description: "Light and breezy summer dress", category: "Fashion", price: 49.99, InStock: 120, brand: "SummerVibes", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"], isFeatured: true },
  
  // Electronics products
  { name: "Wireless Bluetooth Headphones", description: "Premium noise-cancelling headphones", category: "Electronics", price: 149.99, InStock: 95, brand: "SoundMax", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"], isFeatured: true },
  { name: "4K Smart TV 55 inch", description: "Ultra HD smart television with streaming apps", category: "Electronics", price: 599.99, InStock: 45, brand: "VisionTech", images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400"], isFeatured: false },
  { name: "Portable Power Bank", description: "20000mAh fast charging power bank", category: "Electronics", price: 39.99, InStock: 200, brand: "ChargePro", images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400"], isFeatured: false },
  { name: "Gaming Keyboard RGB", description: "Mechanical gaming keyboard with RGB lighting", category: "Electronics", price: 89.99, InStock: 75, brand: "GameGear", images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"], isFeatured: true },
  
  // Footwear products
  { name: "Running Sneakers", description: "Lightweight running shoes with cushioning", category: "Footwear", price: 79.99, InStock: 130, brand: "SpeedFit", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"], isFeatured: true },
  { name: "Leather Formal Shoes", description: "Classic leather formal shoes for men", category: "Footwear", price: 119.99, InStock: 65, brand: "ClassicStep", images: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400"], isFeatured: false },
  { name: "Women's High Heels", description: "Elegant high heels for special occasions", category: "Footwear", price: 89.99, InStock: 55, brand: "Elegance", images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"], isFeatured: false },
  { name: "Sport Sandals", description: "Comfortable outdoor sport sandals", category: "Footwear", price: 45.99, InStock: 100, brand: "OutdoorPro", images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400"], isFeatured: false },
  
  // Watch products
  { name: "Luxury Analog Watch", description: "Premium stainless steel analog watch", category: "Watch", price: 299.99, InStock: 40, brand: "TimeLux", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"], isFeatured: true },
  { name: "Smart Fitness Watch", description: "Fitness tracking smartwatch with heart rate monitor", category: "Watch", price: 199.99, InStock: 80, brand: "FitTime", images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400"], isFeatured: true },
  { name: "Casual Digital Watch", description: "Sporty digital watch with multiple features", category: "Watch", price: 59.99, InStock: 110, brand: "SportTime", images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400"], isFeatured: false },
  
  // Mobile products
  { name: "Flagship Smartphone 5G", description: "Latest 5G smartphone with triple camera", category: "Mobile", price: 899.99, InStock: 60, brand: "TechPhone", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"], isFeatured: true },
  { name: "Budget Android Phone", description: "Affordable smartphone with great features", category: "Mobile", price: 299.99, InStock: 140, brand: "ValuePhone", images: ["https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400"], isFeatured: false },
  { name: "Premium iPhone", description: "Latest iPhone with A-series chip", category: "Mobile", price: 1099.99, InStock: 50, brand: "Apple", images: ["https://images.unsplash.com/photo-1592286927505-4276ccf4ff9e?w=400"], isFeatured: true },
  
  // Laptop products
  { name: "Gaming Laptop RTX", description: "High-performance gaming laptop with RTX graphics", category: "Laptop", price: 1499.99, InStock: 35, brand: "GameBook", images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400"], isFeatured: true },
  { name: "Business Ultrabook", description: "Lightweight ultrabook for professionals", category: "Laptop", price: 1199.99, InStock: 55, brand: "ProBook", images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"], isFeatured: false },
  { name: "Student Budget Laptop", description: "Affordable laptop perfect for students", category: "Laptop", price: 599.99, InStock: 90, brand: "EduBook", images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"], isFeatured: false }
];

async function populateDatabase() {
  try {
    // First, post all categories
    console.log("Posting categories...");
    const categoryMap = {};
    
    for (const category of categories) {
      const response = await fetch("http://localhost:4000/api/category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)
      });
      
      if (response.ok) {
        const result = await response.json();
        categoryMap[category.name] = result._id || result.id;
        console.log(`✓ Created category: ${category.name}`);
      } else {
        console.log(`✗ Failed to create category: ${category.name}`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log("\nPosting products...");
    
    // Then, post all products
    for (const product of products) {
      const response = await fetch("http://localhost:4000/api/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        console.log(`✓ Created product: ${product.name}`);
      } else {
        console.log(`✗ Failed to create product: ${product.name}`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log("\n✓ Database population complete!");
    console.log(`Total: ${categories.length} categories and ${products.length} products`);
    
  } catch (error) {
    console.error("Error populating database:", error);
  }
}

// Run the population script
populateDatabase();
