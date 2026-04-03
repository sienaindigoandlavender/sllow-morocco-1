'use client';

import React from 'react';
import { linkGlossaryTermsText, linkGlossaryTermsHTML } from '@/lib/glossary-linker';
import { linkDerbTermsText, linkDerbTermsHTML } from '@/lib/derb-linker';
import { linkCrossReferences, linkCrossReferencesHTML } from '@/lib/story-linker';

interface InlineImage {
  image_url: string;
  caption: string | null;
  attribution: string | null;
  license: string | null;
  license_url: string | null;
  source_url: string | null;
  position: number; // insert after paragraph N
}

interface StoryBodyProps {
  content: string;
  inlineImages?: InlineImage[];
  currentSlug?: string;
}

// Apply all linkers: cross-references → derb → glossary
// Each works on remaining plain text strings after previous linker
function applyToStringChildren(node: React.ReactNode, fn: (text: string) => React.ReactNode): React.ReactNode {
  if (typeof node === 'string') return fn(node);
  if (!React.isValidElement(node)) return node;
  const children = React.Children.toArray((node as React.ReactElement).props.children);
  if (children.length === 0) return node;
  const mapped = children.map((child, i) => {
    if (typeof child === 'string') return <React.Fragment key={i}>{fn(child)}</React.Fragment>;
    return child;
  });
  return React.cloneElement(node as React.ReactElement, {}, ...mapped);
}

function linkAllTerms(text: string, currentSlug?: string): React.ReactNode {
  // Layer 1: Cross-references (story-to-story, story-to-place)
  const crossLinked = linkCrossReferences(text, currentSlug);
  
  // Layer 2: Derb links on remaining strings
  const withDerb = applyToStringChildren(
    typeof crossLinked === 'string' ? <>{crossLinked}</> : <>{crossLinked}</>,
    (t) => linkDerbTermsText(t) || t
  );
  
  // Layer 3: Glossary links on remaining strings
  return applyToStringChildren(withDerb, (t) => linkGlossaryTermsText(t));
}

/**
 * Chain all HTML linkers: cross-references → derb → glossary
 * Each respects existing <a> tags so they don't double-link
 */
function linkAllTermsHTML(html: string, currentSlug?: string): string {
  let result = html;
  // Layer 1: Cross-references (story-to-story, story-to-place)
  result = linkCrossReferencesHTML(result, currentSlug);
  // Layer 2: Derb links
  result = linkDerbTermsHTML(result);
  // Layer 3: Glossary links
  result = linkGlossaryTermsHTML(result);
  return result;
}

function processText(text: string, currentSlug?: string): React.ReactNode {
  const parts = text.split(/(https?:\/\/[^\s,)]+)/g);
  if (parts.length === 1) return linkAllTerms(text, currentSlug);
  return (
    <>
      {parts.map((part, i) => {
        if (part.match(/^https?:\/\//)) {
          return (
            <a key={`url-${i}`} href={part} target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground/90 transition-colors">
              {part.replace('https://www.', '').replace('https://', '')}
            </a>
          );
        }
        if (part.trim()) return <React.Fragment key={`txt-${i}`}>{linkAllTerms(part, currentSlug)}</React.Fragment>;
        return <React.Fragment key={`emp-${i}`}>{part}</React.Fragment>;
      })}
    </>
  );
}

function isHTML(str: string): boolean {
  return /<[a-z][^>]*>/i.test(str);
}

function prepareHTML(html: string, currentSlug?: string): string {
  // Convert any remaining <br> tags to paragraph breaks
  let processed = html.replace(/<br\s*\/?>/gi, '</p><p>');
  // Also convert newlines to paragraph/line breaks (page.tsx converts <br> to \n before this runs)
  processed = processed.replace(/\n\n+/g, '</p><p>');
  processed = processed.replace(/\n/g, '<br>');
  
  processed = processed
    .replace(/<p>/gi, '<p class="text-foreground leading-[1.85] mb-8">')
    .replace(/<h1>/gi, '<h1 class="font-serif text-3xl text-foreground mt-14 mb-8">')
    .replace(/<h2>/gi, '<h2 class="font-serif text-2xl text-foreground mt-14 mb-8">')
    .replace(/<h3>/gi, '<h3 class="font-serif text-xl text-foreground mt-10 mb-4">')
    .replace(/<h4>/gi, '<h4 class="font-serif text-lg text-foreground mt-8 mb-3">')
    .replace(/<h5>/gi, '<h5 class="text-sm font-medium tracking-wider uppercase text-foreground/60 mt-6 mb-2">')
    .replace(/<a\s+href="(\/[^"]*)"[^>]*>/gi,
      '<a href="$1" class="underline decoration-foreground/20 underline-offset-2 text-foreground hover:decoration-foreground/50 transition-colors">')
    .replace(/<a\s+href="(https?:\/\/[^"]+)"[^>]*>/gi,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 text-foreground hover:text-foreground/60 transition-colors">')
    .replace(/<ul>/gi, '<ul class="list-none space-y-2 mb-8 pl-0">')
    .replace(/<ol>/gi, '<ol class="list-decimal pl-6 space-y-2 mb-8">')
    .replace(/<li>/gi, '<li class="text-foreground/70 leading-[1.85]">')
    .replace(/<blockquote>/gi, '<blockquote class="border-l-2 border-foreground/20 pl-6 my-10 text-xl italic text-foreground/70">')
    .replace(/<strong>/gi, '<strong class="font-medium text-foreground">')
    .replace(/<em>/gi, '<em class="italic">')
    .replace(/<figure>/gi, '<figure class="my-12 -mx-4 md:-mx-8">')
    .replace(/<figcaption>/gi, '<figcaption class="text-xs text-foreground/40 mt-3 text-center italic px-4">')
    .replace(/<img\s+src="([^"]+)"([^>]*)>/gi, '<img src="$1"$2 class="w-full object-cover" loading="lazy">');

  // Chain all HTML linkers AFTER formatting (so linker-created <a> tags keep their own classes)
  processed = linkAllTermsHTML(processed, currentSlug);

  return processed;
}

