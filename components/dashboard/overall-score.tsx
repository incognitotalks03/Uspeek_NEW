'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function OverallScore() {
  const overallScore = 78;
  const previousScore = 72;
  const improvement = overallScore - previousScore;
  const isImproving = improvement > 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Overall Communication Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${overallScore * 2.51} 251`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{overallScore}</div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isImproving ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${isImproving ? 'text-green-500' : 'text-red-500'}`}>
            {isImproving ? '+' : ''}{improvement} points from last assessment
          </span>
        </div>
      </CardContent>
    </Card>
  );
}