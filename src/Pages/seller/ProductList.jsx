import React from 'react';
import { useAppContext } from '../../context/AppContext';

const ProductList = () => {
  const { products, currency } = useAppContext(); // ← FIXED here

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
          <table className="table-auto w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Selling Price</th>
                <th className="px-4 py-3 font-semibold">In Stock</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <div className="border border-gray-300 rounded p-2 bg-gray-50">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                    <span className="truncate max-sm:hidden">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!products?.length && (
            <div className="text-gray-400 py-10">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
