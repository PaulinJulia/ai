import mongoose from "../db";
const Schema = mongoose.Schema;

export interface Prompt {
  id?: string;
  text: string;
  role: string;
  createdAt: Date;
}

// Mongoose Schema
const conversationSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  text: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const ConversationModel = mongoose.model<Prompt>("Conversation", conversationSchema);

export default ConversationModel;
