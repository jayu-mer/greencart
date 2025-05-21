import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLayout = () => {
    const { axios } = useAppContext();
    const navigate = useNavigate();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    // Logout function
    const logout = async () => {
    try {
        const { data } = await axios.get('/api/seller/logout');
        if (data.success) {
            toast.success(data.message);
            navigate('/');
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to='/'>
                    <img src={assets.logo} alt="logo" className="cursor-pointer w-28 md:w-36" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button
                        onClick={logout}
                        className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="md:w-64 w-16 border-r border-gray-300 bg-white pt-4 overflow-y-auto">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === "/seller"}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3
                                ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white text-gray-600"}`
                            }
                        >
                            <img src={item.icon} alt={item.name} className="w-6 h-6" />
                            <span className="md:inline hidden">{item.name}</span>
                        </NavLink>
                    ))}
                </aside>

                {/* Main Section */}
                <main className="flex-grow overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SellerLayout;
