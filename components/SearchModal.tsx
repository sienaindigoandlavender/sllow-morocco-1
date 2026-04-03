"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { getAllTerms } from "@/lib/glossary-data";

interface SearchResult {
  type: "journey" | "story" | "place" | "glossary" | "page";
  title: string;
  slug: string;
  subtitle?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function SearchModal({ isOpen, onClose, initialQuery = "" }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cache for API data
  const [journeys, setJourneys] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const glossaryTerms = getAllTerms();

  // Static pages — fixed content not in Supabase
  const staticPages = [
    { title: "Morocco — Safety, Data & Infrastructure", slug: "/life", subtitle: "Country intelligence" },
    { title: "Morocco Travel Guide", slug: "/travel", subtitle: "Visa, transport, money, health, packing" },
    { title: "Jewish Heritage of Morocco", slug: "/jewish-heritage-morocco", subtitle: "Interactive map — 60+ sites" },
    { title: "Morocco World Cup 2030", slug: "/morocco-world-cup-2030", subtitle: "Interactive map — stadiums & infrastructure" },
    { title: "Visa Information", slug: "/visa-info", subtitle: "Entry requirements by nationality" },
    { title: "Health & Safety in Morocco", slug: "/health-safety", subtitle: "Vaccinations, water, safety" },
    { title: "Day Trips from Marrakech", slug: "/day-trips", subtitle: "Atlas, Ouarzazate, Essaouira" },
    { title: "FAQ", slug: "/faq", subtitle: "Frequently asked questions" },
    { title: "Glossary", slug: "/glossary", subtitle: "Moroccan terms explained" },
    { title: "Plan Your Trip", slug: "/plan-your-trip", subtitle: "Start your Morocco journey" },
    { title: "What's Included", slug: "/whats-included", subtitle: "Everything in a Slow Morocco journey" },
    { title: "About Slow Morocco", slug: "/about", subtitle: "Who we are" },
    { title: "Epic Journeys", slug: "/epic", subtitle: "Transmission-level private journeys" },
    { title: "Gentle Journeys", slug: "/go/gentle", subtitle: "Accessible Morocco for all abilities" },
    { title: "Darija — Moroccan Arabic", slug: "/darija", subtitle: "Dictionary and phrases" },
    { title: "Darija Dictionary", slug: "/darija/dictionary", subtitle: "10,000+ Moroccan Arabic words" },
    { title: "Darija Phrases", slug: "/darija/phrases", subtitle: "1,500+ everyday phrases" },
    { title: "Destinations", slug: "/destinations", subtitle: "Where to go in Morocco" },
    { title: "Manifesto", slug: "/manifesto", subtitle: "How we travel" },
    { title: "Morocco Overview", slug: "/morocco", subtitle: "The country at a glance" },
    { title: "Bird Atlas of Morocco", slug: "/dossiers/bird-atlas", subtitle: "Interactive birding dossier" },
    { title: "Booking Conditions", slug: "/booking-conditions", subtitle: "Terms of booking" },
    { title: "Cancellations & Refunds", slug: "/cancellations-and-refunds", subtitle: "Refund policy" },
    { title: "Travel Insurance", slug: "/travel-insurance", subtitle: "Coverage requirements" },
    { title: "Contact", slug: "/contact", subtitle: "Get in touch" },
  ];

  // Fetch data on mount — single lightweight endpoint
  useEffect(() => {
    fetch("/api/search")
      .then((r) => r.json())
      .then((data) => {
        setJourneys(data.journeys || []);
        setStories(data.stories || []);
        setPlaces(data.places || []);
      })
      .catch((err) => console.error("Search index load failed:", err));
  }, []);

  // Focus input when modal opens, apply initial query
  useEffect(() => {
    if (isOpen) {
      if (initialQuery) setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen, initialQuery]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matched: SearchResult[] = [];

    // Search journeys
    journeys.forEach((j) => {
      if (
        j.title?.toLowerCase().includes(q) ||
        j.destinations?.toLowerCase().includes(q) ||
        j.description?.toLowerCase().includes(q) ||
        j.arcDescription?.toLowerCase().includes(q) ||
        j.startCity?.toLowerCase().includes(q) ||
        j.focus?.toLowerCase().includes(q) ||
        j.slug?.toLowerCase().includes(q) ||
        j.category?.toLowerCase().includes(q) ||
        j.region?.toLowerCase().includes(q)
      ) {
        matched.push({
          type: "journey",
          title: j.title,
          slug: j.slug,
          subtitle: `${j.duration_days || j.duration || j.durationDays || ""} days`,
        });
      }
    });

    // Search stories
    stories.forEach((s) => {
      if (
        s.title?.toLowerCase().includes(q) ||
        s.subtitle?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.excerpt?.toLowerCase().includes(q) ||
        s.tags?.toLowerCase().includes(q) ||
        s.region?.toLowerCase().includes(q) ||
        s.theme?.toLowerCase().includes(q) ||
        s.era?.toLowerCase().includes(q) ||
        s.the_facts?.toLowerCase().includes(q)
      ) {
        matched.push({
          type: "story",
          title: s.title,
          slug: s.slug,
          subtitle: s.category,
        });
      }
    });

    // Search places
    places.forEach((p) => {
      if (
        p.title?.toLowerCase().includes(q) ||
        p.destination?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.region?.toLowerCase().includes(q)
      ) {
        matched.push({
          type: "place",
          title: p.title,
          slug: p.slug,
          subtitle: p.destination,
        });
      }
    });

    // Search glossary
    glossaryTerms.forEach((term) => {
      if (
        term.term.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q)
      ) {
        matched.push({
          type: "glossary",
          title: term.term,
          slug: term.id,
          subtitle: term.category.replace(/-/g, " "),
        });
      }
    });

    // Search static pages
    staticPages.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
      ) {
        matched.push({
          type: "page",
          title: p.title,
          slug: p.slug,
          subtitle: p.subtitle,
        });
      }
    });

    // Sort: prioritize title-starts-with, then title-includes, then others
    const sorted = matched.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aScore = aTitle.startsWith(q) ? 0 : aTitle.includes(q) ? 1 : 2;
      const bScore = bTitle.startsWith(q) ? 0 : bTitle.includes(q) ? 1 : 2;
      return aScore - bScore;
    });

    setResults(sorted.slice(0, 20));
  }, [query, journeys, stories, places]);

  const getHref = (result: SearchResult) => {
    switch (result.type) {
      case "journey":
        return `/journeys/${result.slug}`;
      case "story":
        return `/stories/${result.slug}`;
      case "place":
        return `/places/${result.slug}`;
      case "glossary":
        return `/glossary#${result.slug}`;
      case "page":
        return result.slug;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "journey":
        return "Journey";
      case "story":
        return "Story";
      case "place":
        return "Place";
      case "glossary":
        return "Glossary";
      case "page":
        return "Guide";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-auto mt-4 md:mt-32 px-4">
        <div className="bg-background border border-border shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-4 px-4 md:px-6 py-4 md:py-5 border-b border-border">
            <Search className="w-5 h-5 text-foreground/40 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search journeys, stories, places..."
              className="flex-1 bg-transparent text-foreground text-base md:text-lg placeholder:text-foreground/30 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 text-foreground/40 hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.length < 2 ? (
              <div className="px-6 py-8 text-center">
                <p className="text-foreground/40 text-sm">
                  Start typing to search...
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 px-2 py-1 border border-border">
                    Journeys
                  </span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 px-2 py-1 border border-border">
                    Stories
                  </span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 px-2 py-1 border border-border">
                    Places
                  </span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 px-2 py-1 border border-border">
                    Glossary
                  </span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 px-2 py-1 border border-border">
                    Guides
                  </span>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div>
                {results.map((result, idx) => (
                  <Link
                    key={`${result.type}-${result.slug}-${idx}`}
                    href={getHref(result)}
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-4 hover:bg-sand transition-colors border-b border-border last:border-b-0"
                  >
                    <div>
                      <p className="text-foreground">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-foreground/50 text-sm capitalize">{result.subtitle}</p>
                      )}
                    </div>
                    <span className="text-[10px] tracking-[0.1em] uppercase text-foreground/30">
                      {getTypeLabel(result.type)}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-foreground/50">
                  No results for "{query}"
                </p>
                <p className="text-foreground/30 text-sm mt-2">
                  Try searching for a destination, story topic, or term
                </p>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-6 py-3 border-t border-border bg-sand/50">
            <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 text-center">
              Press ESC to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
