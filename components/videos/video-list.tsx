'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Calendar, User } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  speaker: string;
  uploadDate: string;
  duration: string;
  overallScore: number;
  bodyLanguageScore: number;
  vocalToneScore: number;
  wordPowerScore: number;
  thumbnail: string;
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Quarterly Sales Presentation',
    speaker: 'John Smith',
    uploadDate: '2024-01-15',
    duration: '12:34',
    overallScore: 78,
    bodyLanguageScore: 82,
    vocalToneScore: 75,
    wordPowerScore: 77,
    thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Product Launch Demo',
    speaker: 'Sarah Johnson',
    uploadDate: '2024-01-12',
    duration: '18:45',
    overallScore: 85,
    bodyLanguageScore: 88,
    vocalToneScore: 82,
    wordPowerScore: 85,
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Team Meeting Facilitation',
    speaker: 'Mike Davis',
    uploadDate: '2024-01-10',
    duration: '25:12',
    overallScore: 72,
    bodyLanguageScore: 70,
    vocalToneScore: 74,
    wordPowerScore: 72,
    thumbnail: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

interface VideoListProps {
  filters: {
    search: string;
    dateFrom: string;
    dateTo: string;
  };
}

export function VideoList({ filters }: VideoListProps) {
  const router = useRouter();

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.speaker.toLowerCase().includes(filters.search.toLowerCase()) ||
                         video.title.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesDateFrom = !filters.dateFrom || new Date(video.uploadDate) >= new Date(filters.dateFrom);
    const matchesDateTo = !filters.dateTo || new Date(video.uploadDate) <= new Date(filters.dateTo);
    
    return matchesSearch && matchesDateFrom && matchesDateTo;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleViewReport = (video: Video) => {
    router.push(`/videos/${video.id}/report`);
  };

  const handleDownloadVideo = (video: Video) => {
    // Implement video download logic
    console.log('Downloading video:', video.id);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Title & Speaker Info */}
              <div className="mb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                  {video.title}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{video.speaker}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Score Preview */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Overall Score</span>
                  <Badge className={getScoreColor(video.overallScore)}>
                    {video.overallScore}/100
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-gray-600">Body Language</div>
                    <div className="font-semibold">{video.bodyLanguageScore}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">Vocal Tone</div>
                    <div className="font-semibold">{video.vocalToneScore}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">Word Power</div>
                    <div className="font-semibold">{video.wordPowerScore}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewReport(video)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadVideo(video)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No videos found matching your criteria.</div>
        </div>
      )}
    </>
  );
}