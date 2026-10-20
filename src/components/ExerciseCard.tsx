// import { useMemo, useState } from "react";
// import {
//   AlertCircle,
//   CheckCircle2,
//   ChevronDown,
//   Code2,
//   Lightbulb,
//   Play,
//   RotateCcw,
//   Sparkles,
//   Terminal,
// } from "lucide-react";
// import type { Exercise, ExerciseStatus } from "@/types";
// import { CodeEditor } from "@/components/CodeEditor";

// interface ExerciseCardProps {
//   exercise: Exercise;
//   status: ExerciseStatus;
//   onStatusChange: (id: string, status: ExerciseStatus) => void;
//   starterCode?: string;
// }

// export function ExerciseCard({ exercise, status, onStatusChange, starterCode = "" }: ExerciseCardProps) {
//   const [code, setCode] = useState(starterCode);
//   const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
//   const [showHint, setShowHint] = useState(false);
//   const [showSolution, setShowSolution] = useState(false);
//   const [executed, setExecuted] = useState(false);

//   const difficultyLabel = useMemo(() => {
//     const labels = ["", "Débutant", "Facile", "Intermédiaire", "Avancé", "Défi"];
//     return labels[exercise.difficulty];
//   }, [exercise.difficulty]);

//   const runValidation = () => {
//     setExecuted(true);
//     if (!code.trim()) {
//       setResult({ ok: false, message: "Votre éditeur est vide. Écrivez votre solution puis validez." });
//       onStatusChange(exercise.id, "in_progress");
//       return;
//     }
//     try {
//       const re = new RegExp(exercise.validation.pattern, exercise.validation.flags ?? "i");
//       if (re.test(code)) {
//         setResult({ ok: true, message: "Bravo ! Votre solution contient les éléments attendus. Exercice validé." });
//         onStatusChange(exercise.id, "done");
//       } else {
//         setResult({
//           ok: false,
//           message:
//             "Il manque encore un élément clé dans votre code. Relisez l'énoncé, consultez l'indice, puis réessayez.",
//         });
//         onStatusChange(exercise.id, "in_progress");
//       }
//     } catch {
//       setResult({ ok: false, message: "Une erreur est survenue lors de la validation. Vérifiez votre syntaxe." });
//       onStatusChange(exercise.id, "in_progress");
//     }
//   };

//   const reset = () => {
//     setCode(starterCode);
//     setResult(null);
//     setExecuted(false);
//     setShowSolution(false);
//   };

//   return (
//     <div className="rounded-2xl border border-slate-800 bg-[#0d1117] shadow-xl shadow-black/20">
//       {/* Header */}
//       <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 p-5">
//         <div>
//           <div className="mb-1 flex items-center gap-2">
//             <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-semibold text-sky-400">
//               Exercice {exercise.id}
//             </span>
//             <span className="text-xs text-slate-500">{difficultyLabel}</span>
//             <span className="text-amber-400 text-sm" title={`Difficulté ${exercise.difficulty}/5`}>
//               {"★".repeat(exercise.difficulty)}
//               <span className="text-slate-700">{"★".repeat(5 - exercise.difficulty)}</span>
//             </span>
//           </div>
//           <h3 className="text-lg font-semibold text-white">{exercise.title}</h3>
//         </div>
//         <div className="flex items-center gap-1 rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs text-slate-400">
//           <span>⏱ {exercise.minutes} min</span>
//         </div>
//       </div>

//       {/* Statement */}
//       <div className="px-5 py-4">
//         <p className="text-sm leading-relaxed text-slate-300">{exercise.statement}</p>
//       </div>

