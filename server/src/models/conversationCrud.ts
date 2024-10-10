import PlanModel, { Plan } from "./conversationModel";

const findPrompt = async (id: string) => {
  return PlanModel.findById(id);
};

const findConversation = async () => {
  return PlanModel.find();
};

const createPrompt = async (prompt: Plan) => {
  const newPrompt = new PlanModel(prompt);
  return newPrompt.save();
};

const updatePrompt = async (id: string, text: string) => {
  return PlanModel.findByIdAndUpdate(id, { text: text }, { new: true });
};

const deletePrompt = async (id: string) => {
  return PlanModel.findByIdAndDelete(id);
};

export {
  findPrompt,
  findConversation,
  createPrompt,
  updatePrompt,
  deletePrompt,
};
