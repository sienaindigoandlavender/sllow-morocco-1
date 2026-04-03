// ============================================
// Formerly Nexus — now self-contained
// Newsletter uses Slow Morocco's own Supabase
// Legal content and content sites are hardcoded
// ============================================

import { supabase } from "./supabase";
import { Resend } from "resend";

const BRAND_NAME = "Slow Morocco";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slowmorocco.com";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function generateUnsubscribeToken(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// ============================================
// NEWSLETTER (uses Slow Morocco's own Supabase)
// ============================================

async function sendConfirmationEmail(email: string, confirmToken: string) {
  if (!resend) {
    console.warn("[Newsletter] Resend not configured — skipping confirmation email");
    return;
  }

  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${confirmToken}`;

  await resend.emails.send({
    from: "The Edit <hello@slowmorocco.com>",
    to: email,
    subject: "Confirm your subscription to The Edit",
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #1C1917;">
        <p style="font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
          You asked to receive The Edit — history, culture, craft. The context that changes what you see when you arrive.
        </p>
        <p style="margin-bottom: 32px;">
          <a href="${confirmUrl}" style="display: inline-block; padding: 12px 28px; border: 1px solid #1C1917; color: #1C1917; text-decoration: none; font-size: 14px; letter-spacing: 0.05em;">
            Confirm my subscription
          </a>
        </p>
        <p style="font-size: 13px; color: #78716C; line-height: 1.6;">
          If you didn't sign up, ignore this email.
        </p>
        <p style="font-size: 12px; color: #a8a29e; margin-top: 32px;">
          Slow Morocco · Marrakech
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email: string) {
  if (!resend) {
    console.warn("[Newsletter] Resend not configured — skipping welcome email");
    return;
  }

  await resend.emails.send({
    from: "The Edit <hello@slowmorocco.com>",
    to: email,
    subject: "You're in",
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #1C1917;">
        <p style="font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
          The intelligence layer — history, culture, craft. The context that changes what you see when you arrive.
        </p>
        <p style="font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
          Your first one arrives next week. In the meantime, here are three places to start:
        </p>
        <p style="font-size: 15px; line-height: 1.8; margin-bottom: 8px;">
          <strong>The Ksour</strong> — Fortified villages built to outlast empires<br/>
          <a href="${SITE_URL}/stories/the-ksour" style="color: #78716C; font-size: 13px;">${SITE_URL}/stories/the-ksour</a>
        </p>
        <p style="font-size: 15px; line-height: 1.8; margin-bottom: 8px;">
          <strong>The Amazigh Identity Map</strong> — A language older than Arabic, written in Africa's oldest script<br/>
          <a href="${SITE_URL}/stories/amazigh-identity" style="color: #78716C; font-size: 13px;">${SITE_URL}/stories/amazigh-identity</a>
        </p>
        <p style="font-size: 15px; line-height: 1.8; margin-bottom: 8px;">
          <strong>The Apothecary</strong> — The herbalist tradition that predates pharmacy<br/>
          <a href="${SITE_URL}/stories/the-apothecary" style="color: #78716C; font-size: 13px;">${SITE_URL}/stories/the-apothecary</a>
        </p>
        <p style="font-size: 12px; color: #a8a29e; margin-top: 32px;">
          Slow Morocco · Marrakech
        </p>
      </div>
    `,
  });
}

