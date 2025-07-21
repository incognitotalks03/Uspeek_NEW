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
    icon: '🤝'
  },
  {
    title: 'Vocal Tone Trend',
    data: vocalToneData,
    color: '#3b82f6',
    icon: '🎤'
  },
  {
    title: 'Word Power Trend',
    data: wordPowerData,
    color: '#8b5cf6',
    icon: '💬'
  }
];

export function TrendCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {chartConfigs.map((config, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <span>{config.icon}</span>
              <span>{config.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={config.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    domain={[65, 85]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={config.color}
                    strokeWidth={2}
                    dot={{ fill: config.color, strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, fill: config.color }}
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