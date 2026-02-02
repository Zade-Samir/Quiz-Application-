import { useState, useEffect } from 'react';
import { TrendingUp, Users, BookOpen, Target } from 'lucide-react';

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        // TODO: Fetch analytics from API
        setAnalytics({
            totalQuizzes: 18,
            totalStudents: 247,
            totalAttempts: 1543,
            avgCompletionRate: 78,
            quizPerformance: [
                { name: 'Java Fundamentals', attempts: 245, avgScore: 78, completionRate: 92 },
                { name: 'React Basics', attempts: 189, avgScore: 82, completionRate: 88 },
                { name: 'Spring Boot', attempts: 156, avgScore: 65, completionRate: 75 },
                { name: 'Database Design', attempts: 203, avgScore: 71, completionRate: 85 },
            ],
            categoryPerformance: [
                { category: 'Java', avgScore: 78, quizzes: 5 },
                { category: 'React', avgScore: 82, quizzes: 3 },
                { category: 'Spring', avgScore: 65, quizzes: 4 },
                { category: 'Database', avgScore: 71, quizzes: 3 },
                { category: 'Security', avgScore: 74, quizzes: 3 },
            ],
            recentActivity: [
                { student: 'Mike John', quiz: 'Java Fundamentals', score: 89, date: '2 hours ago' },
                { student: 'Emma Watson', quiz: 'React Basics', score: 92, date: '3 hours ago' },
                { student: 'Sarah Connor', quiz: 'Spring Boot', score: 78, date: '5 hours ago' },
            ],
        });
    }, []);

    if (!analytics) {
        return (
            <div className="p-6 lg:p-8">
                <div className="text-xl">Loading analytics...</div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
                <p className="text-gray-400">Track performance and insights</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl">
                    <BookOpen className="mb-4 text-purple-200" size={32} />
                    <div className="text-4xl font-bold mb-1">{analytics.totalQuizzes}</div>
                    <div className="text-sm text-purple-200">Total Quizzes</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl">
                    <Users className="mb-4 text-blue-200" size={32} />
                    <div className="text-4xl font-bold mb-1">{analytics.totalStudents}</div>
                    <div className="text-sm text-blue-200">Total Students</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl">
                    <Target className="mb-4 text-green-200" size={32} />
                    <div className="text-4xl font-bold mb-1">{analytics.totalAttempts}</div>
                    <div className="text-sm text-green-200">Total Attempts</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-2xl">
                    <TrendingUp className="mb-4 text-yellow-200" size={32} />
                    <div className="text-4xl font-bold mb-1">{analytics.avgCompletionRate}%</div>
                    <div className="text-sm text-yellow-200">Completion Rate</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Quiz Performance */}
                <div className="bg-gray-900 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Quiz Performance</h2>
                    <div className="space-y-4">
                        {analytics.quizPerformance.map((quiz, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-xl">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-bold">{quiz.name}</h3>
                                        <p className="text-sm text-gray-400">{quiz.attempts} attempts</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-purple-400">{quiz.avgScore}%</div>
                                        <div className="text-xs text-gray-500">Avg Score</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">Completion Rate</span>
                                        <span className="font-bold">{quiz.completionRate}%</span>
                                    </div>
                                    <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-full"
                                            style={{ width: `${quiz.completionRate}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Performance */}
                <div className="bg-gray-900 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Category Performance</h2>
                    <div className="space-y-4">
                        {analytics.categoryPerformance.map((category, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <h3 className="font-bold">{category.category}</h3>
                                        <p className="text-sm text-gray-400">{category.quizzes} quizzes</p>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-400">{category.avgScore}%</div>
                                </div>
                                <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full"
                                        style={{ width: `${category.avgScore}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-3">
                    {analytics.recentActivity.map((activity, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
                                    {activity.student.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold">{activity.student}</div>
                                    <div className="text-sm text-gray-400">completed {activity.quiz}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-green-400">{activity.score}%</div>
                                <div className="text-xs text-gray-500">{activity.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
