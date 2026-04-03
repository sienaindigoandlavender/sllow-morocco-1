'use client';

import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mapboxgl: any = null;

interface MapMarker {
  lng: number;
  lat: number;
  label: string;
  color?: string;
  description?: string;
}

interface MapRoute {
  coordinates: [number, number][];
  color?: string;
  label?: string;
  dashed?: boolean;
}

interface MapFlyTo {
  center: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
  duration?: number;
}

interface StoryMapData {
  style?: string;
  center?: [number, number];
  zoom?: number;
  pitch?: number;
  bearing?: number;
  projection?: string;
  markers?: MapMarker[];
  routes?: MapRoute[];
  terrain?: boolean;
  flyTo?: MapFlyTo[];
}

interface StoryMapRendererProps {
  mapData: StoryMapData;
  title: string;
  className?: string;
}

type LayerMode = 'original' | 'satellite' | 'terrain';

const LAYER_STYLES: Record<LayerMode, { url: string; label: string }> = {
  original: { url: '', label: 'Map' }, // Will use mapData.style
  satellite: { url: 'mapbox://styles/mapbox/satellite-streets-v12', label: 'Satellite' },
  terrain: { url: 'mapbox://styles/mapbox/outdoors-v12', label: 'Terrain' },
};

export default function StoryMapRenderer({
  mapData,
  title,
  className = '',
}: StoryMapRendererProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [activeLayer, setActiveLayer] = useState<LayerMode>('original');
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const [flyToIndex, setFlyToIndex] = useState(0);

  const originalStyle = mapData.style || 'mapbox://styles/mapbox/dark-v11';

  const addMarkersAndRoutes = (map: any) => {
    // Add routes
    if (mapData.routes) {
      mapData.routes.forEach((route, i) => {
        const sourceId = `route-${i}`;
        if (map.getSource(sourceId)) return;

        map.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route.coordinates,
            },
          },
        });

        // Glow layer
        map.addLayer({
          id: `${sourceId}-glow`,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': route.color || '#D4A24E',
            'line-width': 6,
            'line-opacity': 0.25,
            'line-blur': 4,
          },
        });

        // Main line
        map.addLayer({
          id: `${sourceId}-line`,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': route.color || '#D4A24E',
            'line-width': 2.5,
            'line-opacity': 0.8,
            ...(route.dashed ? { 'line-dasharray': [3, 2] } : {}),
          },
        });
      });
    }

    // Add markers
    if (mapData.markers) {
      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      mapData.markers.forEach((marker) => {
        const color = marker.color || '#c4632d';

        const el = document.createElement('div');
        el.innerHTML = `
          <div style="width:12px;height:12px;background:${color};border:2px solid rgba(255,255,255,0.8);border-radius:50%;box-shadow:0 0 8px ${color}66;cursor:pointer;"></div>
        `;

        const popupContent = marker.description
          ? `<div style="font-family:system-ui;padding:4px 0;">
              <p style="font-size:13px;font-weight:600;color:#0a0a0a;margin:0;">${marker.label}</p>
              <p style="font-size:11px;color:#666;margin:4px 0 0;line-height:1.4;">${marker.description}</p>
            </div>`
          : `<div style="font-family:system-ui;padding:2px 0;">
              <p style="font-size:13px;font-weight:600;color:#0a0a0a;margin:0;">${marker.label}</p>
            </div>`;

        const popup = new mapboxgl.Popup({
          offset: 12,
          closeButton: false,
          maxWidth: '220px',
        }).setHTML(popupContent);

        const m = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([marker.lng, marker.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(m);
      });
    }
  };

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

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

        const config: any = {
          container: mapContainer.current,
          style: originalStyle,
          center: mapData.center || [-6.5, 31.8],
          zoom: mapData.zoom || 5,
          pitch: mapData.pitch || 0,
          bearing: mapData.bearing || 0,
          attributionControl: false,
          scrollZoom: false,
        };

        if (mapData.projection) {
          config.projection = mapData.projection;
        }

        mapRef.current = new mapboxgl.Map(config);

        mapRef.current.addControl(
          new mapboxgl.NavigationControl({ showCompass: false }),
          'top-right'
        );

        mapRef.current.on('click', () => mapRef.current?.scrollZoom.enable());
        mapContainer.current.addEventListener('mouseleave', () => mapRef.current?.scrollZoom.disable());

        mapRef.current.on('load', () => {
          setIsLoading(false);

          if (mapData.terrain) {
            if (!mapRef.current.getSource('mapbox-dem')) {
              mapRef.current.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14,
              });
              mapRef.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
            }
          }

          addMarkersAndRoutes(mapRef.current);

          // Auto fly-to sequence
          if (mapData.flyTo && mapData.flyTo.length > 0) {
            setTimeout(() => {
              const first = mapData.flyTo![0];
              mapRef.current.flyTo({
                center: first.center,
                zoom: first.zoom,
                pitch: first.pitch || 0,
                bearing: first.bearing || 0,
                duration: first.duration || 3000,
                essential: true,
              });
            }, 1500);
          }
        });
      } catch (err) {
        console.error('StoryMap init error:', err);
        setMapError(true);
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach((m) => m.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchLayer = (mode: LayerMode) => {
    if (!mapRef.current || mode === activeLayer) return;
    setActiveLayer(mode);

    const style = mode === 'original' ? originalStyle : LAYER_STYLES[mode].url;
    const center = mapRef.current.getCenter();
    const zoom = mapRef.current.getZoom();
    const pitch = mapRef.current.getPitch();
    const bearing = mapRef.current.getBearing();

    mapRef.current.setStyle(style);

    mapRef.current.once('style.load', () => {
      mapRef.current.jumpTo({ center, zoom, pitch, bearing });

      if (mode === 'satellite' || mode === 'terrain' || mapData.terrain) {
        if (!mapRef.current.getSource('mapbox-dem')) {
          mapRef.current.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14,
          });
        }
        mapRef.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      }

      addMarkersAndRoutes(mapRef.current);
    });
  };

  const handleFlyTo = () => {
    if (!mapRef.current || !mapData.flyTo || mapData.flyTo.length === 0) return;
    const nextIndex = (flyToIndex + 1) % mapData.flyTo.length;
    const target = mapData.flyTo[nextIndex];
    mapRef.current.flyTo({
      center: target.center,
      zoom: target.zoom,
      pitch: target.pitch || 0,
      bearing: target.bearing || 0,
      duration: target.duration || 2500,
      essential: true,
    });
    setFlyToIndex(nextIndex);
  };

  if (mapError) return null;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapContainer}
        className="w-full h-[360px] md:h-[480px]"
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
          <div className="w-5 h-5 border border-white/30 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}

      {/* Layer switcher */}
      <div className="absolute bottom-4 left-4 flex gap-1 bg-black/60 backdrop-blur-sm p-1">
        <button
          onClick={() => switchLayer('original')}
          className={`px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase transition-all ${
            activeLayer === 'original' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          Map
        </button>
        <button
          onClick={() => switchLayer('satellite')}
          className={`px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase transition-all ${
            activeLayer === 'satellite' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => switchLayer('terrain')}
          className={`px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase transition-all ${
            activeLayer === 'terrain' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          Terrain
        </button>
      </div>

      {/* Fly-to button */}
      {mapData.flyTo && mapData.flyTo.length > 1 && (
        <div className="absolute top-4 left-4">
          <button
            onClick={handleFlyTo}
            className="bg-black/60 backdrop-blur-sm text-white/70 hover:text-white px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase transition-all"
          >
            Next →
          </button>
        </div>
      )}

      {/* Attribution */}
      <div className="absolute bottom-4 right-4">
        <p className="text-[9px] text-white/40 bg-black/40 px-2 py-1">
          © Mapbox © OpenStreetMap
        </p>
      </div>

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
