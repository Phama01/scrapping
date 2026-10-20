import { CheckCircle2, Circle, Clock, GraduationCap, PlayCircle, RotateCcw } from "lucide-react";
import type { Module, ExerciseStatus } from "@/types";

interface SidebarProps {
  modules: Module[];
  progress: Record<string, ExerciseStatus>;
  activeModule: number;
  activeExerciseId: string | null;
  onSelectExercise: (moduleId: number, exerciseId: string) => void;
  totalDone: number;
  totalExercises: number;
  onReset: () => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({
  modules,
  progress,
  activeModule,
  activeExerciseId,
  onSelectExercise,
  totalDone,
  totalExercises,
  onReset,
  open,
  onClose,
}: SidebarProps) {
  const pct = totalExercises ? Math.round((totalDone / totalExercises) * 100) : 0;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-slate-800 bg-[#0b0e14] text-slate-200 transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white">Data Science &amp; NLP</h1>
            <p className="text-xs text-slate-400">Jour 2 · 180 min</p>
          </div>
        </div>

        {/* Progress */}
        <div className="border-b border-slate-800 px-5 py-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Progression globale</span>
            <span className="font-semibold text-sky-400">{totalDone}/{totalExercises}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">{pct}% complété</span>
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[11px] text-slate-500 transition hover:text-rose-400"
            >
              <RotateCcw className="h-3 w-3" /> Réinitialiser
            </button>
          </div>
        </div>

        {/* Modules list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {modules.map((m) => {
            const doneCount = m.exercises.filter((e) => progress[e.id] === "done").length;
            const isActive = activeModule === m.number;
            return (
              <div key={m.number} className="mb-4">
                <div
                  className={`mb-2 flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                    isActive ? "bg-slate-800/70 text-white" : "text-slate-300"
                  }`}
                >
                  <span className="text-base">{m.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">Module {m.number}</p>
                    <p className="truncate text-[11px] text-slate-500">{m.title}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-slate-500">
                    <Clock className="h-3 w-3" /> {m.durationMin}'
                  </span>
                </div>

                <ul className="space-y-0.5 pl-2">
                  {m.exercises.map((ex) => {
                    const st = progress[ex.id] ?? "todo";
                    const selected = activeExerciseId === ex.id;
                    return (
                      <li key={ex.id}>
                        <button
                          onClick={() => onSelectExercise(m.number, ex.id)}
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition ${
                            selected
                              ? "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30"
                              : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                          }`}
                        >
                          <StatusIcon status={st} />
                          <span className="flex-1 truncate">
                            <span className="text-slate-500">{ex.id}</span> · {ex.title}
                          </span>
                          <DifficultyDots level={ex.difficulty} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-1 pl-3 text-[10px] text-slate-600">
                  {doneCount}/{m.exercises.length} exercices
                </p>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 px-5 py-3 text-[10px] text-slate-600">
          Fil rouge · <span className="text-slate-400">avis_restaurants.csv</span>
        </div>
      </aside>
    </>
  );
}

function StatusIcon({ status }: { status: ExerciseStatus }) {
  if (status === "done")
    return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />;
  if (status === "in_progress")
    return <PlayCircle className="h-4 w-4 shrink-0 text-amber-400" />;
  return <Circle className="h-4 w-4 shrink-0 text-slate-600" />;
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <span className="flex shrink-0 gap-0.5" title={`Difficulté ${level}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1 w-1 rounded-full ${i < level ? "bg-amber-400" : "bg-slate-700"}`}
        />
      ))}
    </span>
  );
}
