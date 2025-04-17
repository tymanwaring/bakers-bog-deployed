import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../components/main/navbar/Navbar";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await axios.post("/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[url('/img/bakery_inside.png')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-[2px]" />
      <div className="relative h-full">
        <Navbar />
        <div className="h-[calc(100vh-80px)] flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-medium text-gray-900">Admin Portal</h1>
                <p className="text-gray-600 mt-2 font-light">Enter your credentials to continue</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 
                    transition-colors placeholder:text-gray-400"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl 
                      focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 
                      transition-colors placeholder:text-gray-400"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                      hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-4 rounded-xl text-sm border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 text-white py-2.5 px-4 rounded-xl font-medium
                  hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg shadow-amber-500/20"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
