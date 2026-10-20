import { BookOpen, Clock, Target } from "lucide-react";
import type { Module } from "@/types";

export function ModuleHeader({ module }: { module: Module }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-[#0d1117] p-6 shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-600/20 text-3xl ring-1 ring-slate-700">
            {module.emoji}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-sky-400">
              Module {module.number}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">{module.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{module.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 text-xs text-slate-300">
          <Clock className="h-4 w-4 text-sky-400" /> {module.durationMin} min
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {/* Objectives */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Target className="h-4 w-4 text-sky-400" /> Objectifs pédagogiques
          </div>
          <ul className="space-y-1.5">
            {module.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* Python modules */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <BookOpen className="h-4 w-4 text-indigo-400" /> Modules Python à connaître
          </div>
          <div className="flex flex-wrap gap-2">
            {module.pythonModules.map((m) => (
              <span
                key={m}
                className="rounded-lg border border-slate-700 bg-slate-800/40 px-2.5 py-1 font-mono text-xs text-indigo-300"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
