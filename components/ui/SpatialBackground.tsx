'use client';

export default function SpatialBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary bloom — top left, indigo */}
      <div
        className="absolute"
        style={{
          width: '80vw',
          height: '80vw',
          top: '-20vw',
          left: '-20vw',
          background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 65%)',
        }}
      />
      {/* Secondary bloom — top right, violet */}
      <div
        className="absolute"
        style={{
          width: '70vw',
          height: '70vw',
          top: '-10vw',
          right: '-15vw',
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)',
        }}
      />
      {/* Mid bloom — center, soft blue */}
      <div
        className="absolute"
        style={{
          width: '60vw',
          height: '60vw',
          top: '30vh',
          left: '20vw',
          background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)',
          animation: 'spatial-drift 18s ease-in-out infinite alternate',
        }}
      />
      {/* Bottom bloom — violet */}
      <div
        className="absolute"
        style={{
          width: '70vw',
          height: '70vw',
          bottom: '-20vw',
          right: '10vw',
          background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)',
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
