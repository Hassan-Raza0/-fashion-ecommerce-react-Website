import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle } from "react-icons/hi";

export default function OrderSuccess() {
  const orderNumber = `TRD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <HiOutlineCheckCircle className="mx-auto text-emerald-500" size={80} />
        </motion.div>
        <h1 className="mt-6 text-3xl font-bold text-neutral-900 dark:text-white">
          Order Confirmed!
        </h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Thank you for your purchase. Your order has been placed successfully and will be shipped within 2-5 business days.
        </p>
        <div className="mt-6 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Order Number</p>
          <p className="mt-1 text-lg font-bold text-neutral-900 dark:text-white">{orderNumber}</p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="px-8 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
