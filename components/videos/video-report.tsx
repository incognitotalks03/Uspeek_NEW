'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Volume2, 
  Download, 
  Eye, 
  Calendar, 
  Clock, 
  User,
  TrendingUp,
  TrendingDown,
  BarChart3,
  MessageSquare,
  Mic,
  Users
} from 'lucide-react';

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
    thumbnail?: string;
  };
  onClose: () => void;
}

export function VideoReport({ video, onClose }: VideoReportProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  const CircularProgress = ({ score, size = 120, strokeWidth = 8 }: { score: number; size?: number; strokeWidth?: number }) => {
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
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ${getScoreColor(score)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Video Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
          <span className="text-2xl">🚀</span>
          <span className="font-semibold text-lg">Video Analysis Report</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          {video.title}
        </h1>
        <div className="flex items-center justify-center space-x-6 text-gray-600">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span className="font-medium">{video.speaker}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{video.duration}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Video Player */}
        <div className="xl:col-span-3">
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-gray-100">
            <CardHeader className="bg-gradient-to-r from-slate-600 to-gray-700 text-white">
              <CardTitle className="flex items-center space-x-2">
                <span className="text-xl">🎥</span>
                <span>Video Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative bg-black h-96">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎬</div>
                      <div className="text-xl">Video Preview</div>
                    </div>
                  </div>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50 rounded-full w-20 h-20"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="p-6 bg-gradient-to-r from-slate-100 to-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:bg-slate-200 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <div className="flex-1">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(currentTime / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-gray-600" />
                      <div className="w-20 bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                          style={{ width: `${volume}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <div className="xl:col-span-1">
          <Card className="h-full shadow-2xl border-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full animate-pulse delay-1000"></div>
            
            <CardContent className="p-8 relative z-10">
              <div className="text-center space-y-6">
                {/* User Info */}
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-xl">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <h3 className="font-bold text-xl text-gray-800">{video.speaker}</h3>
                    <p className="text-gray-600">Communication Analysis</p>
                  </div>
                </div>

                {/* Overall Score */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {video.overallScore}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-4">Overall Score</div>
                  
                  {/* Quick Stats */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Confidence</span>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">WPM</span>
                      <Badge className="bg-blue-100 text-blue-800">145</Badge>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => {/* Handle download */}}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Score Overview */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">📊</span>
            <span className="font-semibold text-lg">Communication Scores</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Body Language */}
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Body Language
                </h3>
              </div>
              <CircularProgress score={video.bodyLanguageScore} />
              <div className="mt-4">
                <Badge className={`${getScoreColor(video.bodyLanguageScore)} bg-opacity-10 px-4 py-2`}>
                  {video.bodyLanguageScore >= 80 ? 'Excellent' : video.bodyLanguageScore >= 70 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Vocal Tone */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Vocal Tone
                </h3>
              </div>
              <CircularProgress score={video.vocalToneScore} />
              <div className="mt-4">
                <Badge className={`${getScoreColor(video.vocalToneScore)} bg-opacity-10 px-4 py-2`}>
                  {video.vocalToneScore >= 80 ? 'Excellent' : video.vocalToneScore >= 70 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Word Power */}
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Word Power
                </h3>
              </div>
              <CircularProgress score={video.wordPowerScore} />
              <div className="mt-4">
                <Badge className={`${getScoreColor(video.wordPowerScore)} bg-opacity-10 px-4 py-2`}>
                  {video.wordPowerScore >= 80 ? 'Excellent' : video.wordPowerScore >= 70 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confidence Metrics */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">🎯</span>
            <span className="font-semibold text-lg">Confidence Analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <div className="text-3xl mb-2">🧍</div>
                <h3 className="text-lg font-bold text-gray-800">Mostly Confident</h3>
              </div>
              <div className="text-5xl font-bold text-blue-600 mb-2">3.8</div>
              <div className="text-gray-600 mb-4">out of 5</div>
              <Progress value={76} className="h-3 mb-2" />
              <div className="text-sm text-gray-500">76% confidence level</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="text-lg font-bold text-gray-800">Low Engagement</h3>
              </div>
              <div className="text-5xl font-bold text-yellow-600 mb-2">2.4</div>
              <div className="text-gray-600 mb-4">out of 5</div>
              <Progress value={48} className="h-3 mb-2" />
              <div className="text-sm text-gray-500">48% engagement level</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <div className="text-3xl mb-2">😐</div>
                <h3 className="text-lg font-bold text-gray-800">Not Nervous</h3>
              </div>
              <div className="text-5xl font-bold text-green-600 mb-2">1.2</div>
              <div className="text-gray-600 mb-4">out of 5</div>
              <Progress value={24} className="h-3 mb-2" />
              <div className="text-sm text-gray-500">Low nervousness detected</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-2xl">🎯</span>
              <span className="font-semibold text-lg">Performance Summary</span>
            </div>
            <h3 className="text-2xl font-bold">Your performance is above average!</h3>
            <p className="text-lg opacity-90">
              You need to make a good number of changes to move the needle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">78/100</div>
                <div className="text-sm opacity-80">Your Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">65/100</div>
                <div className="text-sm opacity-80">Industry Average</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Body Language Analysis */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">🤝</span>
            <span className="font-semibold text-lg">Body Language Analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl h-full">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-emerald-600 mb-2">0.9</div>
                  <div className="text-lg text-gray-600">out of 5</div>
                </div>
                <CircularProgress score={18} size={100} />
                <div className="mt-4">
                  <Badge className="bg-red-100 text-red-800 px-4 py-2">
                    Needs Improvement
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span className="text-2xl">😊</span>
                    <span>Positive Facial Expression</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Surprise</span>
                    <Badge className="bg-green-100 text-green-800">85%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Happy</span>
                    <Badge className="bg-green-100 text-green-800">78%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span className="text-2xl">😐</span>
                    <span>Negative Facial Expression</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Neutral</span>
                    <Badge className="bg-yellow-100 text-yellow-800">12%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sad</span>
                    <Badge className="bg-red-100 text-red-800">3%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Angry</span>
                    <Badge className="bg-red-100 text-red-800">2%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Insights</h4>
                    <p className="text-sm text-gray-600">
                      There are a number of areas in your body language that are having a negative impact. 
                      Review your report & try reflecting on these to move forward.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">👁️</div>
                  <div className="text-sm font-medium">Eye Contact</div>
                  <div className="text-lg font-bold text-red-600">Poor</div>
                  <Badge className="bg-red-100 text-red-800 mt-1">32%</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">🤲</div>
                  <div className="text-sm font-medium">Hand Gestures</div>
                  <div className="text-lg font-bold text-yellow-600">Average</div>
                  <Badge className="bg-yellow-100 text-yellow-800 mt-1">58%</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">🧍</div>
                  <div className="text-sm font-medium">Posture</div>
                  <div className="text-lg font-bold text-green-600">Good</div>
                  <Badge className="bg-green-100 text-green-800 mt-1">75%</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Vocal Tone Analysis */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">🎤</span>
            <span className="font-semibold text-lg">Vocal Tone Analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-xl h-full">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-purple-600 mb-2">4.3</div>
                  <div className="text-lg text-gray-600">out of 5</div>
                </div>
                <CircularProgress score={86} size={100} />
                <div className="mt-6">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    🎯 Best Part of Speech - Great
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Pace</span>
                    <span className="font-semibold">Medium</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Tone</span>
                    <span className="font-semibold">Avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Voice Insights</h4>
                    <p className="text-sm text-gray-600">
                      Your voice is strong and you are close to being on point. Work on your key improvement areas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">📊 Modulation Graph</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Modulation visualization would appear here</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">🎵 Pitch Graph</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Pitch analysis visualization would appear here</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">🔊 Volume Graph</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Volume tracking visualization would appear here</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Word Power Analysis */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">💬</span>
            <span className="font-semibold text-lg">Word Power Analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-0 shadow-xl h-full">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-pink-600 mb-2">3.6</div>
                  <div className="text-lg text-gray-600">out of 5</div>
                </div>
                <CircularProgress score={72} size={100} />
                <div className="mt-4">
                  <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                    Good
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💪</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Word Power Insights</h4>
                    <p className="text-sm text-gray-600">
                      Your Word Power is good. Identify the areas that can enhance your score.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span className="text-2xl">📝</span>
                      <span>Word Categories</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm flex items-center space-x-2">
                          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                          <span>Positive</span>
                        </span>
                        <Badge className="bg-green-100 text-green-800">Good</Badge>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm flex items-center space-x-2">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                          <span>Neutral</span>
                        </span>
                        <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm flex items-center space-x-2">
                          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                          <span>Negative</span>
                        </span>
                        <Badge className="bg-red-100 text-red-800">Poor</Badge>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm flex items-center space-x-2">
                          <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                          <span>Repetition</span>
                        </span>
                        <Badge className="bg-red-100 text-red-800">Poor</Badge>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-green-50 border border-green-200">
                  <CardHeader>
                    <CardTitle className="text-sm text-green-800">✅ Strengths</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">• Clear articulation</div>
                    <div className="text-sm">• Good vocabulary range</div>
                    <div className="text-sm">• Effective emphasis</div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-sm text-orange-800">⚠️ Areas to Improve</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">• Reduce filler words</div>
                    <div className="text-sm">• Vary sentence structure</div>
                    <div className="text-sm">• Minimize repetition</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pose & Voice Analysis */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">🎭</span>
            <span className="font-semibold text-lg">Pose & Voice Analysis</span>
          </div>
          <p className="text-gray-600 mt-2">Advanced body language and vocal analysis using MediaPipe and audio processing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gestures Section */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mb-2">GESTURES</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">1</div>
                  <div className="text-xs text-gray-600 mt-1">SMILES DETECTED</div>
                  <div className="text-sm font-semibold text-purple-600">(0.83%)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">116</div>
                  <div className="text-xs text-gray-600 mt-1">HEAD MOVEMENTS</div>
                  <div className="text-sm font-semibold text-purple-600">(95.87%)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-xs text-gray-600 mt-1">HAND MOVEMENTS</div>
                  <div className="text-sm font-semibold text-purple-600">(0.0%)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">71</div>
                  <div className="text-xs text-gray-600 mt-1">EYE CONTACT</div>
                  <div className="text-sm font-semibold text-purple-600">(58.68%)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-xs text-gray-600 mt-1">LEG MOVEMENTS</div>
                  <div className="text-sm font-semibold text-purple-600">(0.0%)</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-xs text-gray-600 mt-1">FOOT MOVEMENTS</div>
                  <div className="text-sm font-semibold text-purple-600">(0.0%)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voice Analysis Section */}
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm mb-2">AUDIO PROCESSING</div>
                Voice Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">119.91s</div>
                  <div className="text-xs text-gray-600 mt-1">DURATION</div>
                  <div className="text-sm font-semibold text-indigo-600">Total Length</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">63.58 dB</div>
                  <div className="text-xs text-gray-600 mt-1">VOLUME</div>
                  <div className="text-sm font-semibold text-indigo-600">Average Volume</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">237.14 Hz</div>
                  <div className="text-xs text-gray-600 mt-1">MEAN PITCH</div>
                  <div className="text-sm font-semibold text-indigo-600">Average Pitch</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">75-600 Hz</div>
                  <div className="text-xs text-gray-600 mt-1">PITCH RANGE</div>
                  <div className="text-sm font-semibold text-indigo-600">Frequency Range</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">1</div>
                  <div className="text-xs text-gray-600 mt-1">PAUSES</div>
                  <div className="text-sm font-semibold text-indigo-600">Number of Pauses</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">119.84s</div>
                  <div className="text-xs text-gray-600 mt-1">SPEAKING TIME</div>
                  <div className="text-sm font-semibold text-indigo-600">Active Speaking</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200">
          <CardContent className="p-6">
            <div className="text-sm text-gray-700">
              <strong>Note:</strong> This analysis uses MediaPipe for pose detection and facial analysis, and audio processing for vocal metrics to provide comprehensive presentation coaching.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Content Analysis & Recommendations */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">🤖</span>
            <span className="font-semibold text-lg">Advanced Content Analysis & Recommendations</span>
          </div>
          <p className="text-gray-600 mt-2">Comprehensive analysis with detailed recommendations based on NLP metrics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strengths */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-green-800">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">✅</span>
                  <span>Strengths</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="font-semibold text-gray-800">Vocabulary</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">85.5%</Badge>
                </div>
                <p className="text-sm text-gray-600">Strong vocabulary diversity with 45.5% unique words</p>
              </div>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-orange-800">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚠️</span>
                  <span>Areas for Improvement</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600">▲</span>
                    <span className="font-semibold text-gray-800">Content Length</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">68.3%</Badge>
                </div>
                <p className="text-sm text-gray-600">Consider adding approximately 32 more words for better depth</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600">▲</span>
                    <span className="font-semibold text-gray-800">Fluency</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">69.6%</Badge>
                </div>
                <p className="text-sm text-gray-600">Reduce filler words (like, just, basically) which make up 2.81% of content</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600">▲</span>
                    <span className="font-semibold text-gray-800">Flow & Cohesion</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Add more transition words to improve flow between ideas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card className="bg-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">Detailed Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">85.5%</div>
                <div className="text-sm font-semibold text-gray-800">Vocabulary</div>
                <div className="text-xs text-gray-500">45.5% unique words</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">69.6%</div>
                <div className="text-sm font-semibold text-gray-800">Fluency</div>
                <div className="text-xs text-gray-500">2.81% filler words</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">76.9%</div>
                <div className="text-sm font-semibold text-gray-800">Sentence Structure</div>
                <div className="text-xs text-gray-500">~5.3 words/sentence</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">89.3%</div>
                <div className="text-sm font-semibold text-gray-800">Content Length</div>
                <div className="text-xs text-gray-500">Good depth</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Analysis Summary */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">📊</span>
            <span className="font-semibold text-lg">Content Analysis Summary</span>
          </div>
          <p className="text-gray-600 mt-2">Based on vocabulary, fluency, sentence structure, and other metrics</p>
        </div>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500">😊</span>
                <span className="text-sm font-medium">Sentiment</span>
              </div>
              <Badge className="bg-green-100 text-green-800">POSITIVE (99.9% confidence)</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500">😊</span>
                <span className="text-sm font-medium">Dominant Emotion</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Joy / Happiness (90% confidence)</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-green-500">📈</span>
                <span className="text-sm font-medium">Content Quality</span>
              </div>
              <Badge className="bg-green-100 text-green-800">82.5% overall quality score</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">📚</span>
                <span className="text-sm font-medium">Vocabulary Diversity</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">45.5% unique words</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-purple-500">⚡</span>
                <span className="text-sm font-medium">Complexity Level</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Basic</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-indigo-500">💪</span>
                <span className="text-sm font-medium">Overall Strength</span>
              </div>
              <Badge className="bg-indigo-100 text-indigo-800">77.1% content strength</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Analysis */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">😊</span>
            <span className="font-semibold text-lg">Sentiment Analysis</span>
          </div>
          <p className="text-gray-600 mt-2">Analysis of the emotional tone of your content</p>
        </div>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">😊</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Overall Sentiment: POSITIVE</h3>
                  <p className="text-gray-600">Confidence: 99.9%</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Positive</span>
                <div className="flex items-center space-x-2">
                  <div className="w-64 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-green-600">99.9%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Negative</span>
                <div className="flex items-center space-x-2">
                  <div className="w-64 bg-gray-200 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: '0.1%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-red-600">0.1%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Neutral</span>
                <div className="flex items-center space-x-2">
                  <div className="w-64 bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-500 h-3 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-600">0%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emotion Analysis */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">🎭</span>
            <span className="font-semibold text-lg">Emotion Analysis</span>
          </div>
          <p className="text-gray-600 mt-2">Detailed emotion categorization based on NLP & Social Media Models</p>
        </div>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">😊</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Joy / Happiness</h3>
                  <p className="text-gray-600">Confidence: 90%</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700 italic">
                  Your content expresses positive emotions, cheerfulness, and enthusiasm.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Detected Keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800">love</Badge>
                  <Badge className="bg-blue-100 text-blue-800">enjoy</Badge>
                  <Badge className="bg-blue-100 text-blue-800">great</Badge>
                  <Badge className="bg-blue-100 text-blue-800">best</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Emotion Breakdown:</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">😊</span>
                      <span className="text-sm font-medium">Joy / Happiness</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-sm font-bold">90%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">❤️</span>
                      <span className="text-sm font-medium">Love</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                      <span className="text-sm font-bold">50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Repeated Words Analysis */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">🔄</span>
            <span className="font-semibold text-lg">Repeated Words Analysis</span>
          </div>
          <p className="text-gray-600 mt-2">Words that appear frequently in your speech. Variety in vocabulary can make your message more engaging</p>
        </div>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700 italic">
                These words appear frequently in your speech. Consider using synonyms for variety.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { word: 'work', count: 8 },
                { word: 'store', count: 6 },
                { word: 'like', count: 5 },
                { word: 'sell', count: 4 },
                { word: 'different', count: 4 },
                { word: 'really', count: 3 },
                { word: 'much', count: 3 },
                { word: 'travel', count: 3 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">{item.word}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{item.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filler Words Detection */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">⚠️</span>
            <span className="font-semibold text-lg">Filler Words Detection</span>
          </div>
          <p className="text-gray-600 mt-2">Words that may reduce the clarity and impact of your message. Minimizing these can improve your delivery</p>
        </div>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="bg-orange-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700 italic">
                These are filler words that appear in your speech. Reducing them can make your delivery more impactful.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { word: 'so', percentage: '3.7%', count: 16 },
                { word: 'like', percentage: '1.8%', count: 8 },
                { word: 'just', percentage: '1.2%', count: 5 },
                { word: 'you know', percentage: '0.8%', count: 4 },
                { word: 'basically', percentage: '0.4%', count: 2 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">{item.word}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{item.percentage}</span>
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{item.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Strength Progress */}
      <div className="space-y-8">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">💪</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Overall Strength</h3>
                  <p className="text-gray-600">Your content shows strength in several important areas</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-green-600">77.1%</div>
                <Badge className="bg-green-100 text-green-800 mt-2">Good</Badge>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: '77.1%' }}></div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              Good - Your content shows strength in several important areas
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Transcript Section */}
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <span className="text-xl">📝</span>
            <span className="font-semibold text-lg">Transcript</span>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 max-h-96 overflow-y-auto">
                <h4 className="font-semibold text-gray-800 mb-4">Full Transcript</h4>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    "Good morning everyone, and thank you for joining today's quarterly sales presentation. 
                    I'm excited to share our achievements and discuss our strategic direction for the upcoming quarter."
                  </p>
                  <p className="mb-4">
                    "As you can see from the data, we've exceeded our targets by 15% this quarter, 
                    which demonstrates the effectiveness of our new customer engagement strategies."
                  </p>
                  <p className="mb-4">
                    "Moving forward, we'll be focusing on three key areas: customer retention, 
                    market expansion, and product innovation. Each of these pillars will contribute 
                    to our continued growth and success."
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4">🔍 Sentence Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <span className="text-gray-700">Opening greeting and presentation introduction</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <span className="text-gray-700">Performance results and achievement highlights</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <span className="text-gray-700">Future strategy and key focus areas</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl shadow-lg">
                  <Download className="w-5 h-5 mr-2" />
                  📄 Download Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}