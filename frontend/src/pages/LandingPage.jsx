import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const LandingPage = () => {

    const categories = [
        { name: 'Science & Tech', desc: 'Test your knowledge in science & tech with our challenging quizzes.', color: 'bg-yellow-200 text-yellow-900' },
        { name: 'Mathematics', desc: 'Test your knowledge in mathematics with our challenging quizzes.', color: 'bg-blue-200 text-blue-900' },
        { name: 'Chemistry', desc: 'Test your knowledge in chemistry with our challenging quizzes.', color: 'bg-indigo-200 text-indigo-900' },
        { name: 'Biology', desc: 'Test your knowledge in biology with our challenging quizzes.', color: 'bg-pink-200 text-pink-900' },
        { name: 'Current Affairs', desc: 'Test your knowledge in current affairs with our challenging quizzes.', color: 'bg-teal-200 text-teal-900' },
        { name: 'General Knowledge', desc: 'Test your knowledge in general knowledge with our challenging quizzes.', color: 'bg-purple-200 text-purple-900' },
    ];

    // Using placeholder colors based on the design image
    const heroCards = [
        { title: 'Java', subtitle: 'Object-oriented language', bg: 'bg-[#FFD25A]', btn: 'bg-black text-[#FFD25A]' },
        { title: 'React', subtitle: 'UI component library', bg: 'bg-[#A8D1FF]', btn: 'bg-black text-[#A8D1FF]' },
        { title: 'Spring', subtitle: 'Java backend framework', bg: 'bg-[#989EF8]', btn: 'bg-black text-[#989EF8]' },
        { title: 'Security', subtitle: 'Access & protection', bg: 'bg-[#F4BFFF]', btn: 'bg-black text-[#F4BFFF]' },
    ];

    return (
        <div className="bg-black text-white min-h-screen font-sans">
            {/* Navbar Placeholder */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-xl font-serif italic text-gray-300">QuizMaster <span className="not-italic text-xs bg-gray-800 rounded-full px-2 py-1 ml-1">v1.0</span></div>
                <Link to="/login" className="bg-purple-300 text-black px-6 py-2 rounded-full font-bold hover:bg-purple-200 transition-colors">SignIn</Link>
            </nav>

            {/* Hero Section */}
            <section className="px-6 pb-12 max-w-7xl mx-auto">
                <div className="mb-10">
                    <p className="text-gray-400 text-sm mb-2">Smarter Quizzes for Smarter Decisions.</p>
                    <h1 className="text-6xl font-serif">Grow <span className="italic">smarter.</span></h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {heroCards.map((card, idx) => (
                        <div key={idx} className={`${card.bg} text-black p-8 rounded-2xl h-80 flex flex-col justify-between transition-transform hover:-translate-y-2`}>
                            <div>
                                <h3 className="text-4xl font-normal mb-2">{card.title}</h3>
                                <p className="opacity-70 text-sm">{card.subtitle}</p>
                            </div>
                            <button className={`${card.btn} flex items-center justify-between px-6 py-3 rounded-full text-sm font-bold w-full uppercase`}>
                                Launch Quiz <ArrowUpRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4 gap-4 text-gray-500 text-sm uppercase tracking-widest">
                    <span>Access</span> <span>|</span> <span>Learn</span> <span>|</span> <span>Improve</span>
                </div>
            </section>

            {/* Access Code Section */}
            <section className="bg-[#B9B4F8] py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-black font-bold text-xl">Here to take a test?</h3>
                        <p className="text-gray-700 text-xs">No Login, No Problem. We Trust You... Kinda. Enter your access code and start.</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <input type="text" placeholder="Enter the access code" className="px-6 py-3 rounded-full w-full md:w-80 outline-none text-black" />
                        <button className="bg-[#003C43] text-white px-8 py-3 rounded-full font-bold whitespace-nowrap">Start your test</button>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 px-6 max-w-7xl mx-auto text-center">
                <div className="inline-block bg-gray-800 px-4 py-1 rounded-full text-xs text-gray-300 mb-6">Categories</div>
                <h2 className="text-4xl font-bold mb-12">Explore <span className="text-[#FF6666]">Quiz Categories</span></h2>
                <p className="text-gray-500 -mt-8 mb-16">Pick a Quiz... If You Dare</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className={`${cat.color} p-6 rounded-xl text-left h-40 flex flex-col justify-between hover:opacity-90 transition-opacity cursor-pointer`}>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                                    {/* Icon placeholder */}
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-tight">{cat.name}</h4>
                                    <p className="text-xs mt-1 opacity-80 leading-relaxed">{cat.desc}</p>
                                </div>
                            </div>
                            <div className="text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                Explore Quizzes <ArrowUpRight size={12} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feedback Section (Placeholder based on design) */}
            <section className="py-20 px-6 max-w-7xl mx-auto text-center border-t border-gray-800">
                <div className="inline-block bg-gray-800 px-4 py-1 rounded-full text-xs text-gray-300 mb-6">Features</div>
                <h2 className="text-4xl font-bold mb-12">Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {/* Simulated Review Cards */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                                <div>
                                    <div className="font-bold">User Name</div>
                                    <div className="text-xs text-gray-500">Student</div>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">"Great platform for learning! The quizzes are challenging and fun."</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-gray-800 text-gray-500 text-sm">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-purple-400 font-bold text-lg mb-4">QuizMaster</h3>
                        <p className="mb-6">The ultimate quiz platform for students and teachers.</p>
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            Sign in with Google
                        </button>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Features</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">For Teachers</h4>
                        <ul className="space-y-2">
                            <li>About</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li>contact@company.com</li>
                            <li>+1 (123) 456-7890</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-900 flex justify-between">
                    <p>&copy; 2026 QuizMaster. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
