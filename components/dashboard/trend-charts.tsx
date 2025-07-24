'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const bodyLanguageData = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 80 },
  { month: 'Apr', score: 79 },
  { month: 'May', score: 81 },
  { month: 'Jun', score: 82 },
];

const vocalToneData = [
  { month: 'Jan', score: 70 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 71 },
  { month: 'Apr', score: 73 },
  { month: 'May', score: 74 },
  { month: 'Jun', score: 75 },
];

const wordPowerData = [
  { month: 'Jan', score: 74 },
  { month: 'Feb', score: 76 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 79 },
  { month: 'May', score: 78 },
  { month: 'Jun', score: 77 },
];

const chartConfigs = [
  {
    title: 'Body Language Trend',
    data: bodyLanguageData,
    color: '#10b981',
    gradient: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    icon: '🤝'
  },
  {
    title: 'Vocal Tone Trend',
    data: vocalToneData,
    color: '#3b82f6',
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50',
    icon: '🎤'
  },
  {
    title: 'Word Power Trend',
    data: wordPowerData,
    color: '#8b5cf6',
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    icon: '💬'
  }
];

export function TrendCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {chartConfigs.map((config, index) => (
        <Card key={index} className={`bg-gradient-to-br ${config.bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${config.gradient} shadow-lg`}>
                <span className="text-xl filter drop-shadow-sm">{config.icon}</span>
              </div>
              <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                {config.title}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white/60 backdrop-blur-sm rounded-lg mx-4 mb-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={config.data}>
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={config.color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={config.color} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                    domain={[65, 85]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(51, 65, 85, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={config.color}
                    strokeWidth={3}
                    dot={{ fill: config.color, strokeWidth: 2, r: 4, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                    activeDot={{ r: 6, fill: config.color, stroke: '#ffffff', strokeWidth: 2 }}
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}