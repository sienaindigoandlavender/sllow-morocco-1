"use client";

// ─────────────────────────────────────────────────────────
// ControlBar
// Top: count + A→Z sort — centered.
// Pagination: centered, rendered as a separate export.
// Usage:
//   Top:    <ControlBar ... showPagination={false} />
//   Bottom: <ControlBar ... showCount={false} showSort={false} />
// ─────────────────────────────────────────────────────────

interface ControlBarProps {
  count: number;
  noun: string;
  sortBy: "default" | "alpha";
  onSortChange: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // Display flags
  showCount?: boolean;
  showSort?: boolean;
  showPagination?: boolean;
}

function getPages(current: number, total: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }
  return pages;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = getPages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-0.5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`e-${i}`} className="px-2 text-[10px] font-mono text-foreground/20">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`min-w-[30px] py-1.5 text-[10px] tracking-[0.1em] font-mono transition-colors ${
              currentPage === page
                ? "bg-foreground text-background"
                : "text-foreground/40 hover:text-foreground"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

export default function ControlBar({
  count,
  noun,
  sortBy,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
  showCount = true,
  showSort = true,
  showPagination = true,
}: ControlBarProps) {
  const plural = count === 1 ? noun : noun === "story" ? "stories" : `${noun}s`;

  return (
    <div className="space-y-5">
      {/* Top row: count + sort — centered */}
      {(showCount || showSort) && (
        <div className="flex items-center justify-center gap-5 border-b border-border pb-4">
          {showCount && (
            <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
              {count} {plural}
            </p>
          )}
          {showSort && (
            <button
              onClick={onSortChange}
              className={`text-[10px] tracking-[0.2em] uppercase font-mono transition-colors ${
                sortBy === "alpha"
                  ? "text-foreground"
                  : "text-foreground/30 hover:text-foreground/60"
              }`}
              aria-pressed={sortBy === "alpha"}
            >
              A → Z
            </button>
          )}
        </div>
      )}

      {/* Pagination — always centered */}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
