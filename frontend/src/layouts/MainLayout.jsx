import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar will go here */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-primary-600">QuizMaster</h1>
                    <div>
                        {/* Nav Links */}
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    &copy; 2026 QuizMaster. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
