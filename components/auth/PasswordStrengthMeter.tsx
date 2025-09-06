'use client';

import { useState, useEffect } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
  onStrengthChange?: (strength: number) => void;
}

export default function PasswordStrengthMeter({ password, onStrengthChange }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    const calculateStrength = (pwd: string) => {
      let score = 0;
      const feedbackList: string[] = [];

      if (pwd.length >= 8) {
        score += 1;
      } else {
        feedbackList.push('At least 8 characters');
      }

      if (/[a-z]/.test(pwd)) {
        score += 1;
      } else {
        feedbackList.push('Include lowercase letter');
      }

      if (/[A-Z]/.test(pwd)) {
        score += 1;
      } else {
        feedbackList.push('Include uppercase letter');
      }

      if (/[0-9]/.test(pwd)) {
        score += 1;
      } else {
        feedbackList.push('Include a number');
      }

      if (/[^A-Za-z0-9]/.test(pwd)) {
        score += 1;
      } else {
        feedbackList.push('Include a special character');
      }

      setStrength(score);
      setFeedback(feedbackList);
      onStrengthChange?.(score);
    };

    calculateStrength(password);
  }, [password, onStrengthChange]);

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-600 min-w-[50px]">
          {getStrengthText()}
        </span>
      </div>
      
      {feedback.length > 0 && (
        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-medium">Password requirements:</p>
          <ul className="space-y-1">
            {feedback.map((item, index) => (
              <li key={index} className="flex items-center space-x-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
