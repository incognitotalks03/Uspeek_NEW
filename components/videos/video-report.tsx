'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, User, Calendar, Clock } from 'lucide-react';

interface VideoReportProps {
  video: {
    id: string;
    title: string;
    speaker: string;
    uploadDate: string;
    duration: string;
    overallScore: number;
    bodyLanguageScore: number;
    vocalToneScore: number;
    wordPowerScore: number;
  };
  onClose: () => void;
}

// Mock data for charts
const modulationData = [
  { time: '0:00', value: 65 },
  { time: '2:00', value: 72 },
  { time: '4:00', value: 68 },
  { time: '6:00', value: 75 },
  { time: '8:00', value: 70 },
  { time: '10:00', value: 78 },
];

const pitchData = [
  { time: '0:00', value: 120 },
  { time: '2:00', value: 135 },
  { time: '4:00', value: 128 },
  { time: '6:00', value: 142 },
  { time: '8:00', value: 138 },
  { time: '10:00', value: 145 },
];

const volumeData = [
  { time: '0:00', value: 45 },
  { time: '2:00', value: 52 },
  { time: '4:00', value: 48 },
  { time: '6:00', value: 55 },
  { time: '8:00', value: 50 },
  { time: '10:00', value: 58 },
];

const emotionData = [
  { emotion: 'Confident', value: 85 },
  { emotion: 'Enthusiastic', value: 72 },
  { emotion: 'Professional', value: 88 },
  { emotion: 'Nervous', value: 25 },
  { emotion: 'Engaging', value: 78 },
];

export function VideoReport({ video, onClose }: VideoReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleDownloadReport = () => {
    // Implement PDF report download
    console.log('Downloading report for video:', video.id);
  };

  return (
    <div className="space-y-6">
      {/* User Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{video.title}</CardTitle>
            <Button onClick={handleDownloadReport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Speaker</div>
                <div className="font-semibold">{video.speaker}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-semibold">{new Date(video.uploadDate).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-semibold">{video.duration}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
              <div>
                <div className="text-sm text-gray-500">Overall Score</div>
                <Badge className={getScoreColor(video.overallScore)}>
                  {video.overallScore}/100
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="body-language" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="body-language">Body Language</TabsTrigger>
          <TabsTrigger value="vocal-tone">Vocal Tone</TabsTrigger>
          <TabsTrigger value="word-power">Word Power</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>

        {/* Body Language Tab */}
        <TabsContent value="body-language" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Body Language Score
                  <Badge className={getScoreColor(video.bodyLanguageScore)}>
                    {video.bodyLanguageScore}/100
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Eye Contact</span>
                    <span className="font-semibold">92/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Posture</span>
                    <span className="font-semibold">88/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gestures</span>
                    <span className="font-semibold">75/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Facial Expression</span>
                    <span className="font-semibold">80/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="font-semibold text-orange-800">Hand Gestures</div>
                    <div className="text-sm text-orange-600">
                      Consider using more purposeful hand gestures to emphasize key points
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="font-semibold text-orange-800">Movement</div>
                    <div className="text-sm text-orange-600">
                      Reduce unnecessary movement and maintain stable positioning
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vocal Tone Tab */}
        <TabsContent value="vocal-tone" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Vocal Tone Score
                  <Badge className={getScoreColor(video.vocalToneScore)}>
                    {video.vocalToneScore}/100
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Rate of Speech</span>
                    <span className="font-semibold">145 WPM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Clarity</span>
                    <span className="font-semibold">85/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Variation</span>
                    <span className="font-semibold">72/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Confidence</span>
                    <span className="font-semibold">78/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modulation Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={modulationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pitch Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pitchData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volume Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Word Power Tab */}
        <TabsContent value="word-power" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Word Power Score
                  <Badge className={getScoreColor(video.wordPowerScore)}>
                    {video.wordPowerScore}/100
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Vocabulary Richness</span>
                    <span className="font-semibold">82/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sentence Structure</span>
                    <span className="font-semibold">75/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Filler Words</span>
                    <span className="font-semibold">65/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Clarity</span>
                    <span className="font-semibold">88/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emotion Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emotionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="emotion" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sentence Length</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">18.5</div>
                  <div className="text-sm text-gray-500">Average words per sentence</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filler Words</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>"Um"</span>
                    <span className="font-semibold">12 times</span>
                  </div>
                  <div className="flex justify-between">
                    <span>"Uh"</span>
                    <span className="font-semibold">8 times</span>
                  </div>
                  <div className="flex justify-between">
                    <span>"Like"</span>
                    <span className="font-semibold">5 times</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pet Words</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>"Actually"</span>
                    <span className="font-semibold">15 times</span>
                  </div>
                  <div className="flex justify-between">
                    <span>"Basically"</span>
                    <span className="font-semibold">9 times</span>
                  </div>
                  <div className="flex justify-between">
                    <span>"Obviously"</span>
                    <span className="font-semibold">6 times</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transcript Tab */}
        <TabsContent value="transcript" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Full Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-2">00:00 - 00:30</div>
                  <p className="text-gray-900">
                    Good morning everyone, and thank you for joining today's quarterly sales presentation. 
                    I'm excited to share our achievements and discuss our strategy moving forward.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-2">00:30 - 01:15</div>
                  <p className="text-gray-900">
                    Over the past quarter, we've seen remarkable growth in our key metrics. 
                    Our team has exceeded expectations, and I want to highlight some of the 
                    significant milestones we've achieved.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-2">01:15 - 02:00</div>
                  <p className="text-gray-900">
                    The numbers speak for themselves - we've increased our revenue by 23% 
                    compared to the same period last year, and our customer satisfaction 
                    scores have reached an all-time high of 94%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}