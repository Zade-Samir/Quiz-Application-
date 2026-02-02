import { useState, useEffect } from 'react';
import { Search, Filter, UserCheck, UserX, Mail, MoreVertical } from 'lucide-react';

const StudentsManagement = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive

    useEffect(() => {
        // TODO: Fetch students from API
        setStudents([
            {
                id: 1,
                name: 'Mike John',
                email: 'mike.john@example.com',
                quizzesTaken: 12,
                avgScore: 89,
                totalScore: 2847,
                status: 'active',
                joinedDate: '2026-01-15',
            },
            {
                id: 2,
                name: 'Emma Watson',
                email: 'emma.watson@example.com',
                quizzesTaken: 11,
                avgScore: 87,
                totalScore: 2654,
                status: 'active',
                joinedDate: '2026-01-18',
            },
            {
                id: 3,
                name: 'Sarah Connor',
                email: 'sarah.connor@example.com',
                quizzesTaken: 10,
                avgScore: 85,
                totalScore: 2531,
                status: 'active',
                joinedDate: '2026-01-20',
            },
            {
                id: 4,
                name: 'James Dean',
                email: 'james.dean@example.com',
                quizzesTaken: 9,
                avgScore: 84,
                totalScore: 2398,
                status: 'inactive',
                joinedDate: '2026-01-22',
            },
        ]);
    }, []);

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Students Management</h1>
                <p className="text-gray-400">Manage and monitor student performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl">
                    <div className="text-4xl font-bold mb-1">{students.length}</div>
                    <div className="text-sm text-purple-200">Total Students</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl">
                    <div className="text-4xl font-bold mb-1">
                        {students.filter((s) => s.status === 'active').length}
                    </div>
                    <div className="text-sm text-green-200">Active Students</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl">
                    <div className="text-4xl font-bold mb-1">
                        {Math.round(students.reduce((sum, s) => sum + s.avgScore, 0) / students.length)}%
                    </div>
                    <div className="text-sm text-blue-200">Average Score</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-2xl">
                    <div className="text-4xl font-bold mb-1">
                        {students.reduce((sum, s) => sum + s.quizzesTaken, 0)}
                    </div>
                    <div className="text-sm text-yellow-200">Total Attempts</div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-gray-900 p-6 rounded-2xl mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search students by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-0"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filterStatus === 'all'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterStatus('active')}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filterStatus === 'active'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilterStatus('inactive')}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${filterStatus === 'inactive'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            Inactive
                        </button>
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-400">Student</th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-400">Email</th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-gray-400">Quizzes</th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-gray-400">Avg Score</th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-gray-400">Total Score</th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-gray-400">Status</th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold">{student.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    Joined {student.joinedDate}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{student.email}</td>
                                    <td className="px-6 py-4 text-center font-bold">{student.quizzesTaken}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-purple-400">{student.avgScore}%</span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold">{student.totalScore}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${student.status === 'active'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-gray-700 text-gray-400'
                                                }`}
                                        >
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                                <Mail size={18} className="text-gray-400" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                                <MoreVertical size={18} className="text-gray-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
                <div className="text-center py-12 bg-gray-900 rounded-2xl">
                    <div className="text-gray-500 mb-2">No students found</div>
                    <p className="text-gray-600 text-sm">Try adjusting your search or filter</p>
                </div>
            )}
        </div>
    );
};

export default StudentsManagement;
