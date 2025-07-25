'use client';

import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { VideoReport } from '@/components/videos/video-report';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Generate static params for static export
export function generateStaticParams() {
  // Return the video IDs that should be pre-generated
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

// Mock video data - in a real app, you'd fetch this based on the ID
const getVideoById = (id: string) => {
  const mockVideos = {
    '1': {
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
    '2': {
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
    '3': {
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
  };

  const video = mockVideos[id as keyof typeof mockVideos];
  if (!video) {
    notFound();
  }
  return video;
};

export default function VideoReportPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  const video = getVideoById(videoId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Videos</span>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Video Analysis Report</h1>
        </div>
        <VideoReport video={video} onClose={() => router.back()} />
      </div>
    </DashboardLayout>
  );
}