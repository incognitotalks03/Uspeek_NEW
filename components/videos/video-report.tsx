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
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
          <span className="text-2xl">🎬</span>
          <span className="font-bold text-lg">Video Analysis Report</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">{video.title}</h1>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
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

      {/* Video Player and Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Video Player - 2/3 width */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-gray-50 to-white">
            <CardHeader className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <Play className="w-6 h-6" />
                <span>Video Playback</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-64 lg:h-96 object-cover"
                  poster={video.thumbnail}
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    
                    <div className="flex-1">
                      <Progress
                        value={duration ? (currentTime / duration) * 100 : 0}
                        className="h-3 bg-white/20"
                        onValueChange={handleProgressChange}
                      />
                    </div>
                    
                    <span className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                    >
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card - 1/3 width */}
        <div className="lg:col-span-1">
          <div className="relative h-full min-h-[500px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full backdrop-blur-sm"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">YOUR USPEEK REPORT</h3>
                    <p className="text-white/80 text-sm">Comprehensive Analysis</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <User className="w-5 h-5" />
                    <span>{video.speaker}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <Clock className="w-5 h-5" />
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>

              {/* Score Display */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-white/20 rounded-3xl p-8 backdrop-blur-sm text-center mb-8 shadow-xl">
                  <div className="text-6xl font-bold mb-4">
                    {(video.overallScore / 20).toFixed(1)}<span className="text-3xl">/5</span>
                  </div>
                  <div className="text-xl font-bold flex items-center justify-center space-x-2">
                    <span>🎭</span>
                    <span>NICE SHOW!</span>
                  </div>
                  <div className="mt-4 text-white/80 text-sm">
                    Above Average Performance
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-xs text-white/80">Confidence</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-xs text-white/80">WPM</div>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={() => {/* Handle download */}}
              >
                <Download className="w-6 h-6 mr-3" />
                <span className="text-lg">📄 Download Report</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Score Overview Cards */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            📊 Performance Overview
          </h2>
          <p className="text-gray-600">Detailed breakdown of your communication skills</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Body Language', score: video.bodyLanguageScore, icon: '🤝', gradient: 'from-emerald-400 to-teal-500', bgGradient: 'from-emerald-50 to-teal-50' },
            { title: 'Vocal Tone', score: video.vocalToneScore, icon: '🎤', gradient: 'from-blue-400 to-indigo-500', bgGradient: 'from-blue-50 to-indigo-50' },
            { title: 'Word Power', score: video.wordPowerScore, icon: '💬', gradient: 'from-purple-400 to-pink-500', bgGradient: 'from-purple-50 to-pink-50' }
          ].map((item, index) => (
            <Card key={index} className={`text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${item.bgGradient} border-0 shadow-xl`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                    <span className="text-3xl filter drop-shadow-sm">{item.icon}</span>
                  </div>
                  <CardTitle className={`text-xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="bg-white/60 backdrop-blur-sm rounded-xl mx-4 mb-4 p-6">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
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
                      stroke={`url(#gradient-${index})`}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${item.score * 2.51} 251`}
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                    />
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={index === 0 ? "#10b981" : index === 1 ? "#3b82f6" : "#8b5cf6"} />
                        <stop offset="100%" stopColor={index === 0 ? "#06b6d4" : index === 1 ? "#8b5cf6" : "#ec4899"} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(item.score)}`}>
                        {item.score}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">/100</div>
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${getScoreColor(item.score)} mb-2`}>
                  {item.score >= 80 ? 'Excellent' : item.score >= 70 ? 'Good' : 'Needs Improvement'}
                </div>
                <div className="text-sm text-gray-600">
                  {item.score >= 80 ? 'Outstanding performance!' : item.score >= 70 ? 'Above average results' : 'Room for growth'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Confidence Metrics */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            🎯 Confidence Metrics
          </h2>
          <p className="text-gray-600">How confident and engaging was your presentation?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-center space-x-3 text-blue-700">
                <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
                  <span className="text-3xl">🧍</span>
                </div>
                <span className="text-xl font-bold">Mostly Confident</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white/60 backdrop-blur-sm rounded-xl mx-4 mb-4 p-6">
              <div className="text-5xl font-bold text-blue-600 mb-4">3.8<span className="text-2xl">/5</span></div>
              <p className="text-blue-700 font-medium">Strong presence and composure</p>
              <div className="mt-4 w-full bg-blue-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{ width: '76%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-center space-x-3 text-purple-700">
                <div className="p-3 bg-purple-500 rounded-2xl shadow-lg">
                  <span className="text-3xl">👥</span>
                </div>
                <span className="text-xl font-bold">Low Engagement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white/60 backdrop-blur-sm rounded-xl mx-4 mb-4 p-6">
              <div className="text-5xl font-bold text-purple-600 mb-4">2.4<span className="text-2xl">/5</span></div>
              <p className="text-purple-700 font-medium">Needs more audience interaction</p>
              <div className="mt-4 w-full bg-purple-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full shadow-sm" style={{ width: '48%' }}></div>
              </div>
            </CardContent>
          </Card>
                    🎭 NICE SHOW!
                  </div>
                </div>

                {/* Download Button */}
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl"
                  onClick={() => {/* Handle download */}}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
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

      {/* Confidence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2 text-blue-700">
              <span className="text-2xl">🧍</span>
              <span>Mostly Confident</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600 mb-2">3.8/5</div>
            <p className="text-sm text-blue-600">Strong presence and composure</p>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2 text-purple-700">
              <span className="text-2xl">👥</span>
              <span>Low Engagement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600 mb-2">2.4/5</div>
            <p className="text-sm text-purple-600">Needs more audience interaction</p>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2 text-orange-700">
              <span className="text-2xl">😐</span>
              <span>Not Nervous</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600 mb-2">1.2/5</div>
            <p className="text-sm text-orange-600">Calm and composed delivery</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold">Your performance is above average.</span> You need to make a good number of changes to move the needle.
            </p>
          </div>
        </CardContent>
      </Card>

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
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-emerald-900 flex items-center space-x-2">
                  <span>🤝</span>
                  <span>Body Language Analysis</span>
                </h4>
                <Badge className="bg-emerald-100 text-emerald-800 font-semibold">
                  {video.bodyLanguageScore}/100
                </Badge>
              </div>
              
              {/* Body Language Score Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="50" cy="50" r="40"
                      stroke="#10b981" strokeWidth="8" fill="none"
                      strokeDasharray={`${video.bodyLanguageScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">{(video.bodyLanguageScore / 20).toFixed(1)}</div>
                      <div className="text-sm text-emerald-600">/5</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Positive Facial Expression */}
              <div className="mb-6">
                <h5 className="font-semibold text-emerald-800 mb-3 flex items-center space-x-2">
                  <span>😊</span>
                  <span>Positive Facial Expression</span>
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-emerald-600">😊</div>
                    <div className="text-sm font-medium">Surprise</div>
                    <div className="text-xs text-gray-500">85%</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-emerald-600">😄</div>
                    <div className="text-sm font-medium">Happy</div>
                    <div className="text-xs text-gray-500">78%</div>
                  </div>
                </div>
              </div>

              {/* Negative Facial Expression */}
              <div className="mb-6">
                <h5 className="font-semibold text-emerald-800 mb-3 flex items-center space-x-2">
                  <span>😐</span>
                  <span>Negative Facial Expression</span>
                </h5>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white rounded-lg shadow">
                    <div className="text-xl font-bold text-gray-600">😐</div>
                    <div className="text-xs font-medium">Neutral</div>
                    <div className="text-xs text-gray-500">12%</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow">
                    <div className="text-xl font-bold text-gray-600">😔</div>
                    <div className="text-xs font-medium">Sad</div>
                    <div className="text-xs text-gray-500">3%</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow">
                    <div className="text-xl font-bold text-gray-600">😠</div>
                    <div className="text-xs font-medium">Angry</div>
                    <div className="text-xs text-gray-500">2%</div>
                  </div>
                </div>
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

              {/* Body Language Insights */}
              <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">💡 Insight:</span> You are a number of areas in your body language that are having a negative impact. Review your report & start practicing to move the needle.
                </p>
              </div>

              {/* Areas to Improve */}
              <div className="mt-6">
                <h5 className="font-semibold text-emerald-800 mb-3">📈 Areas to Improve</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-lg shadow border-l-4 border-orange-400">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-orange-500">👁️</span>
                      <span className="font-medium text-gray-800">Eye Contact</span>
                      <Badge className="bg-orange-100 text-orange-800">68%</Badge>
                    </div>
                    <p className="text-xs text-gray-600">Maintain more consistent eye contact</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow border-l-4 border-red-400">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-red-500">🤲</span>
                      <span className="font-medium text-gray-800">Hand Gestures</span>
                      <Badge className="bg-red-100 text-red-800">45%</Badge>
                    </div>
                    <p className="text-xs text-gray-600">Use more natural hand movements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vocal Tone Details */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-blue-900 flex items-center space-x-2">
                  <span>🎤</span>
                  <span>Vocal Tone Analysis</span>
                </h4>
                <Badge className="bg-blue-100 text-blue-800 font-semibold">
                  {video.vocalToneScore}/100
                </Badge>
              </div>

              {/* Vocal Tone Score Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="50" cy="50" r="40"
                      stroke="#8b5cf6" strokeWidth="8" fill="none"
                      strokeDasharray={`${video.vocalToneScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{(video.vocalToneScore / 20).toFixed(1)}</div>
                      <div className="text-sm text-purple-600">/5</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vocal Insights */}
              <div className="mb-6 p-4 bg-purple-100 rounded-lg">
                <p className="text-sm text-purple-800">
                  <span className="font-semibold">🎯 Insight:</span> Your voice is strong and you are close to being on target. Work on your key improvement areas.
                </p>
              </div>

              {/* Modulation Graph Placeholder */}
              <div className="mb-6">
                <h5 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                  <span>📊</span>
                  <span>Modulation Graph</span>
                </h5>
                <div className="h-32 bg-white rounded-lg shadow p-4 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-2xl mb-2">📈</div>
                    <div className="text-sm">Voice modulation visualization</div>
                  </div>
                </div>
              </div>

              {/* Pitch Graph Placeholder */}
              <div className="mb-6">
                <h5 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                  <span>🎵</span>
                  <span>Pitch Graph</span>
                </h5>
                <div className="h-32 bg-white rounded-lg shadow p-4 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-2xl mb-2">🎼</div>
                    <div className="text-sm">Pitch variation analysis</div>
                  </div>
                </div>
              </div>

              {/* Volume Graph Placeholder */}
              <div className="mb-6">
                <h5 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                  <span>🔊</span>
                  <span>Volume Graph</span>
                </h5>
                <div className="h-32 bg-white rounded-lg shadow p-4 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm">Volume level tracking</div>
                  </div>
                </div>
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
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-purple-900 flex items-center space-x-2">
                  <span>💬</span>
                  <span>Word Power Analysis</span>
                </h4>
                <Badge className="bg-purple-100 text-purple-800 font-semibold">
                  {video.wordPowerScore}/100
                </Badge>
              </div>

              {/* Word Power Score Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="50" cy="50" r="40"
                      stroke="#ec4899" strokeWidth="8" fill="none"
                      strokeDasharray={`${video.wordPowerScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600">{(video.wordPowerScore / 20).toFixed(1)}</div>
                      <div className="text-sm text-pink-600">/5</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Word Power Insights */}
              <div className="mb-6 p-4 bg-pink-100 rounded-lg">
                <p className="text-sm text-pink-800">
                  <span className="font-semibold">💪 Insight:</span> Your Word Power is good. Identify the areas that can enhance your score.
                </p>
              </div>

              {/* Word Categories */}
              <div className="mb-6">
                <h5 className="font-semibold text-purple-800 mb-3">📝 Word Categories</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center space-x-1">
                        <span className="text-green-500">✅</span>
                        <span>Positive</span>
                      </span>
                      <Badge className="bg-green-100 text-green-800">Good</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center space-x-1">
                        <span className="text-yellow-500">⚠️</span>
                        <span>Neutral</span>
                      </span>
                      <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center space-x-1">
                        <span className="text-red-500">❌</span>
                        <span>Negative</span>
                      </span>
                      <Badge className="bg-red-100 text-red-800">Poor</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center space-x-1">
                        <span className="text-blue-500">🔄</span>
                        <span>Repetition</span>
                      </span>
                      <Badge className="bg-red-100 text-red-800">Poor</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
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

      {/* Transcript Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <span className="text-2xl">📝</span>
            <span>Transcript</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-white">📄 Transcript</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-48 overflow-y-auto">
                <p className="text-sm text-white/90 leading-relaxed">
                  "Good morning everyone. Today I want to talk about our quarterly results and the exciting opportunities ahead. 
                  Our team has worked incredibly hard this quarter, and I'm proud to announce that we've exceeded our targets by 15%. 
                  This success is a testament to our collective effort and dedication. Moving forward, we have several strategic 
                  initiatives that will help us maintain this momentum..."
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">🔍 Sentences</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-48 overflow-y-auto">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-white/70">1.</span>
                    <span className="text-white/90 ml-2">Good morning everyone.</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-white/70">2.</span>
                    <span className="text-white/90 ml-2">Today I want to talk about our quarterly results.</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-white/70">3.</span>
                    <span className="text-white/90 ml-2">Our team has worked incredibly hard this quarter.</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-white/70">4.</span>
                    <span className="text-white/90 ml-2">I'm proud to announce that we've exceeded our targets.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl">
              <Download className="w-5 h-5 mr-2" />
              📄 Download Report
            </Button>
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