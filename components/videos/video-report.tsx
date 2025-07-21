'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, User, Calendar, Clock, TrendingUp, TrendingDown, Eye, Mic, Volume2 } from 'lucide-react';

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

export function VideoReport({ video, onClose }: VideoReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleDownloadReport = () => {
    console.log('Downloading report for video:', video.id);
  };

  // Circular progress component
  const CircularProgress = ({ score, size = 120, strokeWidth = 8, color = '#3b82f6' }: any) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-gray-500">/5</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-h-[90vh] overflow-y-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">YOUR USPEEK REPORT</h1>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{video.speaker}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{video.duration}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">2.9/5</div>
            <div className="text-sm">NICE SHOW!</div>
            <Button 
              onClick={handleDownloadReport} 
              className="mt-2 bg-orange-500 hover:bg-orange-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-blue-600">Body Language Score</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularProgress score={video.bodyLanguageScore} color="#3b82f6" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-purple-600">Vocal Tone Score</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularProgress score={video.vocalToneScore} color="#8b5cf6" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-pink-600">Word Power Score</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularProgress score={video.wordPowerScore} color="#ec4899" />
          </CardContent>
        </Card>
      </div>

      {/* Confidence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">3.8/5</div>
            <div className="text-sm text-gray-600">MOSTLY CONFIDENT</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">2.4/5</div>
            <div className="text-sm text-gray-600">LOW ENGAGEMENT</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">1.2/5</div>
            <div className="text-sm text-gray-600">NOT SERIOUS</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Message */}
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-700">
            Your performance is below average. You need to make a good number of changes to move the needle.
          </p>
        </CardContent>
      </Card>

      {/* Body Language Section */}
      <Card>
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <span>BODY LANGUAGE SCORE</span>
            <span className="ml-auto text-2xl font-bold">0.9/5</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Positive Facial Expression */}
            <div>
              <h4 className="font-semibold mb-2 text-green-600">POSITIVE FACIAL EXPRESSION</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Surprise</span>
                  <span className="font-semibold">0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Happy</span>
                  <span className="font-semibold">0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Calm</span>
                  <span className="font-semibold">0%</span>
                </div>
              </div>
            </div>

            {/* Negative Facial Expression */}
            <div>
              <h4 className="font-semibold mb-2 text-red-600">NEGATIVE FACIAL EXPRESSION</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Anger</span>
                  <span className="font-semibold">0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Fear</span>
                  <span className="font-semibold">0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Disgust</span>
                  <span className="font-semibold">0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Sad</span>
                  <span className="font-semibold">0%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800">
              There are a number of areas in your body language that are having a negative impact. Review your report & 
              start practicing to achieve the best result.
            </p>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">FREQUENCY</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Gaze</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">100%</span>
                    <span className="text-red-500">Bad</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>👤</span>
                    <span>Head Position</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">74%</span>
                    <span className="text-red-500">Bad</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>🤲</span>
                    <span>Hand Movement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">13%</span>
                    <span className="text-red-500">Bad</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">BODY POSTURE</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Straight Posture</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">0%</span>
                    <span className="text-red-500">Bad</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shoulder Position</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">0%</span>
                    <span className="text-red-500">Bad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">YOUR TOP AREAS</h4>
              <ul className="text-sm space-y-1">
                <li>• Your posture looks good</li>
                <li>• Your hand movements are good</li>
                <li>• Your head movements look fine</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-600">YOUR AREAS FOR IMPROVEMENT</h4>
              <ul className="text-sm space-y-1">
                <li>• You need to look at the camera more often</li>
                <li>• You need to be more expressive</li>
                <li>• Avoid looking down or sideways</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vocal Tone Section */}
      <Card>
        <CardHeader className="bg-purple-600 text-white">
          <CardTitle className="flex items-center justify-between">
            <span>VOCAL TONE SCORE</span>
            <span className="text-2xl font-bold">4.3/5</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">Best Part of Speech - Great</span>
            <span className="text-green-600">Live Pitch</span>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <p className="text-purple-800">
              Your voice is strong and you are close to having an impact. Work on your live improvement areas.
            </p>
          </div>

          {/* Modulation Graph */}
          <div className="mb-6">
            <h4 className="font-semibold mb-4">MODULATION GRAPH</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={modulationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pitch Graph */}
          <div className="mb-6">
            <h4 className="font-semibold mb-4">PITCH GRAPH</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pitchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume Graph */}
          <div className="mb-6">
            <h4 className="font-semibold mb-4">VOLUME GRAPH</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">YOUR TOP AREAS</h4>
              <ul className="text-sm space-y-1">
                <li>• Your pitch is good</li>
                <li>• Your volume is good</li>
                <li>• Your pace is good</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-600">YOUR AREAS FOR IMPROVEMENT</h4>
              <ul className="text-sm space-y-1">
                <li>• You need to work on your modulation</li>
                <li>• Try to vary your pitch more</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Word Power Section */}
      <Card>
        <CardHeader className="bg-pink-600 text-white">
          <CardTitle className="flex items-center justify-between">
            <span>WORD POWER SCORE</span>
            <span className="text-2xl font-bold">3.6/5</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-800">Fluent</span>
              </div>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="font-semibold text-yellow-800">Neutral</span>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg mb-6">
            <p className="text-pink-800">
              Your Word Power is good. Identify the areas that can enhance your score.
            </p>
          </div>

          {/* Word Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-4 text-green-600">WORDS</h4>
              <div className="space-y-2">
                <div className="bg-green-100 p-2 rounded">
                  <span className="text-green-800 font-medium">Positive Language</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-yellow-600">THEMES</h4>
              <div className="space-y-2">
                <div className="bg-yellow-100 p-2 rounded">
                  <span className="text-yellow-800 font-medium">Neutral</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-4">FILLERS</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Um</span>
                  <span className="font-semibold text-red-500">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Uh</span>
                  <span className="font-semibold text-red-500">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Like</span>
                  <span className="font-semibold text-red-500">5</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">PET WORDS</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Actually</span>
                  <span className="font-semibold text-yellow-500">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Basically</span>
                  <span className="font-semibold text-yellow-500">9</span>
                </div>
                <div className="flex justify-between">
                  <span>Obviously</span>
                  <span className="font-semibold text-yellow-500">6</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">POWER WORDS</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Achieve</span>
                  <span className="font-semibold text-green-500">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Success</span>
                  <span className="font-semibold text-green-500">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Impact</span>
                  <span className="font-semibold text-green-500">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">YOUR TOP AREAS</h4>
              <ul className="text-sm space-y-1">
                <li>• You use positive language</li>
                <li>• Your vocabulary is good</li>
                <li>• You speak clearly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-600">YOUR AREAS FOR IMPROVEMENT</h4>
              <ul className="text-sm space-y-1">
                <li>• Reduce filler words like "um" and "uh"</li>
                <li>• Avoid overusing pet words</li>
                <li>• Use more power words for impact</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcript Section */}
      <Card>
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle>TRANSCRIPT</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">TRANSCRIPT</h4>
              <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                <p className="text-sm text-gray-700 mb-4">
                  <span className="text-blue-600 font-medium">[00:00 - 00:30]</span><br />
                  Good morning everyone, and thank you for joining today's quarterly sales presentation. 
                  I'm excited to share our achievements and discuss our strategy moving forward.
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <span className="text-blue-600 font-medium">[00:30 - 01:15]</span><br />
                  Over the past quarter, we've seen remarkable growth in our key metrics. 
                  Our team has exceeded expectations, and I want to highlight some of the 
                  significant milestones we've achieved.
                </p>
                <p className="text-sm text-gray-700">
                  <span className="text-blue-600 font-medium">[01:15 - 02:00]</span><br />
                  The numbers speak for themselves - we've increased our revenue by 23% 
                  compared to the same period last year, and our customer satisfaction 
                  scores have reached an all-time high of 94%.
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">SENTENCES</h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium">1.</span> Good morning everyone, and thank you for joining today's quarterly sales presentation.
                </div>
                <div className="text-sm">
                  <span className="font-medium">2.</span> I'm excited to share our achievements and discuss our strategy moving forward.
                </div>
                <div className="text-sm">
                  <span className="font-medium">3.</span> Over the past quarter, we've seen remarkable growth in our key metrics.
                </div>
                <div className="text-sm">
                  <span className="font-medium">4.</span> Our team has exceeded expectations, and I want to highlight some significant milestones.
                </div>
                <div className="text-sm">
                  <span className="font-medium">5.</span> The numbers speak for themselves with 23% revenue increase.
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}