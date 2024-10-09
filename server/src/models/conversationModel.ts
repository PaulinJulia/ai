// import mongoose from "../db";
// const Schema = mongoose.Schema;

// export interface Prompt {
//   id?: string;
//   text: string;
//   role: string;
//   createdAt: Date;
// }

// // Mongoose Schema
// const conversationSchema = new Schema({
//   _id: { type: Schema.Types.ObjectId, auto: true },
//   text: { type: String, required: true },
//   role: { type: String, default: "user" },
//   createdAt: { type: Date, default: Date.now },
// });

// const ConversationModel = mongoose.model<Prompt>("Conversation", conversationSchema);

// export default ConversationModel;

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
  duration: { type: Number, required: true },
  exercises: { type: [exerciseSchema], required: true },
  advice: { type: String },
});

const conversationSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  muscleGroup: { type: String, required: true },
  duration: { type: Number, required: true },
  fitnessLevel: { type: String, required: true },
  equipment: { type: [String], required: true },
  goal: { type: String, required: true },
  workout: { type: workoutSchema },
});

const ConversationModel = mongoose.model<Plan>(
  "Conversation",
  conversationSchema
);

export default ConversationModel;
