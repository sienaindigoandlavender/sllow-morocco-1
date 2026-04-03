'use client'
import { useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export interface RoutePoint {
  coords: [number, number] // [lng, lat]
  label: string
  color?: string
  size?: number // circle radius, default 5
}

export interface RouteLine {
  coords: [number, number][] // array of [lng, lat]
  color: string
  width?: number
  dashed?: boolean
  label?: string
}

export interface MapRegion {
  coords: [number, number][] // polygon ring
  color: string
  opacity?: number
  label?: string
}

interface DWLRouteMapProps {
  center: [number, number]
  zoom: number
  points?: RoutePoint[]
  lines?: RouteLine[]
  regions?: MapRegion[]
  height?: string
  style?: string // mapbox style
  minZoom?: number
  maxZoom?: number
}

export default function DWLRouteMap({
  center, zoom, points = [], lines = [], regions = [],
  height = '480px', style = 'mapbox://styles/mapbox/light-v11',
  minZoom = 1.5, maxZoom = 12
}: DWLRouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return

    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }

      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style,
        center,
        zoom,
        minZoom,
        maxZoom,
        attributionControl: false,
      })

      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')

      map.on('load', () => {
        // Regions (polygons)
        regions.forEach((r, i) => {
          map.addSource(`region-${i}`, {
            type: 'geojson',
            data: {
              type: 'Feature', properties: {},
              geometry: { type: 'Polygon', coordinates: [r.coords] }
            }
          })
          map.addLayer({
            id: `region-fill-${i}`, type: 'fill', source: `region-${i}`,
            paint: { 'fill-color': r.color, 'fill-opacity': r.opacity ?? 0.12 }
          })
          map.addLayer({
            id: `region-line-${i}`, type: 'line', source: `region-${i}`,
            paint: { 'line-color': r.color, 'line-width': 1.5, 'line-opacity': 0.4, 'line-dasharray': [4, 3] }
          })
        })

        // Lines (routes)
        lines.forEach((l, i) => {
          map.addSource(`route-${i}`, {
            type: 'geojson',
            data: {
              type: 'Feature', properties: {},
              geometry: { type: 'LineString', coordinates: l.coords }
            }
          })
          map.addLayer({
            id: `route-line-${i}`, type: 'line', source: `route-${i}`,
            paint: {
              'line-color': l.color,
              'line-width': l.width ?? 2.5,
              'line-opacity': 0.7,
              ...(l.dashed !== false ? { 'line-dasharray': [6, 4] } : {})
            }
          })
        })

        // Points
        const features = points.map(p => ({
          type: 'Feature' as const,
          properties: { label: p.label, color: p.color || '#E63946', size: p.size || 5 },
          geometry: { type: 'Point' as const, coordinates: p.coords }
        }))

        map.addSource('points', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features }
        })

        // Outer glow
        map.addLayer({
          id: 'points-glow', type: 'circle', source: 'points',
          paint: {
            'circle-radius': ['get', 'size'],
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.2,
            'circle-blur': 0.6,
          }
        })

        // Inner dot
        map.addLayer({
          id: 'points-dot', type: 'circle', source: 'points',
          paint: {
            'circle-radius': ['-', ['get', 'size'], 2],
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.9,
          }
        })

        // Labels
        map.addLayer({
          id: 'points-label', type: 'symbol', source: 'points',
          layout: {
            'text-field': ['get', 'label'],
            'text-font': ['DIN Pro Regular', 'Arial Unicode MS Regular'],
            'text-size': 10,
            'text-offset': [0, 1.4],
            'text-anchor': 'top',
            'text-max-width': 8,
          },
          paint: {
            'text-color': '#525252',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
          }
        })
      })

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [center, zoom, style, minZoom, maxZoom])

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full bg-[#fafafa] border border-[#e5e5e5] rounded-sm flex items-center justify-center text-[11px] text-[#a3a3a3]" style={{ height }}>
        Map requires MAPBOX_TOKEN
      </div>
    )
  }

  return <div ref={mapContainer} className="w-full rounded-sm border border-[#e5e5e5]" style={{ height }} />
}
