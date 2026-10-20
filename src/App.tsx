import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, Menu, Sparkles } from "lucide-react";
import { modules } from "@/data/course";
import { useProgress } from "@/hooks/useProgress";
import { Sidebar } from "@/components/Sidebar";
import { ModuleHeader } from "@/components/ModuleHeader";
import { ExerciseCard } from "@/components/ExerciseCard";
import { DataPreview } from "@/components/DataPreview";
import { LessonPanel } from "@/components/LessonPanel";

export default function App() {
  const { progress, setStatus, reset } = useProgress();
  const [activeModule, setActiveModule] = useState(1);
  const [activeExerciseId, setActiveExerciseId] = useState<string>("1.1");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const allExercises = useMemo(() => modules.flatMap((m) => m.exercises), []);
  const totalExercises = allExercises.length;
  const totalDone = allExercises.filter((e) => progress[e.id] === "done").length;

  const currentModule = modules.find((m) => m.number === activeModule)!;
  const currentExercise = currentModule.exercises.find((e) => e.id === activeExerciseId) ?? currentModule.exercises[0];

  // Scroll to top when changing exercise
  useEffect(() => {
    document.getElementById("exercise-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeExerciseId, activeModule]);

  const handleSelectExercise = (moduleId: number, exerciseId: string) => {
    setActiveModule(moduleId);
    setActiveExerciseId(exerciseId);
    setSidebarOpen(false);
  };

  const goNext = () => {
    const flat = modules.flatMap((m) => m.exercises.map((e) => ({ m: m.number, id: e.id })));
    const idx = flat.findIndex((f) => f.id === activeExerciseId);
    if (idx < flat.length - 1) {
      handleSelectExercise(flat[idx + 1].m, flat[idx + 1].id);
    }
  };
  const goPrev = () => {
    const flat = modules.flatMap((m) => m.exercises.map((e) => ({ m: m.number, id: e.id })));
    const idx = flat.findIndex((f) => f.id === activeExerciseId);
    if (idx > 0) {
      handleSelectExercise(flat[idx - 1].m, flat[idx - 1].id);
    }
  };

  // Breadcrumb: module index of current exercise
  const exerciseIndexInModule = currentModule.exercises.findIndex((e) => e.id === currentExercise.id);
  const isLastInModule = exerciseIndexInModule === currentModule.exercises.length - 1;
  const isFirstOverall = activeModule === 1 && exerciseIndexInModule === 0;

  const handleReset = () => {
    if (window.confirm("Réinitialiser toute votre progression ? Cette action est irréversible.")) {
      reset();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#070a0f] text-slate-200">
      <Sidebar
        modules={modules}
        progress={progress}
        activeModule={activeModule}
        activeExerciseId={currentExercise.id}
        onSelectExercise={handleSelectExercise}
        totalDone={totalDone}
        totalExercises={totalExercises}
        onReset={handleReset}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main id="exercise-scroll" className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-[#070a0f]/90 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="hidden sm:inline">Module {currentModule.number}</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-slate-300">{currentModule.title}</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="font-medium text-sky-400">Ex. {currentExercise.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs sm:flex">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-slate-400">Pas d'IA générative — 100% NLP classique</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-sky-400">
              {totalDone}/{totalExercises}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 md:px-8 md:py-8">
          {/* Module header + objectives (only show on first exercise of module) */}
          {exerciseIndexInModule === 0 && <ModuleHeader module={currentModule} />}

          {/* Lesson panel (only show on first exercise of module) */}
          {exerciseIndexInModule === 0 && (
            <LessonPanel lesson={currentModule.lesson} moduleNumber={currentModule.number} />
          )}

          {/* Dataset preview (only show on first exercise of module) */}
          {exerciseIndexInModule === 0 && <DataPreview />}

          {/* Exercise */}
          <ExerciseCard
            exercise={currentExercise}
            status={progress[currentExercise.id] ?? "todo"}
            onStatusChange={setStatus}
          />

          {/* Navigation between exercises */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={goPrev}
              disabled={isFirstOverall}
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Précédent
            </button>

            <div className="flex items-center gap-1">
              {currentModule.exercises.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => handleSelectExercise(currentModule.number, e.id)}
                  className={`h-2 rounded-full transition-all ${
                    i === exerciseIndexInModule
                      ? "w-6 bg-sky-500"
                      : progress[e.id] === "done"
                        ? "w-2 bg-emerald-500"
                        : "w-2 bg-slate-700 hover:bg-slate-600"
                  }`}
                  title={`Exercice ${e.id}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={isLastInModule && activeModule === modules.length}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Suivant <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Footer */}
          <footer className="border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
            <p>
              Data Science &amp; NLP — Jour 2 · Formation interactive · Fil rouge : analyse de{" "}
              <span className="text-slate-400">avis_restaurants.csv</span>
            </p>
            <p className="mt-1">Inspiration pédagogique : modai-lab.com — Aucune IA générative utilisée</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
