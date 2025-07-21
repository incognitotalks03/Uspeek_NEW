'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const scoreData = [
  {
    title: 'Body Language Score',
    score: 82,
    previousScore: 78,
    icon: '🤝',
    color: 'bg-green-500'
  },
  {
    title: 'Vocal Tone Score',
    score: 75,
    previousScore: 73,
    icon: '🎤',
    color: 'bg-blue-500'
  },
  {
    title: 'Word Power Score',
    score: 77,
    previousScore: 79,
    icon: '💬',
    color: 'bg-purple-500'
  }
];

export function ScoreCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scoreData.map((item, index) => {
        const change = item.score - item.previousScore;
        const isImproving = change > 0;
        const isStable = change === 0;

        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {item.title}
              </CardTitle>
              <div className="text-2xl">{item.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{item.score}</div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
                <div className="flex items-center space-x-1">
                  {isStable ? (
                    <Minus className="w-4 h-4 text-gray-400" />
                  ) : isImproving ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    isStable ? 'text-gray-400' : 
                    isImproving ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {isStable ? '0' : (isImproving ? '+' : '')}{change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}