export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type ExerciseStatus = "todo" | "in_progress" | "done";

export interface ExerciseValidation {
  /** Regex tested against the student's submitted code */
  pattern: string;
  /** flags for the regex */
  flags?: string;
}

export interface Hint {
  label: string;
  content: string;
}

export interface Exercise {
  id: string;          // e.g. "1.1"
  moduleNumber: number;
  number: number;      // within module
  title: string;
  difficulty: Difficulty;
  minutes: number;
  statement: string;
  hint?: Hint;
  /** Reference solution shown when the user clicks "Afficher la correction" */
  solution: string;
  /** Validation: the student's code must match this pattern to pass */
  validation: ExerciseValidation;
}

export interface LessonSection {
  heading: string;
  body: string;
  code?: string;
}

export interface Lesson {
  intro: string;
  sections: LessonSection[];
  keyTakeaway: string;
}

export interface Module {
  number: number;
  emoji: string;
  title: string;
  subtitle: string;
  durationMin: number;
  objectives: string[];
  pythonModules: string[];
  lesson: Lesson;
  exercises: Exercise[];
}

export interface ReviewRow {
  id: number;
  restaurant: string;
  note: number;
  texte: string;
  date_avis: string;
}