// Inline image block between paragraphs
function InlineImageBlock({ img }: { img: InlineImage }) {
  return (
    <figure className="my-10 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="relative w-full" style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#f0f0f0' }}>
        <img
          src={img.image_url}
          alt={img.caption || ''}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ display: 'block' }}
        />
      </div>
      {(img.caption || img.attribution) && (
        <figcaption className="text-[11px] text-foreground/35 mt-3 px-4 md:px-8 flex items-start justify-between gap-4">
          <span className="italic">{img.caption}</span>
          {img.attribution && (
            <span className="flex-shrink-0 text-right">
              {img.source_url ? (
                <a href={img.source_url} target="_blank" rel="noopener noreferrer"
                  className="hover:text-foreground/60 transition-colors">
                  © {img.attribution}
                  {img.license ? ` · ${img.license}` : ''}
                </a>
              ) : (
                <span>© {img.attribution}{img.license ? ` · ${img.license}` : ''}</span>
              )}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export default function StoryBody({ content, inlineImages = [], currentSlug }: StoryBodyProps) {
  if (!content) return null;

  // Build a map of position → images
  const imagesByPosition = new Map<number, InlineImage[]>();
  inlineImages.forEach(img => {
    const pos = img.position || 1;
    if (!imagesByPosition.has(pos)) imagesByPosition.set(pos, []);
    imagesByPosition.get(pos)!.push(img);
  });

  // HTML content — inject images at paragraph boundaries
  if (isHTML(content)) {
    if (inlineImages.length === 0) {
      return (
        <div className="prose prose-lg max-w-none story-html-body"
          dangerouslySetInnerHTML={{ __html: prepareHTML(content, currentSlug) }} />
      );
    }
    // Split HTML at </p> boundaries to inject images
    const parts = content.split(/(<\/p>)/i);
    let paraCount = 0;
    const nodes: React.ReactNode[] = [];
    let buffer = '';
    parts.forEach((part, i) => {
      if (part.match(/<\/p>/i)) {
        paraCount++;
        buffer += part;
        nodes.push(
          <div key={`p-${i}`} dangerouslySetInnerHTML={{ __html: prepareHTML(buffer, currentSlug) }} />
        );
        buffer = '';
        const imgs = imagesByPosition.get(paraCount);
        if (imgs) imgs.forEach((img, j) => <InlineImageBlock key={`img-${paraCount}-${j}`} img={img} />);
      } else {
        buffer += part;
      }
    });
    if (buffer) nodes.push(<div key="tail" dangerouslySetInnerHTML={{ __html: prepareHTML(buffer, currentSlug) }} />);
    return <div className="prose prose-lg max-w-none story-html-body">{nodes}</div>;
  }

  // Plain text / markdown — paragraph renderer with inline image injection
  // Note: API converts <br> to \n, so we split on single \n if no \n\n exists
  const hasDoubleBreaks = /\n\n/.test(content);
  const paragraphs = content.split(hasDoubleBreaks ? /\n\n+/ : /\n/).filter(p => p.trim());

  return (
    <div className="prose prose-lg max-w-none">
      {paragraphs.map((paragraph, index) => {
        const paraNumber = index + 1;
        const imgsAfter = imagesByPosition.get(paraNumber) || [];

        let node: React.ReactNode;

        if (paragraph.trim().startsWith('>')) {
          const quoteText = paragraph.trim().replace(/^>\s*/, '');
          node = (
            <blockquote key={`q-${index}`}
              className="border-l-2 border-foreground/20 pl-6 my-8 text-xl italic text-foreground/70">
              {processText(quoteText, currentSlug)}
            </blockquote>
          );
        } else if (paragraph.trim().startsWith('## ')) {
          const headingText = paragraph.trim().replace(/^##\s*/, '');
          node = (
            <h2 key={`h-${index}`} className="font-serif text-2xl text-foreground mt-12 mb-6">
              {headingText}
            </h2>
          );
        } else if (paragraph.trim().startsWith('FIGURE:')) {
          const raw = paragraph.trim().replace(/^FIGURE:/, '');
          const parts = raw.split('|');
          const url = parts[0]?.trim();
          const caption = parts[1]?.trim();
          const credit = parts[2]?.trim();
          if (!url) return null;
          node = (
            <figure key={`fig-${index}`} className="my-12 -mx-4 md:-mx-8">
              <img src={url} alt={caption || ''} className="w-full object-cover" loading="lazy" />
              {(caption || credit) && (
                <figcaption className="text-xs text-foreground/40 mt-3 text-center italic px-4">
                  {caption}{caption && credit ? ' — ' : ''}{credit}
                </figcaption>
              )}
            </figure>
          );
        } else {
          node = (
            <p key={`p-${index}`} className="text-foreground leading-[1.85] mb-8">
              {processText(paragraph, currentSlug)}
            </p>
          );
        }

        return (
          <React.Fragment key={`frag-${index}`}>
            {node}
            {imgsAfter.map((img, j) => (
              <InlineImageBlock key={`inline-${index}-${j}`} img={img} />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}
