"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// Pipeline stages
const PIPELINE_STAGES = [
  { key: "NEW",         label: "New",         desc: "Inquiry received" },
  { key: "IN_PROGRESS", label: "In Progress", desc: "Building itinerary" },
  { key: "SENT",        label: "Sent",        desc: "Proposal delivered" },
  { key: "BOOKED",      label: "Booked",      desc: "Deposit confirmed" },
];
const STAGE_ORDER = PIPELINE_STAGES.map(s => s.key);

function StatusTimeline({ status, onChange }: { status: string; onChange: (s: string) => void }) {
  const currentIdx = STAGE_ORDER.indexOf(status);
  return (
    <div className="border border-border p-6 mb-8">
      <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-5">Pipeline</p>
      <div className="flex items-start gap-0">
        {PIPELINE_STAGES.map((stage, i) => {
          const isDone = i < currentIdx;
          const isCurrent = i === currentIdx;
          const isFuture = i > currentIdx;
          return (
            <div key={stage.key} className="flex-1 flex flex-col items-center relative">
              {i < PIPELINE_STAGES.length - 1 && (
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
                {isDone && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {isCurrent && <div className="w-2 h-2 rounded-full bg-white" />}
              </button>
              <span className={`text-[10px] tracking-wide uppercase text-center leading-tight
                ${isCurrent ? "text-foreground font-medium" : isFuture ? "text-muted-foreground" : "text-foreground/70"}
              `}>
                {stage.label}
              </span>
              <span className="text-[9px] text-muted-foreground text-center mt-0.5 hidden lg:block">
                {stage.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface QuoteData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  journeyInterest: string;
  startDate: string;
  days: number;
  travelers: number;
  language: string;
  budget: string;
  requests: string;
  notes: string;
}

// Styled text input — defined outside component to prevent re-creation on render
const TextInput = ({ label, value, onChange, placeholder = "" }: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30"
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
    <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-xl font-serif focus:outline-none focus:border-foreground transition-colors"
    />
  </div>
);

function BuildQuoteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [clientId, setClientId] = useState("");
  const [isExisting, setIsExisting] = useState(false);
  const [hasProposal, setHasProposal] = useState(false);
  
  // Client feedback from revision request
  const [clientFeedback, setClientFeedback] = useState("");
  
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
  const [firstTimeMorocco, setFirstTimeMorocco] = useState("");
  const [dreamExperience, setDreamExperience] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  
  // Status
  const [status, setStatus] = useState("NEW");
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  
  // Check for feedback from URL params
  useEffect(() => {
    const feedback = searchParams.get('feedback');
    if (feedback) {
      setClientFeedback(decodeURIComponent(feedback));
    }
  }, [searchParams]);

  // Search for existing quotes
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchResults([]);
    
    try {
      const res = await fetch("/api/admin/quotes");
      const data = await res.json();
      
      if (data.success && data.quotes) {
        const query = searchQuery.toLowerCase();
        const results = data.quotes.filter((q: any) =>
          q.Client_ID?.toLowerCase().includes(query) ||
          q.First_Name?.toLowerCase().includes(query) ||
          q.Last_Name?.toLowerCase().includes(query) ||
          q.Email?.toLowerCase().includes(query)
        );
        setSearchResults(results.slice(0, 5));
      }
    } catch (err) {
      console.error("Search error:", err);
    }
    setSearching(false);
  };

  // Load selected quote
  const loadQuote = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/quotes/${id}`);
      const data = await res.json();
      
      if (data.success && data.quote) {
        const q = data.quote;
        setClientId(q.Client_ID || id);
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
        setFirstTimeMorocco(q.First_Time_Morocco || "");
        setDreamExperience(q.Dream_Experience || "");
        setHearAboutUs(q.Hear_About_Us || "");
        setIsExisting(true);
        setSearchResults([]);
        setSearchQuery("");
        setMessage(`Loaded: ${q.First_Name} ${q.Last_Name}`);
      }
    } catch (err) {
      console.error("Load error:", err);
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
      language, budget, requests, notes,
      firstTimeMorocco, dreamExperience, hearAboutUs
    };
    
    try {
      if (isExisting && clientId) {
        const res = await fetch(`/api/admin/quotes/${clientId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quoteData)
        });
        const data = await res.json();
        if (data.success) {
          setMessage("Quote updated!");
          setHasProposal(true);
        } else {
          setMessage(`Error: ${data.error}`);
        }
      } else {
        const res = await fetch("/api/admin/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quoteData)
        });
        const data = await res.json();
        if (data.success) {
          setClientId(data.clientId);
          setIsExisting(true);
          setHasProposal(true);
          setMessage(`Quote created! ID: ${data.clientId}`);
        } else {
          setMessage(`Error: ${data.error}`);
        }
      }
    } catch (err) {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  // ACTION: Update status only
  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    if (!clientId) return;
    try {
      await fetch(`/api/admin/quotes/${clientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // ACTION: Generate Proposal
  const handleGenerateProposal = async () => {
    setGenerating(true);
    setMessage("");
    
    try {
      console.log("Fetching content library...");
      const contentRes = await fetch("/api/content-library");
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
      
      // Build a route sequence from the content library based on startCity, endCity, journeyInterest
      // Strategy: find blocks that match the journey start/end and interest keywords
      const interestKeywords = (journeyInterest || "").toLowerCase().split(/[\s,]+/);
      const start = (startCity || "").toLowerCase();
      const end = (endCity || "").toLowerCase();
      
      // Score each block by relevance
      const scored = contentBlocks.map((block: any) => {
        let score = 0;
        const from = (block.fromCity || "").toLowerCase();
        const to = (block.toCity || "").toLowerCase();
        const desc = (block.description || "").toLowerCase();
        const city = (block.cityName || "").toLowerCase();
        
        // Prioritize blocks that match start/end cities
        if (from === start || city === start) score += 10;
        if (to === end || city === end) score += 10;
        
        // Score by interest keywords
        interestKeywords.forEach((kw: string) => {
          if (kw.length > 2) {
            if (from.includes(kw) || to.includes(kw) || desc.includes(kw) || city.includes(kw)) score += 3;
          }
        });
        
        // Prefer blocks with images and descriptions
        if (block.imageUrl) score += 2;
        if (block.description) score += 1;
        
        // Exclude pure hero blocks (no from/to city)
        if (!block.fromCity && !block.toCity && !block.cityName) score = 0;
        
        return { ...block, _score: score };
      });
      
      // Sort by score descending, deduplicate by city
      const sorted = scored
        .filter((b: any) => b._score > 0)
        .sort((a: any, b: any) => b._score - a._score);
      
      // Pick top N unique blocks for the number of days
      const seen = new Set<string>();
      const selectedBlocks: any[] = [];
      
      for (const block of sorted) {
        const key = `${block.fromCity}-${block.toCity}`;
        if (!seen.has(key) && selectedBlocks.length < numDays) {
          seen.add(key);
          selectedBlocks.push(block);
        }
      }
      
      // If we don't have enough, fill with remaining blocks
      if (selectedBlocks.length < numDays) {
        for (const block of sorted) {
          if (selectedBlocks.length >= numDays) break;
          if (!selectedBlocks.includes(block)) {
            selectedBlocks.push(block);
          }
        }
      }
      
      // Sort selected blocks: start city first, end city last
      selectedBlocks.sort((a: any, b: any) => {
        const aFrom = (a.fromCity || "").toLowerCase();
        const bFrom = (b.fromCity || "").toLowerCase();
        if (aFrom === start) return -1;
        if (bFrom === start) return 1;
        const aTo = (a.toCity || "").toLowerCase();
        const bTo = (b.toCity || "").toLowerCase();
        if (aTo === end) return 1;
        if (bTo === end) return -1;
        return 0;
      });
      
      const proposalId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const proposalDays = selectedBlocks.map((block: any, index: number) => ({
        dayNumber: index + 1,
        title: block.toCity || block.cityName || block.dayTitle || block.fromCity || `Day ${index + 1}`,
        fromCity: block.fromCity || "",
        toCity: block.toCity || "",
        description: block.description || "",
        imageUrl: block.imageUrl || "",
        durationHours: block.durationHours || "",
        difficultyLevel: block.difficultyLevel || "",
        activities: block.activities || "",
        accommodationType: block.accommodationType || "",
        meals: block.meals || "",
        highlights: block.highlights || "",
      }));
      
      // Hero: use first block with a heroImageUrl, or first day image
      const heroBlock = contentBlocks.find((b: any) => b.heroImageUrl) || {};
      
      const proposalData = {
        id: proposalId,
        journeyTitle: `${firstName}'s Morocco Journey` || "Your Morocco Journey",
        arcDescription: `A ${proposalDays.length}-day journey through Morocco, crafted for ${firstName} ${lastName}.`,
        clientName: `${firstName} ${lastName}`.trim(),
        heroImage: heroBlock.heroImageUrl || proposalDays[0]?.imageUrl || "",
        price: price || "2,450",
        days: proposalDays
      };
      
      console.log("Saving proposal data:", proposalData);
      localStorage.setItem(`proposal-${proposalId}`, JSON.stringify(proposalData));
      
      window.open(`/proposal/${proposalId}?edit=true`, '_blank');
      setMessage("Proposal generated!");
      setHasProposal(true);
      if (status === "NEW") handleStatusChange("IN_PROGRESS");
    } catch (err) {
      console.error("Generate error:", err);
      setMessage(`Failed to generate proposal: ${err}`);
    }
    setGenerating(false);
  };

  // ACTION: New Proposal
  const handleNewProposal = () => {
    if (confirm("Clear form and start fresh?")) {
      setClientId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setJourneyInterest("");
      setStartDate("");
      setEndDate("");
      setStartCity("");
      setEndCity("");
      setDays(7);
      setTravelers(2);
      setLanguage("English");
      setBudget("");
      setRequests("");
      setNotes("");
      setIsExisting(false);
      setMessage("");
    }
  };

  // ACTION: Delete
  const handleDelete = async () => {
    if (!isExisting || !clientId) {
      setMessage("No saved quote to delete");
      return;
    }
    if (!confirm(`Delete quote ${clientId}? This cannot be undone.`)) return;
    
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-6 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/quotes" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Back
            </Link>
            <h1 className="font-serif text-3xl">Build a Quote</h1>
            {isExisting && clientId && (
              <span className="text-sm text-muted-foreground font-mono">{clientId}</span>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left - Form */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Search Existing */}
            <section>
              <h2 className="font-serif text-xl mb-6">Find Existing Quote</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search by Client ID, Name, or Email..."
                  className="flex-1 px-4 py-3 border border-border bg-background text-lg focus:outline-none focus:border-foreground transition-colors"
                />
                <button
                  onClick={handleSearch}
                  disabled={searching}
                  className="px-6 py-3 bg-foreground text-background text-sm tracking-wide uppercase hover:bg-foreground/90 disabled:opacity-50 transition-colors"
                >
                  {searching ? "..." : "Search"}
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="mt-4 border border-border divide-y divide-border">
                  {searchResults.map((result) => (
                    <button
                      key={result.Client_ID}
                      onClick={() => loadQuote(result.Client_ID)}
                      className="w-full px-4 py-4 text-left hover:bg-muted/50 transition-colors flex justify-between items-center"
                    >
                      <div>
                        <span className="font-serif">{result.First_Name} {result.Last_Name}</span>
                        <span className="text-muted-foreground ml-3 text-sm">{result.Email}</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{result.Client_ID}</span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Client Feedback Banner - shown when revision requested */}
            {clientFeedback && (
              <section className="bg-amber-50 border border-amber-200 p-6 mb-8">
                <h3 className="font-serif text-lg mb-2 text-amber-900">📝 Client Revision Request</h3>
                <p className="text-amber-800 whitespace-pre-wrap">{clientFeedback}</p>
                <button
                  onClick={() => setClientFeedback("")}
                  className="mt-4 text-xs tracking-[0.1em] uppercase text-amber-700 hover:text-amber-900 transition-colors"
                >
                  Dismiss
                </button>
              </section>
            )}

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
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">First Time in Morocco?</label>
                  <select
                    value={firstTimeMorocco}
                    onChange={(e) => setFirstTimeMorocco(e.target.value)}
                    className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors"
                  >
                    <option value="">— Select —</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
                <TextInput label="How Did They Find Us?" value={hearAboutUs} onChange={setHearAboutUs} placeholder="e.g., Slow Morocco article, Google, referral" />
              </div>
              <div className="mb-6">
                <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Expectations / Dream Experience</label>
                <textarea
                  value={dreamExperience}
                  onChange={(e) => setDreamExperience(e.target.value)}
                  rows={3}
                  placeholder="What do they want from this trip? What experiences are they looking for?"
                  className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              <div className="mb-6">
                <TextInput label="Journey Interest" value={journeyInterest} onChange={setJourneyInterest} placeholder="e.g., Sahara Desert, Imperial Cities" />
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors"
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
                  <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors"
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="German">German</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <TextInput label="Budget" value={budget} onChange={setBudget} placeholder="e.g., $2,500 - $4,000" />
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Price (€)</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g., 2450"
                    className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-xl font-serif focus:outline-none focus:border-foreground transition-colors"
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
                className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </section>

            {/* Internal Notes */}
            <section>
              <h2 className="font-serif text-xl mb-6">Internal Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Notes for your reference (not visible to client)..."
                className="w-full px-0 py-3 border-0 border-b border-border bg-transparent text-lg focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </section>

          </div>

          {/* Right - Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <StatusTimeline status={status} onChange={handleStatusChange} />
              <div className="border border-border p-8">
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

              {/* Message */}
              {message && (
                <div className={`mb-6 p-3 text-sm ${
                  message.includes("Error") || message.includes("Failed") 
                    ? "bg-red-50 text-red-700" 
                    : "bg-green-50 text-green-700"
                }`}>
                  {message}
                </div>
              )}

              {/* Action Buttons */}
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
                {hasProposal ? (
                  <button
                    onClick={() => window.open(`/proposal/PROP-${clientId}?edit=true`, '_blank')}
                    className="w-full py-4 border border-[#2d5016] text-[#2d5016] text-xs tracking-[0.15em] uppercase hover:bg-[#2d5016] hover:text-white transition-colors"
                  >
                    Edit Proposal
                  </button>
                ) : (
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
              </div>{/* end summary box */}
            </div>{/* end sticky */}
          </div>

        </div>
      </main>
    </div>
  );
}

export default function BuildQuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    }>
      <BuildQuoteContent />
    </Suspense>
  );
}
