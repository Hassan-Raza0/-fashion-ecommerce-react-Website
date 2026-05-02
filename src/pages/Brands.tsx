import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { brands } from "../data/products";

export default function Brands() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 lg:h-[500px] flex items-center justify-center bg-gradient-to-r from-neutral-900 to-neutral-700"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-6xl font-bold mb-4"
          >
            Our Brands
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Discover exceptional craftsmanship from renowned fashion houses
          </motion.p>
        </div>
      </motion.section>

      {/* Brands Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Premium Labels
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Each brand represents a unique vision of style, quality, and innovation in fashion
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                <img
                  src={brand.banner}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Founded {brand.founded} • {brand.origin}
                    </p>
                  </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  {brand.description}
                </p>

                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <span>{brand.products} Products</span>
                  <span className="capitalize">{brand.style}</span>
                </div>

                <Link
                  to={`/shop?brand=${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-2 px-4 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 text-center block font-medium"
                >
                  Shop {brand.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}