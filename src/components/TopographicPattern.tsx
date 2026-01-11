const TopographicPattern = () => {
  return (
    <div 
      className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(174 72% 56%) 2px, hsl(174 72% 56%) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(174 72% 56%) 2px, hsl(174 72% 56%) 4px),
          repeating-linear-gradient(45deg, transparent, transparent 1px, hsl(280 60% 50%) 1px, hsl(280 60% 50%) 2px),
          repeating-linear-gradient(-45deg, transparent, transparent 1px, hsl(280 60% 50%) 1px, hsl(280 60% 50%) 2px)
        `,
        backgroundSize: '200px 200px, 200px 200px, 100px 100px, 100px 100px',
        backgroundPosition: '0 0, 0 0, 0 0, 0 0',
        animation: 'topographic-drift 60s linear infinite',
      }}
    />
  );
};

export default TopographicPattern;
