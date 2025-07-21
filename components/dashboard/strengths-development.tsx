'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const strengthsData = [
  { area: 'Eye Contact', score: 92, description: 'Excellent maintenance of eye contact throughout presentations' },
  { area: 'Posture', score: 88, description: 'Strong, confident posture that commands attention' },
  { area: 'Gesture Usage', score: 85, description: 'Natural and effective use of hand gestures' },
  { area: 'Voice Clarity', score: 84, description: 'Clear articulation and pronunciation' },
  { area: 'Enthusiasm', score: 82, description: 'High energy and passion in delivery' }
];

const developmentData = [
  { area: 'Filler Words', score: 45, description: 'Frequent use of "um", "uh", and "like"' },
  { area: 'Speaking Pace', score: 52, description: 'Tendency to speak too quickly during presentations' },
  { area: 'Vocal Variety', score: 58, description: 'Limited variation in pitch and tone' },
  { area: 'Pause Usage', score: 61, description: 'Insufficient strategic pauses for emphasis' },
  { area: 'Sentence Structure', score: 64, description: 'Occasional run-on sentences and incomplete thoughts' }
];

export function StrengthsAndDevelopment() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top 5 Strengths */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>Top 5 Strengths</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {strengthsData.map((strength, index) => (
            <div key={index} className="flex items-start justify-between p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{strength.area}</h4>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {strength.score}/100
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{strength.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top 5 Development Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Top 5 Development Areas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {developmentData.map((area, index) => (
            <div key={index} className="flex items-start justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{area.area}</h4>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {area.score}/100
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{area.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}