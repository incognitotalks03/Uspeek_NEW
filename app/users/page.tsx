'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Plus, MoreHorizontal } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Sales Manager',
    status: 'Active',
    lastActivity: '2024-01-15',
    videosAnalyzed: 12,
    averageScore: 78
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Marketing Director',
    status: 'Active',
    lastActivity: '2024-01-14',
    videosAnalyzed: 8,
    averageScore: 85
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    role: 'Team Lead',
    status: 'Inactive',
    lastActivity: '2024-01-10',
    videosAnalyzed: 5,
    averageScore: 72
  }
];

export default function UsersPage() {
  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Role</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Videos</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Avg Score</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Last Activity</th>
                    <th className="text-right py-4 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-900">{user.role}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">{user.videosAnalyzed}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`font-semibold ${getScoreColor(user.averageScore)}`}>
                          {user.averageScore}/100
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-600">
                          {new Date(user.lastActivity).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}