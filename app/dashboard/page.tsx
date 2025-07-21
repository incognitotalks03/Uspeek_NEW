'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { OverallScore } from '@/components/dashboard/overall-score';
import { TrendChart } from '@/components/dashboard/trend-chart';
import { ScoreCards } from '@/components/dashboard/score-cards';
import { TrendCharts } from '@/components/dashboard/trend-charts';
import { StrengthsAndDevelopment } from '@/components/dashboard/strengths-development';
import { TopLowPerformingVideos } from '@/components/dashboard/top-low-performing-videos';
import { PendingAssignments } from '@/components/dashboard/pending-assignments';
import { VideoScoresChart } from '@/components/dashboard/video-scores-chart';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Communication Analytics Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Overall Score and Main Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <OverallScore />
          </div>
          <div className="lg:col-span-2">
            <TrendChart />
          </div>
        </div>

        {/* Score Cards */}
        <ScoreCards />

        {/* Top and Low Performing Videos */}
        <TopLowPerformingVideos />

        {/* Video Scores Chart */}
        <VideoScoresChart />

        {/* Pending Assignments */}
        <PendingAssignments />

        {/* Individual Trend Charts */}
        <TrendCharts />

        {/* Strengths & Development Areas */}
        <StrengthsAndDevelopment />
      </div>
    </DashboardLayout>
  );
}