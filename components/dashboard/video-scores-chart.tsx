'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const videoScoresData = [
  {
    video: 'Product Launch',
    overallScore: 85,
    bodyLanguage: 88,
    vocalTone: 82,
    wordPower: 85
  },
  {
    video: 'Sales Presentation',
    overallScore: 78,
    bodyLanguage: 82,
    vocalTone: 75,
    wordPower: 77
  },
  {
    video: 'Client Pitch',
    overallScore: 76,
    bodyLanguage: 80,
    vocalTone: 72,
    wordPower: 76
  },
  {
    video: 'Team Meeting',
    overallScore: 72,
    bodyLanguage: 70,
    vocalTone: 74,
    wordPower: 72
  },
  {
    video: 'Training Session',
    overallScore: 62,
    bodyLanguage: 65,
    vocalTone: 58,
    wordPower: 63
  },
  {
    video: 'Project Update',
    overallScore: 65,
    bodyLanguage: 68,
    vocalTone: 62,
    wordPower: 65
  }
];

export function VideoScoresChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 border-0 rounded-xl shadow-2xl backdrop-blur-sm">
          <p className="font-semibold text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-gray-200" style={{ color: entry.color }}>
              {entry.name}: {entry.value}/100
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent flex items-center space-x-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-slate-400 to-gray-500 shadow-lg">
            <span className="text-xl filter drop-shadow-sm">📊</span>
          </div>
          <span>Video-wise Score Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white/60 backdrop-blur-sm rounded-lg mx-4 mb-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={videoScoresData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="overallGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="vocalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="wordGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="video" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              />
              <Bar dataKey="overallScore" fill="url(#overallGradient)" name="Overall Score" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bodyLanguage" fill="url(#bodyGradient)" name="Body Language" radius={[4, 4, 0, 0]} />
              <Bar dataKey="vocalTone" fill="url(#vocalGradient)" name="Vocal Tone" radius={[4, 4, 0, 0]} />
              <Bar dataKey="wordPower" fill="url(#wordGradient)" name="Word Power" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}