import React from 'react';
import { conditionLevels } from '../../constants';

interface ConditionSelectorProps {
  currentCondition: string;
  onConditionChange: (condition: string) => void;
  disabled: boolean;
}

const conditionColors: Record<string, string> = {
  'Bad': 'bg-red-500',
  'Fair': 'bg-yellow-500',
  'Good': 'bg-amber-500',
  'Very Good': 'bg-lime-500',
  'Excellent': 'bg-green-500',
};

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({ currentCondition, onConditionChange, disabled }) => {
  return (
    <div>
        <div className="flex justify-center rounded-lg bg-white/5 p-1">
        {conditionLevels.map(level => {
            const isActive = currentCondition === level;
            return (
            <button
                key={level}
                onClick={() => onConditionChange(level)}
                disabled={disabled}
                className={`relative w-full text-center text-sm font-semibold py-2 rounded-md transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-white
                ${isActive ? 'text-white' : 'text-gray-300 hover:bg-white/10'}
                ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
            >
                {isActive && (
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit transform rotate-45"></div>
                )}
                 {isActive && (
                <span
                    className={`absolute inset-0 rounded-md ${conditionColors[level] || 'bg-gray-600'} mix-blend-lighten`}
                ></span>
                )}
                <span className="relative z-10">{level}</span>
            </button>
            );
        })}
        </div>
    </div>
  );
};
