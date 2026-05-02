import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHome, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineClock,
  HiOutlineCog, HiOutlineLocationMarker, HiOutlineBell, HiOutlineLogout,
  HiOutlineX, HiOutlineCheck, HiOutlineTruck, HiOutlineRefresh,
  HiOutlineChevronRight, HiOutlinePencil, HiOutlineTrash, HiOutlinePlus,
  HiOutlineStar, HiOutlineEye, HiOutlineGift, HiOutlineTag,
  HiOutlineCreditCard, HiOutlineSparkles, HiOutlineShieldCheck,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import { useAuth } from "../context/AuthContext";
import type { MockUser } from "../data/mockData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { useToast } from "../context/ToastContext";
import {
  getOrders, getNotifications, getAddresses, markNotificationRead,
  addAddress, deleteAddress, unreadNotificationCount,
  getPayments, getLoyalty, getPreferences, getActivity, getCoupons,
  type MockOrder, type MockNotification, type MockAddress,
  type MockPaymentMethod, type MockLoyalty, type MockPreferences,
  type MockActivity, type MockCoupon,
} from "../data/mockData";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";

type Tab = "overview" | "orders" | "wishlist" | "recent" | "settings" | "addresses" | "notifications" | "loyalty" | "payments" | "preferences" | "activity";

const tabs: { id: Tab; label: string; icon: IconType }[] = [
  { id: "overview", label: "Overview", icon: HiOutlineHome },
  { id: "orders", label: "Orders", icon: HiOutlineShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: HiOutlineHeart },
  { id: "recent", label: "Recently Viewed", icon: HiOutlineClock },
  { id: "loyalty", label: "Rewards", icon: HiOutlineGift },
  { id: "addresses", label: "Addresses", icon: HiOutlineLocationMarker },
  { id: "payments", label: "Payments", icon: HiOutlineCreditCard },
  { id: "preferences", label: "Style", icon: HiOutlineSparkles },
  { id: "activity", label: "Activity", icon: HiOutlineEye },
  { id: "notifications", label: "Alerts", icon: HiOutlineBell },
  { id: "settings", label: "Settings", icon: HiOutlineCog },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Processing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

const notificationTypeIcons: Record<string, IconType> = {
  order: HiOutlineTruck,
  promo: HiOutlineTag,
  system: HiOutlineBell,
  wishlist: HiOutlineHeart,
  sale: HiOutlineGift,
};

const tierColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  Silver: { bg: "bg-neutral-100 dark:bg-neutral-800", text: "text-neutral-600 dark:text-neutral-300", border: "border-neutral-300 dark:border-neutral-600", icon: "text-neutral-500" },
  Gold: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-300", border: "border-amber-300 dark:border-amber-700", icon: "text-amber-500" },
  Elite: { bg: "bg-sky-50 dark:bg-sky-900/20", text: "text-sky-700 dark:text-sky-300", border: "border-sky-300 dark:border-sky-700", icon: "text-sky-500" },
};

const cardLogos: Record<string, string> = {
  visa: "VISA",
  mastercard: "MC",
  amex: "AMEX",
  applepay: "Pay",
};

const cardColors: Record<string, string> = {
  visa: "from-blue-800 to-blue-600",
  mastercard: "from-orange-700 to-red-600",
  amex: "from-slate-800 to-slate-600",
  applepay: "from-neutral-800 to-neutral-600",
};