export async function subscribeToNewsletter(
  email: string,
  sourcePage?: string
): Promise<{ success: boolean; message: string; status?: string }> {
  try {
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (existing) {
      if (existing.confirmed) {
        return { success: true, message: "You're already subscribed.", status: "exists" };
      }

      // Resend confirmation email
      const confirmToken = existing.confirm_token || crypto.randomUUID();
      if (!existing.confirm_token) {
        await supabase
          .from("newsletter_subscribers")
          .update({ confirm_token: confirmToken })
          .eq("id", existing.id);
      }

      await sendConfirmationEmail(email.toLowerCase(), confirmToken);
      return { success: true, message: "Check your inbox to confirm.", status: "pending" };
    }

    const confirmToken = crypto.randomUUID();
    const unsubToken = generateUnsubscribeToken();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: email.toLowerCase(),
      brand: BRAND_NAME,
      confirmed: false,
      confirm_token: confirmToken,
      unsubscribe_token: unsubToken,
      source_page: sourcePage || null,
    });

    if (error) throw error;

    await sendConfirmationEmail(email.toLowerCase(), confirmToken);
    return { success: true, message: "Check your inbox to confirm.", status: "pending" };
  } catch (error) {
    console.error("[Newsletter] Error subscribing:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function confirmSubscriber(
  token: string
): Promise<{ success: boolean; message: string; email?: string }> {
  try {
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("confirm_token", token)
      .maybeSingle();

    if (!existing) {
      return { success: false, message: "Invalid or expired link." };
    }

    if (existing.confirmed) {
      return { success: true, message: "Already confirmed.", email: existing.email };
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({
        confirmed: true,
        confirmed_at: new Date().toISOString(),
        status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) throw error;

    await sendWelcomeEmail(existing.email);
    return { success: true, message: "Confirmed.", email: existing.email };
  } catch (error) {
    console.error("[Newsletter] Error confirming:", error);
    return { success: false, message: "Something went wrong." };
  }
}

export async function unsubscribeFromNewsletter(
  token: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("unsubscribe_token", token)
      .maybeSingle();

    if (!existing) {
      return { success: false, message: "Invalid or expired link." };
    }

    if (existing.status === "unsubscribed") {
      return { success: true, message: "You've already been removed." };
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) throw error;

    return { success: true, message: "You've been removed." };
  } catch (error) {
    console.error("[Newsletter] Error unsubscribing:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// ============================================
// LEGAL PAGES (hardcoded — no database)
// ============================================

export interface NexusSite {
  site_id: string;
  site_name: string;
  site_url: string;
  legal_entity: string;
  contact_email: string;
  contact_phone: string | null;
  whatsapp: string | null;
  jurisdiction_country: string;
  jurisdiction_city: string;
  address_line1: string;
  address_line2: string;
  site_type: string;
  parent_brand: string | null;
}

export interface NexusLegalPage {
  page_id: string;
  page_title: string;
  section_order: number;
  section_title: string;
  section_content: string;
}

const SITE_CONFIG: NexusSite = {
  site_id: "slow-morocco",
  site_name: "Slow Morocco",
  site_url: "https://slowmorocco.com",
  legal_entity: "Slow Morocco SARL",
  contact_email: "hello@slowmorocco.com",
  contact_phone: null,
  whatsapp: null,
  jurisdiction_country: "Morocco",
  jurisdiction_city: "Marrakech",
  address_line1: "35 Derb Fhal Zfriti Kennaria",
  address_line2: "Marrakech 40000 Morocco",
  site_type: "travel",
  parent_brand: null,
};

const LEGAL_PAGES: Record<string, { title: string; sections: { order: number; title: string; content: string }[] }> = {
  terms: {
    title: "Terms of Service",
    sections: [
      { order: 1, title: "Agreement", content: "By accessing or using https://slowmorocco.com, operated by Slow Morocco SARL, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
      { order: 2, title: "Services", content: "Slow Morocco provides services as described on our website. All content, features, and functionality are owned by Slow Morocco SARL and are protected by international copyright, trademark, and other intellectual property laws." },
      { order: 3, title: "User Responsibilities", content: "You agree to provide accurate and complete information, maintain the confidentiality of your account, comply with all applicable laws, and not misuse or attempt to disrupt our services." },
      { order: 4, title: "Intellectual Property", content: "All content on this site, including text, graphics, logos, images, photography, videos, and design, is the property of Slow Morocco SARL and is protected by copyright laws." },
      { order: 5, title: "Limitation of Liability", content: "To the maximum extent permitted by law, Slow Morocco SARL shall not be liable for indirect, incidental, or consequential damages arising from use of our services." },
      { order: 6, title: "Governing Law", content: "These terms are governed by the laws of Morocco. Any disputes shall be resolved in the courts of Marrakech." },
      { order: 7, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      { order: 1, title: "Introduction", content: "Slow Morocco SARL (\"we\", \"us\", or \"our\") respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you visit https://slowmorocco.com." },
      { order: 2, title: "Information We Collect", content: "Information you provide: contact information (name, email), booking information (travel dates, preferences), and communications you send us. Information collected automatically: device information, usage data, and cookies." },
      { order: 3, title: "How We Use Your Information", content: "To process and manage your bookings, communicate with you about inquiries and reservations, send confirmations and documents, and improve our website and services." },
      { order: 4, title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@slowmorocco.com." },
      { order: 5, title: "Data Security", content: "We implement appropriate security measures including SSL/TLS encryption and secure payment processing." },
      { order: 6, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    sections: [
      { order: 1, title: "General", content: "The information provided on https://slowmorocco.com by Slow Morocco SARL is for general informational purposes only. This content does not constitute professional travel, medical, legal, or financial advice." },
      { order: 2, title: "Accuracy", content: "While we make every effort to ensure information is accurate and up-to-date, we cannot guarantee completeness. Conditions and regulations change frequently. Prices and availability are subject to change." },
      { order: 3, title: "Independent Resource", content: "This is an independent resource. We are not affiliated with any government agency or official institution. Information may change\u2014please verify before travel." },
      { order: 4, title: "Photography", content: "Images on this site are representative of destinations and experiences. They may not reflect current conditions and should not be relied upon as exact representations." },
      { order: 5, title: "Limitation of Liability", content: "Slow Morocco SARL shall not be liable for any damages arising from use or inability to use this site, reliance on information provided, or errors or omissions in content." },
      { order: 6, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  "intellectual-property": {
    title: "Intellectual Property",
    sections: [
      { order: 1, title: "Ownership", content: "All intellectual property on https://slowmorocco.com is owned by or licensed to Slow Morocco SARL." },
      { order: 2, title: "Trademarks", content: "Protected content includes the Slow Morocco name and logo, related brand names and slogans, and service marks." },
      { order: 3, title: "Copyrighted Material", content: "Website design and layout, written content and copy, photography and images, videos and multimedia, and descriptions are all protected." },
      { order: 4, title: "Permitted Use", content: "You may view content for personal, non-commercial use, share links to our pages, print pages for personal reference, and quote brief excerpts with proper attribution." },
      { order: 5, title: "Prohibited Use", content: "Without written permission, you may not copy, reproduce, or duplicate content, modify or create derivative works, distribute or use content commercially, remove copyright notices, or scrape content using automated tools." },
      { order: 6, title: "Permission Requests", content: "To request permission to use our content, contact hello@slowmorocco.com with subject line 'IP License Request'." },
      { order: 7, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  "booking-conditions": {
    title: "Booking Conditions",
    sections: [
      { order: 1, title: "How It Works", content: "Every Slow Morocco journey is designed from scratch. There are no fixed packages and no group tours. You tell us what you're looking for, we design a journey around it, and we coordinate with trusted local partners — licensed operators, riads, guides, artisans — to bring it to life.\n\nSlow Morocco is a journey design studio. We create the experience. Our licensed local partners deliver the transport, guiding, and logistics on the ground." },
      { order: 2, title: "Your Proposal", content: "After our initial conversation, we send you a detailed proposal including your itinerary, accommodation, experiences, and a total price. The proposal is valid for 7 days. Prices are quoted in euros (€) and are based on availability at the time of quoting. If anything changes before you confirm, we will let you know." },
      { order: 3, title: "What Is Included", content: "Your proposal specifies exactly what is included. This varies by journey, but typically covers private transport with a professional driver, accommodation as specified (riads, kasbahs, desert camps, hotels), local guides where specified, experiences and activities as listed, and email support throughout your journey.\n\nUnless stated in your proposal, the following are not included: international flights, travel insurance, meals not specified, drinks and personal expenses, tips and gratuities, and entry fees to monuments or museums." },
      { order: 4, title: "Travel Insurance", content: "Travel insurance is required. We will ask for confirmation of your policy before your journey begins. Your insurance must cover medical expenses and emergency evacuation, trip cancellation and interruption, and personal belongings. If you choose to travel without insurance, you accept full responsibility for any costs that insurance would have covered." },
      { order: 5, title: "Your Responsibility", content: "You are responsible for ensuring your passport is valid for at least 6 months from your date of arrival in Morocco, obtaining any visa required for entry, arranging adequate travel insurance, and informing us of any medical conditions, dietary requirements, or mobility needs that may affect your journey.\n\nMorocco is a Muslim country. Modest dress is expected in public spaces, particularly when visiting religious sites and rural communities. Your guide will advise you." },
      { order: 6, title: "Changes to Your Journey", content: "You can request changes to your itinerary, dates, or accommodation at any time before departure. We will do our best to accommodate changes, but they may incur additional costs if suppliers charge amendment fees or if prices have changed. We will confirm any cost difference before proceeding.\n\nDuring your journey, adjustments on the ground are often possible — an extra night, a change of route, a spontaneous detour. Talk to your guide or contact us directly.\n\nIf we need to adjust your itinerary due to circumstances beyond our control — a road closure, a fully booked riad — we will offer an alternative of equal or higher quality at no additional cost." },
      { order: 7, title: "Complaints", content: "If something goes wrong during your journey, please tell us immediately — by email at hello@slowmorocco.com. Most issues can be resolved on the ground, in real time. If you are not satisfied, you may submit a written complaint within 14 days of your return. We will respond within 30 days." },
      { order: 8, title: "Governing Law", content: "These terms are governed by the laws of the Kingdom of Morocco. Any dispute arising from these terms will be subject to the jurisdiction of the courts of Marrakech." },
      { order: 9, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  "payments": {
    title: "Payments",
    sections: [
      { order: 1, title: "How Payment Works", content: "Once you accept your proposal, we send you an invoice. Your booking is not confirmed until payment is received. Once confirmed, we begin making reservations on your behalf — accommodation, transport, guides, and any special arrangements." },
      { order: 2, title: "Deposit", content: "A deposit of 30% of the total journey price is required to confirm your booking. The deposit is due within 7 days of accepting your proposal." },
      { order: 3, title: "Balance", content: "The remaining 70% is due no later than 30 days before your arrival date.\n\nFor bookings made within 30 days of travel, full payment (100%) is required at the time of confirmation." },
      { order: 4, title: "Payment Methods", content: "We accept PayPal and bank transfer. Payment details are included in your invoice." },
      { order: 5, title: "Currency", content: "All prices are quoted in euros (€). If paying in another currency, the exchange rate on the day of payment applies. Any bank transfer fees are the responsibility of the client." },
      { order: 6, title: "What Your Payment Covers", content: "Your payment covers the journey design, coordination, and all services listed in your proposal. Some services are delivered directly by our licensed local partners (transport, guiding), and some are booked through us on your behalf (accommodation, experiences). Your proposal specifies exactly what is included." },
      { order: 7, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
  "cancellations-and-refunds": {
    title: "Cancellations & Refunds",
    sections: [
      { order: 1, title: "Cancellation by You", content: "We understand plans change. If you need to cancel your booking, the following refund schedule applies based on when we receive written notice (email):\n\nMore than 60 days before departure — full refund minus a €100 administration fee.\n30 to 60 days before departure — 70% refund (deposit forfeited).\n15 to 29 days before departure — 50% refund.\n7 to 14 days before departure — 25% refund.\nLess than 7 days before departure — no refund.\n\nThe date we receive your written notice determines the refund tier." },
      { order: 2, title: "Non-Recoverable Costs", content: "Some costs cannot be recovered once commitments are made on your behalf. If a supplier — a riad, a desert camp, a maalem for a private ceremony — charges us a cancellation fee, that cost is passed to you even if it exceeds the refund percentages above. We will always be transparent about this and will inform you of any non-recoverable costs before they are incurred." },
      { order: 3, title: "Cancellation by Slow Morocco", content: "We reserve the right to cancel a journey if full payment has not been received by the due date, or if circumstances beyond our control make the journey unsafe or impossible.\n\nIf we cancel for safety or force majeure reasons, you will receive a full refund of all payments made, or the option to reschedule at no additional cost. We are not liable for additional expenses you may have incurred, such as flights or other travel arrangements." },
      { order: 4, title: "Force Majeure", content: "Neither party is liable for failure to perform due to events beyond reasonable control, including natural disasters, extreme weather, epidemics or pandemics, government actions, civil unrest, strikes, or travel restrictions.\n\nIn such cases, we will work with you to reschedule your journey or provide a refund minus any non-recoverable costs already paid to suppliers." },
      { order: 5, title: "Rescheduling", content: "If you would prefer to reschedule rather than cancel, we are happy to move your journey to new dates subject to availability. One reschedule is permitted at no additional charge if requested more than 30 days before departure. Changes to dates within 30 days of departure may incur supplier amendment fees." },
      { order: 6, title: "Our Liability", content: "Slow Morocco acts as a journey designer and coordinator. We select and work with trusted local partners with care. However, we are not liable for the acts or omissions of third-party suppliers, or for injury, loss, damage, or delay caused by events outside our control. Our total liability for any claim shall not exceed the total amount you paid for your journey." },
      { order: 7, title: "Contact", content: "Slow Morocco SARL, 35 Derb Fhal Zfriti Kennaria, Marrakech 40000 Morocco. Email: hello@slowmorocco.com" },
    ],
  },
};

export async function getNexusSite(): Promise<NexusSite> {
  return SITE_CONFIG;
}

export async function getNexusLegalPages(): Promise<NexusLegalPage[]> {
  const all: NexusLegalPage[] = [];
  for (const [pageId, page] of Object.entries(LEGAL_PAGES)) {
    for (const section of page.sections) {
      all.push({
        page_id: pageId,
        page_title: page.title,
        section_order: section.order,
        section_title: section.title,
        section_content: section.content,
      });
    }
  }
  return all;
}

export async function getNexusLegalPage(
  pageId: string
): Promise<NexusLegalPage[]> {
  const page = LEGAL_PAGES[pageId];
  if (!page) return [];
  return page.sections.map((s) => ({
    page_id: pageId,
    page_title: page.title,
    section_order: s.order,
    section_title: s.title,
    section_content: s.content,
  }));
}

// No-op — variables already resolved in hardcoded content
export function resolveVariables(text: string, _site: NexusSite): string {
  return text;
}

export async function getNexusSetting(
  _key: string
): Promise<string | null> {
  return null;
}

// ============================================
// CONTENT SITES (hardcoded — empty for now)
// ============================================

export interface NexusContentSite {
  id: number;
  site_label: string;
  site_url: string;
  display_order: number;
  is_active: boolean;
}

export async function getNexusContentSites(): Promise<NexusContentSite[]> {
  return [];
}
