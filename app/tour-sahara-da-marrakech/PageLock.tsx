"use client";

import { useState } from "react";

export default function PageLock({ pageKey }: { pageKey: string }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!code.trim() || busy) return;
    setBusy(true);
    setError(false);
    try {
      const res = await fetch("/api/page-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey, code }),
      });
      if (res.ok) window.location.reload();
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="font-serif text-3xl md:text-4xl mb-4">Pagina riservata</h1>
        <p className="text-foreground/60 mb-8">
          Questo itinerario è riservato ai nostri ospiti. Inserisca il codice
          di accesso che le abbiamo inviato.
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Codice di accesso"
          autoFocus
          className="w-full text-center tracking-widest uppercase bg-transparent border border-foreground/20 rounded px-4 py-3 mb-4 focus:outline-none focus:border-foreground/50"
        />
        <button
          onClick={submit}
          disabled={busy}
          className="w-full bg-foreground text-background rounded px-4 py-3 disabled:opacity-50"
        >
          Apri l'itinerario
        </button>
        {error && (
          <p className="text-red-500/80 text-sm mt-4">
            Codice non valido. Riprovi, oppure ci scriva.
          </p>
        )}
      </div>
    </div>
  );
}
