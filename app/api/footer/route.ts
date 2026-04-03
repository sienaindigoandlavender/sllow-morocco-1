import { NextResponse } from "next/server";
import { getSettingsMap, getFooterLinks, convertDriveUrl } from "@/lib/supabase";
import { getNexusContentSites } from "@/lib/nexus";

export const revalidate = 3600;

const SITE_ID = process.env.SITE_ID || "slow-morocco";

export async function GET() {
  try {
    const settingsMap = await getSettingsMap();

    const newsletterConfig = {
      show: settingsMap.newsletter_show !== "false",
      backgroundImage: convertDriveUrl(settingsMap.newsletter_background_image || ""),
      title: settingsMap.newsletter_title || "Notes from Morocco",
      description: settingsMap.newsletter_description || "Quiet. Irregular. Real.",
      brandName: settingsMap.site_name || "Slow Morocco",
    };

    // Contact column from settings
    const contactLinks: any[] = [];
    if (settingsMap.contact_address_line1) contactLinks.push({ order: 1, label: settingsMap.contact_address_line1, href: null, type: "address" });
    if (settingsMap.contact_address_line2) contactLinks.push({ order: 2, label: settingsMap.contact_address_line2, href: null, type: "address" });
    if (settingsMap.contact_email) contactLinks.push({ order: 3, label: settingsMap.contact_email, href: `mailto:${settingsMap.contact_email}`, type: "email" });
    if (settingsMap.social_pinterest) contactLinks.push({ order: 4, label: "Pinterest", href: settingsMap.social_pinterest, type: "social" });
    if (settingsMap.social_instagram) contactLinks.push({ order: 5, label: "Instagram", href: settingsMap.social_instagram, type: "social" });
    if (settingsMap.social_youtube) contactLinks.push({ order: 6, label: "YouTube", href: settingsMap.social_youtube, type: "social" });

    // Get footer links from Supabase — read and return as-is, no injection
    const footerLinks = await getFooterLinks();
    const contentSites = await getNexusContentSites();

    // Group by column
    const columnMap: { [key: number]: any } = {};
    footerLinks.forEach((link) => {
      const colNum = link.column_number || 2;
      if (!columnMap[colNum]) {
        columnMap[colNum] = {
          number: colNum,
          title: link.column_title || "",
          links: [],
        };
      }
      columnMap[colNum].links.push({
        order: link.link_order || 0,
        label: link.link_label || "",
        href: link.link_href || null,
        type: link.link_type || "link",
      });
    });

    // Sort each column's links by order
    Object.values(columnMap).forEach((col: any) => {
      col.links.sort((a: any, b: any) => a.order - b.order);
    });

    const columns = Object.values(columnMap).sort((a: any, b: any) => a.number - b.number);

    const legal = [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Intellectual Property", href: "/intellectual-property" },
    ];

    const contactColumn = {
      number: 1,
      title: "Contact",
      links: contactLinks.length > 0 ? contactLinks : [{ order: 1, label: "Contact us", href: "/contact", type: "link" }],
    };

    const finalColumns = columns.length > 0
      ? [contactColumn, ...columns]
      : [
          contactColumn,
          { number: 2, title: "Places", links: [{ order: 1, label: "All Places", href: "/places", type: "link" }] },
          { number: 3, title: "Journeys", links: [
            { order: 1, label: "All Journeys", href: "/journeys", type: "link" },
            { order: 2, label: "Plan Your Trip", href: "/plan-your-trip", type: "link" },
            { order: 3, label: "What's Included", href: "/whats-included", type: "link" },
            { order: 4, label: "Cancellation Policy", href: "/cancellation-policy", type: "link" },
            { order: 5, label: "FAQ", href: "/faq", type: "link" },
            { order: 6, label: "About Us", href: "/about", type: "link" },
            { order: 7, label: "Contact Us", href: "/contact", type: "link" },
          ]},
          { number: 4, title: "About Morocco", links: [
            { order: 1, label: "Morocco", href: "/morocco", type: "link" },
            { order: 2, label: "All Stories", href: "/stories", type: "link" },
            { order: 3, label: "Travel", href: "/travel", type: "link" },
            { order: 4, label: "Life", href: "/life", type: "link" },
          ]},
        ];

    const footerData = {
      brandId: SITE_ID,
      newsletter: newsletterConfig,
      columns: finalColumns.slice(0, 4),
      contentSites: [],
      legal,
      copyright: { year: new Date().getFullYear(), name: newsletterConfig.brandName },
    };

    const response = NextResponse.json({ success: true, data: footerData });
    response.headers.set("Expires", "0");
    return response;

  } catch (error: any) {
    console.error("Footer fetch error:", error);
    return NextResponse.json({
      success: true,
      data: {
        brandId: SITE_ID,
        newsletter: { show: true, backgroundImage: "", title: "Notes from Morocco", description: "Quiet. Irregular. Real.", brandName: "Slow Morocco" },
        columns: [
          { number: 1, title: "Contact", links: [{ order: 1, label: "Contact us", href: "/contact", type: "link" }] },
          { number: 2, title: "Places", links: [{ order: 1, label: "All Places", href: "/places", type: "link" }] },
          { number: 3, title: "Journeys", links: [
            { order: 1, label: "All Journeys", href: "/journeys", type: "link" },
            { order: 2, label: "Plan Your Trip", href: "/plan-your-trip", type: "link" },
            { order: 3, label: "What's Included", href: "/whats-included", type: "link" },
            { order: 4, label: "Cancellation Policy", href: "/cancellation-policy", type: "link" },
            { order: 5, label: "FAQ", href: "/faq", type: "link" },
            { order: 6, label: "About Us", href: "/about", type: "link" },
            { order: 7, label: "Contact Us", href: "/contact", type: "link" },
          ]},
          { number: 4, title: "About Morocco", links: [
            { order: 1, label: "Morocco", href: "/morocco", type: "link" },
            { order: 2, label: "All Stories", href: "/stories", type: "link" },
            { order: 3, label: "Travel", href: "/travel", type: "link" },
            { order: 4, label: "Life", href: "/life", type: "link" },
          ]},
        ],
        contentSites: [],
        legal: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Disclaimer", href: "/disclaimer" },
        ],
        copyright: { year: new Date().getFullYear(), name: "Slow Morocco" },
      },
    });
  }
}
