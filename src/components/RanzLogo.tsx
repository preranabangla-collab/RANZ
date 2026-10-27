import React from 'react';

interface RanzLogoProps {
  className?: string;
  size?: number;
}

export const RanzLogoIcon: React.FC<RanzLogoProps> = ({ className = "w-10 h-10", size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main R gradient (vibrant electric blue) */}
        <linearGradient id="ranzBlueGrad" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#0052FF" />
          <stop offset="45%" stopColor="#0070F3" />
          <stop offset="100%" stopColor="#00C0FF" />
        </linearGradient>

        {/* Deep blue fold shadow for the 3D ribbon effect */}
        <linearGradient id="ranzFoldShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B2366" />
          <stop offset="60%" stopColor="#0D3599" />
          <stop offset="100%" stopColor="#0052FF" />
        </linearGradient>

        {/* Right leg gradient */}
        <linearGradient id="ranzLegGrad" x1="30%" y1="20%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#00B4D8" />
        </linearGradient>

        {/* Soft shadow for depth */}
        <filter id="ranzDrop" x="-10%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0A2558" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter="url(#ranzDrop)">
        {/* Left vertical curving stem (Dark folded ribbon) */}
        <path
          d="M26 22C26 18.5 28.5 16 32 16H58C73 16 82 24 82 37C82 48 74 55 62 57L80 82C81.5 84 80.5 87 77.5 87H63C60.5 87 58.5 85.5 57 83.5L42 61H39V83.5C39 85.5 37.5 87 35 87H29C27 87 26 85.5 26 83.5V22Z"
          fill="url(#ranzBlueGrad)"
        />

        {/* Left 3D Ribbon Fold (gives the dimensional depth seen in official logo) */}
        <path
          d="M26 40C26 26 31 16 46 16H32C28.5 16 26 18.5 26 22V75C26 80 29 84 34 86C29 83 26 77 26 70V40Z"
          fill="url(#ranzFoldShadow)"
        />

        {/* Lower Left Swirl Fold */}
        <path
          d="M26 52C26 68 33 80 43 83L40 70C34 68 29 60 26 52Z"
          fill="url(#ranzFoldShadow)"
          opacity="0.85"
        />

        {/* The Play Triangle (Media / Learning cutout in the middle of R) */}
        <path
          d="M44 32.5C44 30.5 46.2 29.2 48 30.2L62.5 38.2C64.2 39.1 64.2 41.5 62.5 42.5L48 50.5C46.2 51.5 44 50.2 44 48.2V32.5Z"
          fill="#FFFFFF"
        />

        {/* Inner small blue play indicator */}
        <path
          d="M48 35.5L57 40.5L48 45.5V35.5Z"
          fill="#0B2366"
        />
      </g>
    </svg>
  );
};
