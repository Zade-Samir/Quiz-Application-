import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Clock, CheckCircle, XCircle, Home, RotateCcw, Share2 } from 'lucide-react';

const QuizResults = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [results, setResults] = useState(null);

    useEffect(() => {
        // TODO: Fetch actual results from API
        // For now, calculate mock results
        const attemptData = location.state?.attemptData;

        setResults({
            quizId: parseInt(id),
            quizTitle: 'Java Fundamentals',
            score: 85,
            totalQuestions: 20,
            correctAnswers: 17,
            incorrectAnswers: 3,
            timeTaken: 1245, // seconds
            passingScore: 70,
            rank: 24,
            totalParticipants: 245,
            percentile: 90,
            passed: true,
        });
    }, [id, location]);

    if (!results) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl">Loading results...</div>
            </div>
        );
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className={`${results.passed ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50' : 'bg-gradient-to-r from-red-900/50 to-orange-900/50'} border-b border-gray-800`}>
                <div className="max-w-5xl mx-auto px-6 py-12 text-center">
                    <div className="mb-6">
                        {results.passed ? (
                            <Trophy className="mx-auto text-yellow-400" size={64} />
                        ) : (
                            <XCircle className="mx-auto text-red-400" size={64} />
                        )}
                    </div>
                    <h1 className="text-5xl font-bold mb-4">
                        {results.passed ? 'Congratulations!' : 'Keep Trying!'}
                    </h1>
                    <p className="text-xl text-gray-300 mb-2">{results.quizTitle}</p>
                    <p className="text-gray-400">
                        {results.passed
                            ? `You've passed the quiz with flying colors!`
                            : `You scored ${results.score}%. Passing score is ${results.passingScore}%`
                        }
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Score Card */}
                <div className="bg-gray-900 rounded-2xl p-8 mb-8">
                    <div className="text-center mb-8">
                        <div className="text-7xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            {results.score}%
                        </div>
                        <div className="text-gray-400">Your Score</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-gray-800 rounded-xl">
                            <CheckCircle className="mx-auto mb-2 text-green-400" size={32} />
                            <div className="text-2xl font-bold text-green-400">{results.correctAnswers}</div>
                            <div className="text-sm text-gray-400">Correct</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800 rounded-xl">
                            <XCircle className="mx-auto mb-2 text-red-400" size={32} />
                            <div className="text-2xl font-bold text-red-400">{results.incorrectAnswers}</div>
                            <div className="text-sm text-gray-400">Incorrect</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800 rounded-xl">
                            <Clock className="mx-auto mb-2 text-blue-400" size={32} />
                            <div className="text-2xl font-bold text-blue-400">{formatTime(results.timeTaken)}</div>
                            <div className="text-sm text-gray-400">Time Taken</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800 rounded-xl">
                            <Trophy className="mx-auto mb-2 text-yellow-400" size={32} />
                            <div className="text-2xl font-bold text-yellow-400">#{results.rank}</div>
                            <div className="text-sm text-gray-400">Rank</div>
                        </div>
                    </div>
                </div>

                {/* Performance Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-900 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4">Performance</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">Accuracy</span>
                                    <span className="font-bold">{results.score}%</span>
                                </div>
                                <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-full"
                                        style={{ width: `${results.score}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">Percentile</span>
                                    <span className="font-bold">{results.percentile}th</span>
                                </div>
                                <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-full"
                                        style={{ width: `${results.percentile}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4">Ranking</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Your Rank</span>
                                <span className="text-2xl font-bold text-yellow-400">#{results.rank}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Total Participants</span>
                                <span className="font-bold">{results.totalParticipants}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Beat</span>
                                <span className="font-bold text-green-400">
                                    {Math.round((1 - results.rank / results.totalParticipants) * 100)}% of participants
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => navigate('/player')}
                        className="bg-gray-900 hover:bg-gray-800 border border-gray-800 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        <Home size={20} />
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate(`/quiz/${results.quizId}/take`)}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        <RotateCcw size={20} />
                        Retake Quiz
                    </button>
                    <button
                        onClick={() => {
                            // TODO: Implement share functionality
                            alert('Share functionality coming soon!');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        <Share2 size={20} />
                        Share Results
                    </button>
                </div>

                {/* Motivational Message */}
                <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800/30 rounded-2xl p-6 text-center">
                    <p className="text-lg text-gray-300">
                        {results.passed
                            ? "Great job! Keep up the excellent work and continue learning."
                            : "Don't give up! Review the material and try again. You've got this!"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuizResults;
