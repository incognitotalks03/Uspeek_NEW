'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';

const topPerformingVideos = [
  {
    id: '1',
    title: 'Product Launch Demo',
    speaker: 'Sarah Johnson',
    score: 85,
    date: '2024-01-12'
  },
  {
    id: '2',
    title: 'Quarterly Sales Presentation',
    speaker: 'John Smith',
    score: 78,
    date: '2024-01-15'
  },
  {
    id: '3',
    title: 'Client Pitch Meeting',
    speaker: 'Emily Davis',
    score: 76,
    date: '2024-01-08'
  }
];

const lowPerformingVideos = [
  {
    id: '4',
    title: 'Team Meeting Facilitation',
    speaker: 'Mike Davis',
    score: 58,
    date: '2024-01-10'
  },
  {
    id: '5',
    title: 'Training Session',
    speaker: 'Alex Wilson',
    score: 62,
    date: '2024-01-05'
  },
  {
    id: '6',
    title: 'Project Update',
    speaker: 'Lisa Brown',
    score: 65,
    date: '2024-01-03'
  }
];

export function TopLowPerformingVideos() {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Performing Videos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>Top Performing Videos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topPerformingVideos.map((video, index) => (
            <div key={video.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-green-800">#{index + 1}</span>
                  <h4 className="font-semibold text-gray-900 text-sm">{video.title}</h4>
                </div>
                <p className="text-xs text-gray-600">{video.speaker} • {new Date(video.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getScoreColor(video.score)}>
                  {video.score}/100
                </Badge>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Low Performing Videos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <span>Low Performing Videos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lowPerformingVideos.map((video, index) => (
            <div key={video.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-red-800">#{index + 1}</span>
                  <h4 className="font-semibold text-gray-900 text-sm">{video.title}</h4>
                </div>
                <p className="text-xs text-gray-600">{video.speaker} • {new Date(video.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getScoreColor(video.score)}>
                  {video.score}/100
                </Badge>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}