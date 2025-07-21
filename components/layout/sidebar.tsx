'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  Users, 
  Download, 
  CreditCard, 
  User, 
  LogOut,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Videos', icon: Video, href: '/videos' },
  { name: 'Learning Lessons', icon: BookOpen, href: '/learning-lessons' },
  { name: 'Users', icon: Users, href: '/users' },
  { name: 'Export Data', icon: Download, href: '/export-data' },
  { name: 'Subscriptions', icon: CreditCard, href: '/subscriptions' },
  { name: 'Profile', icon: User, href: '/profile' },
];

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-xl text-gray-900">CommAnalytics</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-1">
        {navigationItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 no-underline",
              pathname === item.href
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-red-600 hover:bg-red-50">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}