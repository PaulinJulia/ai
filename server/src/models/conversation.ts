import mongoose from "../db.ts";

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  text: String,
});

const ConversationModel = mongoose.model("Conversation", conversationSchema);

export default ConversationModel;
