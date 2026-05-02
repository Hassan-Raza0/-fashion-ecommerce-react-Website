import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function LuxuryCollection() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const luxuryProducts = products.filter(product => product.category === "Luxury Essentials");
    setFilteredProducts(luxuryProducts);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 lg:h-[500px] flex items-center justify-center bg-gradient-to-r from-amber-900 to-neutral-900"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-6xl font-bold mb-4"
          >
            Luxury Collection
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Exceptional craftsmanship meets timeless elegance
          </motion.p>
        </div>
      </motion.section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Premium Essentials
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover pieces crafted from the finest materials, designed for those who appreciate uncompromising quality
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Luxury collection items coming soon...
            </p>
          </div>
        )}
      </section>
    </div>
  );
}