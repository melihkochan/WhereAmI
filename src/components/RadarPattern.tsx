const RadarPattern = () => {
  return (
    <div 
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, transparent 0%, transparent 20%, hsl(174 72% 56% / 0.15) 20%, hsl(174 72% 56% / 0.15) 21%, transparent 21%, transparent 40%, hsl(174 72% 56% / 0.12) 40%, hsl(174 72% 56% / 0.12) 41%, transparent 41%, transparent 60%, hsl(174 72% 56% / 0.1) 60%, hsl(174 72% 56% / 0.1) 61%, transparent 61%, transparent 80%, hsl(174 72% 56% / 0.08) 80%, hsl(174 72% 56% / 0.08) 81%, transparent 81%),
          conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(174 72% 56% / 0.08) 1deg, transparent 2deg, transparent 45deg, hsl(174 72% 56% / 0.08) 46deg, transparent 47deg, transparent 90deg, hsl(174 72% 56% / 0.08) 91deg, transparent 92deg, transparent 135deg, hsl(174 72% 56% / 0.08) 136deg, transparent 137deg, transparent 180deg, hsl(174 72% 56% / 0.08) 181deg, transparent 182deg, transparent 225deg, hsl(174 72% 56% / 0.08) 226deg, transparent 227deg, transparent 270deg, hsl(174 72% 56% / 0.08) 271deg, transparent 272deg, transparent 315deg, hsl(174 72% 56% / 0.08) 316deg, transparent 317deg)
        `,
        backgroundSize: '100% 100%, 100% 100%',
      }}
    />
  );
};

export default RadarPattern;
