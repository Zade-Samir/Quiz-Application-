import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Try to parse error message from response
                let errorMessage = 'Login failed. Please check your credentials.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                    // If JSON parsing fails, use default message
                    console.error('Failed to parse error response:', jsonError);
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Store Token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ username: formData.username }));

            // Redirect to Landing or Admin based on role (simple redirect for now)
            navigate('/player');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Left Side - Text */}
            <div className="hidden md:block space-y-4">
                <h1 className="text-5xl font-bold leading-tight">
                    Welcome Back!
                </h1>
                <div className="relative">
                    <p className="text-lg text-gray-300 italic pl-4 border-l-4 border-white">
                        Login and prove you're the real you...
                    </p>
                    <div className="absolute top-1/2 left-full w-32 border-t border-dashed border-gray-600 ml-4 hidden lg:block"></div>
                </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-800 shadow-2xl relative">
                {/* Glow effect */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/30 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-1">Login</h2>
                    <p className="text-gray-400 mb-8">Glad you're back.!</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-100 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:ring-0 transition-colors"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:ring-0 transition-colors"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" className="rounded bg-gray-800 border-gray-600 text-purple-600 focus:ring-purple-500" />
                            <label htmlFor="remember" className="text-sm text-gray-400">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="text-center">
                            <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-white">
                                Forgot password ?
                            </Link>
                        </div>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-gray-700 flex-1"></div>
                        <span className="text-gray-500 text-sm">Or</span>
                        <div className="h-px bg-gray-700 flex-1"></div>
                    </div>

                    <div className="flex justify-center gap-6">
                        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                            {/* Google Icon Placeholder or use library */}
                            <span className="text-xl">G</span>
                        </button>
                        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                            <span className="text-xl text-blue-500">f</span>
                        </button>
                        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                            <span className="text-xl">🐙</span>
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account ? <Link to="/signup" className="text-purple-400 hover:text-purple-300">Signup</Link>
                    </div>

                    <div className="mt-8 flex justify-between text-xs text-gray-600">
                        <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
                        <a href="#" className="hover:text-gray-400">Support</a>
                        <a href="#" className="hover:text-gray-400">Customer Care</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
