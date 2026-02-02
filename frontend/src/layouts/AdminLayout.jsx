import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Users, FileQuestion, LogOut } from 'lucide-react';

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
                <div className="p-6 text-2xl font-bold text-center border-b border-slate-700">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                        <Users size={20} /> Users
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                        <FileQuestion size={20} /> Quizzes
                    </div>
                </nav>
                <div className="p-4 border-t border-slate-700">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-600 rounded-lg transition-colors">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4 md:hidden">
                    Admin Menu (Mobile)
                </header>
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
