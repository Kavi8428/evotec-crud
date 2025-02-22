'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Users, TrendingUp, Clock } from "lucide-react";

export default function Dashboard() {
  const [movieCount, setMovieCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [avgWatchTime, setAvgWatchTime] = useState(0);

  useEffect(() => {
    // Simulate loading with counting animation
    const duration = 2000; // 2 seconds
    const steps = 50;
    const movieTarget = 120;
    const visitorTarget = 4500;
    const activeTarget = 250;
    const watchTimeTarget = 125;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setMovieCount(Math.floor((step / steps) * movieTarget));
      setVisitorCount(Math.floor((step / steps) * visitorTarget));
      setActiveUsers(Math.floor((step / steps) * activeTarget));
      setAvgWatchTime(Math.floor((step / steps) * watchTimeTarget));

      if (step >= steps) {
        clearInterval(interval);
        setMovieCount(movieTarget);
        setVisitorCount(visitorTarget);
        setActiveUsers(activeTarget);
        setAvgWatchTime(watchTimeTarget);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Total Movies",
      value: movieCount,
      icon: Film,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Total Visitors",
      value: visitorCount.toLocaleString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Avg. Watch Time",
      value: `${avgWatchTime} min`,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">Movie Hub Dashboard</h1>
          <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} ${stat.color} p-2 rounded-full`}>
                  <stat.icon size={18} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">
                  +12% from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}