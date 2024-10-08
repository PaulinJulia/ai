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

export interface Prompt {
  id?: string;
  muscleGroup: string;
  duration: number;
  fitnessLevel: string;
  equipment: string[];
  goal: string;
  text?: string;
}

// Mongoose Schema
const conversationSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  muscleGroup: { type: String, required: true },
  duration: { type: Number, required: true },
  fitnessLevel: { type: String, required: true },
  equipment: { type: [String], required: true },
  goal: { type: String, required: true },
  text: { type: String },
});

const ConversationModel = mongoose.model<Prompt>(
  "Conversation",
  conversationSchema
);

export default ConversationModel;
