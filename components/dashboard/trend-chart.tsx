'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 70 },
  { month: 'May', score: 75 },
  { month: 'Jun', score: 78 },
];

export function TrendChart() {
  return (
    <Card className="h-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Overall Score Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white/40 backdrop-blur-sm rounded-lg mx-4 mb-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#0f766e', fontWeight: 500 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#0f766e', fontWeight: 500 }}
                domain={[60, 85]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(15, 118, 110, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10b981"
                strokeWidth={4}
                dot={{ fill: '#10b981', strokeWidth: 3, r: 5, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                activeDot={{ r: 8, fill: '#059669', stroke: '#ffffff', strokeWidth: 3 }}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}