'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AssignmentViewer } from '@/components/learning/assignment-viewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Clock, Star, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';

// Strengths and Weaknesses Data
const userStrengths = [
  { area: 'Eye Contact', score: 92, description: 'Excellent maintenance of eye contact throughout presentations' },
  { area: 'Posture', score: 88, description: 'Strong, confident posture that commands attention' },
  { area: 'Voice Clarity', score: 84, description: 'Clear articulation and pronunciation' }
];

const userWeaknesses = [
  { area: 'Filler Words', score: 45, description: 'Frequent use of "um", "uh", and "like"' },
  { area: 'Speaking Pace', score: 52, description: 'Tendency to speak too quickly during presentations' },
  { area: 'Vocal Variety', score: 58, description: 'Limited variation in pitch and tone' }
];

// Assignments Data
const assignments = [
  {
    id: '1',
    title: 'Improve Eye Contact Techniques',
    description: 'Practice maintaining consistent eye contact during presentations',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-20',
    estimatedTime: '15 min',
    category: 'Body Language',
    progress: 0
  },
  {
    id: '2',
    title: 'Reduce Filler Words',
    description: 'Complete exercises to minimize "um", "uh", and other verbal fillers',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-22',
    estimatedTime: '20 min',
    category: 'Word Power',
    progress: 60
  },
  {
    id: '3',
    title: 'Voice Modulation Practice',
    description: 'Work on varying pitch and tone for better engagement',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-01-18',
    estimatedTime: '25 min',
    category: 'Vocal Tone',
    progress: 100
  }
];

const lessons = [
  {
    id: 1,
    title: 'Mastering Eye Contact',
    description: 'Learn how to maintain appropriate eye contact to build trust and engagement',
    duration: '15 min',
    difficulty: 'Beginner',
    rating: 4.8,
    category: 'Body Language',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Voice Modulation Techniques',
    description: 'Discover how to vary your pitch, pace, and volume for maximum impact',
    duration: '22 min',
    difficulty: 'Intermediate',
    rating: 4.9,
    category: 'Vocal Tone',
    thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Eliminating Filler Words',
    description: 'Strategies to reduce "um", "uh", and other verbal fillers in your speech',
    duration: '18 min',
    difficulty: 'Beginner',
    rating: 4.7,
    category: 'Word Power',
    thumbnail: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function LearningLessonsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartLesson = (category: string) => {
    setSelectedCategory(category);
  };

  if (selectedCategory) {
    return (
      <DashboardLayout>
        <AssignmentViewer 
          category={selectedCategory} 
          onBack={() => setSelectedCategory(null)} 
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Learning & Development</h1>
          </div>
        </div>

        {/* Strengths and Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Your Strengths</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userStrengths.map((strength, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{strength.area}</h4>
                    <Badge className="bg-green-100 text-green-800">
                      {strength.score}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{strength.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Areas for Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userWeaknesses.map((weakness, index) => (
                <div key={index} className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{weakness.area}</h4>
                    <Badge className="bg-orange-100 text-orange-800">
                      {weakness.score}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{weakness.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Your Assignments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                        {assignment.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status.replace('-', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(assignment.priority)}>
                          {assignment.priority} priority
                        </Badge>
                        <Badge variant="outline">
                          {assignment.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        <span>{assignment.estimatedTime}</span>
                        <span>Progress: {assignment.progress}%</span>
                      </div>
                      
                      {assignment.progress > 0 && assignment.progress < 100 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${assignment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      {assignment.status !== 'completed' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-1" />
                          {assignment.status === 'pending' ? 'Start' : 'Continue'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Learning Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
              <div key={lesson.id} className="border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">
                      {lesson.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{lesson.duration}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(lesson.difficulty)}>
                      {lesson.difficulty}
                    </Badge>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Lesson
                  </Button>
                </div>
              </CardContent>
              </div>
          ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}