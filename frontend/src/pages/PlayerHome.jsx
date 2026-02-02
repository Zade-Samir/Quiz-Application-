import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Trophy, Clock, BookOpen, TrendingUp } from 'lucide-react';

const PlayerHome = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user from localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Mock data - replace with actual API calls
    const upcomingQuizzes = [
        { id: 1, title: 'Java Fundamentals', date: 'Tomorrow', questions: 20, duration: '30 min' },
        { id: 2, title: 'DBMS & SQL Quiz', date: 'Feb 5, 2026', questions: 15, duration: '25 min' },
        { id: 3, title: 'Cybersecurity Quiz', date: 'Feb 7, 2026', questions: 25, duration: '40 min' },
    ];

    const recentQuizzes = [
        { id: 1, title: 'JavaScript Basics Quiz', score: 85, total: 100, date: 'Yesterday' },
        { id: 2, title: 'Database & SQL Quiz', score: 92, total: 100, date: '2 days ago' },
    ];

    const topStudents = [
        { rank: 1, name: 'Mike John', score: 2847 },
        { rank: 2, name: 'Emma Watson', score: 2654 },
        { rank: 3, name: 'Sarah Connor', score: 2531 },
        { rank: 4, name: 'James Dean', score: 2398 },
        { rank: 5, name: 'Luna Loveg', score: 2156 },
    ];

    const learningCards = [
        { title: 'Java', subtitle: 'Object-oriented', bg: 'bg-[#FFD25A]', textColor: 'text-black' },
        { title: 'React', subtitle: 'UI library', bg: 'bg-[#A8D1FF]', textColor: 'text-black' },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-serif italic text-gray-300">
                            Apparature <span className="not-italic text-xs bg-gray-800 rounded-full px-2 py-1 ml-1">v1</span>
                        </h1>
                        <nav className="hidden md:flex gap-6 text-sm text-gray-400">
                            <Link to="/player" className="hover:text-white transition-colors">Home</Link>
                            <Link to="/quizzes" className="hover:text-white transition-colors">Quizzes</Link>
                            <Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
                        </nav>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <button className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                                    {user?.username?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div className="text-left hidden md:block">
                                    <div className="text-sm font-semibold">{user?.username || 'Anurag Kavaldiwar'}</div>
                                    <div className="text-xs text-gray-400">Pro Membership</div>
                                </div>
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <Link to="/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800 rounded-t-lg">
                                    <BookOpen size={16} />
                                    <span className="text-sm">My library</span>
                                </Link>
                                <Link to="/account" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800">
                                    <span className="text-sm">Manage Account</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-800 rounded-b-lg text-red-400"
                                >
                                    <LogOut size={16} />
                                    <span className="text-sm">Sign out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <p className="text-gray-400 text-sm mb-2">Welcome back!</p>
                    <h2 className="text-5xl font-serif">
                        Grow <span className="italic">smarter.</span>
                    </h2>
                </div>

                {/* Learning Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {learningCards.map((card, idx) => (
                        <div key={idx} className={`${card.bg} ${card.textColor} p-8 rounded-2xl h-64 flex flex-col justify-between transition-transform hover:-translate-y-2 cursor-pointer`}>
                            <div>
                                <h3 className="text-4xl font-normal mb-2">{card.title}</h3>
                                <p className="opacity-70 text-sm">{card.subtitle}</p>
                            </div>
                            <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold w-full uppercase flex items-center justify-center gap-2">
                                Continue →
                            </button>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Quizzes */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#E5C1FF] text-black p-6 rounded-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Upcoming Quizzes</h3>
                                <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold">
                                    View All
                                </button>
                            </div>
                            <div className="space-y-3">
                                {upcomingQuizzes.map((quiz) => (
                                    <div key={quiz.id} className="bg-black/80 text-white p-4 rounded-xl flex justify-between items-center hover:bg-black transition-colors cursor-pointer">
                                        <div>
                                            <h4 className="font-bold">{quiz.title}</h4>
                                            <p className="text-xs text-gray-400">{quiz.date} • {quiz.questions} questions</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock size={14} />
                                            <span>{quiz.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Quizzes */}
                        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                            <h3 className="text-xl font-bold mb-4">Recent Quizzes</h3>
                            <div className="space-y-3">
                                {recentQuizzes.map((quiz) => (
                                    <div key={quiz.id} className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
                                        <div>
                                            <h4 className="font-semibold">{quiz.title}</h4>
                                            <p className="text-xs text-gray-400">{quiz.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-400">{quiz.score}%</div>
                                            <p className="text-xs text-gray-400">{quiz.score}/{quiz.total}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Students Leaderboard */}
                    <div className="bg-[#FFE66D] text-black p-6 rounded-2xl h-fit">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Top Students</h3>
                            <Trophy size={20} />
                        </div>
                        <div className="space-y-3">
                            {topStudents.map((student) => (
                                <div key={student.rank} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${student.rank === 1 ? 'bg-yellow-400' :
                                            student.rank === 2 ? 'bg-gray-300' :
                                                student.rank === 3 ? 'bg-orange-300' : 'bg-gray-200'
                                        }`}>
                                        {student.rank}
                                    </div>
                                    <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm">{student.name}</div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-bold">
                                        <TrendingUp size={14} />
                                        {student.score}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl">
                        <div className="text-4xl font-bold mb-2">12</div>
                        <div className="text-sm text-purple-200">Quizzes Completed</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl">
                        <div className="text-4xl font-bold mb-2">87%</div>
                        <div className="text-sm text-blue-200">Average Score</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl">
                        <div className="text-4xl font-bold mb-2">#24</div>
                        <div className="text-sm text-green-200">Global Rank</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-800 mt-12 py-6">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
                    <p>© 2026 QuizMaster. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PlayerHome;
