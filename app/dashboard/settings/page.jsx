// Settings.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [language, setLanguage] = useState('en');
  const [isSaved, setIsSaved] = useState(false);

  // Load initial settings from localStorage if available
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedLanguage = localStorage.getItem('language') || 'en';

    setDarkMode(savedDarkMode);
    setFontSize(savedFontSize);
    setLanguage(savedLanguage);

    // Apply dark mode to body
    document.body.classList.toggle('dark-mode', savedDarkMode);
    
    // Apply font size to root
    document.documentElement.style.fontSize = 
      savedFontSize === 'small' ? '14px' : 
      savedFontSize === 'large' ? '18px' : '16px';
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newDarkMode = !prev;
      document.body.classList.toggle('dark-mode', newDarkMode);
      localStorage.setItem('darkMode', newDarkMode.toString());
      setIsSaved(false);
      return newDarkMode;
    });
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    const fontSizePx = 
      value === 'small' ? '14px' : 
      value === 'large' ? '18px' : '16px';
    document.documentElement.style.fontSize = fontSizePx;
    localStorage.setItem('fontSize', value);
    setIsSaved(false);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem('language', value);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Reset saved status after 2s
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card className="text-background bg-foreground">
        <CardHeader className="flex flex-row items-center space-x-2">
          <Settings2 className="h-6 w-6" />
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-lg">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>

          {/* Font Size Selector */}
          <div className="space-y-2">
            <Label htmlFor="font-size" className="text-lg">Font Size</Label>
            <Select value={fontSize} onValueChange={handleFontSizeChange}>
              <SelectTrigger id="font-size" className="w-[180px]">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <Label htmlFor="language" className="text-lg">Language</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger id="language" className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="w-[100px]"
              variant={isSaved ? "outline" : "default"}
            >
              {isSaved ? "Saved!" : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}