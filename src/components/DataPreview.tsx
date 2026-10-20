import { useState } from "react";
import { ChevronDown, Database, Eye } from "lucide-react";
import { reviews } from "@/data/reviews";

export function DataPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1117] shadow-lg">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Database className="h-4 w-4 text-emerald-400" />
          <span className="font-medium">Aperçu du jeu de données</span>
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-400">
            avis_restaurants.csv
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{reviews.length} lignes</span>
          <ChevronDown className={`h-4 w-4 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-800 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Eye className="h-3.5 w-3.5" /> df.head() — 5 premières lignes
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/60 text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-medium">id</th>
                  <th className="px-3 py-2 font-medium">restaurant</th>
                  <th className="px-3 py-2 font-medium">note</th>
                  <th className="px-3 py-2 font-medium">texte</th>
                  <th className="px-3 py-2 font-medium">date_avis</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {reviews.slice(0, 5).map((r) => (
                  <tr key={r.id} className="border-t border-slate-800/60">
                    <td className="px-3 py-2 text-slate-500">{r.id}</td>
                    <td className="px-3 py-2">{r.restaurant}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                        r.note >= 4 ? "bg-emerald-500/15 text-emerald-300" :
                        r.note <= 2 ? "bg-rose-500/15 text-rose-300" :
                        "bg-amber-500/15 text-amber-300"
                      }`}>{r.note}</span>
                    </td>
                    <td className="max-w-xs px-3 py-2 truncate text-slate-400">{r.texte}</td>
                    <td className="px-3 py-2 text-slate-500">{r.date_avis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span className="rounded-md bg-slate-800/60 px-2 py-1">
              shape = ({reviews.length}, 5)
            </span>
            <span className="rounded-md bg-slate-800/60 px-2 py-1">
              4 restaurants
            </span>
            <span className="rounded-md bg-slate-800/60 px-2 py-1">
              notes de 1 à 5
            </span>
            <span className="rounded-md bg-slate-800/60 px-2 py-1">
              dates : 2024-01 → 2024-04
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
