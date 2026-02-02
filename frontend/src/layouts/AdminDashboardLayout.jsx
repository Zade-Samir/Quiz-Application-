import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboardLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white flex">
            <AdminSidebar />
            <div className="flex-1 lg:ml-64">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
