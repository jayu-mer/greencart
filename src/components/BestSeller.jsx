import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>BestSeller</p>

      <div className='flex md:grid md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 overflow-x-auto no-scrollbar'>
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <div key={index} className='min-w-[220px] md:min-w-0'>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
