import { motion, AnimatePresence } from "framer-motion";
import { HiCheck, HiX, HiInformationCircle } from "react-icons/hi";
import { useToast } from "../context/ToastContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const icons = {
    success: <HiCheck className="text-emerald-500" size={18} />,
    error: <HiX className="text-rose-500" size={18} />,
    info: <HiInformationCircle className="text-blue-500" size={18} />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700 min-w-[250px]"
          >
            {icons[toast.type]}
            <span className="text-sm text-neutral-700 dark:text-neutral-200 flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-neutral-400 hover:text-neutral-600">
              <HiX size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
