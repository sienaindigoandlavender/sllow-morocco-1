"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface ProposalData {
  id: string;
  journeyTitle: string;
  arcDescription: string;
  clientName: string;
  heroImage: string;
  price?: string;
  travelers?: number;
  startDate?: string;
  days: {
    dayNumber: number;
    date?: string;
    title: string;
    fromCity?: string;
    toCity?: string;
    description: string;
    imageUrl: string;
    // Additional metadata
    durationHours?: string;
    difficultyLevel?: string;
    activities?: string;
    accommodationType?: string;
    accommodationName?: string;
    roomConfig?: string;
    meals?: string;
    mealsDetail?: string;
    activitiesDetail?: string;
    guideIncluded?: boolean;
    guideLanguage?: string;
    transferType?: string;
    transferDetails?: string;
    dayNotes?: string;
    highlights?: string;
  }[];
}

// Morocco city coordinates
const cityCoordinates: { [key: string]: [number, number] } = {
  "Marrakech": [-7.9811, 31.6295],
  "Marrakesh": [-7.9811, 31.6295],
  "Casablanca": [-7.5898, 33.5731],
  "Fes": [-5.0078, 34.0181],
  "Fez": [-5.0078, 34.0181],
  "Chefchaouen": [-5.2636, 35.1688],
  "Essaouira": [-9.7595, 31.5085],
  "Merzouga": [-4.0133, 31.0802],
  "Ouarzazate": [-6.8936, 30.9189],
  "Ait Benhaddou": [-7.1319, 31.0470],
  "Todra Gorge": [-5.5833, 31.5500],
  "Dades Valley": [-5.9833, 31.4500],
  "Tangier": [-5.8128, 35.7595],
  "Rabat": [-6.8498, 34.0209],
  "Agadir": [-9.5981, 30.4278],
  "Zagora": [-5.8381, 30.3306],
  "Tinghir": [-5.5328, 31.5147],
  "Erfoud": [-4.2286, 31.4314],
  "Midelt": [-4.7450, 32.6852],
  "Ifrane": [-5.1108, 33.5228],
  "Meknes": [-5.5547, 33.8731],
  "Volubilis": [-5.5547, 34.0733],
  "Agafay": [-8.1500, 31.4000],
  "Agafay Desert": [-8.1500, 31.4000],
  "Tamnougalt": [-6.4667, 30.9500],
  "Errachidia": [-4.4261, 31.9314],
  "Dades": [-5.9833, 31.4500],
  "Todra": [-5.5833, 31.5500],
};

