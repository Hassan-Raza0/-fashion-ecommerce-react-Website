import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { products, categories, testimonials, brands, blogPosts, lookbookItems } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

const featuredProducts = products.filter((p) => p.badge === "Best Seller" || p.rating >= 4.7);
const newArrivals = products.filter((p) => p.badge === "New");
const trendingProducts = products.slice(0, 4);

const categoryImages: Record<string, string> = {
  Women: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
  Men: "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=400",
  Accessories: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
  Footwear: "https://images.pexels.com/photos/2623832/pexels-photo-2623822.jpeg?auto=compress&cs=tinysrgb&w=400",
  Outerwear: "https://images.pexels.com/photos/6625880/pexels-photo-6625880.jpeg?auto=compress&cs=tinysrgb&w=400",
};

export default function Home() {
  const { items: recentlyViewed } = useRecentlyViewed();
  const recommendedProducts = recentlyViewed.length > 0
    ? products
        .filter((product) =>
          recentlyViewed.some((recent) => recent.category === product.category && recent.id !== product.id)
        )
        .filter((product) => !recentlyViewed.some((recent) => recent.id === product.id))
        .slice(0, 4)
    : featuredProducts.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Fashion Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-300 mb-4"
            >
              New Season Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Redefine
              <br />
              Your Style
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-neutral-300 mb-8 leading-relaxed"
            >
              Discover curated pieces that blend timeless elegance with modern sophistication.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-white text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/shop"
                className="px-8 py-3.5 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                Explore Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Collection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                Curated for You
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                Trending Now
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:gap-3 transition-all"
            >
              View All <HiOutlineArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <Link
            to="/shop"
            className="sm:hidden mt-8 w-full py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm font-medium rounded-full flex items-center justify-center gap-2"
          >
            View All <HiOutlineArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-20 bg-white dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                  Your Activity
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                  Recently Viewed
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:gap-3 transition-all"
              >
                View All <HiOutlineArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
            <Link
              to="/shop"
              className="sm:hidden mt-8 w-full py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm font-medium rounded-full flex items-center justify-center gap-2"
            >
              View All <HiOutlineArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Recommended For You */}
      {recommendedProducts.length > 0 && (
        <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                  Personalized Picks
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                  Recommended For You
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:gap-3 transition-all"
              >
                Discover More <HiOutlineArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
            <Link
              to="/shop"
              className="sm:hidden mt-8 w-full py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm font-medium rounded-full flex items-center justify-center gap-2"
            >
              Discover More <HiOutlineArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              Browse
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.filter((c) => c !== "All").map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?category=${category}`}
                  className="group relative block overflow-hidden rounded-2xl aspect-[3/4]"
                >
                  <img
                    src={categoryImages[category]}
                    alt={category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">{category}</h3>
                    <p className="text-white/70 text-sm mt-1 flex items-center gap-1">
                      Shop Now <HiOutlineArrowRight size={14} />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                Top Rated
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:gap-3 transition-all"
            >
              View All <HiOutlineArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Limited Edition Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://images.pexels.com/photos/5710166/pexels-photo-5710166.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Limited Edition"
              className="w-full h-[400px] sm:h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-lg px-8 sm:px-12">
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-amber-400 mb-3">
                  Limited Edition
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
                  Winter Collection 2025
                </h2>
                <p className="text-neutral-300 mb-6 leading-relaxed">
                  Exclusive pieces crafted from the finest materials. Available for a limited time only.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex px-8 py-3.5 bg-white text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-100 transition-colors"
                >
                  Discover Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                Just Landed
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:gap-3 transition-all"
            >
              View All <HiOutlineArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              Premium Labels
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Featured Brands
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {brands.slice(0, 5).map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link
                  to={`/brands`}
                  className="block p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300 text-center"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {brand.origin}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/brands"
              className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              View All Brands <HiOutlineArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lookbook Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              Style Inspiration
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Lookbook
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lookbookItems.map((lookbook, i) => (
              <motion.div
                key={lookbook.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <img
                  src={lookbook.image}
                  alt={lookbook.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-xl mb-2">
                    {lookbook.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {lookbook.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs uppercase tracking-wide">
                      {lookbook.season} • {lookbook.style}
                    </span>
                    <Link
                      to={`/shop?season=${lookbook.season.toLowerCase()}`}
                      className="text-white hover:text-white/80 transition-colors flex items-center gap-1 text-sm"
                    >
                      Shop Look <HiOutlineArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                Latest Insights
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                From Our Blog
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:gap-3 transition-all"
            >
              View All <HiOutlineArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-neutral-800/90 text-neutral-900 dark:text-white px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{post.author}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <Link
            to="/blog"
            className="sm:hidden mt-8 w-full py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm font-medium rounded-full flex items-center justify-center gap-2"
          >
            View All Posts <HiOutlineArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 p-8 text-white"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Free Shipping</h3>
                <p className="text-neutral-300 mb-4">On orders over $200</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                >
                  Shop Now <HiOutlineArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                <p className="text-white/90 mb-4">Fresh styles weekly</p>
                <Link
                  to="/new-arrivals"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                >
                  Discover <HiOutlineArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-800 to-neutral-700 p-8 text-white"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">VIP Access</h3>
                <p className="text-neutral-300 mb-4">Exclusive previews</p>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                >
                  Join Now <HiOutlineArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              What They Say
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Client Testimonials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < testimonial.rating ? 'text-amber-400' : 'text-neutral-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">
            Stay Updated
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join the Trendify Club
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Subscribe for exclusive access to new collections, special offers, and style inspiration.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-5 py-3.5 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
