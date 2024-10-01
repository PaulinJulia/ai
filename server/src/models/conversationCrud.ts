import ConversationModel from "./conversation";

const findPrompt = async (id) => {
  return ConversationModel.findById(id);
};

const findConversation = async () => {
  return ConversationModel.find();
};

const createPrompt = async (text) => {
  const newPrompt = new ConversationModel(text);
  return newPrompt.save();
};

const updatePrompt = async (id, text) => {
  return ConversationModel.findByIdAndUpdate(id, text);
};

const deletePrompt = async (id) => {
  return ConversationModel.findByIdAndDelete(id);
};

export {
  findPrompt,
  findConversation,
  createPrompt,
  updatePrompt,
  deletePrompt,
};
