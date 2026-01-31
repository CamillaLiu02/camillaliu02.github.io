import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #0ea5e9 0%, #c026d3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 20 }}>Chang Liu</div>
        <div style={{ fontSize: 40, fontWeight: 'normal', opacity: 0.9 }}>
          Full-Stack Developer & HCI/HRI Researcher
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
