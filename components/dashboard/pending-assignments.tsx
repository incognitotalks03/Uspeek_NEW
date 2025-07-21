'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Play } from 'lucide-react';

const pendingAssignments = [
  {
    id: '1',
    title: 'Improve Eye Contact Techniques',
    description: 'Practice maintaining consistent eye contact during presentations',
    priority: 'high',
    dueDate: '2024-01-20',
    estimatedTime: '15 min',
    category: 'Body Language'
  },
  {
    id: '2',
    title: 'Reduce Filler Words',
    description: 'Complete exercises to minimize "um", "uh", and other verbal fillers',
    priority: 'high',
    dueDate: '2024-01-22',
    estimatedTime: '20 min',
    category: 'Word Power'
  },
  {
    id: '3',
    title: 'Voice Modulation Practice',
    description: 'Work on varying pitch and tone for better engagement',
    priority: 'medium',
    dueDate: '2024-01-25',
    estimatedTime: '25 min',
    category: 'Vocal Tone'
  },
  {
    id: '4',
    title: 'Gesture Coordination',
    description: 'Practice natural hand gestures that complement speech',
    priority: 'medium',
    dueDate: '2024-01-28',
    estimatedTime: '18 min',
    category: 'Body Language'
  },
  {
    id: '5',
    title: 'Pause and Pacing',
    description: 'Learn strategic pausing techniques for emphasis',
    priority: 'low',
    dueDate: '2024-01-30',
    estimatedTime: '12 min',
    category: 'Vocal Tone'
  }
];

export function PendingAssignments() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Body Language': return 'bg-blue-100 text-blue-800';
      case 'Vocal Tone': return 'bg-purple-100 text-purple-800';
      case 'Word Power': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Pending Assignments</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {pendingAssignments.map((assignment) => (
            <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{assignment.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority} priority
                    </Badge>
                    <Badge className={getCategoryColor(assignment.category)}>
                      {assignment.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{assignment.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 ml-4">
                  <Play className="w-4 h-4 mr-1" />
                  Start
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}