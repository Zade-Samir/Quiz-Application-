import { useState, useEffect } from 'react';
import { Search, Clock, BookOpen, TrendingUp, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuizBrowse = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Categories', color: 'bg-gray-700' },
        { id: 'java', name: 'Java', color: 'bg-[#FFD25A]' },
        { id: 'react', name: 'React', color: 'bg-[#A8D1FF]' },
        { id: 'spring', name: 'Spring', color: 'bg-[#989EF8]' },
        { id: 'security', name: 'Security', color: 'bg-[#F4BFFF]' },
        { id: 'database', name: 'Database', color: 'bg-[#A8FFD1]' },
    ];

    useEffect(() => {
        // TODO: Fetch quizzes from API
        setQuizzes([
            {
                id: 1,
                title: 'Java Fundamentals',
                description: 'Test your knowledge of Java basics including OOP, data structures, and core concepts',
                category: 'java',
                questions: 20,
                duration: 30,
                difficulty: 'Intermediate',
                participants: 245,
                avgScore: 78,
            },
            {
                id: 2,
                title: 'React Basics',
                description: 'Introduction to React components, hooks, and state management',
                category: 'react',
                questions: 15,
                duration: 25,
                difficulty: 'Beginner',
                participants: 189,
                avgScore: 82,
            },
            {
                id: 3,
                title: 'Spring Boot Advanced',
                description: 'Advanced Spring Boot concepts including microservices and security',
                category: 'spring',
                questions: 25,
                duration: 40,
                difficulty: 'Advanced',
                participants: 156,
                avgScore: 65,
            },
            {
                id: 4,
                title: 'Database Design',
                description: 'SQL queries, normalization, and database optimization techniques',
                category: 'database',
                questions: 18,
                duration: 35,
                difficulty: 'Intermediate',
                participants: 203,
                avgScore: 71,
            },
            {
                id: 5,
                title: 'Cybersecurity Essentials',
                description: 'Security fundamentals, encryption, and best practices',
                category: 'security',
                questions: 22,
                duration: 30,
                difficulty: 'Intermediate',
                participants: 178,
                avgScore: 74,
            },
        ]);
    }, []);

    const filteredQuizzes = quizzes.filter((quiz) => {
        const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
        const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-5xl font-serif mb-4">
                        Explore <span className="italic">Quizzes</span>
                    </h1>
                    <p className="text-gray-300 text-lg">Challenge yourself and grow smarter</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search and Filter */}
                <div className="mb-8">
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-0 transition-colors"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === category.id
                                        ? 'bg-purple-600 text-white scale-105'
                                        : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quiz Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-600 transition-all hover:-translate-y-2 group"
                        >
                            {/* Category Header */}
                            <div className={`h-2 ${categories.find(c => c.id === quiz.category)?.color || 'bg-gray-700'}`} />

                            <div className="p-6">
                                {/* Difficulty Badge */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`${getDifficultyColor(quiz.difficulty)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                                        {quiz.difficulty}
                                    </span>
                                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                                        <TrendingUp size={14} />
                                        <span>{quiz.avgScore}%</span>
                                    </div>
                                </div>

                                {/* Quiz Info */}
                                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                                    {quiz.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    {quiz.description}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-800">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                                            <BookOpen size={16} />
                                        </div>
                                        <div className="text-sm font-bold">{quiz.questions}</div>
                                        <div className="text-xs text-gray-500">Questions</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                                            <Clock size={16} />
                                        </div>
                                        <div className="text-sm font-bold">{quiz.duration}m</div>
                                        <div className="text-xs text-gray-500">Duration</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-bold">{quiz.participants}</div>
                                        <div className="text-xs text-gray-500">Taken</div>
                                    </div>
                                </div>

                                {/* Start Button */}
                                <Link
                                    to={`/quiz/${quiz.id}`}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Play size={20} />
                                    Start Quiz
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredQuizzes.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-2">No quizzes found</div>
                        <p className="text-gray-600">Try adjusting your search or filter</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizBrowse;
