export interface FormData {
  duration: number;
  targetMuscle: string;
  fitnessLevel: string;
  goal: string;
  equipment: string[];
}

export interface Exercise {
  id?: string;
  name: string;
  explanation: string;
  sets?: number;
  repetitions?: number;
  duration?: number;
}

export interface Workout {
  id?: string;
  title: string;
  duration: number;
  exercises: Exercise[];
  advice?: string;
}

export interface Plan {
  id?: string;
  muscleGroup: string;
  duration: number;
  fitnessLevel: string;
  equipment: string[];
  goal: string;
  workout?: Workout;
}

export interface WorkoutItemProps {
  workout: Workout;
}
