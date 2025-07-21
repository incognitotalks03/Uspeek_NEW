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
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}/100
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Video-wise Score Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={videoScoresData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="video" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="overallScore" fill="#3b82f6" name="Overall Score" radius={[2, 2, 0, 0]} />
              <Bar dataKey="bodyLanguage" fill="#10b981" name="Body Language" radius={[2, 2, 0, 0]} />
              <Bar dataKey="vocalTone" fill="#8b5cf6" name="Vocal Tone" radius={[2, 2, 0, 0]} />
              <Bar dataKey="wordPower" fill="#f59e0b" name="Word Power" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}