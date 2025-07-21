'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
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

      {/* User Info */}
      <div className="px-6 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">John Smith</div>
            <div className="text-sm text-gray-500">Sales Manager</div>
          </div>
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