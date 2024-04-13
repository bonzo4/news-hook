export type Interaction =
  | PollInteraction
  | QuizInteraction
  | InputInteraction
  | PromoInteraction
  | ProfileInteraction
  | WalletInteraction
  | LinkInteraction;

export type PollInteraction = {
  id: number;
  question: string;
  choices: {
    name: string;
    emoji: string;
  }[];
};

export type QuizInteraction = {
  id: number;
  question: string;
  answer: string;
  choices: {
    name: string;
    emoji: string;
  }[];
};

export type InputInteraction = {
  id: number;
  question: string;
  buttonText?: string;
};

export type PromoInteraction = {
  id: number;
  twitterLink: string;
  discordLink: string;
};

export type ProfileInteraction = {
  id: number;
  buttonText?: string;
};

export type WalletInteraction = {
  id: number;
  buttonText?: string;
};

export type LinkInteraction = {
  id: number;
  buttonText?: string;
};
