import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX, HiOutlineHeart, HiHeart, HiOutlineShoppingBag, HiMinus, HiPlus } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

interface QuickPreviewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickPreview({ product, onClose }: QuickPreviewProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  // Initialize defaults when product changes
  if (selectedSize !== product.sizes[0] && product.sizes[0]) {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    addToast(`${product.title} added to cart`);
    onClose();
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast(
      wishlisted ? `${product.title} removed from wishlist` : `${product.title} added to wishlist`,
      wishlisted ? "info" : "success"
    );
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-3xl max-h-[85vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <HiOutlineX size={18} className="text-neutral-700 dark:text-neutral-300" />
            </button>

            <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
              {/* Image */}
              <div className="md:w-1/2 aspect-[3/4] md:aspect-auto flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  {product.category}
                </p>
                <h2 className="mt-1 text-xl font-bold text-neutral-900 dark:text-white">
                  {product.title}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} size={12} className={i < Math.round(product.rating) ? "text-amber-400" : "text-neutral-300 dark:text-neutral-600"} />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xl font-bold text-neutral-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-base text-neutral-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-full">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Colors */}
                <div className="mt-4">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white mb-2">
                    Color: <span className="font-normal text-neutral-500">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                          selectedColor === color
                            ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                            : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mt-4">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white mb-2">
                    Size: <span className="font-normal text-neutral-500">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-lg text-xs font-medium border transition-colors ${
                          selectedSize === size
                            ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                            : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-4">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white mb-2">Quantity</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center"
                    >
                      <HiMinus size={12} className="text-neutral-600 dark:text-neutral-400" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-neutral-900 dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center"
                    >
                      <HiPlus size={12} className="text-neutral-600 dark:text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                  >
                    <HiOutlineShoppingBag size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                      wishlisted
                        ? "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-900/30"
                        : "border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    {wishlisted ? (
                      <HiHeart className="text-rose-500" size={20} />
                    ) : (
                      <HiOutlineHeart className="text-neutral-600 dark:text-neutral-400" size={20} />
                    )}
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="mt-4 text-center text-sm font-medium text-neutral-900 dark:text-white hover:underline"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
