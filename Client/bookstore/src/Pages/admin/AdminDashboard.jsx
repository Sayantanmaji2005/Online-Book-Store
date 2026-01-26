import React, { useState } from 'react';
import { useAuth } from '../../Context/authContext';

// Mock data for initial dashboard state
const mockOrders = [
    { id: 'ORD001', customer: 'Amit Sharma', date: '2026-01-25', total: 1250, status: 'Delivered', items: 3 },
    { id: 'ORD002', customer: 'Priya Patel', date: '2026-01-26', total: 450, status: 'Processing', items: 1 },
    { id: 'ORD003', customer: 'Rahul Verma', date: '2026-01-26', total: 890, status: 'Shipped', items: 2 },
    { id: 'ORD004', customer: 'Sita Ram', date: '2026-01-24', total: 2100, status: 'Delivered', items: 5 },
    { id: 'ORD005', customer: 'Vikram Singh', date: '2026-01-23', total: 150, status: 'Cancelled', items: 1 },
];

const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
                {icon}
            </div>
            {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
    </div>
);

export const AdminDashboard = ({ onBackToStore }) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate stats from mock data
    const totalEarnings = mockOrders.reduce((sum, order) => order.status !== 'Cancelled' ? sum + order.total : sum, 0);
    const totalOrders = mockOrders.length;
    const booksSold = mockOrders.reduce((sum, order) => order.status !== 'Cancelled' ? sum + order.items : sum, 0);
    const activeCustomers = new Set(mockOrders.map(o => o.customer)).size;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 fixed h-full">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="text-lg font-black tracking-tighter">SELLER<span className="text-indigo-600">Portal</span></span>
                </div>

                <nav className="space-y-1 flex-1">
                    {[
                        { id: 'overview', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                        { id: 'orders', label: 'Orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                        { id: 'books', label: 'Books', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13' },
                        { id: 'customers', label: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={onBackToStore}
                    className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Exit Dashboard
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight text-indigo-600 capitalize">{activeTab}</h1>
                        <p className="text-slate-500 font-medium">Welcome back, {user?.name || 'Admin'}! Manage your store with ease.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-xl border border-slate-100 flex items-center gap-2 pr-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-black text-slate-900">{user?.name || 'Admin'}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                            <StatCard
                                title="Total Revenue"
                                value={`Rs. ${totalEarnings.toLocaleString()}`}
                                color="bg-green-500 text-green-500"
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                trend="+12.5%"
                            />
                            <StatCard
                                title="Books Sold"
                                value={booksSold}
                                color="bg-indigo-500 text-indigo-500"
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                                trend="+5.2%"
                            />
                            <StatCard
                                title="Total Orders"
                                value={totalOrders}
                                color="bg-orange-500 text-orange-500"
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                                trend="+2.1%"
                            />
                            <StatCard
                                title="Active Customers"
                                value={activeCustomers}
                                color="bg-pink-500 text-pink-500"
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                trend="+18.4%"
                            />
                        </div>

                        {/* Recent Orders Section */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Recent Orders</h2>
                                    <p className="text-slate-500 text-sm font-medium">Tracking and managing your latest book sales</p>
                                </div>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all flex items-center gap-2"
                                >
                                    View All Orders
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4 4H3" /></svg>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50">
                                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {mockOrders.slice(0, 5).map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <span className="text-sm font-bold text-slate-900">#{order.id}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">
                                                            {order.customer.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-700">{order.customer}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-sm font-medium text-slate-500">{order.date}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                        order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                                                            order.status === 'Shipped' ? 'bg-orange-100 text-orange-600' :
                                                                'bg-red-100 text-red-600'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="text-sm font-black text-slate-900">Rs. {order.total}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-8">
                        <h2 className="text-2xl font-black text-slate-900 mb-6">Order History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {mockOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <span className="text-sm font-bold text-slate-900">#{order.id}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">
                                                        {order.customer.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700">{order.customer}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-medium text-slate-500">{order.date}</td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                                                        order.status === 'Shipped' ? 'bg-orange-100 text-orange-600' :
                                                            'bg-red-100 text-red-600'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <span className="text-sm font-black text-slate-900">Rs. {order.total}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'books' && (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-8 text-center py-20">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13" /></svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Inventory Management</h2>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Add, edit, or remove books from your store catalog directly from here.</p>
                        <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1">
                            Add New Book to Store
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};
