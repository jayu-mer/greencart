import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const categoryList = [
    { name: "Vegetables", path: "vegetables" },
    { name: "Fruits", path: "fruits" },
    { name: "Drink", path: "drink" },
    { name: "Instant", path: "instant" },
    { name: "Dairy", path: "dairy" },
    { name: "Bakery", path: "bakery" },
    { name: "Grains", path: "grains" },
  ];

  const { axios, fetchProduct } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        fetchProduct();
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto h-screen p-4 md:p-10 bg-white">
      <form onSubmit={onSubmitHandler} className="max-w-xl w-full space-y-6">
        <div>
          <p className="text-base font-medium mb-2">Product Image</p>
          <div className="flex flex-wrap items-center gap-3">
            {Array(4).fill("").map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updated = [...files];
                    updated[index] = e.target.files[0];
                    setFiles(updated);
                  }}
                />
                {files[index] ? (
                  <img
                    src={URL.createObjectURL(files[index])}
                    alt="upload"
                    className="object-cover w-24 h-24 rounded border"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded text-gray-400 text-xs">
                    Upload
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Product Name</label>
          <input
            type="text"
            className="outline-none py-2 px-3 rounded border border-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Product Description</label>
          <textarea
            rows={4}
            className="outline-none py-2 px-3 rounded border border-gray-300 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select
            className="outline-none py-2 px-3 rounded border border-gray-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categoryList.map((item) => (
              <option key={item.path} value={item.path}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-base font-medium">Product Price</label>
            <input
              type="number"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-base font-medium">Offer Price</label>
            <input
              type="number"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
