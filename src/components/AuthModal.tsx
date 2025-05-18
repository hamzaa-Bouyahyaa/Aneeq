import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

const AuthModal = ({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const {
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    resetPassword,
  } = useAuth();

  // Handle modal visibility with animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Small delay to trigger animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 300);
    }

    setIsLogin(initialMode === "login");

    return () => {
      document.body.style.overflow = "auto";
      setIsForgotPassword(false);
    };
  }, [isOpen, initialMode]);

  useEffect(() => {
    // Reset form when switching between login and signup
    setEmail("");
    setPassword("");
    setName("");
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isForgotPassword) {
        // Handle password reset
        const { error } = await resetPassword(email);
        if (error) throw error;

        setSuccessMessage(
          "Password reset instructions have been sent to your email"
        );
      } else if (isLogin) {
        // Handle login with Supabase
        const { error } = await signIn(email, password);
        if (error) throw error;

        // Close modal after successful auth
        onClose();
      } else {
        // Handle signup with Supabase
        const { error, data } = await signUp(email, password, name);
        if (error) throw error;

        // If no session is returned, it means email confirmation is required
        if (!data) {
          setIsVerificationSent(true);
          setSuccessMessage(
            `A verification email has been sent to ${email}. Please check your inbox and verify your email to continue.`
          );
        } else {
          // Close modal after successful auth (if auto-confirm is enabled)
          onClose();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Authentication error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[200] transition-all duration-700 ease-in-out ${
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={handleBackdropClick}
      >
        {/* Empty div that covers the right side of the screen - clicking here closes the modal */}
      </div>

      {/* Auth drawer */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-full md:w-1/3 bg-black bg-opacity-90 z-[210] transition-all duration-500 ease-in-out transform ${
          isVisible
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-white/60 hover:text-gold transition-colors z-10"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Gold accent line */}
        <div className="h-1 w-full bg-gold"></div>

        <div className="h-full flex flex-col justify-between py-20 px-8 md:px-12 overflow-y-auto">
          <div className="mb-12">
            <h2
              className={`text-3xl md:text-4xl font-display uppercase tracking-luxury text-gold transition-all duration-700 ease-in-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {isForgotPassword
                ? "Reset Password"
                : isVerificationSent && !isLogin
                ? "Verify Your Email"
                : isLogin
                ? "Login"
                : "Create Account"}
            </h2>
            <p
              className={`text-white/60 mt-4 text-sm transition-all duration-700 delay-100 ease-in-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {isForgotPassword
                ? "Enter your email to receive reset instructions"
                : isVerificationSent && !isLogin
                ? "Please check your inbox and verify your email to continue"
                : isLogin
                ? "Welcome back to Aneeq"
                : "Join Aneeq to book luxury salon appointments"}
            </p>
          </div>

          {isVerificationSent && !isLogin ? (
            <div
              className={`space-y-8 transition-all duration-700 ease-in-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="bg-white/5 p-6 rounded-sm border-l-4 border-gold">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gold"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      Verification Email Sent
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      We've sent a verification email to{" "}
                      <span className="text-gold font-medium">{email}</span>.
                      Please check your inbox and click the verification link to
                      activate your account.
                    </p>
                    <div className="mt-4">
                      <p className="text-sm text-white/70">
                        Didn't receive the email? Check your spam folder or
                        <button
                          type="button"
                          onClick={() => {
                            setIsVerificationSent(false);
                            setIsLogin(true);
                          }}
                          className="ml-1 text-gold hover:text-white transition-colors"
                        >
                          try logging in
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsVerificationSent(false);
                  setIsLogin(true);
                  setEmail("");
                  setPassword("");
                  setName("");
                }}
                className="w-full bg-white/10 text-white py-4 uppercase tracking-wider text-sm hover:bg-white/20 transition-all duration-300"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {!isLogin && !isForgotPassword && (
                <div
                  className={`space-y-2 transition-all duration-700 delay-150 ease-in-out ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm uppercase tracking-wider text-gold"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border-b border-white/20 focus:border-gold text-white placeholder-white/30 transition-colors outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div
                className={`space-y-2 transition-all duration-700 delay-200 ease-in-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-wider text-gold"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border-b border-white/20 focus:border-gold text-white placeholder-white/30 transition-colors outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {!isForgotPassword && (
                <div
                  className={`space-y-2 transition-all duration-700 delay-250 ease-in-out ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm uppercase tracking-wider text-gold"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border-b border-white/20 focus:border-gold text-white placeholder-white/30 transition-colors outline-none"
                    placeholder="Enter your password"
                    required={!isForgotPassword}
                  />
                </div>
              )}

              {isLogin && !isForgotPassword && (
                <div
                  className={`flex items-center justify-between transition-all duration-700 delay-300 ease-in-out ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 border-white/30 bg-transparent rounded accent-gold"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-white/60"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button
                      type="button"
                      className="text-gold hover:text-white transition-colors"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setError(null);
                        setSuccessMessage(null);
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              )}

              {(isForgotPassword || isVerificationSent) &&
                !isLogin &&
                successMessage && (
                  <div className="border-l-4 border-gold bg-white/5 p-4 mb-4 transition-all duration-300">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-gold"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-white">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

              {error && (
                <div className="border-l-4 border-red-500 bg-white/5 p-4 mb-4 transition-all duration-300">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-white">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gold text-white py-4 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                } transition-all duration-700 delay-350 ease-in-out`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isForgotPassword
                      ? "Sending Reset Link..."
                      : isLogin
                      ? "Logging in..."
                      : "Creating Account..."}
                  </span>
                ) : isForgotPassword ? (
                  "Send Reset Link"
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}

          <div
            className={`mt-8 text-center transition-all duration-700 delay-400 ease-in-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {isForgotPassword ? (
              <button
                type="button"
                className="text-gold hover:text-white transition-colors flex items-center mx-auto"
                onClick={() => {
                  setIsForgotPassword(false);
                  setError(null);
                  setSuccessMessage(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Login
              </button>
            ) : (
              !isVerificationSent && (
                <p className="text-sm text-white/60">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    type="button"
                    className="ml-1 text-gold hover:text-white transition-colors"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign up" : "Login"}
                  </button>
                </p>
              )
            )}
          </div>

          {!isForgotPassword && !isVerificationSent && (
            <div
              className={`mt-12 transition-all duration-700 delay-450 ease-in-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-white/40 uppercase tracking-wider text-xs">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={async () => {
                    setError(null);
                    setLoading(true);
                    try {
                      const { error } = await signInWithGoogle();
                      if (error) throw error;
                      onClose();
                    } catch (err) {
                      setError(
                        err instanceof Error
                          ? err.message
                          : "An error occurred with Google login"
                      );
                      console.error("Google login error:", err);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="flex items-center justify-center py-4 px-4 border border-white/20 bg-transparent text-white hover:bg-white/5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setError(null);
                    setLoading(true);
                    try {
                      const { error } = await signInWithFacebook();
                      if (error) throw error;
                      onClose();
                    } catch (err) {
                      setError(
                        err instanceof Error
                          ? err.message
                          : "An error occurred with Facebook login"
                      );
                      console.error("Facebook login error:", err);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="flex items-center justify-center py-4 px-4 border border-white/20 bg-transparent text-white hover:bg-white/5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
