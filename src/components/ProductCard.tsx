import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiHeart, HiOutlineShoppingBag, HiOutlineEye } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isInWishlist(product.id);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hoverImgLoaded, setHoverImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]);
    addToast(`${product.title} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(
      wishlisted ? `${product.title} removed from wishlist` : `${product.title} added to wishlist`,
      wishlisted ? "info" : "success"
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 aspect-[3/4]">
          {/* Main Image */}
          <img
            ref={imgRef}
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />

          {/* Hover Image */}
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                hoverImgLoaded ? "" : "opacity-0"
              } ${
                imgLoaded ? "opacity-0 group-hover:opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setHoverImgLoaded(true)}
            />
          )}

          {/* Fallback if no hover image - just scale the main image */}
          {!product.hoverImage && (
            <img
              src={product.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-0"
              aria-hidden
            />
          )}

          {/* Skeleton while loading */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
          )}

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full z-10 ${
                product.badge === "Sale"
                  ? "bg-rose-500 text-white"
                  : product.badge === "New"
                  ? "bg-emerald-500 text-white"
                  : product.badge === "Limited"
                  ? "bg-amber-500 text-white"
                  : "bg-neutral-900 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* Discount Badge (only if no other badge) */}
          {discount > 0 && !product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-rose-500 text-white z-10">
              -{discount}%
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 z-10"
          >
            {wishlisted ? (
              <HiHeart className="text-rose-500" size={18} />
            ) : (
              <HiOutlineHeart className="text-neutral-700 dark:text-neutral-300" size={18} />
            )}
          </button>

          {/* Hover Action Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                <HiOutlineShoppingBag size={16} />
                Add to Cart
              </button>
              {onQuickView && (
                <button
                  onClick={handleQuickView}
                  className="w-11 h-11 bg-white dark:bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <HiOutlineEye size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3 px-1">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="mt-1 text-sm font-medium text-neutral-900 dark:text-white truncate">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={10}
                className={i < Math.round(product.rating) ? "text-amber-400" : "text-neutral-300 dark:text-neutral-600"}
              />
            ))}
            <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
              ({product.reviews})
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {/* Color dots */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  className="w-3 h-3 rounded-full border border-neutral-200 dark:border-neutral-600"
                  style={{ backgroundColor: getColorHex(color) }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-neutral-400">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function getColorHex(color: string): string {
  const map: Record<string, string> = {
    Black: "#1a1a1a", White: "#f5f5f5", Cream: "#f5f0e8", Ivory: "#fffff0",
    Charcoal: "#36454f", Grey: "#808080", Navy: "#000080", "Light Blue": "#add8e6",
    "Sky Blue": "#87ceeb", Blue: "#0000ff", Emerald: "#50c878", Forest: "#228b22",
    "Forest Green": "#228b22", Olive: "#808000", Sage: "#bcb88a", Burgundy: "#800020",
    Wine: "#722f37", Rose: "#ff007f", "Dusty Rose": "#dcae94", Blush: "#de5d83",
    Pink: "#ffc0cb", Red: "#ff0000", Camel: "#c19a6b", Tan: "#d2b48c",
    Cognac: "#834333", Brown: "#8b4513", Chestnut: "#954535", Sand: "#c2b280",
    Khaki: "#c3b091", Beige: "#f5f5dc", Oatmeal: "#b8a990", Champagne: "#f7e7ce",
    Nude: "#e3bc9a", Gold: "#ffd700", Silver: "#c0c0c0",
    "Off-White": "#fafafa", "Washed Grey": "#a9a9a9", "Heather Grey": "#9e9e9e",
    Indigo: "#4b0082", "Light Wash": "#b4c7e7", Chambray: "#6495ed",
    "Dark Green": "#006400", "Antique Silver": "#c0c0c0", "Aged Brass": "#b5a642",
    Gunmetal: "#505050", "Rose Gold": "#b76e79", "Two-Tone": "#c0c0c0",
    "Black/Grey/Navy": "#1a1a1a", "White/Grey/Black": "#f5f5f5",
    "Black Ribbon": "#1a1a1a", "Navy Ribbon": "#000080",
    "Gold/Brown": "#ffd700", "Silver/Black": "#c0c0c0", "Silver/White": "#c0c0c0",
    "Black/Black": "#1a1a1a", "Gold/Green": "#ffd700",
    "Black/Grey": "#1a1a1a", "Classic": "#1a1a1a", Floral: "#ff69b4",
    Geometric: "#4682b4", "Tropical Print": "#ff6347",
  };
  return map[color] || "#808080";
}
