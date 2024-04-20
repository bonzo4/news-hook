export type PollChoice = {
  text: string;
  emoji: string;
  id: number;
};

export type Poll = {
  id: number;
  question: string;
  type: "POLL";
  choices: PollChoice[];
  randomized?: boolean;
};

export const defaultPoll = (lastInteractionId?: number): Poll => ({
  id: lastInteractionId ? lastInteractionId + 1 : 0,
  question: "",
  type: "POLL",
  choices: [],
  randomized: false,
});
