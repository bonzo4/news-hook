export type InputInteraction = {
  id: number;
  question: string;
  type: "INPUT";
};

export const defaultInput = (lastInteractionId?: number): InputInteraction => ({
  id: lastInteractionId ? lastInteractionId + 1 : 1,
  question: "",
  type: "INPUT",
});
