import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, TrendingUp, Users, Play, ArrowLeft } from 'lucide-react';

const QuizDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        // TODO: Fetch quiz details from API
        setQuiz({
            id: parseInt(id),
            title: 'Java Fundamentals',
            description: 'Test your knowledge of Java basics including OOP, data structures, and core concepts. This comprehensive quiz covers essential Java programming principles.',
            category: 'Java',
            questions: 20,
            duration: 30,
            difficulty: 'Intermediate',
            participants: 245,
            avgScore: 78,
            passingScore: 70,
            topics: [
                'Object-Oriented Programming',
                'Data Structures',
                'Exception Handling',
                'Collections Framework',
                'Multithreading',
            ],
            instructions: [
                'Read each question carefully before answering',
                'You can navigate between questions using Next/Previous buttons',
                'Once submitted, you cannot change your answers',
                'Make sure you have a stable internet connection',
            ],
        });
    }, [id]);

    if (!quiz) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-500';
            case 'Intermediate':
                return 'bg-yellow-500';
            case 'Advanced':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-gray-800">
                <div className="max-w-5xl mx-auto px-6 py-8">
                    <button
                        onClick={() => navigate('/quizzes')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Quizzes
                    </button>
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`${getDifficultyColor(quiz.difficulty)} text-white text-sm font-bold px-4 py-1 rounded-full`}>
                                    {quiz.difficulty}
                                </span>
                                <span className="bg-gray-800 text-gray-300 text-sm font-medium px-4 py-1 rounded-full">
                                    {quiz.category}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold mb-3">{quiz.title}</h1>
                            <p className="text-gray-300 text-lg max-w-3xl">{quiz.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats */}
                        <div className="bg-gray-900 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Quiz Statistics</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-gray-800 rounded-xl">
                                    <BookOpen className="mx-auto mb-2 text-purple-400" size={24} />
                                    <div className="text-2xl font-bold">{quiz.questions}</div>
                                    <div className="text-sm text-gray-400">Questions</div>
                                </div>
                                <div className="text-center p-4 bg-gray-800 rounded-xl">
                                    <Clock className="mx-auto mb-2 text-blue-400" size={24} />
                                    <div className="text-2xl font-bold">{quiz.duration}m</div>
                                    <div className="text-sm text-gray-400">Duration</div>
                                </div>
                                <div className="text-center p-4 bg-gray-800 rounded-xl">
                                    <Users className="mx-auto mb-2 text-green-400" size={24} />
                                    <div className="text-2xl font-bold">{quiz.participants}</div>
                                    <div className="text-sm text-gray-400">Participants</div>
                                </div>
                                <div className="text-center p-4 bg-gray-800 rounded-xl">
                                    <TrendingUp className="mx-auto mb-2 text-yellow-400" size={24} />
                                    <div className="text-2xl font-bold">{quiz.avgScore}%</div>
                                    <div className="text-sm text-gray-400">Avg Score</div>
                                </div>
                            </div>
                        </div>

                        {/* Topics Covered */}
                        <div className="bg-gray-900 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Topics Covered</h2>
                            <div className="flex flex-wrap gap-2">
                                {quiz.topics.map((topic, index) => (
                                    <span
                                        key={index}
                                        className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-lg text-sm font-medium"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-gray-900 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Instructions</h2>
                            <ul className="space-y-3">
                                {quiz.instructions.map((instruction, index) => (
                                    <li key={index} className="flex gap-3 text-gray-300">
                                        <span className="text-purple-400 font-bold">{index + 1}.</span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-2xl p-6 sticky top-6">
                            <h2 className="text-xl font-bold mb-4">Ready to Start?</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Passing Score</span>
                                    <span className="font-bold">{quiz.passingScore}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Time Limit</span>
                                    <span className="font-bold">{quiz.duration} minutes</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Total Questions</span>
                                    <span className="font-bold">{quiz.questions}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/quiz/${quiz.id}/take`)}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors mb-4"
                            >
                                <Play size={24} />
                                Start Quiz
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                Make sure you have enough time to complete the quiz
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizDetail;
