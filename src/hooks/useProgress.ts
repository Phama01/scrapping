import { useCallback, useEffect, useState } from "react";
import type { ExerciseStatus } from "@/types";

const STORAGE_KEY = "nlp-course-progress-v1";

type ProgressMap = Record<string, ExerciseStatus>;

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ProgressMap;
    return parsed ?? {};
  } catch {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* ignore quota errors */
    }
  }, [progress]);

  const setStatus = useCallback((id: string, status: ExerciseStatus) => {
    setProgress((prev) => ({ ...prev, [id]: status }));
  }, []);

  const reset = useCallback(() => setProgress({}), []);

  return { progress, setStatus, reset };
}
