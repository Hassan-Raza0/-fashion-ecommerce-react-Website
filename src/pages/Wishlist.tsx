import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Breadcrumb from "../components/Breadcrumb";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleMoveToCart = (product: typeof items[0]) => {
    addToCart(product, product.sizes[0], product.colors[0]);
    removeFromWishlist(product.id);
    addToast(`${product.title} moved to cart`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white py-8">
          Wishlist
        </h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <HiOutlineHeart className="mx-auto text-neutral-300 dark:text-neutral-600" size={64} />
            <p className="mt-6 text-lg text-neutral-500 dark:text-neutral-400">Your wishlist is empty</p>
            <Link
              to="/shop"
              className="mt-6 inline-block px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-16">
            <AnimatePresence>
              {items.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 aspect-[3/4]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="mt-3 px-1">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {product.category}
                    </p>
                    <h3 className="mt-1 text-sm font-medium text-neutral-900 dark:text-white truncate">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="flex-1 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium rounded-lg flex items-center justify-center gap-1 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                      >
                        <HiOutlineShoppingBag size={14} />
                        Move to Cart
                      </button>
                      <button
                        onClick={() => {
                          removeFromWishlist(product.id);
                          addToast(`${product.title} removed from wishlist`, "info");
                        }}
                        className="p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-400 hover:text-rose-500 hover:border-rose-200 transition-colors"
                      >
                        <HiOutlineTrash size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
