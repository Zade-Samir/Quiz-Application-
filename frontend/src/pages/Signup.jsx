import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: 'PLAYER' // Default role
                }),
            });

            if (!response.ok) {
                // Try to parse error message from response
                let errorMessage = 'Registration failed. Try a different username/email.';
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

            // On Success, store token and redirect to home or login
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ username: formData.username }));
                navigate('/player');
            } else {
                navigate('/login');
            }

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
                    Roll the Carpet!
                </h1>
                <div className="relative">
                    <p className="text-lg text-gray-300 italic pl-4 border-l-4 border-white">
                        Register now — become part of something... mildly cool.
                    </p>
                    <div className="absolute top-1/2 left-full w-32 border-t border-dashed border-gray-600 ml-4 hidden lg:block"></div>
                </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-800 shadow-2xl relative">
                {/* Glow effect */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/30 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-1">Signup</h2>
                    <p className="text-gray-400 mb-8">Just some details to get you in.!</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-100 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        <div>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email / Phone"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:ring-0 transition-colors"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:ring-0 transition-colors"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:ring-0 transition-colors"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all mt-2 disabled:opacity-50"
                        >
                            {loading ? 'Creating Account...' : 'Signup'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-gray-700 flex-1"></div>
                        <span className="text-gray-500 text-sm">Or</span>
                        <div className="h-px bg-gray-700 flex-1"></div>
                    </div>

                    <div className="flex justify-center gap-6">
                        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                            <span className="text-xl">G</span>
                        </button>
                        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                            <span className="text-xl text-blue-500">f</span>
                        </button>
                        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                            <span className="text-xl">🐙</span>
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already Registered? <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
                    </div>
                    <div className="mt-6 flex justify-between text-xs text-gray-600">
                        <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
                        <a href="#" className="hover:text-gray-400">Support</a>
                        <a href="#" className="hover:text-gray-400">Customer Care</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
