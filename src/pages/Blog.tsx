import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/products";
import { HiOutlineClock, HiOutlineUser } from "react-icons/hi";

export default function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
            Fashion Blog
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Insights, trends, and stories from the world of fashion
          </motion.p>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <span className="inline-block bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Article
              </span>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    <span className="flex items-center gap-1">
                      <HiOutlineUser className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-4 h-4" />
                      {featuredPost.readTime} min read
                    </span>
                    <span className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <Link
                      to={`/blog/${featuredPost.id}`}
                      className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Latest Articles
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Stay updated with the latest fashion trends, styling tips, and industry insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <motion.article
                key={post.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-neutral-800/90 text-neutral-900 dark:text-white px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    <span className="flex items-center gap-1">
                      <HiOutlineUser className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-4 h-4" />
                      {post.readTime} min
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 font-medium transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}