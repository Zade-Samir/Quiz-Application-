import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [filter, setFilter] = useState('all'); // all, weekly, monthly
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // TODO: Fetch leaderboard from API
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUser({ ...user, rank: 24, score: 2156 });

        setLeaderboard([
            { rank: 1, name: 'Mike John', score: 2847, quizzes: 12, avgScore: 89, badge: 'gold' },
            { rank: 2, name: 'Emma Watson', score: 2654, quizzes: 11, avgScore: 87, badge: 'silver' },
            { rank: 3, name: 'Sarah Connor', score: 2531, quizzes: 10, avgScore: 85, badge: 'bronze' },
            { rank: 4, name: 'James Dean', score: 2398, quizzes: 9, avgScore: 84 },
            { rank: 5, name: 'Luna Loveg', score: 2156, quizzes: 8, avgScore: 82 },
            { rank: 6, name: 'John Doe', score: 2089, quizzes: 10, avgScore: 81 },
            { rank: 7, name: 'Alice Smith', score: 1987, quizzes: 9, avgScore: 80 },
            { rank: 8, name: 'Bob Johnson', score: 1876, quizzes: 8, avgScore: 79 },
            { rank: 9, name: 'Charlie Brown', score: 1765, quizzes: 7, avgScore: 78 },
            { rank: 10, name: 'Diana Prince', score: 1654, quizzes: 9, avgScore: 77 },
        ]);
    }, []);

    const getBadgeIcon = (badge) => {
        switch (badge) {
            case 'gold':
                return <Trophy className="text-yellow-400" size={24} />;
            case 'silver':
                return <Medal className="text-gray-300" size={24} />;
            case 'bronze':
                return <Award className="text-orange-400" size={24} />;
            default:
                return null;
        }
    };

    const getRankColor = (rank) => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-600 to-yellow-400';
        if (rank === 2) return 'bg-gradient-to-r from-gray-500 to-gray-300';
        if (rank === 3) return 'bg-gradient-to-r from-orange-600 to-orange-400';
        return 'bg-gray-800';
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-b border-gray-800">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Trophy className="text-yellow-400" size={48} />
                        <h1 className="text-5xl font-serif">
                            Leader<span className="italic">board</span>
                        </h1>
                    </div>
                    <p className="text-center text-gray-300 text-lg">
                        Top performers across all quizzes
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Filter Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${filter === 'all'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                            }`}
                    >
                        All Time
                    </button>
                    <button
                        onClick={() => setFilter('monthly')}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${filter === 'monthly'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                            }`}
                    >
                        This Month
                    </button>
                    <button
                        onClick={() => setFilter('weekly')}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${filter === 'weekly'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                            }`}
                    >
                        This Week
                    </button>
                </div>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center pt-12">
                        <div className="relative mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-2xl font-bold">
                                2
                            </div>
                            <Medal className="absolute -top-2 -right-2 text-gray-300" size={32} />
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg mb-1">{leaderboard[1]?.name}</div>
                            <div className="text-2xl font-bold text-gray-300 mb-1">{leaderboard[1]?.score}</div>
                            <div className="text-sm text-gray-500">{leaderboard[1]?.quizzes} quizzes</div>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center">
                        <div className="relative mb-4">
                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl font-bold">
                                1
                            </div>
                            <Trophy className="absolute -top-3 -right-3 text-yellow-400" size={40} />
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-xl mb-1">{leaderboard[0]?.name}</div>
                            <div className="text-3xl font-bold text-yellow-400 mb-1">{leaderboard[0]?.score}</div>
                            <div className="text-sm text-gray-500">{leaderboard[0]?.quizzes} quizzes</div>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center pt-16">
                        <div className="relative mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">
                                3
                            </div>
                            <Award className="absolute -top-2 -right-2 text-orange-400" size={32} />
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg mb-1">{leaderboard[2]?.name}</div>
                            <div className="text-2xl font-bold text-orange-400 mb-1">{leaderboard[2]?.score}</div>
                            <div className="text-sm text-gray-500">{leaderboard[2]?.quizzes} quizzes</div>
                        </div>
                    </div>
                </div>

                {/* Full Leaderboard */}
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                    <div className="bg-gray-800 px-6 py-4 grid grid-cols-12 gap-4 font-bold text-sm text-gray-400">
                        <div className="col-span-1">Rank</div>
                        <div className="col-span-4">Player</div>
                        <div className="col-span-2 text-center">Score</div>
                        <div className="col-span-2 text-center">Quizzes</div>
                        <div className="col-span-2 text-center">Avg Score</div>
                        <div className="col-span-1 text-center">Trend</div>
                    </div>

                    <div className="divide-y divide-gray-800">
                        {leaderboard.map((player) => (
                            <div
                                key={player.rank}
                                className={`px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-800/50 transition-colors ${currentUser?.name === player.name ? 'bg-purple-900/20 border-l-4 border-purple-600' : ''
                                    }`}
                            >
                                <div className="col-span-1">
                                    <div className={`w-10 h-10 ${getRankColor(player.rank)} rounded-lg flex items-center justify-center font-bold`}>
                                        {player.rank}
                                    </div>
                                </div>
                                <div className="col-span-4 flex items-center gap-3">
                                    {getBadgeIcon(player.badge)}
                                    <div>
                                        <div className="font-bold">
                                            {player.name}
                                            {currentUser?.name === player.name && (
                                                <span className="ml-2 text-xs bg-purple-600 px-2 py-1 rounded-full">You</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 text-center">
                                    <div className="text-xl font-bold text-purple-400">{player.score}</div>
                                </div>
                                <div className="col-span-2 text-center">
                                    <div className="font-medium">{player.quizzes}</div>
                                </div>
                                <div className="col-span-2 text-center">
                                    <div className="font-medium">{player.avgScore}%</div>
                                </div>
                                <div className="col-span-1 text-center">
                                    <TrendingUp className="text-green-400 mx-auto" size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Your Rank Card */}
                {currentUser && currentUser.rank > 10 && (
                    <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-800/30 rounded-2xl p-6">
                        <h3 className="text-xl font-bold mb-4">Your Ranking</h3>
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold text-purple-400">#{currentUser.rank}</div>
                                <div className="text-sm text-gray-400">Your Rank</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-400">{currentUser.score}</div>
                                <div className="text-sm text-gray-400">Total Score</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-400">{currentUser.rank - 1}</div>
                                <div className="text-sm text-gray-400">To Beat</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
