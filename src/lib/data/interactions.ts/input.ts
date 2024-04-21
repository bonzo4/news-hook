export type Input = {
  id: number;
  question: string;
  type: "INPUT";
};

export const defaultInput = (lastInteractionId?: number): Input => ({
  id: lastInteractionId ? lastInteractionId + 1 : 1,
  question: "",
  type: "INPUT",
});
