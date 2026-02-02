import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuizManagement = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [filter, setFilter] = useState('all'); // all, published, draft
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // TODO: Fetch quizzes from API
        setQuizzes([
            {
                id: 1,
                title: 'Java Fundamentals',
                description: 'Test your knowledge of Java basics',
                questions: 20,
                duration: 30,
                status: 'published',
                category: 'Java',
                createdAt: '2026-01-15',
                students: 45,
            },
            {
                id: 2,
                title: 'React Basics',
                description: 'Introduction to React components',
                questions: 15,
                duration: 25,
                status: 'published',
                category: 'React',
                createdAt: '2026-01-20',
                students: 38,
            },
            {
                id: 3,
                title: 'Spring Boot Advanced',
                description: 'Advanced Spring Boot concepts',
                questions: 25,
                duration: 40,
                status: 'draft',
                category: 'Spring',
                createdAt: '2026-02-01',
                students: 0,
            },
        ]);
    }, []);

    const filteredQuizzes = quizzes.filter((quiz) => {
        const matchesFilter = filter === 'all' || quiz.status === filter;
        const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            // TODO: Call delete API
            setQuizzes(quizzes.filter((q) => q.id !== id));
        }
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Quiz Management</h1>
                    <p className="text-gray-400">Create and manage your quizzes</p>
                </div>
                <Link
                    to="/admin/quizzes/create"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Create New Quiz
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="bg-gray-900 p-6 rounded-2xl mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-0 transition-colors"
                        />
                    </div>

                    {/* Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filter === 'all'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('published')}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filter === 'published'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            Published
                        </button>
                        <button
                            onClick={() => setFilter('draft')}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filter === 'draft'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            Draft
                        </button>
                    </div>
                </div>
            </div>

            {/* Quiz Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-purple-600 transition-colors"
                    >
                        {/* Status Badge */}
                        <div className="flex justify-between items-start mb-4">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${quiz.status === 'published'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-yellow-500 text-black'
                                    }`}
                            >
                                {quiz.status.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">{quiz.createdAt}</span>
                        </div>

                        {/* Quiz Info */}
                        <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{quiz.description}</p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-800">
                            <div>
                                <div className="text-2xl font-bold text-purple-400">{quiz.questions}</div>
                                <div className="text-xs text-gray-500">Questions</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-400">{quiz.duration}m</div>
                                <div className="text-xs text-gray-500">Duration</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-400">{quiz.students}</div>
                                <div className="text-xs text-gray-500">Students</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Link
                                to={`/admin/quizzes/${quiz.id}`}
                                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <Eye size={16} />
                                View
                            </Link>
                            <Link
                                to={`/admin/quizzes/${quiz.id}/edit`}
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <Edit size={16} />
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(quiz.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredQuizzes.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">No quizzes found</div>
                    <Link
                        to="/admin/quizzes/create"
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                        <Plus size={20} />
                        Create Your First Quiz
                    </Link>
                </div>
            )}
        </div>
    );
};

export default QuizManagement;
