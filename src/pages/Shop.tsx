import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineAdjustments, HiOutlineX, HiOutlineArrowRight } from "react-icons/hi";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import QuickPreview from "../components/QuickPreview";
import Breadcrumb from "../components/Breadcrumb";
import type { Product } from "../data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const ITEMS_PER_LOAD = 12;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(600);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.price <= priceRange);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery, priceRange]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // Trending: top rated with most reviews
  const trendingProducts = useMemo(
    () => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4),
    []
  );

  // Recently Added: highest IDs
  const recentlyAdded = useMemo(
    () => [...products].sort((a, b) => b.id - a.id).slice(0, 4),
    []
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(ITEMS_PER_LOAD);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  const isDefaultView = selectedCategory === "All" && !searchQuery && sortBy === "featured" && priceRange >= 600;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />

        {/* Page Header */}
        <div className="py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Shop Collection
          </h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            {filteredProducts.length} products
          </p>
        </div>

        {/* Trending Section (only on default view) */}
        {isDefaultView && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                  Most Popular
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  Trending Now
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {trendingProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recently Added Section (only on default view) */}
        {isDefaultView && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                  Just Landed
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  Recently Added
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recentlyAdded.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {isDefaultView ? "All Products" : selectedCategory}
            </h2>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 flex-shrink-0"
            >
              <HiOutlineAdjustments size={16} />
              Filters
            </button>

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_LOAD); }}
              className="flex-1 max-w-xs px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
            />

            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_LOAD); }}
              className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white flex-shrink-0"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={(v) => { setPriceRange(v); setVisibleCount(ITEMS_PER_LOAD); }}
              />
            </aside>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {filtersOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setFiltersOpen(false)}
                  />
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-neutral-900 z-50 lg:hidden p-6 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Filters</h3>
                      <button onClick={() => setFiltersOpen(false)} className="p-2 text-neutral-500">
                        <HiOutlineX size={20} />
                      </button>
                    </div>
                    <FilterSidebar
                      selectedCategory={selectedCategory}
                      onCategoryChange={(cat) => { handleCategoryChange(cat); setFiltersOpen(false); }}
                      priceRange={priceRange}
                      onPriceChange={(v) => { setPriceRange(v); setVisibleCount(ITEMS_PER_LOAD); }}
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {visibleProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {visibleProducts.map((product, i) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={i}
                        onQuickView={setQuickViewProduct}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="flex justify-center mt-12">
                      <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2"
                      >
                        Load More
                        <HiOutlineArrowRight size={16} />
                      </button>
                    </div>
                  )}

                  {/* Showing count */}
                  <p className="text-center mt-4 text-xs text-neutral-400 dark:text-neutral-500">
                    Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} products
                  </p>
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-neutral-500 dark:text-neutral-400 text-lg">No products found</p>
                  <button
                    onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setPriceRange(600); setVisibleCount(ITEMS_PER_LOAD); }}
                    className="mt-4 text-sm font-medium text-neutral-900 dark:text-white underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Quick Preview Modal */}
      <QuickPreview
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}: {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  priceRange: number;
  onPriceChange: (val: number) => void;
}) {
  // Count products per category
  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    if (cat === "All") {
      acc[cat] = products.length;
    } else {
      acc[cat] = products.filter((p) => p.category === cat).length;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              <span>{cat}</span>
              <span className={`text-xs ${selectedCategory === cat ? "text-white/70 dark:text-neutral-900/60" : "text-neutral-400"}`}>
                {categoryCounts[cat] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
          Price Range
        </h3>
        <input
          type="range"
          min={0}
          max={600}
          step={10}
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-neutral-900 dark:accent-white"
        />
        <div className="flex items-center justify-between mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          <span>$0</span>
          <span className="font-medium text-neutral-900 dark:text-white">${priceRange}</span>
        </div>
      </div>
    </div>
  );
}
