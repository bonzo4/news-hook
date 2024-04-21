export type Quiz = {
  id: number;
  question: string;
  answer: string;
  type: "QUIZ";
  choices: Choice[];
  randomized?: boolean;
};

export type Choice = {
  text: string;
  emoji: string;
  id: number;
};

export const defaultQuiz = (lastInteractionId?: number): Quiz => ({
  id: lastInteractionId ? lastInteractionId + 1 : 1,
  question: "",
  answer: "",
  type: "QUIZ",
  choices: [],
  randomized: false,
});
