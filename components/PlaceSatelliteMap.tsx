'use client';

import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

interface PlaceSatelliteMapProps {
  latitude: number;
  longitude: number;
  title: string;
  className?: string;
}

type MapStyle = 'satellite' | 'terrain' | 'dark';

const STYLES: Record<MapStyle, { url: string; label: string }> = {
  satellite: {
    url: 'mapbox://styles/mapbox/satellite-streets-v12',
    label: 'Satellite',
  },
  terrain: {
    url: 'mapbox://styles/mapbox/outdoors-v12',
    label: 'Terrain',
  },
  dark: {
    url: 'mapbox://styles/mapbox/dark-v11',
    label: 'Dark',
  },
};

export default function PlaceSatelliteMap({
  latitude,
  longitude,
  title,
  className = '',
}: PlaceSatelliteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [activeStyle, setActiveStyle] = useState<MapStyle>('satellite');
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const initMap = async () => {
      try {
        if (!mapboxgl) {
          const mb = await import('mapbox-gl');
          mapboxgl = mb.default;
          mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

          if (!document.getElementById('mapbox-gl-css')) {
            const link = document.createElement('link');
            link.id = 'mapbox-gl-css';
            link.rel = 'stylesheet';
            link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css';
            document.head.appendChild(link);
          }
        }

        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: STYLES.satellite.url,
          center: [longitude, latitude],
          zoom: 14,
          pitch: 45,
          bearing: -15,
          attributionControl: false,
          scrollZoom: false,
        });

        map.current.addControl(
          new mapboxgl.NavigationControl({ showCompass: true }),
          'top-right'
        );

        // Add terrain on load
        map.current.on('load', () => {
          setIsLoading(false);

          // 3D terrain
          if (!map.current.getSource('mapbox-dem')) {
            map.current.addSource('mapbox-dem', {
              type: 'raster-dem',
              url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
              tileSize: 512,
              maxzoom: 14,
            });
            map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
          }

          // Add sky atmosphere
          if (!map.current.getLayer('sky')) {
            map.current.addLayer({
              id: 'sky',
              type: 'sky',
              paint: {
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 15,
              },
            });
          }
        });

        // Enable scroll zoom on click
        map.current.on('click', () => {
          map.current?.scrollZoom.enable();
        });
        mapContainer.current.addEventListener('mouseleave', () => {
          map.current?.scrollZoom.disable();
        });

        // Custom marker
        const el = document.createElement('div');
        el.innerHTML = `
          <div style="position:relative;">
            <div style="width:14px;height:14px;background:#c4632d;border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 12px rgba(196,99,45,0.6);"></div>
            <div style="position:absolute;top:-1px;left:-1px;width:16px;height:16px;border-radius:50%;border:1px solid rgba(196,99,45,0.3);animation:placePulse 2s infinite;"></div>
          </div>
        `;

        // Add pulse animation
        if (!document.getElementById('place-pulse-style')) {
          const style = document.createElement('style');
          style.id = 'place-pulse-style';
          style.textContent = `
            @keyframes placePulse {
              0% { transform: scale(1); opacity: 0.8; }
              100% { transform: scale(2.5); opacity: 0; }
            }
          `;
          document.head.appendChild(style);
        }

        const popup = new mapboxgl.Popup({
          offset: 16,
          closeButton: false,
          maxWidth: '200px',
        }).setHTML(`
          <div style="font-family:system-ui;padding:4px 2px;">
            <p style="font-size:13px;font-weight:600;color:#0a0a0a;margin:0;">${title}</p>
            <p style="font-size:11px;color:#888;margin:4px 0 0;">${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°W</p>
          </div>
        `);

        markerRef.current = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map.current);
      } catch (err) {
        console.error('Map init error:', err);
        setMapError(true);
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      markerRef.current?.remove();
      map.current?.remove();
      map.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchStyle = (style: MapStyle) => {
    if (!map.current || style === activeStyle) return;
    setActiveStyle(style);

    const center = map.current.getCenter();
    const zoom = map.current.getZoom();
    const pitch = map.current.getPitch();
    const bearing = map.current.getBearing();

    map.current.setStyle(STYLES[style].url);

    map.current.once('style.load', () => {
      map.current.jumpTo({ center, zoom, pitch, bearing });

      // Re-add terrain for satellite and terrain modes
      if (style === 'satellite' || style === 'terrain') {
        if (!map.current.getSource('mapbox-dem')) {
          map.current.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14,
          });
        }
        map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      }

      if (style === 'satellite') {
        if (!map.current.getLayer('sky')) {
          map.current.addLayer({
            id: 'sky',
            type: 'sky',
            paint: {
              'sky-type': 'atmosphere',
              'sky-atmosphere-sun': [0.0, 0.0],
              'sky-atmosphere-sun-intensity': 15,
            },
          });
        }
      }

      // Re-add marker
      if (markerRef.current) {
        markerRef.current.addTo(map.current);
      }
    });
  };

  if (mapError) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Map container */}
      <div
        ref={mapContainer}
        className="w-full h-[320px] md:h-[400px]"
        style={{ borderRadius: 0 }}
      />

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
          <div className="w-5 h-5 border border-white/30 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}

      {/* Style switcher */}
      <div className="absolute bottom-4 left-4 flex gap-1 bg-black/60 backdrop-blur-sm p-1">
        {(Object.keys(STYLES) as MapStyle[]).map((key) => (
          <button
            key={key}
            onClick={() => switchStyle(key)}
            className={`px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase transition-all ${
              activeStyle === key
                ? 'bg-white/15 text-white'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {STYLES[key].label}
          </button>
        ))}
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 right-4">
        <p className="text-[9px] text-white/40 bg-black/40 px-2 py-1">
          © Mapbox © OpenStreetMap
        </p>
      </div>

      {/* Mapbox overrides */}
      <style jsx global>{`
        .mapboxgl-ctrl-group {
          background: rgba(0,0,0,0.6) !important;
          backdrop-filter: blur(8px);
          border: none !important;
          border-radius: 0 !important;
        }
        .mapboxgl-ctrl-group button {
          border: none !important;
        }
        .mapboxgl-ctrl-group button span {
          filter: invert(1);
        }
        .mapboxgl-ctrl-group button:hover {
          background: rgba(255,255,255,0.1) !important;
        }
        .mapboxgl-popup-content {
          background: #fff !important;
          border-radius: 0 !important;
          padding: 10px 14px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important;
        }
        .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
          border-top-color: #fff !important;
        }
      `}</style>
    </div>
  );
}