export default function ProposalPage() {
  const params = useParams();
  const proposalId = params.id as string;
  
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const mapInitialized = useRef(false);
  const [staticMapUrl, setStaticMapUrl] = useState<string>("");
  
  // Admin mode - shows edit controls
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Send modal state
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  
  // Client action modals
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [clientFeedback, setClientFeedback] = useState("");
  const [approvalSubmitted, setApprovalSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  // Save proposal days to Supabase
  const saveDaysToSupabase = async (days: any[]) => {
    try {
      await fetch(`/api/proposals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId,
          daysList: days,
          formattedPrice: editablePrice,
          heroTitle: proposal?.journeyTitle,
          heroBlurb: proposal?.arcDescription,
          heroImageUrl: proposal?.heroImage,
        }),
      });
    } catch (e) {
      console.error('Failed to save to Supabase:', e);
    }
  };

  // Editable price (admin only)
  const [editablePrice, setEditablePrice] = useState("");
  
  // Which day is being detailed-edited
  const [editingDayNumber, setEditingDayNumber] = useState<number | null>(null);

  // Update a specific day field in the proposal
  const updateDay = (dayNumber: number, field: string, value: any) => {
    if (!proposal) return;
    const updatedDays = proposal.days.map(d => 
      d.dayNumber === dayNumber ? { ...d, [field]: value } : d
    );
    const updated = { ...proposal, days: updatedDays };
    setProposal(updated);
    localStorage.setItem(`proposal-${proposalId}`, JSON.stringify(updated));
  };

  // Check if admin mode from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsAdmin(urlParams.get('edit') === 'true');
  }, []);

  // Generate a random passcode
  const generatePasscode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let passcode = '';
    for (let i = 0; i < 6; i++) {
      passcode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return passcode;
  };

  useEffect(() => {
    const loadProposal = async () => {
      // First, check localStorage for the proposal data
      const storedProposal = localStorage.getItem(`proposal-${proposalId}`);
      
      if (storedProposal) {
        const data = JSON.parse(storedProposal);
        setProposal(data);
        setEditablePrice(data.price || '2,450');
        generateMapUrl(data);
        setEmailDefaults(data);
        setLoading(false);
        return;
      }
      
      // If not in localStorage, try fetching from the API (Google Sheets)
      try {
        const res = await fetch(`/api/proposals?id=${proposalId}`);
        const data = await res.json();
        
        if (data.success && data.proposal) {
          const proposal = data.proposal;
          setProposal(proposal);
          setEditablePrice(proposal.price || '2,450');
          generateMapUrl(proposal);
          setEmailDefaults(proposal);
          
          // Also cache in localStorage for future use
          localStorage.setItem(`proposal-${proposalId}`, JSON.stringify(proposal));
        }
      } catch (err) {
        console.error("Failed to fetch proposal:", err);
      }
      
      setLoading(false);
    };
    
    const generateMapUrl = (data: any) => {
      const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
      const routePoints: [number, number][] = [];
      
      // Use routePoints from API if available
      if (data.routePoints?.length) {
        data.routePoints.forEach((point: any) => {
          if (point.coords) {
            routePoints.push(point.coords);
          }
        });
      } else {
        // Fall back to extracting from days
        data.days?.forEach((day: any) => {
          if (day.fromCity && cityCoordinates[day.fromCity] && !routePoints.some(p => p[0] === cityCoordinates[day.fromCity][0])) {
            routePoints.push(cityCoordinates[day.fromCity]);
          }
          if (day.toCity && cityCoordinates[day.toCity] && !routePoints.some(p => p[0] === cityCoordinates[day.toCity][0])) {
            routePoints.push(cityCoordinates[day.toCity]);
          }
          if (day.title && cityCoordinates[day.title] && !routePoints.some(p => p[0] === cityCoordinates[day.title][0])) {
            routePoints.push(cityCoordinates[day.title]);
          }
        });
      }
      
      if (routePoints.length > 0) {
        const markers = routePoints.map((coords, i) => 
          `pin-s-${i + 1}+1a1a1a(${coords[0]},${coords[1]})`
        ).join(',');
        
        const pathCoords = routePoints.map(c => `${c[0]},${c[1]}`).join(';');
        const path = routePoints.length > 1 ? `path-2+1a1a1a-0.5(${encodeURIComponent(pathCoords)})` : '';
        
        const overlays = path ? `${path},${markers}` : markers;
        setStaticMapUrl(`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${overlays}/auto/800x400@2x?padding=50&access_token=${mapboxToken}`);
      } else {
        setStaticMapUrl(`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-6.5,31.5,5/800x400@2x?access_token=${mapboxToken}`);
      }
    };
    
    const setEmailDefaults = (data: any) => {
      const clientUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/proposal/${proposalId}` 
        : '';
      
      setEmailSubject(`Your ${data.journeyTitle} Itinerary`);
      setEmailMessage(`Dear ${data.clientName || 'Traveler'},

Thank you for your interest in exploring Morocco with us. I'm delighted to share your personalized itinerary for the ${data.journeyTitle}.

View your itinerary here:
${clientUrl}

Please take a moment to review the journey we've crafted for you. You'll find all the details including your day-by-day itinerary, pricing, and what's included.

Once you've reviewed, you can approve the itinerary or let us know if you'd like any adjustments.

Looking forward to creating an unforgettable experience for you.

Warm regards,
Slow Morocco Team`);
    };
    
    loadProposal();
  }, [proposalId]);

  // Initialize Mapbox
  useEffect(() => {
    if (!proposal || mapInitialized.current) return;
    
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    
    // Check if Mapbox is already loaded
    if ((window as any).mapboxgl) {
      initMap();
      return;
    }
    
    // Load Mapbox CSS
    const existingLink = document.querySelector('link[href*="mapbox-gl.css"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // Load Mapbox JS
    const existingScript = document.querySelector('script[src*="mapbox-gl.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js';
      script.async = true;
      script.onload = () => {
        setTimeout(initMap, 100); // Small delay to ensure script is fully ready
      };
      script.onerror = () => {
        console.error('Failed to load Mapbox script');
      };
      document.head.appendChild(script);
    } else {
      // Script exists, try to init
      setTimeout(initMap, 100);
    }

    function initMap() {
      const mapboxgl = (window as any).mapboxgl;
      if (!mapboxgl) {
        console.error('Mapbox GL not available');
        return;
      }
      if (!proposal) {
        console.error('No proposal data');
        return;
      }
      
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        // Retry after a short delay if map container not ready
        console.log('Map container not ready, retrying...');
        setTimeout(initMap, 200);
        return;
      }
      
      // Check if map already initialized in this container
      if (mapContainer.children.length > 0) {
        console.log('Map already initialized');
        return;
      }

      try {
        mapboxgl.accessToken = mapboxToken;

      // Get route coordinates from days
      const routePoints: [number, number][] = [];
      const cities: string[] = [];

      proposal.days.forEach((day) => {
        if (day.fromCity && cityCoordinates[day.fromCity] && !cities.includes(day.fromCity)) {
          cities.push(day.fromCity);
          routePoints.push(cityCoordinates[day.fromCity]);
        }
        if (day.toCity && cityCoordinates[day.toCity] && !cities.includes(day.toCity)) {
          cities.push(day.toCity);
          routePoints.push(cityCoordinates[day.toCity]);
        }
        // Also check title for city name
        if (day.title && cityCoordinates[day.title] && !cities.includes(day.title)) {
          cities.push(day.title);
          routePoints.push(cityCoordinates[day.title]);
        }
      });

      // Default to Morocco center if no route
      const defaultCenter: [number, number] = [-6.5, 32];
      const center = routePoints.length > 0 ? routePoints[0] : defaultCenter;

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: center,
        zoom: 5.5,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.on('load', () => {
        // Add markers for each city
        routePoints.forEach((coords, index) => {
          const el = document.createElement('div');
          el.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          `;
          const dot = document.createElement('div');
          dot.style.cssText = `
            width: 10px;
            height: 10px;
            background: #1a1a1a;
            border: 2px solid #f5f0e8;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          `;
          const label = document.createElement('div');
          label.style.cssText = `
            margin-top: 4px;
            font-size: 10px;
            font-family: serif;
            color: #1a1a1a;
            letter-spacing: 0.05em;
            white-space: nowrap;
            text-shadow: 0 1px 2px rgba(255,255,255,0.8);
          `;
          label.textContent = cities[index] || '';
          el.appendChild(dot);
          el.appendChild(label);

          new mapboxgl.Marker(el)
            .setLngLat(coords)
            .addTo(map);
        });

        // Add route line if we have multiple points
        if (routePoints.length > 1) {
          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routePoints,
              },
            },
          });

          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#8B7355',
              'line-width': 1.5,
              'line-dasharray': [3, 2],
            },
          });

          // Fit map to show all points
          const bounds = new mapboxgl.LngLatBounds();
          routePoints.forEach((point) => bounds.extend(point));
          map.fitBounds(bounds, { padding: 50 });
        }
      });

      mapInitialized.current = true;
      console.log('Map initialized successfully');
      } catch (error) {
        console.error('Error initializing map:', error);
        // Show static map fallback
        const fallback = document.getElementById('static-map-fallback');
        const mapDiv = document.getElementById('map');
        if (fallback && mapDiv) {
          mapDiv.style.display = 'none';
          fallback.classList.remove('hidden');
        }
      }
    }

    return () => {
      // Cleanup
    };
  }, [proposal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="font-serif text-2xl mb-4">Proposal not found</h1>
        <p className="text-muted-foreground mb-8">This proposal may have expired or the link is invalid.</p>
        <Link href="/" className="text-sm underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-16 md:pt-20">
      <style>{`
        @media print {
          /* Hide everything web-specific */
          nav, header, footer,
          .print\:hidden,
          #map,
          [id="static-map-fallback"],
          .fixed,
          a[href*="gutenberg"],
          section.py-20 {
            display: none !important;
          }

          /* Reset page */
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          
          /* Show print pages, hide web content */
          .print-cover, .print-investment, .print-map, .print-day { display: flex !important; flex-direction: column; }
          .hidden { display: flex !important; }
          
          /* Hide all web-only content */
          .bg-background > div:not(.print-cover):not(.print-investment):not(.print-map):not(.print-day):not([style*="print"]) { display: none !important; }
          
          body { background: white !important; color: black !important; font-family: Georgia, serif; }
          
          /* Cover page */
          .print-cover {
            display: flex !important;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
            padding: 80px 80px;
            page-break-after: always;
            border-bottom: none;
          }

          /* Investment page */
          .print-investment {
            page-break-after: always;
            padding: 60px 80px;
          }

          /* Each day */
          .print-day {
            page-break-after: always;
            page-break-inside: avoid;
            padding: 60px 80px;
          }

          /* Map page */
          .print-map {
            page-break-after: always;
            padding: 60px 80px;
            height: 100vh;
          }
          .print-map #map {
            display: block !important;
            height: 600px !important;
            width: 100% !important;
          }

          /* Typography */
          h1 { font-size: 48px; font-weight: normal; margin-bottom: 8px; }
          h2 { font-size: 28px; font-weight: normal; margin-bottom: 4px; }
          h3 { font-size: 18px; font-weight: normal; margin-bottom: 16px; }
          p { font-size: 13px; line-height: 1.7; color: #333; }
          
          /* Day meta */
          .print-day-meta { 
            font-size: 11px; 
            letter-spacing: 0.12em; 
            text-transform: uppercase; 
            color: #888; 
            margin-bottom: 20px;
          }
          .print-day-practical {
            font-size: 12px;
            line-height: 1.8;
            color: #444;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .print-day-description {
            font-size: 13px;
            line-height: 1.8;
            color: #555;
            font-style: italic;
          }

          /* Hide day images in print */
          .print-hide-image { display: none !important; }

          /* Header on each page */
          .print-header {
            font-size: 10px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #aaa;
            margin-bottom: 48px;
            padding-bottom: 12px;
            border-bottom: 1px solid #eee;
          }

          /* Footer on each page */
          .print-footer {
            font-size: 10px;
            color: #aaa;
            margin-top: 40px;
            padding-top: 12px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: space-between;
          }

          /* What's included list */
          .print-included li {
            font-size: 12px;
            padding: 6px 0;
            border-bottom: 1px solid #f0f0f0;
            list-style: none;
          }

          /* Route arrow */
          .print-route {
            font-size: 11px;
            color: #888;
            margin-bottom: 12px;
          }

          /* Icon metadata row */
          .print-icons {
            font-size: 11px;
            color: #888;
            margin-bottom: 16px;
          }
        }
      `}</style>
      {/* PRINT COVER PAGE */}
      <div className="print-cover hidden">
        <div>
          <p className="print-header">Slow Morocco</p>
          <h1 style={{fontSize: '56px', fontFamily: 'Georgia, serif', fontWeight: 'normal', marginBottom: '24px'}}>
            {proposal.journeyTitle}
          </h1>
          <p style={{fontSize: '16px', color: '#888', marginBottom: '48px', fontStyle: 'italic', maxWidth: '480px', lineHeight: '1.8'}}>
            "From far off, through circuitous corridors, came the scent of citrus-blossom and jasmine, with sometimes a bird&apos;s song before dawn, sometimes a flute&apos;s wail at sunset, and always the call of the muezzin in the night…"
          </p>
          <p style={{fontSize: '12px', color: '#aaa', letterSpacing: '0.1em'}}>— Edith Wharton, In Morocco (1920)</p>
        </div>
        <div>
          <p style={{fontSize: '14px', color: '#333', marginBottom: '8px'}}>{proposal.clientName}</p>
          <p style={{fontSize: '12px', color: '#888'}}>{proposal.travelers || 4} guests &nbsp;·&nbsp; December 20–28, 2026</p>
          <div className="print-footer">
            <span>hello@slowmorocco.com</span>
            <span>slowmorocco.com</span>
            <span>Marrakech, Morocco</span>
          </div>
        </div>
      </div>

      {/* PRINT INVESTMENT PAGE */}
      <div className="print-investment hidden">
        <p className="print-header">Slow Morocco · {proposal.journeyTitle}</p>
        <h2 style={{fontSize: '32px', fontFamily: 'Georgia, serif', fontWeight: 'normal', marginBottom: '8px'}}>
          Your Investment
        </h2>
        <p style={{fontSize: '48px', fontFamily: 'Georgia, serif', marginBottom: '4px'}}>€{parseInt((proposal.price || "22000").replace(/,/g, '')).toLocaleString()}</p>
        <p style={{fontSize: '13px', color: '#888', marginBottom: '4px'}}>total for a group of {proposal.travelers || 4}</p>
        <p style={{fontSize: '13px', color: '#888', marginBottom: '40px'}}>€{Math.round(parseInt((proposal.price || "22000").replace(/,/g, '')) / (proposal.travelers || 4)).toLocaleString()} per person</p>
        
        <h3 style={{fontSize: '16px', fontFamily: 'Georgia, serif', fontWeight: 'normal', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #eee'}}>What&apos;s Included</h3>
        <ul className="print-included" style={{marginBottom: '40px', paddingLeft: '0'}}>
          <li>Private transportation throughout with a dedicated driver</li>
          <li>Handpicked accommodations, selected for character and location</li>
          <li>All breakfasts, lunches and dinners</li>
          <li>Entrance fees to attractions included in your programme</li>
          <li>English-speaking guide in Marrakech</li>
          <li>24/7 local support throughout your journey</li>
        </ul>

        <h3 style={{fontSize: '16px', fontFamily: 'Georgia, serif', fontWeight: 'normal', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #eee'}}>How It Works</h3>
        <p style={{fontSize: '12px', color: '#444', lineHeight: '1.8', marginBottom: '12px'}}>A 30% deposit confirms your journey. The remaining balance is due 45 days before departure.</p>
        <p style={{fontSize: '12px', color: '#444', lineHeight: '1.8', marginBottom: '12px'}}>More than 45 days before departure — deposit refunded in full, minus any non-refundable commitments already made. Less than 45 days — no refund possible.</p>
        <p style={{fontSize: '12px', color: '#444', lineHeight: '1.8', marginBottom: '40px'}}>We strongly recommend comprehensive travel insurance covering trip cancellation.</p>
        
        <div className="print-footer">
          <span>hello@slowmorocco.com</span>
          <span>slowmorocco.com/booking-conditions</span>
        </div>
      </div>

      {/* PRINT MAP PAGE */}
      <div className="print-map hidden">
        <p className="print-header">Slow Morocco · Your Route</p>
        <h2 style={{fontSize: '28px', fontFamily: 'Georgia, serif', fontWeight: 'normal', marginBottom: '24px'}}>Your Route</h2>
        <div id="map-print" style={{height: '600px', width: '100%', background: '#f5f5f5'}} />
      </div>

      {/* PRINT ITINERARY PAGES */}
      {proposal.days.sort((a, b) => a.dayNumber - b.dayNumber).map((day) => (
        <div key={`print-${day.dayNumber}`} className="print-day hidden">
          <p className="print-header">Slow Morocco · {proposal.journeyTitle}</p>
          <h2 style={{fontSize: '36px', fontFamily: 'Georgia, serif', fontWeight: 'normal', marginBottom: '4px'}}>{day.title}</h2>
          <p className="print-day-meta">
            Day {day.dayNumber}{day.date ? ` — ${new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}` : ''}
          </p>
          {day.fromCity && day.toCity && day.fromCity !== day.toCity && (
            <p className="print-route">{day.fromCity} → {day.toCity}</p>
          )}
          <div className="print-day-practical">
            {(day.mealsDetail || day.meals) && <p style={{margin: '0 0 6px 0'}}><strong>Meals:</strong> {day.mealsDetail || day.meals}</p>}
            {(day.accommodationName || day.accommodationType) && <p style={{margin: '0 0 6px 0'}}><strong>Accommodation:</strong> {day.accommodationName || day.accommodationType}{day.roomConfig ? ` (${day.roomConfig})` : ''}</p>}
            {(day.activitiesDetail || day.activities) && <p style={{margin: '0 0 6px 0'}}><strong>Activities:</strong> {day.activitiesDetail || day.activities}</p>}
            {day.guideIncluded && <p style={{margin: '0 0 6px 0'}}><strong>Guide:</strong> {day.guideLanguage || 'English'}-speaking official guide</p>}
            {day.transferType && day.transferType !== 'none' && day.transferDetails && (
              <p style={{margin: '0'}}><strong>Transfer:</strong> {day.transferDetails}</p>
            )}
          </div>
          <p className="print-day-description">{day.description.split('Meals:')[0].trim()}</p>
          <div className="print-footer">
            <span>Slow Morocco · hello@slowmorocco.com</span>
            <span>Day {day.dayNumber} of {proposal.days.length}</span>
          </div>
        </div>
      ))}

      {/* Day Detail Editor Modal */}
      {isAdmin && editingDayNumber !== null && proposal && (() => {
        const day = proposal.days.find(d => d.dayNumber === editingDayNumber);
        if (!day) return null;
        
        const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
        const activityOptions = [
          // Culture & Architecture
          'Medina tour', 'Palais Bahia', 'Palais Badi', 'Dar Si Said',
          'Medersa Ben Youssef', 'Dar el Bacha', 'Saadian Tombs',
          'Ksar Ait Benhaddou', 'Kasbah des Caids',
          // Gardens & Art
          'Jardin Majorelle', 'Yves Saint Laurent Museum', 'Anima',
          // Experiences
          'Hot Air Balloon', 'Camel ride', 'Horse riding', 'Quad biking',
          'Hammam & Spa', 'Fossil hunting', 'Berber music evening',
          'Desert walk', 'Cooking class'
        ];
        const currentMeals = (day.mealsDetail || day.meals || '').split(',').map(m => m.trim()).filter(Boolean);
        const currentActivities = (day.activitiesDetail || day.activities || '').split(',').map(a => a.trim()).filter(Boolean);

        return (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
            <div className="bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl">Day {day.dayNumber} — {day.title}</h2>
                <button onClick={() => setEditingDayNumber(null)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>

              {/* Meals */}
              <div className="mb-6">
                <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Meals Included</h3>
                <div className="flex flex-wrap gap-3">
                  {mealOptions.map(meal => (
                    <label key={meal} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentMeals.includes(meal)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...currentMeals, meal]
                            : currentMeals.filter(m => m !== meal);
                          updateDay(day.dayNumber, 'mealsDetail', updated.join(', '));
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{meal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              <div className="mb-6">
                <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Accommodation</h3>
                <input
                  type="text"
                  value={day.accommodationName || ''}
                  onChange={(e) => updateDay(day.dayNumber, 'accommodationName', e.target.value)}
                  placeholder="e.g. Riad El Fenn"
                  className="w-full px-4 py-2 border border-border bg-background text-sm focus:outline-none focus:border-foreground mb-3"
                />
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <span className="text-muted-foreground">Double rooms:</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={parseInt((day.roomConfig || '').match(/(\d+) Double/)?.[1] || '0')}
                      onChange={(e) => {
                        const singles = (day.roomConfig || '').match(/(\d+) Single/)?.[1] || '0';
                        const val = `${e.target.value} Double, ${singles} Single`;
                        updateDay(day.dayNumber, 'roomConfig', val);
                      }}
                      className="w-16 px-2 py-1 border border-border bg-background text-sm focus:outline-none"
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <span className="text-muted-foreground">Single rooms:</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={parseInt((day.roomConfig || '').match(/(\d+) Single/)?.[1] || '0')}
                      onChange={(e) => {
                        const doubles = (day.roomConfig || '').match(/(\d+) Double/)?.[1] || '0';
                        const val = `${doubles} Double, ${e.target.value} Single`;
                        updateDay(day.dayNumber, 'roomConfig', val);
                      }}
                      className="w-16 px-2 py-1 border border-border bg-background text-sm focus:outline-none"
                    />
                  </label>
                </div>
              </div>

              {/* Activities */}
              <div className="mb-6">
                <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Activities</h3>
                <div className="flex flex-wrap gap-3 mb-3">
                  {activityOptions.map(activity => (
                    <label key={activity} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentActivities.includes(activity)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...currentActivities, activity]
                            : currentActivities.filter(a => a !== activity);
                          updateDay(day.dayNumber, 'activitiesDetail', updated.join(', '));
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{activity}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  value={day.activitiesDetail || ''}
                  onChange={(e) => updateDay(day.dayNumber, 'activitiesDetail', e.target.value)}
                  placeholder="Additional activities or override..."
                  className="w-full px-4 py-2 border border-border bg-background text-sm focus:outline-none focus:border-foreground"
                />
              </div>

              {/* Guide */}
              <div className="mb-6">
                <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Guide</h3>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={day.guideIncluded || false}
                      onChange={(e) => updateDay(day.dayNumber, 'guideIncluded', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Guide included</span>
                  </label>
                  {day.guideIncluded && (
                    <input
                      type="text"
                      value={day.guideLanguage || 'English'}
                      onChange={(e) => updateDay(day.dayNumber, 'guideLanguage', e.target.value)}
                      placeholder="Language"
                      className="w-32 px-3 py-1 border border-border bg-background text-sm focus:outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Transfer */}
              <div className="mb-6">
                <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Transfer</h3>
                <select
                  value={day.transferType || 'none'}
                  onChange={(e) => updateDay(day.dayNumber, 'transferType', e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-background text-sm focus:outline-none focus:border-foreground mb-3"
                >
                  <option value="none">No transfer</option>
                  <option value="airport_pickup">Airport pickup</option>
                  <option value="airport_dropoff">Airport drop-off</option>
                  <option value="intercity">Inter-city transfer</option>
                </select>
                {day.transferType && day.transferType !== 'none' && (
                  <input
                    type="text"
                    value={day.transferDetails || ''}
                    onChange={(e) => updateDay(day.dayNumber, 'transferDetails', e.target.value)}
                    placeholder="e.g. Essaouira Airport (ESU) — private car — arriving 14:35"
                    className="w-full px-4 py-2 border border-border bg-background text-sm focus:outline-none focus:border-foreground"
                  />
                )}
              </div>

              {/* Notes */}
              <div className="mb-8">
                <h3 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Internal Notes</h3>
                <textarea
                  value={day.dayNotes || ''}
                  onChange={(e) => updateDay(day.dayNumber, 'dayNotes', e.target.value)}
                  rows={3}
                  placeholder="Notes for your reference only..."
                  className="w-full px-4 py-2 border border-border bg-background text-sm focus:outline-none focus:border-foreground resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={async () => {
                    if (!proposal) return;
                    await saveDaysToSupabase(proposal.days);
                    setEditingDayNumber(null);
                  }}
                  className="flex-1 bg-foreground text-background py-3 text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
                >
                  Save Day
                </button>
                <button
                  onClick={() => setEditingDayNumber(null)}
                  className="px-6 border border-border text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Send Email Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSendModal(false)}
          />
          <div className="relative bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 p-8 shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setShowSendModal(false)}
              className="absolute top-4 right-4 p-2 hover:opacity-60 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl mb-6">Send Itinerary</h2>
            
            <div className="space-y-6">
              {/* Recipient Email */}
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-foreground transition-colors resize-none font-mono text-sm"
                />
              </div>

              {/* Itinerary Link Preview */}
              <div className="bg-muted p-4">
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                  Client View Link
                </p>
                <p className="text-sm break-all">
                  {typeof window !== 'undefined' ? window.location.href : ''}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    if (!recipientEmail) {
                      alert('Please enter a recipient email address.');
                      return;
                    }
                    
                    // Extract passcode from email message
                    const passcodeMatch = emailMessage.match(/Temporary Passcode: ([A-Z0-9]+)/);
                    const passcode = passcodeMatch ? passcodeMatch[1] : generatePasscode();
                    
                    // Create/update client account
                    const clientsData = localStorage.getItem('slow-morocco-clients');
                    const clients = clientsData ? JSON.parse(clientsData) : {};
                    
                    const clientEmail = recipientEmail.toLowerCase();
                    
                    if (!clients[clientEmail]) {
                      // New client
                      clients[clientEmail] = {
                        name: proposal?.clientName || 'Traveler',
                        email: clientEmail,
                        passcode: passcode,
                        proposals: [proposalId],
                        createdAt: new Date().toISOString()
                      };
                    } else {
                      // Existing client - add proposal if not already there
                      if (!clients[clientEmail].proposals.includes(proposalId)) {
                        clients[clientEmail].proposals.push(proposalId);
                      }
                    }
                    
                    localStorage.setItem('slow-morocco-clients', JSON.stringify(clients));
                    
                    // Update email message with actual client email
                    const updatedMessage = emailMessage.replace('[CLIENT EMAIL]', recipientEmail);
                    
                    // Open email client with mailto
                    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(updatedMessage)}`;
                    window.open(mailtoLink);
                    setShowSendModal(false);
                  }}
                  className="flex-1 bg-foreground text-background px-6 py-3 text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
                >
                  Open in Email Client
                </button>
                <button
                  onClick={() => {
                    const updatedMessage = emailMessage.replace('[CLIENT EMAIL]', recipientEmail || '[CLIENT EMAIL]');
                    navigator.clipboard.writeText(updatedMessage);
                    alert('Message copied to clipboard!');
                  }}
                  className="px-6 py-3 border border-foreground text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-colors"
                >
                  Copy Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar - Admin only */}
      {isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-green-700 text-white border-t border-foreground/10 print:hidden">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center justify-center gap-8 py-4">
              <button
                onClick={async () => {
                  if (!proposal) return;
                  const updated = { ...proposal, price: editablePrice };
                  localStorage.setItem(`proposal-${proposalId}`, JSON.stringify(updated));
                  setProposal(updated);
                  // Save to Supabase
                  try {
                    await fetch(`/api/proposals`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        proposalId,
                        formattedPrice: editablePrice,
                        daysList: updated.days,
                        heroTitle: updated.journeyTitle,
                        heroBlurb: updated.arcDescription,
                        heroImageUrl: updated.heroImage,
                      }),
                    });
                  } catch (e) {
                    console.error('Failed to save to Supabase:', e);
                  }
                  alert('Proposal saved!');
                }}
                className="text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity px-6 py-2"
              >
                Save
              </button>
              <div className="w-px h-4 bg-white/30" />
              <button
                onClick={() => {
                  // Open client view in new tab
                  window.open(`/proposal/${proposalId}`, '_blank');
                }}
                className="text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity px-6 py-2"
              >
                Preview
              </button>
              <div className="w-px h-4 bg-white/30" />
              <button
                onClick={() => window.print()}
                className="text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity px-6 py-2"
              >
                Print PDF
              </button>
              <div className="w-px h-4 bg-white/30" />
              <button
                onClick={() => setShowSendModal(true)}
                className="text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity px-6 py-2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Action Bar - Client only */}
      {!isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-green-700 text-white border-t border-foreground/10 print:hidden">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center justify-center gap-8 py-4">
              <button
                onClick={() => setShowApproveModal(true)}
                className="text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity px-6 py-2"
              >
                Yes, This Is It
              </button>
              <div className="w-px h-4 bg-white/30" />
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity px-6 py-2"
              >
                I Have Some Thoughts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh] bg-[#e8e0d4]">
        {(proposal.heroImage || proposal.days[0]?.imageUrl) && (
          <img
            src={cloudinaryUrl(proposal.heroImage || proposal.days[0]?.imageUrl)}
            alt={proposal.journeyTitle}
            className="absolute inset-0 w-full h-full object-cover"
            />
        )}
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          {/* Back Link */}
          <Link
            href="/journeys"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Journeys
          </Link>

          {/* Duration */}
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            {proposal.days.length} Days
          </p>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            {proposal.journeyTitle}
          </h1>

          {/* Wharton reference */}
          <p className="text-xs text-muted-foreground mb-8 tracking-wide">
            Based on the book by{" "}
            <a
              href="https://www.gutenberg.org/ebooks/39042"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Edith Wharton, <em>In Morocco</em> (1920)
            </a>
          </p>

          {/* Arc Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-display italic">
            {proposal.arcDescription}
          </p>

          {/* Anchor Navigation */}
          <nav className="flex gap-8 text-xs tracking-[0.15em] uppercase text-muted-foreground mb-16 border-t border-b border-border/50 py-4">
            <a href="#itinerary" className="hover:text-foreground transition-colors">Your Journey</a>
            <a href="#investment" className="hover:text-foreground transition-colors">Your Investment</a>
          </nav>

          {/* Itinerary */}
          <div id="itinerary" className="space-y-16">
            {proposal.days
              .sort((a, b) => a.dayNumber - b.dayNumber)
              .map((day) => (
                <div key={day.dayNumber}>
                  {/* Day Title */}
                  <h2 className="font-serif text-3xl md:text-4xl mb-2">
                    {day.title}
                  </h2>
                  <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-8">
                    {`Day ${day.dayNumber}`}{day.date ? ` — ${new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}` : ''}
                  </p>

                  {/* Route (From → To) - only show if different cities */}
                  {day.fromCity && day.toCity && day.fromCity !== day.toCity && (
                    <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
                        <line x1="2" y1="8" x2="14" y2="8" />
                        <polyline points="10,4 14,8 10,12" />
                      </svg>
                      <span>{day.fromCity} → {day.toCity}</span>
                    </div>
                  )}

                  {/* Edit Details button — admin only */}
                  {isAdmin && (
                    <button
                      onClick={() => setEditingDayNumber(day.dayNumber)}
                      className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground border border-border/50 px-3 py-1 mb-6 transition-colors"
                    >
                      Edit Day Details
                    </button>
                  )}

                  {/* Day Metadata — subtle icon row */}
                  {(day.durationHours || day.difficultyLevel || day.mealsDetail || day.meals || day.accommodationName || day.accommodationType) && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-xs text-muted-foreground/70">
                      {day.durationHours && (
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5">
                            <circle cx="8" cy="8" r="6.5" />
                            <line x1="8" y1="4" x2="8" y2="8" />
                            <line x1="8" y1="8" x2="11" y2="10" />
                          </svg>
                          <span>{day.durationHours}</span>
                        </div>
                      )}
                      {day.difficultyLevel && (
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5">
                            <polyline points="1,13 5,7 9,10 15,2" />
                          </svg>
                          <span>{day.difficultyLevel}</span>
                        </div>
                      )}
                      {(day.accommodationName || day.accommodationType) && (
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5">
                            <rect x="2" y="7" width="12" height="7" />
                            <polyline points="1,7 8,2 15,7" />
                          </svg>
                          <span>{day.accommodationName || day.accommodationType}</span>
                        </div>
                      )}
                      {(day.mealsDetail || day.meals) && (
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5">
                            <line x1="5" y1="1" x2="5" y2="6" />
                            <path d="M3,1 Q3,5 5,6 Q7,5 7,1" />
                            <line x1="5" y1="6" x2="5" y2="15" />
                            <line x1="11" y1="1" x2="11" y2="15" />
                          </svg>
                          <span>{day.mealsDetail || day.meals}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Day Description */}
                  {isAdmin ? (
                    <textarea
                      value={day.description}
                      onChange={(e) => updateDay(day.dayNumber, 'description', e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 border border-border bg-background text-base text-muted-foreground leading-relaxed mb-8 focus:outline-none focus:border-foreground resize-none"
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {day.description}
                    </p>
                  )}

                  {/* Day Image URL - Admin editable */}
                  {isAdmin && (
                    <div className="mb-4">
                      <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">Image URL</label>
                      <input
                        type="text"
                        value={day.imageUrl || ""}
                        onChange={(e) => updateDay(day.dayNumber, 'imageUrl', e.target.value)}
                        placeholder="Cloudinary or image URL"
                        className="w-full px-4 py-2 border border-border bg-background text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>
                  )}

                  {/* Day Image */}
                  {day.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={cloudinaryUrl(day.imageUrl)}
                        alt={`Day ${day.dayNumber} - ${day.title}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Pricing Section */}
          {/* What's Included */}
          <div className="mt-16 pt-16 border-t border-border">
            <h3 className="font-serif text-xl mb-8">What's Included</h3>
            <ul className="space-y-3 text-muted-foreground max-w-lg">
              <li>Private transportation throughout with a dedicated driver</li>
              <li>Handpicked accommodations, selected for character and location</li>
              <li>All breakfasts, lunches and dinners</li>
              <li>Entrance fees to attractions included in your programme</li>
              <li>English-speaking guide in Marrakech</li>
              <li>24/7 local support throughout your journey</li>
            </ul>
            <p className="mt-8 text-sm text-muted-foreground/70 italic">
              International flights and travel insurance are arranged separately.
            </p>
          </div>

          <div id="investment" className="mt-20 pt-16 border-t border-border">
            <div className="text-center">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Your Investment
              </p>
              {isAdmin ? (
                // Admin: Editable total price
                <div className="mb-2 flex justify-center items-center gap-2">
                  <span className="font-serif text-5xl md:text-6xl">€</span>
                  <input
                    type="text"
                    value={editablePrice}
                    onChange={(e) => setEditablePrice(e.target.value)}
                    className="font-serif text-5xl md:text-6xl bg-transparent border-b-2 border-dashed border-foreground/30 focus:border-foreground outline-none text-center w-48"
                  />
                </div>
              ) : (
                // Client: Static total price
                <p className="font-serif text-5xl md:text-6xl mb-2">
                  €{parseInt((proposal.price || "22000").replace(/,/g, '')).toLocaleString()}
                </p>
              )}
              <p className="text-sm text-muted-foreground mb-2">
                total for a group of {proposal.travelers || 4}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                €{isAdmin 
                  ? Math.round(parseInt(editablePrice.replace(/,/g, '')) / (proposal.travelers || 4)).toLocaleString() 
                  : Math.round(parseInt((proposal.price || "22000").replace(/,/g, '')) / (proposal.travelers || 4)).toLocaleString()} per person
              </p>
              <p className="text-sm italic text-muted-foreground max-w-md mx-auto mb-10">
                All meals, private transportation, handpicked accommodations and entrance fees included.
              </p>

              {/* How It Works — inline under price */}
              <div className="mt-10 text-left max-w-lg mx-auto space-y-5 text-muted-foreground text-sm border-t border-border pt-10">
                <h3 className="font-serif text-xl text-foreground mb-6">How It Works</h3>
                <p>To confirm your journey, a 30% deposit is required. This gives us the green light to begin securing everything on your behalf — properties, guides, experiences. During December in Morocco, the best places fill quickly.</p>
                <p>The remaining balance is due 45 days before your departure.</p>
                <div>
                  <p className="text-foreground font-medium mb-3">If you need to cancel:</p>
                  <p className="mb-2">More than 45 days before departure — your deposit is refunded in full, minus any banking or PayPal transaction fees and non-refundable commitments already made with properties. Most hotels refund without issue, though holiday season bookings often carry stricter terms. We will always tell you exactly what can and cannot be recovered.</p>
                  <p>Less than 45 days before departure — no refund is possible. All commitments are locked at this stage.</p>
                </div>
                <p>We strongly recommend comprehensive travel insurance that covers trip cancellation — not just medical emergencies. It exists precisely for moments like these.</p>
                <p>Once you confirm, we will send you a booking agreement. We are radically transparent — no hidden surprises.</p>
              </div>
              {/* Price Calculator link - Admin only */}
              {isAdmin && (
                <Link
                  href="/admin/pricing"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm text-foreground hover:opacity-70 transition-opacity"
                >
                  Open the Price Calculator
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-16 pt-8 border-t border-border/50 text-center mb-8">
            <p className="text-xs text-muted-foreground/60">
              <a href="/booking-conditions" target="_blank" className="hover:text-foreground transition-colors underline underline-offset-2">Booking Conditions</a>
              <span className="mx-3">·</span>
              <a href="/cancellations-and-refunds" target="_blank" className="hover:text-foreground transition-colors underline underline-offset-2">Cancellations &amp; Refunds</a>
              <span className="mx-3">·</span>
              <a href="/payments" target="_blank" className="hover:text-foreground transition-colors underline underline-offset-2">Payments</a>
            </p>
          </div>

          {/* Route Map */}
          <div className="mt-16 pt-16 border-t border-border">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 text-center">
              Your Route
            </p>
            <div className="relative w-full" style={{ height: '400px' }}>
              <div id="map" className="absolute inset-0 w-full h-full rounded-sm" />
              {/* Static map fallback - shown if WebGL fails */}
              {staticMapUrl && (
                <img 
                  id="static-map-fallback"
                  src={staticMapUrl}
                  alt="Morocco route map"
                  className="absolute inset-0 w-full h-full object-cover rounded-sm hidden"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowApproveModal(false)}
          />
          <div className="relative bg-background w-full max-w-lg mx-4 p-8 shadow-xl">
            <button
              onClick={() => setShowApproveModal(false)}
              className="absolute top-4 right-4 p-2 hover:opacity-60 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>

            {approvalSubmitted ? (
              <div className="text-center py-8">
                <h3 className="font-serif text-2xl mb-4">Thank you!</h3>
                <p className="text-muted-foreground">
                  We've received your approval and will be in touch shortly with the final confirmation and payment details.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl mb-4">Approve This Itinerary</h2>
                <p className="text-muted-foreground mb-6">
                  By clicking confirm, you're letting us know this itinerary looks perfect. We'll send you the final proposal with payment details shortly.
                </p>
                
                <div className="bg-muted p-4 mb-6">
                  <p className="font-serif text-lg">{proposal?.journeyTitle}</p>
                  <p className="text-sm text-muted-foreground">{proposal?.days.length} days • €{proposal?.price || '2,450'} per person</p>
                </div>

                <button
                  onClick={() => {
                    // Send approval email to admin
                    const mailtoLink = `mailto:hello@slowmorocco.com?subject=Itinerary Approved: ${proposal?.journeyTitle}&body=Client ${proposal?.clientName} has approved the itinerary.%0D%0A%0D%0AProposal: ${window.location.href}%0D%0A%0D%0APlease review and send the final confirmation with payment link.`;
                    window.open(mailtoLink);
                    setApprovalSubmitted(true);
                  }}
                  className="w-full bg-foreground text-background px-6 py-4 text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
                >
                  Confirm Approval
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFeedbackModal(false)}
          />
          <div className="relative bg-background w-full max-w-lg mx-4 p-8 shadow-xl">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 p-2 hover:opacity-60 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>

            {feedbackSubmitted ? (
              <div className="text-center py-8">
                <h3 className="font-serif text-2xl mb-4">Feedback Received</h3>
                <p className="text-muted-foreground">
                  Thank you for your thoughts. We'll review your suggestions and get back to you with an updated itinerary soon.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl mb-4">I Have Some Thoughts</h2>
                <p className="text-muted-foreground mb-6">
                  Tell us what you'd like to change. More time in the desert? A different city? We're here to shape this journey around you.
                </p>
                
                <textarea
                  value={clientFeedback}
                  onChange={(e) => setClientFeedback(e.target.value)}
                  rows={6}
                  placeholder="I'd love to spend more time in Marrakech, and maybe skip the mountain portion..."
                  className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-foreground transition-colors resize-none mb-6"
                />

                <button
                  onClick={() => {
                    // Store feedback in localStorage for admin to see
                    const feedbackData = {
                      proposalId: proposalId,
                      clientName: proposal?.clientName,
                      journeyTitle: proposal?.journeyTitle,
                      feedback: clientFeedback,
                      submittedAt: new Date().toISOString(),
                      proposalUrl: window.location.href
                    };
                    localStorage.setItem(`feedback-${proposalId}`, JSON.stringify(feedbackData));
                    
                    // Send email notification to admin
                    const mailtoLink = `mailto:hello@slowmorocco.com?subject=Revision Request: ${proposal?.journeyTitle}&body=Client ${proposal?.clientName} has requested changes:%0D%0A%0D%0A${encodeURIComponent(clientFeedback)}%0D%0A%0D%0AProposal: ${window.location.href}%0D%0A%0D%0AEdit the quote here:%0D%0A${window.location.origin}/admin/quotes/new?feedback=${encodeURIComponent(clientFeedback)}`;
                    window.open(mailtoLink);
                    setFeedbackSubmitted(true);
                  }}
                  disabled={!clientFeedback.trim()}
                  className="w-full bg-foreground text-background px-6 py-4 text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Send Feedback
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* CTA Section - Client only */}
      {!isAdmin && (
        <section className="py-20 md:py-28 bg-sand mb-16">
          <div className="container mx-auto px-6 lg:px-16 max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Ready to make this journey yours?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If everything looks perfect, let us know and we'll send you the final details. Or tell us how to make it even better—this itinerary bends to fit you.
            </p>
          </div>
        </section>
      )}

      {/* Spacer for fixed bottom bar */}
      <div className="h-16" />
    </div>
  );
}
