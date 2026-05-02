import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { resetPassword, verifyResetToken } from "../data/mockData";
import { useToast } from "../context/ToastContext";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    const email = verifyResetToken(token);
    if (!email) {
      setTokenValid(false);
      setError("This reset link has expired or is invalid. Please request a new password reset.");
    } else {
      setTokenValid(true);
    }
  }, [token]);

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const getStrengthLabel = (strength: number) => {
    if (strength <= 2) return { label: "Weak", color: "text-rose-500" };
    if (strength <= 3) return { label: "Fair", color: "text-amber-500" };
    if (strength <= 4) return { label: "Good", color: "text-blue-500" };
    return { label: "Strong", color: "text-green-500" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid reset token.");
      return;
    }

    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));

    const result = resetPassword(token, password);
    setLoading(false);

    if (result) {
      addToast("Password has been reset successfully. Please sign in with your new password.");
      navigate("/login");
    } else {
      setError("Failed to reset password. The reset link may have expired.");
    }
  };

  if (tokenValid === false) {
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
                Link Expired
              </h2>
              <p className="mt-4 text-neutral-300 leading-relaxed max-w-md">
                This password reset link has expired or is invalid. Please request a new one.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Error Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white dark:bg-neutral-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineX className="text-rose-600 dark:text-rose-400" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                Invalid Reset Link
              </h1>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                This password reset link has expired or is invalid.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/forgot-password")}
                className="w-full py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                Request New Reset Link
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <div className="w-8 h-8 border-4 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const strength = getPasswordStrength(password);
  const strengthInfo = getStrengthLabel(strength);

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
              Set New Password
            </h2>
            <p className="mt-4 text-neutral-300 leading-relaxed max-w-md">
              Choose a strong password to secure your account. Make sure it's unique and hard to guess.
            </p>
            <div className="flex items-center gap-6 mt-8">
              <div>
                <p className="text-2xl font-bold text-white">Secure</p>
                <p className="text-sm text-neutral-400">Encrypted storage</p>
              </div>
              <div className="w-px h-10 bg-neutral-700" />
              <div>
                <p className="text-2xl font-bold text-white">Private</p>
                <p className="text-sm text-neutral-400">Your data is safe</p>
              </div>
              <div className="w-px h-10 bg-neutral-700" />
              <div>
                <p className="text-2xl font-bold text-white">Protected</p>
                <p className="text-sm text-neutral-400">Advanced security</p>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
              Reset Password
            </h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              Enter your new password below.
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
                New Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength <= 2 ? "bg-rose-500" :
                          strength <= 3 ? "bg-amber-500" :
                          strength <= 4 ? "bg-blue-500" : "bg-green-500"
                        }`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${strengthInfo.color}`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
                    <div className={`flex items-center gap-1 ${password.length >= 8 ? "text-green-600 dark:text-green-400" : ""}`}>
                      <HiOutlineCheck size={12} />
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? "text-green-600 dark:text-green-400" : ""}`}>
                      <HiOutlineCheck size={12} />
                      One uppercase letter
                    </div>
                    <div className={`flex items-center gap-1 ${/[a-z]/.test(password) ? "text-green-600 dark:text-green-400" : ""}`}>
                      <HiOutlineCheck size={12} />
                      One lowercase letter
                    </div>
                    <div className={`flex items-center gap-1 ${/[0-9]/.test(password) ? "text-green-600 dark:text-green-400" : ""}`}>
                      <HiOutlineCheck size={12} />
                      One number
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showConfirmPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center gap-1 text-xs">
                  {password === confirmPassword ? (
                    <>
                      <HiOutlineCheck size={12} className="text-green-600 dark:text-green-400" />
                      <span className="text-green-600 dark:text-green-400">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineX size={12} className="text-rose-500" />
                      <span className="text-rose-500">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password || !confirmPassword || password !== confirmPassword}
              className="w-full py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white dark:border-neutral-900 border-t-transparent rounded-full animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}