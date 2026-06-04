"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Pipeline stages
const MAIN_STAGES = [
  { key: "NEW",         label: "New",         desc: "Inquiry received" },
  { key: "IN_PROGRESS", label: "In Progress", desc: "Building itinerary" },
  { key: "SENT",        label: "Sent",        desc: "Proposal delivered" },
];
const STAGE_ORDER = ["NEW", "IN_PROGRESS", "SENT", "BOOKED", "ARCHIVED"];

function StatusTimeline({ status, onChange }: { status: string; onChange: (s: string) => void }) {
  const mainIdx = MAIN_STAGES.findIndex(s => s.key === status);
  const isBooked = status === "BOOKED";
  const isArchived = status === "ARCHIVED";
  const isTerminal = isBooked || isArchived;
  return (
    <div className="border border-border p-6 mb-8">
      <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-6">Pipeline</p>
      <div className="flex items-start">
        {/* Main 3 stages */}
        {MAIN_STAGES.map((stage, i) => {
          const isDone = isTerminal || i < mainIdx;
          const isCurrent = !isTerminal && i === mainIdx;
          const isFuture = !isTerminal && i > mainIdx;
          return (
            <div key={stage.key} className="flex flex-col items-center relative" style={{ flex: i === 2 ? "0 0 auto" : 1 }}>
              {i < 2 && (
                <div className={`absolute top-[11px] left-1/2 w-full h-px ${isDone || isCurrent ? "bg-foreground" : "bg-border"}`} />
              )}
              <button
                onClick={() => onChange(stage.key)}
                title={`Set to ${stage.label}`}
                className={`relative z-10 w-[22px] h-[22px] rounded-full border-2 transition-all flex items-center justify-center mb-2
                  ${isCurrent ? "border-foreground bg-foreground" : ""}
                  ${isDone ? "border-foreground bg-foreground" : ""}
                  ${isFuture ? "border-border bg-background hover:border-foreground/50" : ""}
                `}
              >
                {isDone && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                {isCurrent && <div className="w-2 h-2 rounded-full bg-white" />}
              </button>
              <span className={`text-[10px] tracking-wide uppercase text-center leading-tight
                ${isCurrent ? "text-foreground font-medium" : isFuture ? "text-muted-foreground" : "text-foreground/70"}
              `}>{stage.label}</span>
              <span className="text-[9px] text-muted-foreground text-center mt-0.5 hidden lg:block">{stage.desc}</span>
            </div>
          );
        })}
        {/* Fork: vertical line + two branches */}
        <div className="flex flex-col items-center" style={{ flex: 1 }}>
          {/* Horizontal connector from SENT to fork point */}
          <div className="flex items-start w-full" style={{ paddingTop: 0 }}>
            <div className={`h-px mt-[11px] flex-1 ${isTerminal ? "bg-foreground" : "bg-border"}`} />
          </div>
          {/* Fork branches */}
          <div className="flex w-full gap-1 mt-1">
            {/* Booked branch */}
            <button
              onClick={() => onChange("BOOKED")}
              title="Set to Booked"
              className="flex-1 flex flex-col items-center group"
            >
              <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center mb-2 transition-all
                ${isBooked ? "border-emerald-600 bg-emerald-600" : "border-emerald-600 bg-background group-hover:bg-emerald-50"}
              `}>
                {isBooked && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className={`text-[10px] tracking-wide uppercase text-center leading-tight
                ${isBooked ? "text-emerald-700 font-medium" : "text-emerald-600"}
              `}>Booked</span>
              <span className="text-[9px] text-muted-foreground text-center mt-0.5 hidden lg:block">Deposit confirmed</span>
            </button>
            {/* Archived branch */}
            <button
              onClick={() => onChange("ARCHIVED")}
              title="Set to Archived"
              className="flex-1 flex flex-col items-center group"
            >
              <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center mb-2 transition-all
                ${isArchived ? "border-foreground/40 bg-foreground/40" : "border-border bg-background group-hover:border-foreground/30"}
              `}>
                {isArchived && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className={`text-[10px] tracking-wide uppercase text-center leading-tight
                ${isArchived ? "text-foreground/60 font-medium" : "text-muted-foreground"}
              `}>Archived</span>
              <span className="text-[9px] text-muted-foreground text-center mt-0.5 hidden lg:block">Not proceeding</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Styled text input
const TextInput = ({ label, value, onChange, placeholder = "" }: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm text-muted-foreground mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors"
    />
  </div>
);

// Styled number input
const NumberInput = ({ label, value, onChange }: { 
  label: string; 
  value: number; 
  onChange: (v: number) => void;
}) => (
  <div>
    <label className="block text-sm text-muted-foreground mb-2">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      className="w-full px-4 py-3 border border-border bg-background text-xl font-serif focus:outline-none focus:border-foreground transition-colors"
    />
  </div>
);

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  // Loading state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const [hasProposal, setHasProposal] = useState(false);

  // Form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [journeyInterest, setJourneyInterest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [language, setLanguage] = useState("English");
  const [budget, setBudget] = useState("");
  const [price, setPrice] = useState("");
  const [requests, setRequests] = useState("");
  const [notes, setNotes] = useState("");
  const [dreamExperience, setDreamExperience] = useState("");
  const [firstTimeMorocco, setFirstTimeMorocco] = useState("");
  const [status, setStatus] = useState("NEW");
  const [routeSequence, setRouteSequence] = useState("");
  const [heroImage, setHeroImage] = useState("");

  // Fetch quote data
  useEffect(() => {
    fetch(`/api/admin/quotes/${clientId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.quote) {
          const q = data.quote;
          setFirstName(q.First_Name || "");
          setLastName(q.Last_Name || "");
          setEmail(q.Email || "");
          setPhone(q.Phone || "");
          setCountry(q.Country || "");
          setJourneyInterest(q.Journey_Interest || "");
          setStartDate(q.Start_Date || "");
          setEndDate(q.End_Date || "");
          setStartCity(q.Start_City || "");
          setEndCity(q.End_City || "");
          setDays(parseInt(q.Days) || 7);
          setTravelers(parseInt(q.Number_Travelers) || 2);
          setLanguage(q.Language || "English");
          setBudget(q.Budget || "");
          setRequests(q.Requests || "");
          setNotes(q.Notes || "");
          setDreamExperience(q.Dream_Experience || "");
          setFirstTimeMorocco(q.First_Time_Morocco || "");
          setStatus(q.Status || "NEW");
          setRouteSequence(q.Notes_Route_Sequence || "");
          setHeroImage(q.Hero_Image || "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load quote:", err);
        setLoading(false);
      });
  }, [clientId]);

  // ACTION: Update status with case safety (handles both Status and status for backend client rules)
  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    try {
      await fetch(`/api/admin/quotes/${clientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: newStatus, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // ACTION: Update Database
  const handleUpdateDatabase = async () => {
    setSaving(true);
    setMessage("");
    
    const quoteData = {
      firstName, lastName, email, phone, country,
      journeyInterest, startDate, endDate, startCity, endCity,
      days: days.toString(), travelers: travelers.toString(), 
      language, budget, requests, notes, status,
      dreamExperience, firstTimeMorocco,
      notes_route_sequence: routeSequence.replace(/[–—]/g, '-'),
      hero_image: heroImage,
      Status: status // Backend case alignment check
    };
    
    try {
      const res = await fetch(`/api/admin/quotes/${clientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteData)
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Quote updated!");
        setHasProposal(true);
        if (status === "NEW") handleStatusChange("IN_PROGRESS");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  // ACTION: Generate Proposal (Fully Automated Workflow Step)
  const handleGenerateProposal = async () => {
    setGenerating(true);
    setMessage("");
    
    try {
      const contentRes = await fetch(`/api/content-library?t=${Date.now()}`, { cache: 'no-store' });
      const contentData = await contentRes.json();
      
      if (!contentData.success) {
        setMessage(`Error: ${contentData.error || "Failed to fetch content"}`);
        setGenerating(false);
        return;
      }
      
      if (!contentData.contentBlocks?.length) {
        setMessage("Error: No content blocks found in the routes library.");
        setGenerating(false);
        return;
      }
      
      const contentBlocks = contentData.contentBlocks;
      const numDays = days || 7;
      
      let selectedBlocks: any[] = [];
      
      if (routeSequence && routeSequence.trim()) {
        const routeIds = routeSequence.trim().replace(/[\u2013\u2014\u2012\u2010]/g, "-").split("\n").map((id: string) => id.trim()).filter((id: string) => id.length > 0);
        const blockMap = new Map(contentBlocks.map((b: any) => [b.id, b]));
        selectedBlocks = routeIds.map((id: string) => {
          const block = blockMap.get(id);
          if (!block) console.warn("Route ID not found in content library:", id);
          return block;
        }).filter(Boolean);
        if (selectedBlocks.length === 0) {
          setMessage("Error: None of the route IDs were found in the content library. Check your route sequence.");
          setGenerating(false);
          return;
        }
      } else {
        const interestKeywords = (journeyInterest || "").toLowerCase().split(/[\s,]+/);
        const start = (startCity || "").toLowerCase();
        const end = (endCity || "").toLowerCase();
        const scored = contentBlocks.map((block: any) => {
          let score = 0;
          const from = (block.fromCity || "").toLowerCase();
          const to = (block.toCity || "").toLowerCase();
          const desc = (block.description || "").toLowerCase();
          const city = (block.cityName || "").toLowerCase();
          if (from === start || city === start) score += 10;
          if (to === end || city === end) score += 10;
          interestKeywords.forEach((kw: string) => {
            if (kw.length > 2 && (from.includes(kw) || to.includes(kw) || desc.includes(kw) || city.includes(kw))) score += 3;
          });
          if (block.imageUrl) score += 2;
          if (block.description) score += 1;
          if (!block.fromCity && !block.toCity && !block.cityName) score = 0;
          return { ...block, _score: score };
        });
        const sorted = scored.filter((b: any) => b._score > 0).sort((a: any, b: any) => b._score - a._score);
        const seen = new Set<string>();
        for (const block of sorted) {
          const key = `${block.fromCity}-${block.toCity}`;
          if (!seen.has(key) && selectedBlocks.length < numDays) {
            seen.add(key);
            selectedBlocks.push(block);
          }
        }
      }
      
      const proposalId = `PROP-${clientId}`;
      const routePoints: { name: string; coords: [number, number] }[] = [];
      const cityCoords: { [key: string]: [number, number] } = {
        "Marrakech": [-7.9811, 31.6295], "Casablanca": [-7.5898, 33.5731],
        "Fes": [-5.0078, 34.0181], "Chefchaouen": [-5.2636, 35.1688],
        "Essaouira": [-9.7595, 31.5085], "Merzouga": [-4.0133, 31.0802],
        "Ouarzazate": [-6.8936, 30.9189], "Tamnougalt": [-6.4667, 30.95],
        "Zagora": [-5.8381, 30.3306], "Tinghir": [-5.5328, 31.5147],
        "Dades": [-5.9833, 31.4500], "Todra": [-5.5833, 31.5500],
        "Agafay Desert": [-8.1500, 31.4000], "Errachidia": [-4.4261, 31.9314],
      };

      const proposalDays = selectedBlocks.map((block: any, index: number) => {
        const dayNum = index + 1;
        if (block.fromCity && cityCoords[block.fromCity] && !routePoints.some(p => p.name === block.fromCity)) {
          routePoints.push({ name: block.fromCity, coords: cityCoords[block.fromCity] });
        }
        if (block.toCity && cityCoords[block.toCity] && !routePoints.some(p => p.name === block.toCity)) {
          routePoints.push({ name: block.toCity, coords: cityCoords[block.toCity] });
        }
        return {
          dayNumber: dayNum,
          date: startDate ? new Date(new Date(startDate).getTime() + (dayNum - 1) * 24 * 60 * 60 * 1000).toISOString().split("T")[0] : "",
          title: block.toCity || block.cityName || block.dayTitle || block.fromCity || `Day ${dayNum}`,
          fromCity: block.fromCity || "",
          toCity: block.toCity || "",
          description: block.description || "",
          imageUrl: block.imageUrl || "",
          durationHours: block.travelTime || "",
          activities: block.activities || "",
          difficultyLevel: block.difficulty || "",
          meals: block.meals || "",
          accommodationType: block.accommodationType || "",
        };
      });
      
      const totalPrice = parseFloat(price) || 2450;
      const formattedPrice = `€${totalPrice.toLocaleString()} EUR`;
      const heroBlock = contentBlocks.find((b: any) => b.heroImageUrl) || {};
      
      const proposalData = {
        id: proposalId,
        journeyTitle: `${firstName} in Morocco`,
        arcDescription: `An ${proposalDays.length - 1}-night journey through Morocco, crafted for Ms. ${firstName} ${lastName}.`,
        clientName: `${firstName} ${lastName}`.trim(),
        heroImage: heroImage || heroBlock.heroImageUrl || "",
        price: price || "22,000",
        travelers: travelers || 4,
        days: proposalDays
      };
      
      localStorage.setItem(`proposal-${proposalId}`, JSON.stringify(proposalData));
      
      try {
        const proposalPayload = {
          clientId: clientId,
          clientName: `${firstName} ${lastName}`.trim(),
          country: country,
          heroImageUrl: heroBlock.heroImageUrl || proposalDays[0]?.imageUrl || "",
          heroTitle: heroBlock.heroTitle || "Your Morocco Journey",
          heroBlurb: heroBlock.heroBlurb || `A ${proposalDays.length}-day journey exploring Morocco's most captivating corners.`,
          startDate: startDate,
          endDate: endDate,
          days: days,
          nights: days - 1,
          numGuests: travelers,
          totalPrice: totalPrice,
          formattedPrice: formattedPrice,
          routePoints: routePoints,
          daysList: proposalDays,
        };
        
        const saveRes = await fetch("/api/admin/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proposalPayload),
        });
        
        const saveData = await saveRes.json();
        if (!saveData.success) {
          console.warn("Failed to save proposal:", saveData.error);
        }
      } catch (proposalErr) {
        console.warn("Failed to save proposal:", proposalErr);
      }
      
      window.open(`/proposal/${proposalId}?edit=true`, '_blank');
      setMessage("Proposal generated!");
      setHasProposal(true);

      // ➔ AUTOMATION TRIGGER: Advance status directly to ITINERARY_READY in the database
      await handleStatusChange("ITINERARY_READY");

    } catch (err) {
      console.error("Generate error:", err);
      setMessage(`Failed to generate proposal: ${err}`);
    }
    setGenerating(false);
  };

  // ACTION: Delete
  const handleDelete = async () => {
    if (!confirm("Delete this quote?")) return;
    try {
      const res = await fetch(`/api/admin/quotes/${clientId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.push("/admin/quotes");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-6 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/quotes" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Back
            </Link>
            <h1 className="font-serif text-xl md:text-3xl">Quote Details</h1>
            <span className="text-sm text-muted-foreground font-mono">{clientId}</span>
          </div>
          <div className={`text-xs px-3 py-1 rounded ${
            status === "NEW" ? "bg-green-50 text-green-700" :
            status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700" :
            status === "ITINERARY_READY" ? "bg-purple-50 text-purple-700" :
            status === "CONFIRMED" ? "bg-emerald-50 text-emerald-700" :
            "bg-gray-50 text-gray-700"
          }`}>
            {status === "ITINERARY_READY" ? "READY" : status}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Status timeline spanning full-width at the top */}
        <StatusTimeline status={status} onChange={handleStatusChange} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left - Form Layout Inputs */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Client Information */}
            <section>
              <h2 className="font-serif text-xl mb-6">Client Information</h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <TextInput label="First Name" value={firstName} onChange={setFirstName} />
                <TextInput label="Last Name" value={lastName} onChange={setLastName} />
              </div>
              <div className="mb-6">
                <TextInput label="Email" value={email} onChange={setEmail} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <TextInput label="Phone" value={phone} onChange={setPhone} placeholder="+1 555 123 4567" />
                <TextInput label="Country" value={country} onChange={setCountry} />
              </div>
            </section>

            {/* Journey Details */}
            <section>
              <h2 className="font-serif text-xl mb-6">Journey Details</h2>
              <div className="mb-6">
                <TextInput label="Journey Interest" value={journeyInterest} onChange={setJourneyInterest} placeholder="e.g., Sahara Desert, Imperial Cities" />
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <TextInput label="Start City" value={startCity} onChange={setStartCity} placeholder="e.g., Marrakech" />
                <TextInput label="End City" value={endCity} onChange={setEndCity} placeholder="e.g., Casablanca" />
              </div>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <NumberInput label="Days" value={days} onChange={setDays} />
                <NumberInput label="Travelers" value={travelers} onChange={setTravelers} />
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors"
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="German">German</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <TextInput label="Budget" value={budget} onChange={setBudget} placeholder="e.g., $2,500 - $4,000" />
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Price (€)</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g., 2450"
                    className="w-full px-4 py-3 border border-border bg-background text-xl font-serif focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Special Requests */}
            <section>
              <h2 className="font-serif text-xl mb-6">Special Requests</h2>
              <textarea
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                rows={4}
                placeholder="Dietary needs, accessibility requirements, special interests..."
                className="w-full px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </section>

            {/* Dream Experience */}
            <section>
              <h2 className="font-serif text-xl mb-2">Dream Experience</h2>
              <p className="text-sm text-muted-foreground mb-4">What the client wants to feel, see, or understand — in their own words.</p>
              <textarea
                value={dreamExperience}
                onChange={(e) => setDreamExperience(e.target.value)}
                rows={4}
                placeholder="What would make this journey unforgettable for them?"
                className="w-full px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </section>

            {/* First Time Morocco */}
            <section>
              <h2 className="font-serif text-xl mb-4">First Time in Morocco?</h2>
              <select
                value={firstTimeMorocco}
                onChange={(e) => setFirstTimeMorocco(e.target.value)}
                className="w-full px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors"
              >
                <option value="">— Unknown —</option>
                <option value="Yes">Yes, first time</option>
                <option value="No">No, been before</option>
              </select>
            </section>

            {/* Internal Notes */}
            <section>
              <h2 className="font-serif text-xl mb-6">Internal Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Notes for your reference (not visible to client)..."
                className="w-full px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </section>

            {/* Hero Image */}
            <section>
              <h2 className="font-serif text-xl mb-2">Hero Image</h2>
              <p className="text-sm text-muted-foreground mb-4">Full-bleed banner image for the proposal. Use a cinematic, wide Cloudinary URL.</p>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
              />
              {heroImage && (
                <img src={heroImage} alt="Hero preview" className="mt-4 w-full h-40 object-cover" />
              )}
            </section>

            {/* Route Sequence */}
            <section>
              <h2 className="font-serif text-xl mb-2">Route Sequence</h2>
              <p className="text-sm text-muted-foreground mb-4">Enter one route ID per line in order. These will be used to generate the proposal day by day. Example:<br/>
                <code className="text-xs bg-muted px-1">STAY_ESSAOUIRA</code><br/>
                <code className="text-xs bg-muted px-1">ESS-MAR-NEW</code><br/>
                <code className="text-xs bg-muted px-1">STAY_MARRAKECH</code>
              </p>
              <textarea
                value={routeSequence}
                onChange={(e) => setRouteSequence(e.target.value)}
                rows={12}
                placeholder={"STAY_ESSAOUIRA\nSTAY_ESSAOUIRA\nESS-MAR-NEW\nSTAY_MARRAKECH\nMAR-AGAFAY\nMAR-TAM-004\nDAD-MER-116\nSTAY_MERZOUGA\nSTAY_MERZOUGA"}
                className="w-full px-4 py-3 border border-border bg-background text-sm font-mono focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </section>

          </div>

          {/* Right Column - Summary Box Cards */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              
              <div className="border border-border p-8 bg-background">
                <h2 className="font-serif text-xl mb-6">Summary</h2>
                
                {/* Client Name */}
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-1">Client</p>
                  <p className="font-serif text-2xl">
                    {firstName || lastName ? `${firstName} ${lastName}` : "—"}
                  </p>
                </div>

                {/* Journey Info */}
                <div className="space-y-4 mb-8 pb-8 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-serif">{days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travelers</span>
                    <span className="font-serif">{travelers}</span>
                  </div>
                  {startDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start</span>
                      <span className="font-serif">{new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                  {endDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End</span>
                      <span className="font-serif">{new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                  {(startCity || endCity) && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route</span>
                      <span className="font-serif text-right">{startCity}{startCity && endCity ? " → " : ""}{endCity}</span>
                    </div>
                  )}
                  {journeyInterest && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest</span>
                      <span className="font-serif text-right max-w-[150px]">{journeyInterest}</span>
                    </div>
                  )}
                  {price && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-serif text-xl">€{price}</span>
                    </div>
                  )}
                </div>

                {/* Status Handling Feedback Messages */}
                {message && (
                  <div className={`mb-6 p-3 text-sm ${
                    message.includes("Error") || message.includes("Failed") 
                      ? "bg-red-50 text-red-700" 
                      : "bg-green-50 text-green-700"
                  }`}>
                    {message}
                  </div>
                )}

                {/* Operational Command Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleUpdateDatabase}
                    disabled={saving}
                    className="w-full py-4 bg-foreground text-background text-xs tracking-[0.15em] uppercase hover:bg-foreground/90 disabled:opacity-50 transition-colors"
                  >
                    {saving ? "Saving..." : "Update Database"}
                  </button>
                  <button
                    onClick={handleGenerateProposal}
                    disabled={generating}
                    className="w-full py-4 bg-green-700 text-white text-xs tracking-[0.15em] uppercase hover:bg-green-800 disabled:opacity-50 transition-colors"
                  >
                    {generating ? "Generating..." : "Generate New Proposal"}
                  </button>
                  {hasProposal && (
                    <button
                      onClick={() => window.open(`/proposal/PROP-${clientId}?edit=true`, '_blank')}
                      className="w-full py-4 border border-[#2d5016] text-[#2d5016] text-xs tracking-[0.15em] uppercase hover:bg-[#2d5016] hover:text-white transition-colors"
                    >
                      Edit Proposal
                    </button>
                  )}
                  {!hasProposal && (
                    <button
                      disabled
                      title="Save the quote first to unlock"
                      className="w-full py-4 border border-border text-muted-foreground text-xs tracking-[0.15em] uppercase opacity-40 cursor-not-allowed"
                    >
                      Edit Proposal
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="w-full py-4 text-red-600 text-xs tracking-[0.15em] uppercase hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
