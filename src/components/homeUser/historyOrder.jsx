import { useEffect, useState} from "react";
import { getInvoice } from "../../service/invoice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const historyOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?._id || user?.id;
            try {
                const res = await getInvoice(userId); 
                setOrders(res || []); 
            } catch (error) {
                console.error("Gagal mengambil data invoice:", error);
            }
        };

        fetchData();
    }, []);

    // handle navigate detail product
  const navigate = useNavigate();
  const handleDetailProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

    return (
        <div className="px-4 mt-9 pb-4 sm:px-7 lg:px-30">
            <div className="max-w-screen-xl mx-auto">
                <div className="border-b border-gray-300 pb-4">
                    <div className="flex items-center flex-wrap gap-4">
                        <h3 className="text-2xl font-semibold text-slate-900">Order History</h3>
                        <div className="ml-auto">
                            <select className="appearance-none cursor-pointer bg-white border border-gray-300 outline-0 px-4 py-2 text-slate-900 rounded-md text-[15px]">
                                <option>All orders</option>
                                <option>Completed</option>
                                <option>Processing</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-300 mt-6">
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            order.items.map((item, i) => (
                                <div
                                    key={item._id}
                                    className="grid grid-cols-5 max-md:grid-cols-2 items-start justify-between gap-6 py-4"
                                >
                                    <div className="md:col-span-2 flex items-start gap-4 max-sm:flex-col">
                                        <div className="mt-0 md:-mt-4 p-2 rounded-lg w-20 h-20 shrink-0">
                                            <button onClick={() => handleDetailProduct(item.productId._id)}>
                                                <img
                                                    src={item.productId?.image || "https://via.placeholder.com/80"}
                                                    className="w-full h-full object-contain cursor-pointer"
                                                    alt={item.productName}
                                                />
                                            </button>
                                        </div>
                                        <div>
                                            <h6 className="text-[15px] font-semibold text-slate-900">
                                                {item.productName}
                                            </h6>
                                            <div className="mt-2">
                                                <p className="text-[15px] text-slate-500 font-medium">
                                                    Order ID:{" "}
                                                    <span className="ml-1 text-slate-900">
                                                        #{order._id.slice(-4).toUpperCase()}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="text-[15px] font-medium text-slate-500">Date</h6>
                                        <p className="text-[15px] text-slate-900 font-medium mt-2">
                                            {moment(order.createdAt).format("MMMM D, YYYY")}
                                        </p>
                                    </div>
                                    <div>
                                        <h6 className="text-[15px] font-medium text-slate-500">Status</h6>
                                        <p className="bg-green-100 text-[13px] font-medium text-green-600 mt-2 inline-block rounded-md py-1.5 px-3">
                                            Completed
                                        </p>
                                    </div>
                                    <div className="md:ml-auto">
                                        <h6 className="text-[15px] font-medium text-slate-500">Price</h6>
                                        <p className="text-[15px] text-slate-900 font-medium mt-2">
                                            ${item.totalPrice.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">No orders found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default historyOrder;
