'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$29',
    period: 'per month',
    features: [
      'Up to 10 video analyses per month',
      'Basic reporting',
      'Email support',
      'Standard processing speed'
    ],
    current: false
  },
  {
    name: 'Professional',
    price: '$79',
    period: 'per month',
    features: [
      'Up to 50 video analyses per month',
      'Advanced reporting & analytics',
      'Priority support',
      'Fast processing speed',
      'Custom branding',
      'API access'
    ],
    current: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: 'per month',
    features: [
      'Unlimited video analyses',
      'Advanced analytics & insights',
      '24/7 dedicated support',
      'Fastest processing speed',
      'White-label solution',
      'Full API access',
      'Custom integrations',
      'On-premise deployment option'
    ],
    current: false
  }
];

export default function SubscriptionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          </div>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Professional Plan</h3>
                <p className="text-gray-600">$79 per month • Renews on February 15, 2024</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.current ? 'ring-2 ring-blue-600' : ''}`}>
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Current Plan</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.current 
                        ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-medium">Professional Plan</div>
                  <div className="text-sm text-gray-500">January 15, 2024</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$79.00</div>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-medium">Professional Plan</div>
                  <div className="text-sm text-gray-500">December 15, 2023</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$79.00</div>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}