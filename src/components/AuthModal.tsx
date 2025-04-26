import { useState, useEffect } from "react";

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
    };
  }, [isOpen]);

  useEffect(() => {
    // Reset form when switching between login and signup
    setEmail("");
    setPassword("");
    setName("");
  }, [isLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would handle authentication with a backend
    if (isLogin) {
      // Handle login
      console.log("Logging in with:", { email, password });
    } else {
      // Handle signup
      console.log("Signing up with:", { name, email, password });
    }

    // Close modal after successful auth
    onClose();
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white w-full max-w-md mx-4 rounded-sm shadow-luxury overflow-hidden transition-all duration-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors z-10"
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

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display uppercase tracking-luxury">
              {isLogin ? "Login" : "Create Account"}
            </h2>
            <p className="text-black/60 mt-2 text-sm">
              {isLogin
                ? "Welcome back to Aneeq"
                : "Join Aneeq to book luxury salon appointments"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm uppercase tracking-wider text-black/60"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/5 border-b border-black/10 focus:border-gold transition-colors outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm uppercase tracking-wider text-black/60"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/5 border-b border-black/10 focus:border-gold transition-colors outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm uppercase tracking-wider text-black/60"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/5 border-b border-black/10 focus:border-gold transition-colors outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 border-black/30 rounded accent-gold"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-black/60"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    className="text-gold hover:text-black transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gold text-white py-3 uppercase tracking-wider text-sm hover:bg-black transition-colors duration-300"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-black/60">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="ml-1 text-gold hover:text-black transition-colors"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-black/40 uppercase tracking-wider text-xs">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-black/10 bg-white text-black hover:bg-black/5 transition-colors"
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
                className="flex items-center justify-center py-3 px-4 border border-black/10 bg-white text-black hover:bg-black/5 transition-colors"
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
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
