import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineMenu, HiOutlineX, HiOutlineMoon, HiOutlineSun, HiOutlineUser, HiOutlineCog, HiOutlineLogout, HiOutlineChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/brands", label: "Brands" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const collectionLinks = [
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/luxury-collection", label: "Luxury" },
  { to: "/streetwear", label: "Streetwear" },
  { to: "/summer-collection", label: "Summer" },
  { to: "/winter-collection", label: "Winter" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    setScrolled(window.scrollY > 20);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
  }, [location]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showSolidBg = !isHome || scrolled;
  const collectionsActive = collectionLinks.some((link) => location.pathname === link.to);

  const handleSignOut = () => {
    signOut();
    setProfileOpen(false);
    addToast("You have been signed out.", "info");
    navigate("/", { replace: true });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolidBg
            ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <span className={`text-2xl lg:text-3xl font-bold tracking-tight transition-colors ${showSolidBg ? "text-neutral-900 dark:text-white" : "text-white"}`}>
                Trendify
              </span>
            </Link>

            <nav className="hidden xl:flex flex-1 items-center justify-center gap-1 px-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                    location.pathname === link.to
                      ? showSolidBg ? "text-neutral-900 dark:text-white" : "text-white"
                      : showSolidBg ? "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="group relative">
                <button
                  type="button"
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                    collectionsActive
                      ? showSolidBg ? "text-neutral-900 dark:text-white" : "text-white"
                      : showSolidBg ? "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  Collections
                  <HiOutlineChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-neutral-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:border-neutral-800 dark:bg-neutral-900">
                  {collectionLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                        location.pathname === link.to
                          ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${showSolidBg ? "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300" : "hover:bg-white/10 text-white/80"}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
              </button>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full transition-colors ${showSolidBg ? "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300" : "hover:bg-white/10 text-white/80"}`}
                aria-label="Search"
              >
                <HiOutlineSearch size={20} />
              </button>

              <Link
                to="/wishlist"
                className={`relative p-2 rounded-full transition-colors ${showSolidBg ? "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300" : "hover:bg-white/10 text-white/80"}`}
              >
                <HiOutlineHeart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className={`relative p-2 rounded-full transition-colors ${showSolidBg ? "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300" : "hover:bg-white/10 text-white/80"}`}
              >
                <HiOutlineShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className={`absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${showSolidBg ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : "bg-white text-neutral-900"}`}>
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-2 p-1.5 rounded-full transition-colors ${showSolidBg ? "hover:bg-neutral-100 dark:hover:bg-neutral-800" : "hover:bg-white/10"}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${showSolidBg ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : "bg-white/20 text-white backdrop-blur-sm"}`}>
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
                          <p className="font-semibold text-sm text-neutral-900 dark:text-white">{user?.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user?.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <HiOutlineUser size={16} />
                            Dashboard
                          </Link>
                          <Link
                            to="/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <HiOutlineCog size={16} />
                            Settings
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                          >
                            <HiOutlineLogout size={16} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${showSolidBg ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100" : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"}`}
                  >
                    Sign In
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`xl:hidden p-2 rounded-full transition-colors ${showSolidBg ? "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300" : "hover:bg-white/10 text-white/80"}`}
                aria-label="Menu"
              >
                {mobileOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-neutral-100 dark:border-neutral-800"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative">
                  <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] overflow-y-auto bg-white dark:bg-neutral-900 z-50 xl:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold text-neutral-900 dark:text-white">Menu</span>
                  <button onClick={() => setMobileOpen(false)} className="p-2 text-neutral-500">
                    <HiOutlineX size={22} />
                  </button>
                </div>

                {/* User info in mobile menu */}
                {isAuthenticated && (
                  <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 font-bold">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-neutral-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user?.email}</p>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`text-base font-medium py-2.5 px-3 rounded-xl ${
                        location.pathname === link.to
                          ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                          : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
                      Collections
                    </p>
                    {collectionLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block text-base font-medium py-2.5 px-3 rounded-xl ${
                          location.pathname === link.to
                            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                            : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-base font-medium py-2.5 px-3 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="text-base font-medium py-2.5 px-3 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-left"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="mt-4 w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-center text-sm font-medium rounded-full"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="w-full py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-center text-sm font-medium rounded-full"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
