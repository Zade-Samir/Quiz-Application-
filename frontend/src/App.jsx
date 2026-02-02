import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import PlayerHome from './pages/PlayerHome';
import QuizManagement from './pages/QuizManagement';
import QuizBuilder from './pages/QuizBuilder';
import StudentsManagement from './pages/StudentsManagement';
import Analytics from './pages/Analytics';
import QuizBrowse from './pages/QuizBrowse';
import QuizDetail from './pages/QuizDetail';
import QuizTaking from './pages/QuizTaking';
import QuizResults from './pages/QuizResults';
import Leaderboard from './pages/Leaderboard';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Main Landing) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Player Routes */}
        <Route element={<MainLayout />}>
          <Route path="/player" element={<PlayerHome />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/quizzes" element={<QuizBrowse />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="/quiz/:id/take" element={<QuizTaking />} />
          <Route path="/quiz/:id/results" element={<QuizResults />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="quizzes" element={<QuizManagement />} />
          <Route path="quizzes/create" element={<QuizBuilder />} />
          <Route path="quizzes/:id/edit" element={<QuizBuilder />} />
          <Route path="students" element={<StudentsManagement />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
