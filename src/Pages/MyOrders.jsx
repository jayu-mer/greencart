import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [myOrder, setMyOrder] = useState([]);
  const { currency } = useAppContext();

  useEffect(() => {
    setMyOrder(dummyOrders);
  }, []);

  // Parse price safely and check for missing values
  const parsePrice = (price) => {
    if (!price) {
      console.warn("Missing price:", price);
      return 0; // Return 0 if price is missing
    }

    const cleaned = String(price).replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);

    if (isNaN(parsed)) {
      console.warn("Failed to parse price:", price);
      return 0; // Return 0 if parsing fails
    }

    return parsed;
  };

  // Format number nicely (with commas)
  const formatAmount = (amount) => {
    return new Intl.NumberFormat().format(amount);
  };

  // Calculate order total
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
      const offerPrice = parsePrice(item?.product?.offerprice); // Ensure valid price
      const quantity = Number(item?.quantity) || 1;
      return total + offerPrice * quantity;
    }, 0);
  };

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myOrder.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        myOrder.map((order, index) => {
          const totalOrderAmount = calculateTotalAmount(order.items);
          return (
            <div
              key={order._id || index}
              className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
            >
              <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
                <span>Order ID: {order._id}</span>
                <span>Payment: {order.paymentType}</span>
                <span>
                  Total Amount: {currency}
                 {order.amount}
                </span>
              </p>

              <div className="flex flex-col divide-y divide-gray-300 mt-4">
                {order.items.map((item, idx) => {
                  if (!item?.product) {
                    console.warn("Skipping item with missing product:", item);
                    return null;
                  }

                  const offerPrice = parsePrice(item.product.offerprice);
                  const quantity = Number(item.quantity) || 1;
                  const amount = offerPrice * quantity;

                  return (
                    <div
                      key={item.product._id || idx}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 py-5 gap-4"
                    >
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <img
                            src={item.product.image?.[0] || "/placeholder.jpg"}
                            alt={item.product.name || "Product Image"}
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h2 className="text-xl font-medium text-gray-800">
                            {item.product.name || "Unnamed Product"}
                          </h2>
                          <p>Category: {item.product.category || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                        <p>Quantity: {quantity}</p>
                        <p>Status: {order.status || "Pending"}</p>
                        <p>
                          Date:{" "}
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>

                      <p className="text-primary text-lg font-medium">
                        Amount: {currency}{item.product.offerPrice * item.quantity}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;
