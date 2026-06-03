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
    meals?: string;
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
  
  // Editable price (admin only)
  const [editablePrice, setEditablePrice] = useState("");
  
  // Update a specific day field in the proposal
  const updateDay = (dayNumber: number, field: string, value: string) => {
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
          el.className = 'marker';
          el.style.cssText = `
            width: 12px;
            height: 12px;
            background: #1a1a1a;
            border: 2px solid #f5f0e8;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          `;

          new mapboxgl.Marker(el)
            .setLngLat(coords)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(cities[index] || `Stop ${index + 1}`))
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
              'line-color': '#1a1a1a',
              'line-width': 2,
              'line-dasharray': [2, 2],
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
                Approve
              </button>
              <div className="w-px h-4 bg-white/30" />
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity px-6 py-2"
              >
                Make It Better
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
              href="https://www.gutenberg.org/ebooks/36712"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Edith Wharton, <em>In Morocco</em> (1920)
            </a>
          </p>

          {/* Arc Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-16 font-display italic">
            {proposal.arcDescription}
          </p>

          {/* Itinerary */}
          <div className="space-y-16">
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
          <div className="mt-20 pt-16 border-t border-border">
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
                All-inclusive. Includes all meals, snacks and water, entrance fees to select attractions. Soft drinks and alcohol are extra.
              </p>
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

          {/* What's Included / Not Included */}
          <div className="mt-16 pt-16 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* What's Included */}
              <div>
                <h3 className="font-serif text-xl mb-6">What's Included</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">✓</span>
                    <span>Private transportation throughout</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">✓</span>
                    <span>Handpicked accommodations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">✓</span>
                    <span>All breakfasts, lunches & dinners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">✓</span>
                    <span>Bottled water & snacks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">✓</span>
                    <span>Entrance fees to select attractions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">✓</span>
                    <span>English-speaking driver guide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">✓</span>
                    <span>24/7 local support</span>
                  </li>
                </ul>
              </div>

              {/* What's Not Included */}
              <div>
                <h3 className="font-serif text-xl mb-6">What's Not Included</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-foreground/40 mt-1">✗</span>
                    <span>International flights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground/40 mt-1">✗</span>
                    <span>Travel insurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground/40 mt-1">✗</span>
                    <span>Soft drinks & alcohol</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground/40 mt-1">✗</span>
                    <span>Personal expenses & souvenirs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground/40 mt-1">✗</span>
                    <span>Optional activities not mentioned</span>
                  </li>
                </ul>
              </div>
            </div>
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
                <h2 className="font-serif text-2xl mb-4">Make It Better</h2>
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
