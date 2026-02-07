import React from 'react';

interface PredatorLogoProps {
  className?: string;
}

const PredatorLogo: React.FC<PredatorLogoProps> = ({ className = "" }) => {
  return (
    <span className={`font-[Helvetica_Neue,Arial,sans-serif] font-bold tracking-[0.18em] uppercase inline-flex items-baseline ${className}`}>
      PRED<span className="text-[#800000] inline-block text-[1.3em] mx-[-0.15em]">▲</span>TOR
    </span>
  );
};

export default PredatorLogo;