export default function Dashboard() {
  const { user, signOut, updateProfile } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { items: recentlyViewed } = useRecentlyViewed();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const orders = user ? getOrders(user.id) : [];
  const notifications = user ? getNotifications(user.id) : [];
  const addresses = user ? getAddresses(user.id) : [];
  const payments = user ? getPayments(user.id) : [];
  const loyalty = user ? getLoyalty(user.id) : { tier: "Silver" as const, points: 0, totalSpent: 0, nextTierPoints: 1000, perks: [] };
  const preferences = user ? getPreferences(user.id) : { favoriteBrands: [], preferredStyles: [], favoriteCategories: [], sizes: { tops: "M", bottoms: "M", shoes: "8" }, colorPreferences: [] };
  const activity = user ? getActivity(user.id) : [];
  const coupons = user ? getCoupons(user.id) : [];
  const unreadCount = user ? unreadNotificationCount(user.id) : 0;

  // Recommended: pick products not in wishlist, sorted by rating
  const recommended = products
    .filter((p) => !wishlistItems.some((w) => w.id === p.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const handleLogout = () => {
    signOut();
    addToast("You have been signed out.", "info");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Dashboard" }]} />

        <div className="flex gap-6 py-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-1.5">
              {/* Profile Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold text-lg">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user?.email}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${tierColors[loyalty.tier].bg} ${tierColors[loyalty.tier].text} ${tierColors[loyalty.tier].border} border`}>
                      {loyalty.tier} Member
                    </span>
                  </div>
                </div>
              </div>

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <tab.icon size={17} />
                  {tab.label}
                  {tab.id === "notifications" && unreadCount > 0 && (
                    <span className="ml-auto w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}

              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors mt-2"
              >
                <HiOutlineLogout size={17} />
                Sign Out
              </button>
            </div>
          </aside>

          {/* Mobile Bottom Menu */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-5 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full shadow-lg text-sm font-medium flex items-center gap-2"
            >
              <HiOutlineCog size={16} />
              Menu
            </button>
          </div>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                <motion.div
                  initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 z-50 lg:hidden rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold">{user?.name?.[0]?.toUpperCase() || "U"}</div>
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-white text-sm">{user?.name}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{loyalty.tier} Member</p>
                      </div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="p-2 text-neutral-500"><HiOutlineX size={20} /></button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                        className={`flex flex-col items-center gap-1 p-2.5 rounded-xl text-[10px] font-medium ${
                          activeTab === tab.id ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : "bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        <tab.icon size={16} />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => { setSidebarOpen(false); setShowLogoutModal(true); }} className="mt-4 w-full py-3 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm font-medium">Sign Out</button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {activeTab === "overview" && <OverviewTab user={user} orders={orders} cartItemCount={cartItems.length} wishlistCount={wishlistItems.length} unreadCount={unreadCount} loyalty={loyalty} coupons={coupons} recommended={recommended} onNavigate={setActiveTab} />}
                {activeTab === "orders" && <OrdersTab orders={orders} expandedOrder={expandedOrder} setExpandedOrder={setExpandedOrder} />}
                {activeTab === "wishlist" && <WishlistTab items={wishlistItems} />}
                {activeTab === "recent" && <RecentTab items={recentlyViewed} />}
                {activeTab === "loyalty" && <LoyaltyTab loyalty={loyalty} />}
                {activeTab === "addresses" && <AddressesTab addresses={addresses} userId={user?.id || ""} />}
                {activeTab === "payments" && <PaymentsTab payments={payments} />}
                {activeTab === "preferences" && <PreferencesTab preferences={preferences} />}
                {activeTab === "activity" && <ActivityTab activity={activity} />}
                {activeTab === "notifications" && <NotificationsTab notifications={notifications} userId={user?.id || ""} />}
                {activeTab === "settings" && <SettingsTab user={user} onUpdate={updateProfile} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowLogoutModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Sign Out?</h3>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Are you sure you want to sign out of your account?</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-2.5 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">Cancel</button>
                <button onClick={handleLogout} className="flex-1 py-2.5 bg-rose-600 text-white text-sm font-medium rounded-xl hover:bg-rose-700 transition-colors">Sign Out</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── OVERVIEW ─── */
function OverviewTab({ user, orders, cartItemCount, wishlistCount, unreadCount, loyalty, coupons, recommended, onNavigate }: {
  user: MockUser | null; orders: MockOrder[]; cartItemCount: number; wishlistCount: number; unreadCount: number; loyalty: MockLoyalty; coupons: MockCoupon[]; recommended: typeof products; onNavigate: (tab: Tab) => void;
}) {
  const firstName = user?.name?.split(" ")[0] || "there";
  const tierStyle = tierColors[loyalty.tier];

  return (
    <div className="space-y-6">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 dark:bg-neutral-800 p-8 sm:p-10">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-transparent" />
        <div className="relative z-10">
          <p className="text-sm font-medium tracking-[0.15em] uppercase text-amber-400 mb-2">Welcome Back</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Hello, {firstName}!</h1>
          <p className="mt-2 text-neutral-300 max-w-md">Your style journey continues. Explore your account, track orders, and discover new arrivals curated just for you.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/shop" className="px-6 py-2.5 bg-white text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-100 transition-colors">Continue Shopping</Link>
            <button onClick={() => onNavigate("orders")} className="px-6 py-2.5 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors">Track Orders</button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Orders", value: orders.length, icon: HiOutlineShoppingBag, onClick: () => onNavigate("orders") },
          { label: "Wishlist", value: wishlistCount, icon: HiOutlineHeart, onClick: () => onNavigate("wishlist") },
          { label: "Points", value: loyalty.points, icon: HiOutlineGift, onClick: () => onNavigate("loyalty") },
          { label: "Coupons", value: coupons.length, icon: HiOutlineTag, onClick: () => onNavigate("overview") },
          { label: "Cart", value: cartItemCount, icon: HiOutlineShoppingBag, onClick: () => onNavigate("overview") },
          { label: "Alerts", value: unreadCount, icon: HiOutlineBell, onClick: () => onNavigate("notifications") },
        ].map((stat) => (
          <button key={stat.label} onClick={stat.onClick} className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-left hover:shadow-sm transition-shadow group">
            <stat.icon size={18} className="text-neutral-400 dark:text-neutral-500 mb-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors" />
            <p className="text-xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Loyalty Card + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loyalty Mini Card */}
        <div className={`p-6 rounded-2xl border ${tierStyle.bg} ${tierStyle.border}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HiOutlineStar className={tierStyle.icon} size={20} />
              <span className={`font-bold text-sm ${tierStyle.text}`}>{loyalty.tier} Member</span>
            </div>
            <button onClick={() => onNavigate("loyalty")} className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1">
              Details <HiOutlineChevronRight size={12} />
            </button>
          </div>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">{loyalty.points.toLocaleString()} <span className="text-sm font-normal text-neutral-500">points</span></p>
          <div className="mt-3 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
            <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${Math.min((loyalty.points / loyalty.nextTierPoints) * 100, 100)}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">{loyalty.nextTierPoints - loyalty.points} points to {loyalty.tier === "Silver" ? "Gold" : loyalty.tier === "Gold" ? "Elite" : "Max"}</p>
        </div>

        {/* Recent Orders */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-neutral-900 dark:text-white">Recent Orders</h2>
            <button onClick={() => onNavigate("orders")} className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1">View All <HiOutlineChevronRight size={12} /></button>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-neutral-500 py-4">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2.5 border-b border-neutral-50 dark:border-neutral-800 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">{order.id}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">${order.total.toFixed(2)}</p>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-semibold rounded-full ${statusColors[order.status] || ""}`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Coupons */}
      {coupons.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <h2 className="font-bold text-neutral-900 dark:text-white mb-4">Active Coupons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <HiOutlineTag className="text-amber-600 dark:text-amber-400" size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{coupon.code}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{coupon.discount} off | Exp: {coupon.expires}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended For You */}
      {recommended.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-1">Curated For You</p>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Recommended</h2>
            </div>
            <Link to="/shop" className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1">Shop All <HiOutlineChevronRight size={12} /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recommended.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Shop New Arrivals", to: "/shop", icon: HiOutlineShoppingBag },
          { label: "View Wishlist", action: () => onNavigate("wishlist"), icon: HiOutlineHeart },
          { label: "Track Orders", action: () => onNavigate("orders"), icon: HiOutlineTruck },
          { label: "Edit Profile", action: () => onNavigate("settings"), icon: HiOutlinePencil },
        ].map((item) => (
          <Link key={item.label} to={item.to || "#"} onClick={item.action} className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:shadow-sm transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <item.icon className="text-neutral-700 dark:text-neutral-300" size={18} />
            </div>
            <span className="text-xs font-medium text-neutral-900 dark:text-white">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── ORDERS ─── */
function OrdersTab({ orders, expandedOrder, setExpandedOrder }: { orders: MockOrder[]; expandedOrder: string | null; setExpandedOrder: (id: string | null) => void }) {
  if (orders.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center">
        <HiOutlineShoppingBag className="mx-auto text-neutral-300 dark:text-neutral-600" size={48} />
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">No orders yet</p>
        <Link to="/shop" className="mt-4 inline-block text-sm font-medium text-neutral-900 dark:text-white underline">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
          <div className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">{order.id}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{order.date} | {order.items.length} item(s)</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[order.status] || ""}`}>{order.status}</span>
                <p className="font-bold text-neutral-900 dark:text-white">${order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="space-y-2.5 mt-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-12 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            {order.trackingSteps && (
              <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} className="mt-4 text-xs font-medium text-neutral-900 dark:text-white hover:underline flex items-center gap-1">
                <HiOutlineTruck size={14} />
                {expandedOrder === order.id ? "Hide Tracking" : "Track Order"}
              </button>
            )}
          </div>

          {/* Tracking Timeline */}
          <AnimatePresence>
            {expandedOrder === order.id && order.trackingSteps && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="px-5 pb-5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  {order.estimatedDelivery && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Estimated delivery: <span className="font-medium text-neutral-900 dark:text-white">{order.estimatedDelivery}</span></p>
                  )}
                  <div className="space-y-0">
                    {order.trackingSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.completed ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-neutral-100 dark:bg-neutral-800"
                          }`}>
                            {step.completed ? <HiOutlineCheck className="text-emerald-600 dark:text-emerald-400" size={12} /> : <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />}
                          </div>
                          {i < order.trackingSteps!.length - 1 && (
                            <div className={`w-0.5 h-6 ${step.completed ? "bg-emerald-300 dark:bg-emerald-700" : "bg-neutral-200 dark:bg-neutral-700"}`} />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className={`text-sm font-medium ${step.completed ? "text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-500"}`}>{step.label}</p>
                          {step.date && <p className="text-xs text-neutral-500 dark:text-neutral-400">{step.date}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ─── WISHLIST ─── */
function WishlistTab({ items }: { items: { id: number; title: string; category: string; price: number; originalPrice?: number; rating: number; reviews: number; image: string; images: string[]; description: string; sizes: string[]; colors: string[]; badge?: string; inStock: boolean }[] }) {
  if (items.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center">
        <HiOutlineHeart className="mx-auto text-neutral-300 dark:text-neutral-600" size={48} />
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">Your wishlist is empty</p>
        <Link to="/shop" className="mt-4 inline-block text-sm font-medium text-neutral-900 dark:text-white underline">Explore Products</Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">My Wishlist ({items.length})</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
      </div>
    </div>
  );
}

/* ─── RECENTLY VIEWED ─── */
function RecentTab({ items }: { items: { id: number; title: string; category: string; price: number; originalPrice?: number; rating: number; reviews: number; image: string; images: string[]; description: string; sizes: string[]; colors: string[]; badge?: string; inStock: boolean }[] }) {
  if (items.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center">
        <HiOutlineClock className="mx-auto text-neutral-300 dark:text-neutral-600" size={48} />
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">No recently viewed products</p>
        <Link to="/shop" className="mt-4 inline-block text-sm font-medium text-neutral-900 dark:text-white underline">Browse Products</Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
      </div>
    </div>
  );
}

/* ─── LOYALTY ─── */
function LoyaltyTab({ loyalty }: { loyalty: MockLoyalty }) {
  const tierStyle = tierColors[loyalty.tier];
  const progress = Math.min((loyalty.points / loyalty.nextTierPoints) * 100, 100);
  const nextTier = loyalty.tier === "Silver" ? "Gold" : loyalty.tier === "Gold" ? "Elite" : null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Rewards & Membership</h2>

      {/* Tier Card */}
      <div className={`p-8 rounded-2xl border-2 ${tierStyle.bg} ${tierStyle.border}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tierStyle.bg} ${tierStyle.border} border`}>
            <HiOutlineStar className={tierStyle.icon} size={28} />
          </div>
          <div>
            <p className={`text-2xl font-bold ${tierStyle.text}`}>{loyalty.tier} Member</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Member since 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">{loyalty.points.toLocaleString()}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Reward Points</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white">${loyalty.totalSpent.toLocaleString()}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Total Spent</p>
          </div>
        </div>

        {nextTier && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Progress to {nextTier}</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">{Math.round(progress)}%</p>
            </div>
            <div className="h-3 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-amber-500" />
            </div>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{loyalty.nextTierPoints - loyalty.points} points until {nextTier}</p>
          </div>
        )}
      </div>

      {/* Perks */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Your {loyalty.tier} Perks</h3>
        <div className="space-y-3">
          {loyalty.perks.map((perk) => (
            <div key={perk} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <HiOutlineCheck className="text-emerald-600 dark:text-emerald-400" size={12} />
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{perk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Membership Tiers</h3>
        <div className="space-y-4">
          {(["Silver", "Gold", "Elite"] as const).map((tier) => {
            const style = tierColors[tier];
            const points = tier === "Silver" ? 0 : tier === "Gold" ? 1000 : 5000;
            return (
              <div key={tier} className={`flex items-center gap-4 p-4 rounded-xl border ${style.bg} ${style.border} ${loyalty.tier === tier ? "ring-2 ring-offset-2 ring-neutral-900 dark:ring-white dark:ring-offset-neutral-900" : ""}`}>
                <HiOutlineStar className={style.icon} size={24} />
                <div>
                  <p className={`font-bold ${style.text}`}>{tier}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{points.toLocaleString()}+ points</p>
                </div>
                {loyalty.tier === tier && <span className="ml-auto text-xs font-semibold text-emerald-600 dark:text-emerald-400">Current</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── ADDRESSES ─── */
function AddressesTab({ addresses, userId }: { addresses: MockAddress[]; userId: string }) {
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "", name: "", street: "", city: "", state: "", zip: "", country: "", phone: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.label || !form.name || !form.street || !form.city) { addToast("Please fill in all required fields.", "error"); return; }
    addAddress(userId, { ...form, id: `addr_${Date.now()}`, isDefault: addresses.length === 0 });
    addToast("Address added successfully.");
    setForm({ label: "", name: "", street: "", city: "", state: "", zip: "", country: "", phone: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Saved Addresses</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-xl"><HiOutlinePlus size={16} /> Add</button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="Label (e.g. Home)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
            <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
            <input placeholder="Street Address" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="sm:col-span-2 px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
            <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
            <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
            <input placeholder="ZIP" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
            <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-xl">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-xl">Cancel</button>
          </div>
        </form>
      )}
      {addresses.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center">
          <HiOutlineLocationMarker className="mx-auto text-neutral-300 dark:text-neutral-600" size={48} />
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">No saved addresses</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">{addr.label}</span>
                {addr.isDefault && <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">Default</span>}
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{addr.name}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{addr.street}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{addr.city}, {addr.state} {addr.zip}</p>
              {addr.phone && <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{addr.phone}</p>}
              <button onClick={() => { deleteAddress(userId, addr.id); addToast("Address removed.", "info"); }} className="mt-3 flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600"><HiOutlineTrash size={12} /> Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── PAYMENTS ─── */
function PaymentsTab({ payments }: { payments: MockPaymentMethod[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Payment Methods</h2>
      {payments.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center">
          <HiOutlineCreditCard className="mx-auto text-neutral-300 dark:text-neutral-600" size={48} />
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">No saved payment methods</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {payments.map((pm) => (
            <div key={pm.id} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cardColors[pm.type]} p-6 text-white aspect-[1.6/1] flex flex-col justify-between`}>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold tracking-wider">{cardLogos[pm.type]}</span>
                {pm.isDefault && <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/20 backdrop-blur-sm">Default</span>}
              </div>
              <div>
                {pm.last4 && <p className="text-lg tracking-[0.3em] font-mono mt-4">**** **** **** {pm.last4}</p>}
                {!pm.last4 && <p className="text-lg mt-4">{pm.type === "applepay" ? "Apple Pay" : pm.type}</p>}
                {pm.expiry && <p className="text-xs text-white/60 mt-1">Exp: {pm.expiry}</p>}
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full border-2 border-white/10" />
              <div className="absolute -right-3 -bottom-3 w-16 h-16 rounded-full border-2 border-white/10" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── PREFERENCES ─── */
function PreferencesTab({ preferences }: { preferences: MockPreferences }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Style Preferences</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Favorite Brands */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <h3 className="font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2"><HiOutlineSparkles size={16} /> Favorite Brands</h3>
          <div className="flex flex-wrap gap-2">
            {preferences.favoriteBrands.length > 0 ? preferences.favoriteBrands.map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300">{b}</span>
            )) : <p className="text-sm text-neutral-400">No brands set</p>}
          </div>
        </div>

        {/* Preferred Styles */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <h3 className="font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2"><HiOutlineShieldCheck size={16} /> Preferred Styles</h3>
          <div className="flex flex-wrap gap-2">
            {preferences.preferredStyles.length > 0 ? preferences.preferredStyles.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-xs font-medium text-amber-700 dark:text-amber-300">{s}</span>
            )) : <p className="text-sm text-neutral-400">No styles set</p>}
          </div>
        </div>

        {/* Favorite Categories */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <h3 className="font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2"><HiOutlineShoppingBag size={16} /> Favorite Categories</h3>
          <div className="flex flex-wrap gap-2">
            {preferences.favoriteCategories.length > 0 ? preferences.favoriteCategories.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-xs font-medium text-emerald-700 dark:text-emerald-300">{c}</span>
            )) : <p className="text-sm text-neutral-400">No categories set</p>}
          </div>
        </div>

        {/* Color Preferences */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <h3 className="font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2"><HiOutlineStar size={16} /> Color Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {preferences.colorPreferences.length > 0 ? preferences.colorPreferences.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300">{c}</span>
            )) : <p className="text-sm text-neutral-400">No colors set</p>}
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-4">My Sizes</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(preferences.sizes).map(([key, value]) => (
            <div key={key} className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{key}</p>
              <p className="text-lg font-bold text-neutral-900 dark:text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ACTIVITY ─── */