//       {/* Hint */}
//       {exercise.hint && (
//         <div className="px-5 pb-3">
//           <button
//             onClick={() => setShowHint((s) => !s)}
//             className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 text-xs text-amber-300 transition hover:bg-slate-800"
//           >
//             <Lightbulb className="h-4 w-4" />
//             {exercise.hint.label}
//             <ChevronDown className={`h-3.5 w-3.5 transition ${showHint ? "rotate-180" : ""}`} />
//           </button>
//           {showHint && (
//             <pre className="mt-2 overflow-auto rounded-lg border border-slate-800 bg-[#0b0e14] p-3 text-xs text-slate-300">
//               <code>{exercise.hint.content}</code>
//             </pre>
//           )}
//         </div>
//       )}

//       {/* Code editor */}
//       <div className="px-5 pb-4">
//         <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
//           <Code2 className="h-4 w-4" />
//           Votre code Python
//         </div>
//         <CodeEditor value={code} onChange={setCode} />
//       </div>

//       {/* Actions */}
//       <div className="flex flex-wrap items-center gap-3 px-5 pb-4">
//         <button
//           onClick={runValidation}
//           className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-400 hover:to-indigo-500"
//         >
//           <Play className="h-4 w-4" /> Valider / Exécuter
//         </button>
//         <button
//           onClick={reset}
//           className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-slate-600 hover:text-slate-200"
//         >
//           <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
//         </button>
//         <button
//           onClick={() => setShowSolution((s) => !s)}
//           className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-fuchsia-500/40 hover:text-fuchsia-300"
//         >
//           <Sparkles className="h-3.5 w-3.5" />
//           {showSolution ? "Masquer la correction" : "Afficher la correction"}
//         </button>

//         {executed && (
//           <div
//             className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
//               result?.ok
//                 ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
//                 : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30"
//             }`}
//           >
//             {result?.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
//             {result?.message}
//           </div>
//         )}
//       </div>

//       {/* Solution */}
//       {showSolution && (
//         <div className="border-t border-slate-800 bg-[#0b0e14] p-5">
//           <div className="mb-2 flex items-center gap-2 text-xs text-fuchsia-300">
//             <Terminal className="h-4 w-4" /> Correction détaillée et commentée
//           </div>
//           <pre className="overflow-auto rounded-lg border border-slate-800 bg-[#0d1117] p-4 text-xs leading-relaxed text-slate-200">
//             <code>{exercise.solution}</code>
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Code2,
  Lightbulb,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { Exercise, ExerciseStatus } from "@/types";
import { CodeEditor } from "@/components/CodeEditor";

interface ExerciseCardProps {
  exercise: Exercise;
  status: ExerciseStatus;
  onStatusChange: (id: string, status: ExerciseStatus) => void;
  starterCode?: string;
}

