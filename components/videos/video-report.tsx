'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  User, 
  Calendar, 
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3
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
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateTime = () => setCurrentTime(videoElement.currentTime);
    const updateDuration = () => setDuration(videoElement.duration);

    videoElement.addEventListener('timeupdate', updateTime);
    videoElement.addEventListener('loadedmetadata', updateDuration);

    return () => {
      videoElement.removeEventListener('timeupdate', updateTime);
      videoElement.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  return (
    <div className="space-y-6">
      {/* Video Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{video.title}</h1>
        <p className="text-gray-600">Video Analysis Report</p>
      </div>

      {/* Video Player and Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player - 2/3 width */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-900 text-white p-4">
              <CardTitle className="text-lg">Video Playback</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-64 lg:h-80 object-cover"
                  poster={video.thumbnail}
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    
                    <div className="flex-1">
                      <Progress
                        value={duration ? (currentTime / duration) * 100 : 0}
                        className="h-2"
                        onValueChange={handleProgressChange}
                      />
                    </div>
                    
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card - 1/3 width */}
        <div className="lg:col-span-1">
          <div className="relative h-full min-h-[400px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">🚀 YOUR USPEEK REPORT</h3>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{video.speaker}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>

              {/* Score Display */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm text-center mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {(video.overallScore / 20).toFixed(1)}<span className="text-2xl">/5</span>
                  </div>
                  <div className="text-lg font-semibold">
                    🎭 NICE SHOW!
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl"
                onClick={() => {/* Handle download */}}
              >
                <Download className="w-5 h-5 mr-2" />
                📄 Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Score Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Body Language', score: video.bodyLanguageScore, icon: '🤝', gradient: 'from-emerald-400 to-teal-500' },
          { title: 'Vocal Tone', score: video.vocalToneScore, icon: '🎤', gradient: 'from-blue-400 to-indigo-500' },
          { title: 'Word Power', score: video.wordPowerScore, icon: '💬', gradient: 'from-purple-400 to-pink-500' }
        ].map((item, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">{item.icon}</span>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f1f5f9"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${item.score * 2.51} 251`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                      {item.score}
                    </div>
                    <div className="text-xs text-gray-500">/100</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <span>Detailed Score Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Body Language Details */}
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-emerald-900 flex items-center space-x-2">
                  <span>🤝</span>
                  <span>Body Language Analysis</span>
                </h4>
                <Badge className="bg-emerald-100 text-emerald-800 font-semibold">
                  {video.bodyLanguageScore}/100
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-emerald-700">Eye Contact</div>
                  <div className="text-2xl font-bold text-emerald-600">92</div>
                  <div className="text-xs text-emerald-600">Excellent</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-emerald-700">Posture</div>
                  <div className="text-2xl font-bold text-emerald-600">88</div>
                  <div className="text-xs text-emerald-600">Very Good</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-emerald-700">Gestures</div>
                  <div className="text-2xl font-bold text-yellow-600">68</div>
                  <div className="text-xs text-yellow-600">Needs Work</div>
                </div>
              </div>
            </div>

            {/* Vocal Tone Details */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-blue-900 flex items-center space-x-2">
                  <span>🎤</span>
                  <span>Vocal Tone Analysis</span>
                </h4>
                <Badge className="bg-blue-100 text-blue-800 font-semibold">
                  {video.vocalToneScore}/100
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-blue-700">Clarity</div>
                  <div className="text-2xl font-bold text-blue-600">84</div>
                  <div className="text-xs text-blue-600">Very Good</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-700">Pace</div>
                  <div className="text-2xl font-bold text-yellow-600">65</div>
                  <div className="text-xs text-yellow-600">Too Fast</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-700">Volume</div>
                  <div className="text-2xl font-bold text-blue-600">78</div>
                  <div className="text-xs text-blue-600">Good</div>
                </div>
              </div>
            </div>

            {/* Word Power Details */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-purple-900 flex items-center space-x-2">
                  <span>💬</span>
                  <span>Word Power Analysis</span>
                </h4>
                <Badge className="bg-purple-100 text-purple-800 font-semibold">
                  {video.wordPowerScore}/100
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-purple-700">Vocabulary</div>
                  <div className="text-2xl font-bold text-purple-600">82</div>
                  <div className="text-xs text-purple-600">Very Good</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-700">Filler Words</div>
                  <div className="text-2xl font-bold text-red-600">45</div>
                  <div className="text-xs text-red-600">Too Many</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-700">Grammar</div>
                  <div className="text-2xl font-bold text-purple-600">85</div>
                  <div className="text-xs text-purple-600">Excellent</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-500" />
              <span>Key Performance Indicators</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Engagement Score</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">8.2/10</div>
                  <div className="text-xs text-gray-500">Very High</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Confidence Level</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">7.8/10</div>
                  <div className="text-xs text-gray-500">High</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Clarity Index</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">7.5/10</div>
                  <div className="text-xs text-gray-500">Good</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="font-medium">Persuasiveness</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-600">6.9/10</div>
                  <div className="text-xs text-gray-500">Moderate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>Time-based Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-900">Speaking Time</span>
                  <span className="font-bold text-blue-600">11:45 / 12:34</span>
                </div>
                <Progress value={93} className="h-2" />
                <div className="text-xs text-blue-600 mt-1">93% of total duration</div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-yellow-900">Pause Time</span>
                  <span className="font-bold text-yellow-600">0:49</span>
                </div>
                <Progress value={7} className="h-2" />
                <div className="text-xs text-yellow-600 mt-1">7% of total duration</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-bold text-gray-900">156</div>
                  <div className="text-xs text-gray-600">Words per minute</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-bold text-gray-900">23</div>
                  <div className="text-xs text-gray-600">Filler words</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Excellent Eye Contact</div>
                  <div className="text-sm text-gray-600">Maintained consistent eye contact throughout the presentation</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Clear Voice Projection</div>
                  <div className="text-sm text-gray-600">Voice was clear and audible throughout</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Confident Posture</div>
                  <div className="text-sm text-gray-600">Demonstrated strong, professional posture</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Strong Opening</div>
                  <div className="text-sm text-gray-600">Captured attention effectively in the first 30 seconds</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Good Vocabulary Usage</div>
                  <div className="text-sm text-gray-600">Used appropriate professional terminology</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-orange-500" />
              <span>Areas for Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Reduce Filler Words</div>
                  <div className="text-sm text-gray-600">Minimize use of "um", "uh", and "like"</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Vary Speaking Pace</div>
                  <div className="text-sm text-gray-600">Use pauses and pace variation for emphasis</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Hand Gesture Usage</div>
                  <div className="text-sm text-gray-600">Incorporate more natural hand gestures</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Conclusion Strength</div>
                  <div className="text-sm text-gray-600">End with a more impactful closing statement</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Audience Engagement</div>
                  <div className="text-sm text-gray-600">Include more interactive elements or questions</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Comparative Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <span>Comparative Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Performance vs. Previous Videos</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Score</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{video.overallScore}/100</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">+6 from last video</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Body Language</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{video.bodyLanguageScore}/100</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">+4 from last video</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Vocal Tone</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{video.vocalToneScore}/100</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">+2 from last video</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Word Power</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{video.wordPowerScore}/100</span>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-600">-3 from last video</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Industry Benchmarks</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Your Score</span>
                    <span className="font-bold text-blue-600">{video.overallScore}/100</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Industry Average</span>
                    <span className="font-bold text-gray-600">72/100</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Top 10% Performers</span>
                    <span className="font-bold text-green-600">85/100</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Badge className="bg-blue-100 text-blue-800">
                    You're performing {video.overallScore > 72 ? 'above' : 'below'} industry average
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <span>Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Practice Sessions</h4>
              <p className="text-sm text-blue-700">
                Schedule regular practice sessions focusing on filler word reduction and pace variation.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Body Language Training</h4>
              <p className="text-sm text-green-700">
                Continue building on your strong foundation with advanced gesture techniques.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Vocal Exercises</h4>
              <p className="text-sm text-purple-700">
                Practice breathing exercises and vocal warm-ups to improve tone variation.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Content Structure</h4>
              <p className="text-sm text-orange-700">
                Work on creating stronger openings and conclusions for maximum impact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}