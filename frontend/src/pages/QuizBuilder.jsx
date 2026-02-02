import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Eye } from 'lucide-react';

const QuizBuilder = () => {
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        category: '',
        duration: 30,
        passingScore: 70,
    });

    const [questions, setQuestions] = useState([
        {
            id: 1,
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            points: 1,
        },
    ]);

    const handleQuizChange = (field, value) => {
        setQuiz({ ...quiz, [field]: value });
    };

    const handleQuestionChange = (questionId, field, value) => {
        setQuestions(
            questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
            )
        );
    };

    const handleOptionChange = (questionId, optionIndex, value) => {
        setQuestions(
            questions.map((q) =>
                q.id === questionId
                    ? {
                        ...q,
                        options: q.options.map((opt, idx) =>
                            idx === optionIndex ? value : opt
                        ),
                    }
                    : q
            )
        );
    };

    const addQuestion = () => {
        const newQuestion = {
            id: questions.length + 1,
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            points: 1,
        };
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = (questionId) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((q) => q.id !== questionId));
        }
    };

    const handleSaveDraft = async () => {
        // TODO: Call API to save as draft
        console.log('Saving draft:', { quiz, questions });
        alert('Quiz saved as draft!');
    };

    const handlePublish = async () => {
        // TODO: Validate and call API to publish
        if (!quiz.title || !quiz.description) {
            alert('Please fill in all quiz details');
            return;
        }

        const hasEmptyQuestions = questions.some(
            (q) => !q.questionText || q.options.some((opt) => !opt)
        );

        if (hasEmptyQuestions) {
            alert('Please complete all questions and options');
            return;
        }

        console.log('Publishing quiz:', { quiz, questions });
        alert('Quiz published successfully!');
        navigate('/admin/quizzes');
    };

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Create New Quiz</h1>
                <p className="text-gray-400">Build your quiz step by step</p>
            </div>

            {/* Quiz Details */}
            <div className="bg-gray-900 p-6 rounded-2xl mb-6">
                <h2 className="text-2xl font-bold mb-4">Quiz Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Quiz Title *</label>
                        <input
                            type="text"
                            value={quiz.title}
                            onChange={(e) => handleQuizChange('title', e.target.value)}
                            placeholder="e.g., Java Fundamentals"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-0"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <textarea
                            value={quiz.description}
                            onChange={(e) => handleQuizChange('description', e.target.value)}
                            placeholder="Brief description of the quiz"
                            rows="3"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            value={quiz.category}
                            onChange={(e) => handleQuizChange('category', e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-0"
                        >
                            <option value="">Select Category</option>
                            <option value="Java">Java</option>
                            <option value="React">React</option>
                            <option value="Spring">Spring</option>
                            <option value="Security">Security</option>
                            <option value="Database">Database</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                        <input
                            type="number"
                            value={quiz.duration}
                            onChange={(e) => handleQuizChange('duration', parseInt(e.target.value))}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Passing Score (%)</label>
                        <input
                            type="number"
                            value={quiz.passingScore}
                            onChange={(e) => handleQuizChange('passingScore', parseInt(e.target.value))}
                            min="0"
                            max="100"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-0"
                        />
                    </div>
                </div>
            </div>

            {/* Questions */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Questions ({questions.length})</h2>
                    <button
                        onClick={addQuestion}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        Add Question
                    </button>
                </div>

                <div className="space-y-6">
                    {questions.map((question, qIndex) => (
                        <div key={question.id} className="bg-gray-900 p-6 rounded-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold">Question {qIndex + 1}</h3>
                                {questions.length > 1 && (
                                    <button
                                        onClick={() => removeQuestion(question.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Question Text *</label>
                                    <textarea
                                        value={question.questionText}
                                        onChange={(e) =>
                                            handleQuestionChange(question.id, 'questionText', e.target.value)
                                        }
                                        placeholder="Enter your question"
                                        rows="2"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Options *</label>
                                    <div className="space-y-2">
                                        {question.options.map((option, optIndex) => (
                                            <div key={optIndex} className="flex gap-2 items-center">
                                                <input
                                                    type="radio"
                                                    name={`correct-${question.id}`}
                                                    checked={question.correctAnswer === optIndex}
                                                    onChange={() =>
                                                        handleQuestionChange(question.id, 'correctAnswer', optIndex)
                                                    }
                                                    className="w-4 h-4 text-purple-600"
                                                />
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) =>
                                                        handleOptionChange(question.id, optIndex, e.target.value)
                                                    }
                                                    placeholder={`Option ${optIndex + 1}`}
                                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-0"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Select the correct answer by clicking the radio button</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Points</label>
                                        <input
                                            type="number"
                                            value={question.points}
                                            onChange={(e) =>
                                                handleQuestionChange(question.id, 'points', parseInt(e.target.value))
                                            }
                                            min="1"
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-end sticky bottom-6 bg-black/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-800">
                <button
                    onClick={() => navigate('/admin/quizzes')}
                    className="px-6 py-3 rounded-lg font-medium text-gray-400 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSaveDraft}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Save size={20} />
                    Save Draft
                </button>
                <button
                    onClick={handlePublish}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Eye size={20} />
                    Publish Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizBuilder;
