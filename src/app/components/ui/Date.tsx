import React from 'react';

type DateProps = {
  date: {
    day: string | number;
    month: string;
  };
};

const Date: React.FC<DateProps> = ({ date }) => {
  // Fonction pour formater le jour (ajouter un 0 devant si nécessaire)
  const formatDay = (day: string | number): string => {
    const dayNumber = typeof day === 'string' ? parseInt(day, 10) : day;
    return dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
  };

  // Fonction pour formater le mois (3 premières lettres en majuscules)
  const formatMonth = (month: string): string => {
    return month.substring(0, 3).toUpperCase();
  };

  return (
    <div className="relative inline-flex bg-white rounded-xl shadow-md w-12 h-12 flex-col items-center justify-center">
      <div className="text-lg text-gray-900 font-bold leading-none">
        {formatDay(date.day)}
      </div>
      <div className="text-xs text-gray-900 mt-0.5">
        {formatMonth(date.month)}
      </div>
    </div>
  );
};

export default Date;