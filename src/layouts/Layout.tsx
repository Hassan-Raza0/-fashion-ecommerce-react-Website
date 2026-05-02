import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ToastContainer from "../components/ToastContainer";
import BackToTop from "../components/BackToTop";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors">
      <Header />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-16 lg:pt-20"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <ToastContainer />
      <BackToTop />
    </div>
  );
}
