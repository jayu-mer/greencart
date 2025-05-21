import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets"; // for your green cart icon or badge

const BestSeller = () => {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const { data } = await axios.get("/api/product/bestsellers");
        if (data.success) {
          setBestsellers(data.products);
        }
      } catch (error) {
        console.error("Failed to load bestsellers", error);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bestsellers.map((product) => (
          <div key={product._id} className="relative border p-4 rounded">
            <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-sm line-through text-gray-400">${product.price}</p>
            <p className="text-lg font-bold">${product.offerPrice}</p>

            {/* Green cart badge */}
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded flex items-center gap-1">
              <img src={assets.green_cart_icon} alt="best seller" className="w-4 h-4" />
              <span>Best Seller</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
