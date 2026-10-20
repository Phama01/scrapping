import { useState } from "react";
import { BookOpen, ChevronDown, Code2, Lightbulb, Zap } from "lucide-react";
import type { Lesson } from "@/types";

interface LessonPanelProps {
  lesson: Lesson;
  moduleNumber: number;
}

export function LessonPanel({ lesson, moduleNumber }: LessonPanelProps) {
  const [open, setOpen] = useState(true);
  const [readSections, setReadSections] = useState<Set<number>>(new Set());

  const allRead = readSections.size === lesson.sections.length;
  const progressPct = Math.round((readSections.size / lesson.sections.length) * 100);

  const toggleSection = (i: number) => {
    setReadSections((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-[#0d1117] to-[#0d1117] shadow-xl">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-600/20 ring-1 ring-sky-500/30">
            <BookOpen className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
              Leçon · Module {moduleNumber}
            </p>
            <h2 className="text-lg font-bold text-white">Avant de commencer</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {allRead && open && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/30">
              <Zap className="h-3 w-3" /> Lu
            </span>
          )}
          <ChevronDown className={`h-5 w-5 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-800">
          {/* Progress bar */}
          <div className="px-6 pt-4">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-500">
              <span>Lecture de la leçon</span>
              <span className="font-medium text-sky-400">{progressPct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Intro */}
          <div className="px-6 py-5">
            <p className="text-sm leading-relaxed text-slate-300">{lesson.intro}</p>
          </div>

          {/* Sections */}
          <div className="space-y-2 px-6 pb-5">
            {lesson.sections.map((section, i) => {
              const isRead = readSections.has(i);
              return (
                <div
                  key={i}
                  className={`rounded-xl border transition ${
                    isRead
                      ? "border-sky-500/20 bg-sky-500/5"
                      : "border-slate-800 bg-slate-900/40"
                  }`}
                >
                  <button
                    onClick={() => toggleSection(i)}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                        isRead
                          ? "bg-sky-500 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isRead ? "✓" : i + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium text-slate-200">
                      {section.heading}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition ${isRead ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isRead && (
                    <div className="px-4 pb-4 pl-12">
                      <p className="text-sm leading-relaxed text-slate-400">{section.body}</p>
                      {section.code && (
                        <pre className="mt-3 overflow-auto rounded-lg border border-slate-800 bg-[#0b0e14] p-3 text-xs leading-relaxed text-emerald-200">
                          <code>{section.code}</code>
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Key takeaway */}
          <div className="mx-6 mb-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                À retenir
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{lesson.keyTakeaway}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-slate-800 px-6 py-4">
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-400 hover:to-indigo-500"
            >
              <Code2 className="h-4 w-4" />
              J'ai lu — passer aux exercices
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