function ActivityTab({ activity }: { activity: MockActivity[] }) {
  const activityIcons: Record<string, IconType> = {
    "shopping-bag": HiOutlineShoppingBag,
    heart: HiOutlineHeart,
    eye: HiOutlineEye,
    star: HiOutlineStar,
    refresh: HiOutlineRefresh,
    user: HiOutlineHome,
  };

  const activityColors: Record<string, string> = {
    order: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    wishlist: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
    view: "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
    review: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    return: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    system: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  };

  if (activity.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center">
        <HiOutlineEye className="mx-auto text-neutral-300 dark:text-neutral-600" size={48} />
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">No activity yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Activity Timeline</h2>
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        <div className="space-y-0">
          {activity.map((item, i) => {
            const Icon = activityIcons[item.icon] || HiOutlineEye;
            const colorClass = activityColors[item.type] || activityColors.view;
            return (
              <div key={item.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon size={16} />
                  </div>
                  {i < activity.length - 1 && <div className="w-0.5 h-8 bg-neutral-100 dark:bg-neutral-800" />}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">{item.message}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── NOTIFICATIONS ─── */
function NotificationsTab({ notifications, userId }: { notifications: MockNotification[]; userId: string }) {
  const { addToast } = useToast();
  const [items, setItems] = useState(notifications);

  const handleMarkRead = (id: string) => {
    markNotificationRead(userId, id);
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    items.filter((n) => !n.read).forEach((n) => markNotificationRead(userId, n.id));
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("All notifications marked as read.");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Notifications</h2>
        {items.some((n) => !n.read) && (
          <button onClick={handleMarkAllRead} className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">Mark all read</button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center">
          <HiOutlineBell className="mx-auto text-neutral-300 dark:text-neutral-600" size={48} />
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">No notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((n) => {
            const Icon = notificationTypeIcons[n.type] || HiOutlineBell;
            return (
              <div key={n.id} className={`p-5 rounded-2xl border transition-colors ${n.read ? "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800" : "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800"}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.read ? "bg-neutral-100 dark:bg-neutral-800" : "bg-amber-100 dark:bg-amber-900/30"}`}>
                    <Icon className={n.read ? "text-neutral-500 dark:text-neutral-400" : "text-amber-600 dark:text-amber-400"} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm text-neutral-900 dark:text-white">{n.title}</p>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">{n.date}</span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-0.5">{n.message}</p>
                    {!n.read && (
                      <button onClick={() => handleMarkRead(n.id)} className="mt-2 flex items-center gap-1 text-xs font-medium text-neutral-900 dark:text-white hover:underline">
                        <HiOutlineCheck size={12} /> Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── SETTINGS ─── */
function SettingsTab({ user, onUpdate }: { user: MockUser | null; onUpdate: (updates: Partial<Pick<MockUser, "name" | "phone">>) => void }) {
  const { addToast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (!name.trim()) { addToast("Name cannot be empty.", "error"); return; }
    onUpdate({ name: name.trim(), phone: phone.trim() });
    addToast("Profile updated successfully.");
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Account Settings</h2>
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold text-2xl">{user?.name?.[0]?.toUpperCase() || "U"}</div>
          <div>
            <p className="font-bold text-neutral-900 dark:text-white text-lg">{user?.name}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{user?.email}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "N/A"}</p>
          </div>
        </div>
        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-xl">Save</button>
              <button onClick={() => { setEditing(false); setName(user?.name || ""); setPhone(user?.phone || ""); }} className="px-6 py-2.5 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-xl">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-neutral-50 dark:border-neutral-800"><span className="text-sm text-neutral-500 dark:text-neutral-400">Full Name</span><span className="text-sm font-medium text-neutral-900 dark:text-white">{user?.name}</span></div>
            <div className="flex items-center justify-between py-2 border-b border-neutral-50 dark:border-neutral-800"><span className="text-sm text-neutral-500 dark:text-neutral-400">Email</span><span className="text-sm font-medium text-neutral-900 dark:text-white">{user?.email}</span></div>
            <div className="flex items-center justify-between py-2 border-b border-neutral-50 dark:border-neutral-800"><span className="text-sm text-neutral-500 dark:text-neutral-400">Phone</span><span className="text-sm font-medium text-neutral-900 dark:text-white">{user?.phone || "Not set"}</span></div>
            <button onClick={() => setEditing(true)} className="mt-2 flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:underline"><HiOutlinePencil size={14} /> Edit Profile</button>
          </div>
        )}
      </div>
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-rose-100 dark:border-rose-900/30">
        <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-2">Danger Zone</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">These actions are irreversible.</p>
        <button onClick={() => { localStorage.removeItem("trendify_cart"); localStorage.removeItem("trendify_wishlist"); localStorage.removeItem("trendify_recently_viewed"); addToast("All local data cleared.", "info"); window.location.reload(); }} className="px-4 py-2 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm font-medium rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">Clear All Local Data</button>
      </div>
    </div>
  );
}
