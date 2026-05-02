import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-8xl sm:text-9xl font-bold text-neutral-200 dark:text-neutral-800">404</p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
