
import { useState } from "react";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "../../services/portfolioApi.js";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login({ password }).unwrap();
      window.location.href = "/admin";
    } catch (err) {
      console.error("Admin login failed:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-xl bg-[#242220] text-[#D4B783] flex items-center justify-center">
            <LockKeyhole size={27} />
          </div>

          <h1 className="text-3xl font-bold mt-5">
            Admin <span className="text-[#D4B783]">Login</span>
          </h1>

          <p className="text-gray-400 text-sm mt-3">
            Sign in to manage your portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111114] border border-[#27272a] rounded-xl p-6 sm:p-8"
        >
          <label
            htmlFor="password"
            className="block text-sm text-gray-300 mb-2"
          >
            Password
          </label>

          <div className="flex items-center gap-2 border border-[#3f3f46] rounded-lg px-3 focus-within:border-[#D4B783]">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              disabled={isLoading}
              className="w-full py-3 bg-transparent outline-none text-sm"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400 mt-3">
              {error.data?.message || "Login failed. Please try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full mt-6 py-3 rounded-lg bg-[#D4B783] text-black font-semibold hover:bg-[#e4c99c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          Portfolio administration
        </p>
      </div>
    </main>
  );
};

export default AdminLogin;
