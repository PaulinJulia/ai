import ConversationModel, { Prompt } from "./conversationModel";

const findPrompt = async (id: string) => {
  return ConversationModel.findById(id);
};

const findConversation = async () => {
  return ConversationModel.find();
};

const createPrompt = async (prompt: Prompt) => {
  const newPrompt = new ConversationModel(prompt);
  return newPrompt.save();
};

const updatePrompt = async (id: string, text: string) => {
  return ConversationModel.findByIdAndUpdate(id, { text: text }, { new: true });
};

const deletePrompt = async (id: string) => {
  return ConversationModel.findByIdAndDelete(id);
};

export {
  findPrompt,
  findConversation,
  createPrompt,
  updatePrompt,
  deletePrompt,
};
