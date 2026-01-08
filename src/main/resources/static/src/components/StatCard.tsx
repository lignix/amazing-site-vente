import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  label: string;
  icon: React.ReactNode;
  variant?: "blue" | "orange";
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  unit, 
  label, 
  icon, 
  variant = "blue" 
}) => {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    orange: "bg-orange-500/10 text-orange-500"
  };

  const textClasses = {
    blue: "text-zinc-100",
    orange: "text-orange-500"
  };

  return (
    <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl hover:border-zinc-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl transition-colors ${colorClasses[variant]}`}>
          {icon}
        </div>
        <span className="text-zinc-500 text-sm font-medium">{label}</span>
      </div>
      <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-1">
        {title}
      </p>
      <h3 className={`text-5xl font-bold font-mono ${textClasses[variant]}`}>
        {value} {unit && <span className="text-2xl">{unit}</span>}
      </h3>
    </div>
  );
};

export default StatCard;