import React, { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, axios: api, fetchProduct } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    fetchProduct().catch(() => {
      toast.error("Failed to load products.");
    });
  }, [fetchProduct]);

  const toggleStock = useCallback(
    async (id, inStock) => {
      setTogglingId(id);
      try {
        const { data } = await api.post("/api/product/stock", { id, inStock });
        if (data.success) {
          await fetchProduct();
          toast.success(data.message);
        } else {
          toast.error(data.message || "Could not update stock status.");
        }
      } catch (error) {
        toast.error(error?.message || "Server error while updating stock.");
      } finally {
        setTogglingId(null);
      }
    },
    [api, fetchProduct]
  );

  return (
    <div className="flex-1 h-[95vh] overflow-auto p-4 md:p-10">
      <h2 className="text-lg font-medium mb-4">All Products</h2>

      <div className="max-w-4xl w-full overflow-auto rounded border border-gray-300">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Category</th>
              <th className="py-2 px-3 text-left">Price</th>
              <th className="py-2 px-3 text-left">Offer Price</th>
              <th className="py-2 px-3 text-left">In Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}

            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-300 last:border-0"
              >
                <td className="py-3 px-3">{p.name}</td>
                <td className="py-3 px-3">{p.category}</td>
                <td className="py-3 px-3">
                  {currency} {p.price}
                </td>
                <td className="py-3 px-3">
                  {currency} {p.offerPrice}
                </td>
                <td className="py-3 px-3">
                  <label className="inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={p.inStock}
                      disabled={togglingId === p._id}
                      onChange={() => toggleStock(p._id, !p.inStock)}
                      className="form-checkbox h-5 w-5 text-primary"
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
