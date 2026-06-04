"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Quote {
  Client_ID: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  WhatsApp_Country_Code: string;
  WhatsApp_Number: string;
  Journey_Interest: string;
  Start_Date: string;
  Days: string;
  Number_Travelers: string;
  Budget: string;
  Status: string;
  Created_Date: string;
  Language: string;
  Requests: string;
  Country: string;
}

type SortField = "Client_ID" | "Name" | "Country" | "Email" | "Journey_Interest" | "Start_Date" | "Number_Travelers" | "Status" | "Created_Date";
type SortDirection = "asc" | "desc";

const statusOptions = ["ALL", "NEW", "IN_PROGRESS", "ITINERARY_READY", "PRICED", "SENT_TO_CLIENT", "CONFIRMED", "CANCELLED"];

// Clean, minimal SVG icons (Anthropic-style)
const Icons = {
  edit: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.5 2.5l2 2M2 14l1-4L11.5 1.5l2 2L5 12l-4 1z" />
    </svg>
  ),
  duplicate: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="9" height="9" rx="1" />
      <path d="M11 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2" />
    </svg>
  ),
  delete: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  ),
  sortAsc: (
    <svg width="12" height="1
