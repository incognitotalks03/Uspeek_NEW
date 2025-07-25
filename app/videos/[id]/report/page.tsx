'use client';

import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { VideoReport } from '@/components/videos/video-report';

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

  return mockVideos[id as keyof typeof mockVideos] || mockVideos['1'];
};

export default function VideoReportPage() {
  const params = useParams();
  const videoId = params.id as string;
  const video = getVideoById(videoId);

  return (
    <DashboardLayout>
      <VideoReport video={video} onClose={() => {}} />
    </DashboardLayout>
  );
}