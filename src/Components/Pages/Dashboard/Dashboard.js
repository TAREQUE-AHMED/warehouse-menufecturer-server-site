import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <Outlet/>
            </div>
            <div className="drawer-side">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label> 
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to="/dashboard">My Profile</Link></li>
                        <li><Link to="/dashboard/myOrders">My Orders</Link></li>
                        <li><Link to="/dashboard/addReview">Add A Review</Link></li>
                        <li><Link to="/dashboard/addProduct">Add New Product</Link></li>
                        <li><Link to="/dashboard/manageOrders">Manage All Orders</Link></li>
                        <li><Link to="/dashboard/makeAdmin">Make Admin</Link></li>

                        
                    </ul>
                
                </div>
        </div>
    );
};

export default Dashboard;