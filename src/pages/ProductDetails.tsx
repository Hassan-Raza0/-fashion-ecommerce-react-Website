import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiOutlineHeart, HiHeart, HiMinus, HiPlus, HiOutlineShoppingBag } from "react-icons/hi";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      addRecentlyViewed(product);
    }
    window.scrollTo(0, 0);
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 dark:text-neutral-400 text-lg">Product not found</p>
          <Link to="/shop" className="mt-4 inline-block text-sm font-medium text-neutral-900 dark:text-white underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    addToast(`${product.title} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast(
      wishlisted ? `${product.title} removed from wishlist` : `${product.title} added to wishlist`,
      wishlisted ? "info" : "success"
    );
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const reviews = [
    { name: "Alex M.", rating: 5, date: "2 weeks ago", text: "Absolutely love this piece! The quality is exceptional and it fits perfectly." },
    { name: "Jordan K.", rating: 4, date: "1 month ago", text: "Great quality and fast shipping. Slightly different shade than pictured but still beautiful." },
    { name: "Sam R.", rating: 5, date: "2 months ago", text: "This is my third purchase from Trendify and they never disappoint. Premium feel all around." },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.category, to: `/shop?category=${product.category}` },
            { label: product.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-8">
          {/* Image Gallery */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-neutral-900 dark:border-white"
                        : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating) ? "text-amber-400" : "text-neutral-300 dark:text-neutral-600"}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-full">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                Color: <span className="font-normal text-neutral-500">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      selectedColor === color
                        ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                Size: <span className="font-normal text-neutral-500">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl text-sm font-medium border transition-colors ${
                      selectedSize === size
                        ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 transition-colors"
                >
                  <HiMinus size={14} />
                </button>
                <span className="w-10 text-center font-medium text-neutral-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 transition-colors"
                >
                  <HiPlus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                <HiOutlineShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors ${
                  wishlisted
                    ? "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-900/30"
                    : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-400"
                }`}
              >
                {wishlisted ? (
                  <HiHeart className="text-rose-500" size={22} />
                ) : (
                  <HiOutlineHeart className="text-neutral-600 dark:text-neutral-400" size={22} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="py-16 border-t border-neutral-100 dark:border-neutral-800">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">{review.name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <FaStar key={j} size={12} className={j < review.rating ? "text-amber-400" : "text-neutral-300 dark:text-neutral-600"} />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 border-t border-neutral-100 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