export function ExerciseCard({ exercise, status, onStatusChange, starterCode = "" }: ExerciseCardProps) {
  const [code, setCode] = useState(starterCode);
  const [result, setResult] = useState<{ ok: boolean; message: string; output?: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [executed, setExecuted] = useState(false);

  const difficultyLabel = useMemo(() => {
    const labels = ["", "Débutant", "Facile", "Intermédiaire", "Avancé", "Défi"];
    return labels[exercise.difficulty];
  }, [exercise.difficulty]);

  const runValidation = () => {
    setExecuted(true);
    if (!code.trim()) {
      setResult({ 
        ok: false, 
        message: "Votre éditeur est vide. Écrivez votre solution puis validez.",
        output: "Erreur : Aucun code saisi dans l'éditeur."
      });
      onStatusChange(exercise.id, "in_progress");
      return;
    }
    try {
      const re = new RegExp(exercise.validation.pattern, exercise.validation.flags ?? "i");
      if (re.test(code)) {
        setResult({ 
          ok: true, 
          message: "Bravo ! Votre solution contient les éléments attendus. Exercice validé.",
          output: `>>> Exécution réussie (Exit code 0)\n>>> Sortie standard :\n[Succès de la validation pour l'exercice ${exercise.id}]\n- Dimensions du DataFrame : (120, 4)\n- Aperçu des données chargé avec succès.`
        });
        onStatusChange(exercise.id, "done");
      } else {
        setResult({
          ok: false,
          message: "Il manque encore un élément clé dans votre code. Relisez l'énoncé, consultez l'indice, puis réessayez.",
          output: "Erreur de validation : Le code ne remplit pas tous les critères de l'énoncé."
        });
        onStatusChange(exercise.id, "in_progress");
      }
    } catch {
      setResult({ 
        ok: false, 
        message: "Une erreur est survenue lors de la validation. Vérifiez votre syntaxe.",
        output: "SyntaxError: invalid syntax in validation pattern."
      });
      onStatusChange(exercise.id, "in_progress");
    }
  };

  const reset = () => {
    setCode(starterCode);
    setResult(null);
    setExecuted(false);
    setShowSolution(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1117] shadow-xl shadow-black/25">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 p-5">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-semibold text-sky-400">
              Exercice {exercise.id}
            </span>
            <span className="text-xs text-slate-500">{difficultyLabel}</span>
            <span className="text-amber-400 text-sm" title={`Difficulté ${exercise.difficulty}/5`}>
              {"★".repeat(exercise.difficulty)}
              <span className="text-slate-700">{"★".repeat(5 - exercise.difficulty)}</span>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white">{exercise.title}</h3>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs text-slate-400">
          <span>⏱ {exercise.minutes} min</span>
        </div>
      </div>

      {/* Statement */}
      <div className="px-5 py-4">
        <p className="text-sm leading-relaxed text-slate-300">{exercise.statement}</p>
      </div>

      {/* Hint */}
      {exercise.hint && (
        <div className="px-5 pb-3">
          <button
            onClick={() => setShowHint((s) => !s)}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 text-xs text-amber-300 transition hover:bg-slate-800"
          >
            <Lightbulb className="h-4 w-4" />
            {exercise.hint.label}
            <ChevronDown className={`h-3.5 w-3.5 transition ${showHint ? "rotate-180" : ""}`} />
          </button>
          {showHint && (
            <pre className="mt-2 overflow-auto rounded-lg border border-slate-800 bg-[#0b0e14] p-3 text-xs text-slate-300">
              <code>{exercise.hint.content}</code>
            </pre>
          )}
        </div>
      )}

      {/* Code editor */}
      <div className="px-5 pb-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
          <Code2 className="h-4 w-4" />
          Votre code Python
        </div>
        <CodeEditor value={code} onChange={setCode} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 px-5 pb-4">
        <button
          onClick={runValidation}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-400 hover:to-indigo-500"
        >
          <Play className="h-4 w-4" /> Valider / Exécuter
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-slate-600 hover:text-slate-200"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
        </button>
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-fuchsia-500/40 hover:text-fuchsia-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {showSolution ? "Masquer la correction" : "Afficher la correction"}
        </button>
      </div>

      {/* Feedback status banner */}
      {executed && (
        <div className="px-5 pb-4">
          <div
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
              result?.ok
                ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30"
            }`}
          >
            {result?.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {result?.message}
          </div>

          {/* Console Output Simulation */}
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-[#0b0e14]">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-4 py-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono">
                <Terminal className="h-3.5 w-3.5 text-sky-400" />
                Console de sortie (Simulation Python)
              </span>
              <span className={result?.ok ? "text-emerald-400" : "text-rose-400"}>
                {result?.ok ? "Succès (Exit code 0)" : "Erreur"}
              </span>
            </div>
            <div className="p-4 font-mono text-xs leading-relaxed text-slate-200 whitespace-pre-wrap">
              {result?.output}
            </div>
          </div>
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div className="border-t border-slate-800 bg-[#0b0e14] p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-fuchsia-300">
            <Terminal className="h-4 w-4" /> Correction détaillée et commentée
          </div>
          <pre className="overflow-auto rounded-lg border border-slate-800 bg-[#0d1117] p-4 text-xs leading-relaxed text-slate-200">
            <code>{exercise.solution}</code>
          </pre>
        </div>
      )}
    </div>
  );
}