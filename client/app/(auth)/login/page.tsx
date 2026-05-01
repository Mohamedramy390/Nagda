"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { checkAuthAction } from "@/lib/api/actions/auth";

const LoginPage = () => {

  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuthAction();
      if (isAuthenticated) {
        router.push('/portal/dashboard');
      }
    };
    verifyAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      {/* Header / Language Switcher */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 z-10">
        <div className="flex items-center gap-2 text-primary dark:text-primary">
          <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[16px]">dns</span>
          </div>
          <span className="font-bold text-sm tracking-tight text-text-light dark:text-white hidden sm:block">
            Nagda
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-[20px]">
              language
            </span>
            <span className="text-sm font-medium text-text-light dark:text-text-dark">
              English / العربية
            </span>
            <span className="material-symbols-outlined text-gray-400 text-[16px]">
              expand_more
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 relative w-full h-full min-h-screen overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 z-0">
          {/* Abstract Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
            data-alt="Abstract technology pattern with connected dots"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3xen4mhpwsooMXOe2AwZp1cmaMnL-PEEc_vm2hl3hDNNU1V67o6g080Ch0KXRmX_GvflLFRfL9ZIAVKIqzCdQ5l36_aAEfJdDPXYl0LuFuewmsuEfLPnzpoxcjVtIGOunciBpeQcHqBIk3SMFIyq-E1xicSAos8VeGg0FQntiYHYMNpt19hT6GWKJd8KohmhwZSEJ4fSjlUEjfSpFIE3K6YPlCEelgCnHDoG65NqZEiFIWaNRY9cKb5H-P0bynvf90Wd1RoOwSUeS')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white dark:via-background-dark/40 dark:to-background-dark"></div>
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-[440px] bg-surface-light dark:bg-surface-dark rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-border-light/50 dark:border-border-dark overflow-hidden flex flex-col">
          {/* Card Header Visual */}
          <div className="h-32 bg-primary/10 w-full flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center"
              data-alt="Abstract gradient mesh background"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')",
              }}
            ></div>
            <div className="size-16 bg-white dark:bg-surface-dark rounded-xl shadow-sm flex items-center justify-center text-primary relative z-10">
              <span className="material-symbols-outlined text-[32px]">
                security
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="px-8 py-8 flex flex-col gap-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-text-light dark:text-white">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sign in to access your IT dashboard
              </p>
            </div>
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-text-light dark:text-gray-300"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      mail
                    </span>
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 py-3 text-sm text-text-light dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    id="email"
                    placeholder="name@company.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label
                    className="text-sm font-medium text-text-light dark:text-gray-300"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-xs font-semibold text-primary hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/50 pl-10 pr-10 py-3 text-sm text-text-light dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    id="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                className="mt-2 w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </form>
            <div className="pt-2 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}

                <a
                  className="text-primary font-semibold hover:underline"
                  href="#"
                >
                  Contact Admin
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Legal */}
        <div className="absolute bottom-4 left-0 w-full text-center px-4">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2023 Enterprise IT Solutions. All rights reserved.
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;