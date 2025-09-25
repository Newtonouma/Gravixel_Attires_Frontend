'use client';

export default function ImageTest() {
  const testImages = [
    '/videos/69ddd8b7b6c6a6dcc53cca96e61e09da.jpg',
    '/videos/OCM Men\'s 45% Wool Self Design Unstitched Suiting Fabric (Dark Worsted Blue).jpg',
    '/images/placeholder.jpg'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Loading Test</h2>
      {testImages.map((src, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p>Testing: {src}</p>
          <img 
            src={src} 
            alt={`Test ${index}`}
            style={{ width: '200px', height: '150px', objectFit: 'cover' }}
            onLoad={() => console.log(`✅ Loaded: ${src}`)}
            onError={(e) => {
              console.error(`❌ Failed to load: ${src}`);
              // Fallback to placeholder
              const img = e.target as HTMLImageElement;
              if (img.src !== '/images/placeholder.jpg') {
                img.src = '/images/placeholder.jpg';
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}