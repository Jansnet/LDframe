"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface CoachableSkill {
  slug: string;
  name: string;
}

interface Props {
  skills: CoachableSkill[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

/**
 * Floating Coach pane.
 *
 * A button bottom-right opens a side panel with a coach chat scoped to the
 * current skill. If the user is not on a skill page, they pick a skill from
 * the dropdown. The pane uses the existing /api/coach streaming endpoint.
 *
 * Conversation lives in component state — it's not persisted across reloads.
 * That's deliberate for MVP: coaching is a short session, not a thread.
 */
export function CoachPane({ skills }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [skillSlug, setSkillSlug] = useState<string>(() => deriveSkillFromPath(pathname, skills));
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // Update default skill when the URL changes to a skill page.
  useEffect(() => {
    const fromPath = deriveSkillFromPath(pathname, skills);
    if (fromPath) setSkillSlug(fromPath);
  }, [pathname, skills]);

  // Scroll messages to bottom on update.
  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight });
  }, [messages, streaming]);

  // Esc closes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send() {
    const trimmed = draft.trim();
    if (!trimmed || !skillSlug || streaming) return;
    setError(null);
    setDraft("");
    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setStreaming(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillSlug, messages: next, locale: "de" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.hint ?? body.error ?? "Coach nicht erreichbar.");
        setMessages(next);  // drop the empty assistant placeholder
        return;
      }
      const reader = res.body?.getReader();
      if (!reader) {
        setError("Stream nicht lesbar.");
        return;
      }
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
    } catch (e) {
      setError("Verbindungsabbruch.");
    } finally {
      setStreaming(false);
    }
  }

  const skillName = skills.find((s) => s.slug === skillSlug)?.name;
  const canSend = !!skillSlug && draft.trim().length > 0 && !streaming;

  return (
    <>
      {/* Trigger button — always visible bottom-right. */}
      <button
        type="button"
        aria-label={isOpen ? "Coach schließen" : "Coach öffnen"}
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-primary text-primary-on shadow-elev-2 hover:shadow-elev-3 px-4 h-12 text-label-lg state-layer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>{isOpen ? "Schließen" : "Coach"}</span>
      </button>

      {/* Backdrop on mobile only. */}
      {isOpen && (
        <button
          aria-label="Coach schließen"
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-30 bg-on-surface/40"
        />
      )}

      {/* Pane */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-full md:w-[420px] z-40 bg-surface border-l border-outline-variant
          flex flex-col shadow-elev-3 transition-transform duration-200 ease-emphasized
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!isOpen}
      >
        <header className="px-5 py-4 border-b border-outline-variant flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-label-sm text-on-surface-muted uppercase tracking-wide">Coach</p>
            <p className="font-serif text-title-md text-on-surface">
              {skillName ?? "Skill wählen"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Coach schließen"
            onClick={() => setIsOpen(false)}
            className="state-layer rounded-full w-9 h-9 inline-flex items-center justify-center text-on-surface"
          >
            ×
          </button>
        </header>

        {/* Skill selector — only if no skill from URL or user wants to switch. */}
        <div className="px-5 py-3 border-b border-outline-variant">
          <label className="block">
            <span className="block font-mono text-label-sm uppercase text-on-surface-muted mb-1">
              Skill
            </span>
            <select
              value={skillSlug}
              onChange={(e) => {
                setSkillSlug(e.target.value);
                setMessages([]);
                setError(null);
              }}
              className="w-full rounded-sm border border-outline-variant bg-surface p-2 text-body-md focus:outline-none focus:border-primary"
            >
              <option value="">— wählen —</option>
              {skills.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div ref={messagesRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.length === 0 && !error && (
            <p className="text-body-md text-on-surface-muted italic">
              {skillSlug
                ? "Schreib eine Frage, die Situation oder eine Beobachtung. Der Coach kennt dein Identity Statement (falls vorhanden) und deine letzten Artefakte."
                : "Erst einen Skill wählen, dann starten."}
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`rounded-md px-3 py-2 max-w-[90%] text-body-md whitespace-pre-wrap ${
                m.role === "user"
                  ? "ml-auto bg-primary text-primary-on"
                  : "bg-surface-container text-on-surface"
              }`}
            >
              {m.content || (streaming && i === messages.length - 1 ? "…" : "")}
            </div>
          ))}
          {error && (
            <div className="rounded-md px-3 py-2 bg-rust-100 border border-rust-300 text-body-md text-rust-700">
              {error}
              {error.includes("ANTHROPIC_API_KEY") && (
                <p className="mt-2 text-label-sm">
                  Hinweis an Admin: <code>ANTHROPIC_API_KEY</code> setzen, damit der Coach
                  antwortet.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-outline-variant p-4">
          <div className="flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder={skillSlug ? "Frage oder Situation …" : "Erst Skill wählen."}
              disabled={!skillSlug || streaming}
              className="flex-1 rounded-sm border border-outline-variant bg-surface p-2 text-body-md focus:outline-none focus:border-primary resize-none"
            />
            <button
              type="button"
              onClick={send}
              disabled={!canSend}
              className="rounded-full bg-primary text-primary-on px-4 h-9 text-label-lg state-layer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {streaming ? "…" : "Senden"}
            </button>
          </div>
          {messages.length > 0 && (
            <div className="mt-2 flex items-center justify-between">
              <p className="font-mono text-label-sm text-on-surface-muted">
                ⌘/Strg + Enter
              </p>
              <button
                type="button"
                onClick={() => setMessages([])}
                className="text-label-md text-on-surface-muted underline state-layer rounded-sm px-2"
              >
                Verlauf leeren
              </button>
            </div>
          )}
        </div>

        <footer className="px-5 py-2 border-t border-outline-variant">
          <Link
            href="/coach"
            className="text-label-md text-on-surface-muted underline"
          >
            Coach-Übersicht (alle Personas) →
          </Link>
        </footer>
      </aside>
    </>
  );
}

function deriveSkillFromPath(pathname: string, skills: CoachableSkill[]): string {
  const match = pathname.match(/^\/skills\/([^/]+)/);
  if (!match) return skills[0]?.slug ?? "";
  const slug = match[1];
  return skills.some((s) => s.slug === slug) ? slug : skills[0]?.slug ?? "";
}
