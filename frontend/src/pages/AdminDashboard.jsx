import { useState, useEffect } from 'react';
import { Users, BookOpen, TrendingUp, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalQuizzes: 0,
        activeQuizzes: 0,
        avgScore: 0,
    });

    useEffect(() => {
        // TODO: Fetch real stats from API
        setStats({
            totalStudents: 247,
            totalQuizzes: 18,
            activeQuizzes: 12,
            avgScore: 78,
        });
    }, []);

    const learningCards = [
        { title: 'Java', subtitle: 'Object-oriented', bg: 'bg-[#FFD25A]', textColor: 'text-black' },
        { title: 'React', subtitle: 'UI library', bg: 'bg-[#A8D1FF]', textColor: 'text-black' },
        { title: 'Spring', subtitle: 'Java framework', bg: 'bg-[#989EF8]', textColor: 'text-black' },
        { title: 'Security', subtitle: 'Access control', bg: 'bg-[#F4BFFF]', textColor: 'text-black' },
    ];

    const recentQuizzes = [
        { id: 1, title: 'Java Fundamentals', students: 45, avgScore: 82, status: 'Published' },
        { id: 2, title: 'React Basics', students: 38, avgScore: 75, status: 'Published' },
        { id: 3, title: 'Spring Boot', students: 0, avgScore: 0, status: 'Draft' },
    ];

    const topStudents = [
        { rank: 1, name: 'Mike John', score: 2847, quizzes: 12 },
        { rank: 2, name: 'Emma Watson', score: 2654, quizzes: 11 },
        { rank: 3, name: 'Sarah Connor', score: 2531, quizzes: 10 },
        { rank: 4, name: 'James Dean', score: 2398, quizzes: 9 },
        { rank: 5, name: 'Luna Loveg', score: 2156, quizzes: 8 },
    ];

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <p className="text-gray-400 text-sm mb-2">Admin Dashboard</p>
                <h1 className="text-5xl font-serif">
                    Grow <span className="italic">smarter.</span>
                </h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                        <Users size={24} />
                        <TrendingUp size={20} className="text-purple-200" />
                    </div>
                    <div className="text-4xl font-bold mb-1">{stats.totalStudents}</div>
                    <div className="text-sm text-purple-200">Total Students</div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                        <BookOpen size={24} />
                        <TrendingUp size={20} className="text-blue-200" />
                    </div>
                    <div className="text-4xl font-bold mb-1">{stats.totalQuizzes}</div>
                    <div className="text-sm text-blue-200">Total Quizzes</div>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={24} />
                        <TrendingUp size={20} className="text-green-200" />
                    </div>
                    <div className="text-4xl font-bold mb-1">{stats.activeQuizzes}</div>
                    <div className="text-sm text-green-200">Active Quizzes</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={24} />
                        <TrendingUp size={20} className="text-yellow-200" />
                    </div>
                    <div className="text-4xl font-bold mb-1">{stats.avgScore}%</div>
                    <div className="text-sm text-yellow-200">Average Score</div>
                </div>
            </div>

            {/* Learning Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {learningCards.map((card, idx) => (
                    <div
                        key={idx}
                        className={`${card.bg} ${card.textColor} p-8 rounded-2xl h-64 flex flex-col justify-between transition-transform hover:-translate-y-2 cursor-pointer`}
                    >
                        <div>
                            <h3 className="text-4xl font-normal mb-2">{card.title}</h3>
                            <p className="opacity-70 text-sm">{card.subtitle}</p>
                        </div>
                        <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold w-full uppercase flex items-center justify-center gap-2">
                            View Quizzes →
                        </button>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Quizzes */}
                <div className="lg:col-span-2 bg-[#E5C1FF] text-black p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Recent Quizzes</h3>
                        <Link
                            to="/admin/quizzes/create"
                            className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Create Quiz
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentQuizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="bg-black/80 text-white p-4 rounded-xl flex justify-between items-center hover:bg-black transition-colors cursor-pointer"
                            >
                                <div>
                                    <h4 className="font-bold">{quiz.title}</h4>
                                    <p className="text-xs text-gray-400">
                                        {quiz.students} students • Avg: {quiz.avgScore}%
                                    </p>
                                </div>
                                <div
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${quiz.status === 'Published'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-yellow-500 text-black'
                                        }`}
                                >
                                    {quiz.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Students */}
                <div className="bg-[#FFE66D] text-black p-6 rounded-2xl h-fit">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Top Students</h3>
                        <TrendingUp size={20} />
                    </div>
                    <div className="space-y-3">
                        {topStudents.map((student) => (
                            <div key={student.rank} className="flex items-center gap-3">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${student.rank === 1
                                            ? 'bg-yellow-400'
                                            : student.rank === 2
                                                ? 'bg-gray-300'
                                                : student.rank === 3
                                                    ? 'bg-orange-300'
                                                    : 'bg-gray-200'
                                        }`}
                                >
                                    {student.rank}
                                </div>
                                <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm">{student.name}</div>
                                    <div className="text-xs text-gray-600">{student.quizzes} quizzes</div>
                                </div>
                                <div className="text-sm font-bold">{student.score}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    to="/admin/quizzes/create"
                    className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-purple-600 transition-colors"
                >
                    <Plus size={32} className="mb-4 text-purple-400" />
                    <h3 className="text-xl font-bold mb-2">Create New Quiz</h3>
                    <p className="text-gray-400 text-sm">Build a new quiz for your students</p>
                </Link>

                <Link
                    to="/admin/students"
                    className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-blue-600 transition-colors"
                >
                    <Users size={32} className="mb-4 text-blue-400" />
                    <h3 className="text-xl font-bold mb-2">Manage Students</h3>
                    <p className="text-gray-400 text-sm">View and manage student accounts</p>
                </Link>

                <Link
                    to="/admin/analytics"
                    className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-green-600 transition-colors"
                >
                    <TrendingUp size={32} className="mb-4 text-green-400" />
                    <h3 className="text-xl font-bold mb-2">View Analytics</h3>
                    <p className="text-gray-400 text-sm">Analyze performance and trends</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
