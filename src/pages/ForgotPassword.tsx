import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineArrowLeft } from "react-icons/hi";
import { initiatePasswordReset } from "../data/mockData";
import { useToast } from "../context/ToastContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));

    const token = initiatePasswordReset(email);
    setLoading(false);

    if (token) {
      setResetToken(token);
      setSuccess(true);
      addToast("Password reset link has been sent successfully to your email.");
    } else {
      setError("No account found with this email address.");
    }
  };

  const handleResetClick = () => {
    if (resetToken) {
      navigate(`/reset-password?token=${resetToken}`);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-950">
          <img
            src="https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Fashion"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white leading-tight">
                Check Your Email
              </h2>
              <p className="mt-4 text-neutral-300 leading-relaxed max-w-md">
                We've sent a password reset link to your email address. Click the link to reset your password.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white dark:bg-neutral-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Link to="/" className="lg:hidden flex items-center justify-center mb-8">
              <span className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Trendify
              </span>
            </Link>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineMail className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                Check Your Email
              </h1>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                We've sent a password reset link to{" "}
                <span className="font-medium text-neutral-900 dark:text-white">{email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Demo Reset Link</p>
                <p className="text-xs text-blue-700 dark:text-blue-400 mb-3">
                  Since this is a demo, click the button below to simulate clicking the reset link from your email:
                </p>
                <button
                  onClick={handleResetClick}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Reset My Password
                </button>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setSuccess(false)}
                  className="font-medium text-neutral-900 dark:text-white hover:underline"
                >
                  try again
                </button>
              </p>

              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                <HiOutlineArrowLeft size={16} />
                Back to Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-950">
        <img
          src="https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white leading-tight">
              Reset Your Password
            </h2>
            <p className="mt-4 text-neutral-300 leading-relaxed max-w-md">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="flex items-center gap-6 mt-8">
              <div>
                <p className="text-2xl font-bold text-white">Secure</p>
                <p className="text-sm text-neutral-400">256-bit encryption</p>
              </div>
              <div className="w-px h-10 bg-neutral-700" />
              <div>
                <p className="text-2xl font-bold text-white">Fast</p>
                <p className="text-sm text-neutral-400">Reset in minutes</p>
              </div>
              <div className="w-px h-10 bg-neutral-700" />
              <div>
                <p className="text-2xl font-bold text-white">Safe</p>
                <p className="text-sm text-neutral-400">No data shared</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white dark:bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="lg:hidden flex items-center justify-center mb-8">
            <span className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Trendify
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
              Forgot Password?
            </h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-sm text-rose-600 dark:text-rose-400"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white dark:border-neutral-900 border-t-transparent rounded-full animate-spin" />
                  Sending Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:underline"
            >
              <HiOutlineArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}