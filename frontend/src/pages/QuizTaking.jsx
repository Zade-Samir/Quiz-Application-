import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Flag, AlertCircle } from 'lucide-react';

const QuizTaking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        // TODO: Fetch quiz with questions from API
        setQuiz({
            id: parseInt(id),
            title: 'Java Fundamentals',
            duration: 30,
            questions: [
                {
                    id: 1,
                    text: 'What is the main purpose of the "static" keyword in Java?',
                    options: [
                        'To create instance variables',
                        'To create class-level members that belong to the class rather than instances',
                        'To prevent inheritance',
                        'To enable garbage collection',
                    ],
                },
                {
                    id: 2,
                    text: 'Which of the following is NOT a valid access modifier in Java?',
                    options: ['public', 'private', 'protected', 'package'],
                },
                {
                    id: 3,
                    text: 'What is the output of: System.out.println(10 + 20 + "Hello");',
                    options: ['1020Hello', '30Hello', 'Hello1020', 'Hello30'],
                },
                // Add more questions as needed
            ],
        });
    }, [id]);

    useEffect(() => {
        if (!quiz) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quiz]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (questionId, optionIndex) => {
        setAnswers({ ...answers, [questionId]: optionIndex });
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        // TODO: Submit answers to API
        const attemptData = {
            quizId: quiz.id,
            answers: Object.entries(answers).map(([questionId, answer]) => ({
                questionId: parseInt(questionId),
                selectedOption: answer,
            })),
            timeTaken: quiz.duration * 60 - timeRemaining,
        };

        console.log('Submitting:', attemptData);

        // Navigate to results page
        navigate(`/quiz/${quiz.id}/results`, { state: { attemptData } });
    };

    if (!quiz) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl">Loading quiz...</div>
            </div>
        );
    }

    const question = quiz.questions[currentQuestion];
    const answeredCount = Object.keys(answers).length;
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">{quiz.title}</h1>
                            <p className="text-sm text-gray-400">
                                Question {currentQuestion + 1} of {quiz.questions.length}
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Clock size={20} className={timeRemaining < 300 ? 'text-red-400' : 'text-blue-400'} />
                                <span className={`text-lg font-mono font-bold ${timeRemaining < 300 ? 'text-red-400' : ''}`}>
                                    {formatTime(timeRemaining)}
                                </span>
                            </div>
                            <button
                                onClick={() => setShowSubmitModal(true)}
                                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                            >
                                <Flag size={18} />
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-purple-600 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Question Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-900 rounded-2xl p-8">
                            {/* Question */}
                            <div className="mb-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                                        {currentQuestion + 1}
                                    </span>
                                    <h2 className="text-2xl font-semibold flex-1">{question.text}</h2>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-4">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(question.id, index)}
                                        className={`w-full text-left p-6 rounded-xl border-2 transition-all ${answers[question.id] === index
                                                ? 'border-purple-600 bg-purple-600/20'
                                                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${answers[question.id] === index
                                                        ? 'border-purple-600 bg-purple-600'
                                                        : 'border-gray-600'
                                                    }`}
                                            >
                                                {answers[question.id] === index && (
                                                    <div className="w-3 h-3 bg-white rounded-full" />
                                                )}
                                            </div>
                                            <span className="text-lg">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                    Previous
                                </button>

                                {currentQuestion === quiz.questions.length - 1 ? (
                                    <button
                                        onClick={() => setShowSubmitModal(true)}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 transition-colors"
                                    >
                                        <Flag size={20} />
                                        Submit Quiz
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 transition-colors"
                                    >
                                        Next
                                        <ChevronRight size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Question Navigator */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-2xl p-6 sticky top-24">
                            <h3 className="font-bold mb-4">Questions</h3>
                            <div className="grid grid-cols-5 gap-2 mb-4">
                                {quiz.questions.map((q, index) => (
                                    <button
                                        key={q.id}
                                        onClick={() => setCurrentQuestion(index)}
                                        className={`aspect-square rounded-lg font-bold text-sm transition-all ${index === currentQuestion
                                                ? 'bg-purple-600 text-white'
                                                : answers[q.id] !== undefined
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="text-sm text-gray-400 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-600 rounded" />
                                    <span>Answered ({answeredCount})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-800 rounded" />
                                    <span>Not Answered ({quiz.questions.length - answeredCount})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Confirmation Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="text-yellow-400" size={32} />
                            <h2 className="text-2xl font-bold">Submit Quiz?</h2>
                        </div>
                        <p className="text-gray-300 mb-6">
                            You have answered {answeredCount} out of {quiz.questions.length} questions.
                            {answeredCount < quiz.questions.length && (
                                <span className="block mt-2 text-yellow-400">
                                    {quiz.questions.length - answeredCount} question(s) remain unanswered.
                                </span>
                            )}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="flex-1 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Continue Quiz
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Submit Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizTaking;
