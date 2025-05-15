import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For route params
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const AllProduct = () => {
  const { products = [], searchQuery } = useAppContext();
  const { category } = useParams(); // 👈 get category from URL
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    let filtered = products;

    // Filter by search
    if (searchQuery && searchQuery.length > 0) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredProduct(filtered);
  }, [products, searchQuery, category]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredProduct
          .filter(product => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProduct;
