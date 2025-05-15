import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets, dummyAddress } from '../../assets/assets';

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    // Ensure it's an array, fallback to []
    setOrders(Array.isArray(dummyAddress) ? dummyAddress : []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto md:p-10 p-4 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Order List</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 p-5 border border-gray-300 rounded-lg bg-white"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 w-full md:w-[30%]">
                <img
                  src={assets.box_icon}
                  alt="Box Icon"
                  className="w-12 h-12 object-cover"
                />
                <div className="space-y-1">
                  {Array.isArray(order?.items) &&
                    order.items.map((item, idx) => (
                      <p key={idx} className="text-sm font-medium text-gray-800">
                        {item?.product?.name || 'Unknown Product'}{' '}
                        <span className="text-indigo-600 font-semibold">x {item?.quantity || 0}</span>
                      </p>
                    ))}
                </div>
              </div>

              {/* Address Info */}
              <div className="text-sm text-gray-700 space-y-1 w-full md:w-[30%]">
                <p className="font-medium text-black">
                  {order?.address?.firstName || ''} {order?.address?.lastName || ''}
                </p>
                <p>{order?.address?.street || ''}, {order?.address?.city || ''}</p>
                <p>{order?.address?.state || ''}, {order?.address?.zipcode || ''}, {order?.address?.country || ''}</p>
                <p>{order?.address?.phone || ''}</p>
              </div>

              {/* Price & Status Info */}
              <div className="space-y-1 text-sm text-gray-600 w-full md:w-[30%] md:text-right">
                <p className="text-lg font-semibold text-black">
                  {currency}{order?.amount || '0.00'}
                </p>
                <p>Method: {order?.paymentType || 'N/A'}</p>
                <p>Date: {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown'}</p>
                <p>
                  Payment:{' '}
                  <span className={order?.isPaid ? 'text-green-600' : 'text-red-500'}>
                    {order?.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
