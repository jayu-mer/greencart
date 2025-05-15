import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const categoryList = [
    { name: 'Vegetables', path: 'vegetables' },
    { name: 'Fruits', path: 'fruits' },
    { name: 'Drink', path: 'drink' },
    { name: 'Instant', path: 'instant' },
    { name: 'Dairy', path: 'dairy' },
    { name: 'Bakery', path: 'bakery' },
    { name: 'Grains', path: 'grains' },
  ];
  

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // handle product submission
  };

  return (
    <div className="flex-1 overflow-y-auto h-screen p-4 md:p-10 bg-white">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-xl w-full space-y-6"
      >
        {/* Image Upload */}
        <div>
          <p className="text-base font-medium mb-2">Product Image</p>
          <div className="flex flex-wrap items-center gap-3">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                {files[index] ? (
                  <img
                    src={URL.createObjectURL(files[index])}
                    alt="upload"
                    className="object-cover w-24 h-24 rounded border"
                  />
                ) : (
                  <div className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed rounded cursor-pointer text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-3-3m3 3l3-3m-3-5a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-300 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <select
            id="category"
            className="outline-none py-2 px-3 rounded border border-gray-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categoryList.map((item, index) => (
              <option key={index} value={item.path}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* Price & Offer Price */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
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
