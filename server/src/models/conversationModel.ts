import mongoose from "../db";
const Schema = mongoose.Schema;

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
  warmUp: string;
  exercises: Exercise[];
  coolDown: string;
  advice?: string;
  wisdom: string;
}

export interface Plan {
  id?: string;
  muscleGroup: string;
  duration: number;
  fitnessLevel: string;
  equipment: string[];
  goal: string;
  workout?: Workout;
  createdAt: Date;
}

// Mongoose Schema
const exerciseSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  explanation: { type: String, required: true },
  sets: { type: Number },
  repetitions: { type: Number },
  duration: { type: Number },
});

const workoutSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  warmUp: { type: String, required: true },
  exercises: { type: [exerciseSchema], required: true },
  coolDown: { type: String, required: true },
  advice: { type: String },
  wisdom: { type: String },
});

const planSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  muscleGroup: { type: String, required: true },
  duration: { type: Number, required: true },
  fitnessLevel: { type: String, required: true },
  equipment: { type: [String], required: true },
  goal: { type: String, required: true },
  workout: { type: workoutSchema },
  createdAt: { type: Date, default: Date.now },
});

const PlanModel = mongoose.model<Plan>("Plan", planSchema);

export default PlanModel;
