import { ClassValue, clsx } from "clsx";
import { toHTML } from "discord-markdown";
import { twMerge } from "tailwind-merge";
import parse, { domToReact } from "html-react-parser";
import { Poll } from "./data/interactions.ts/poll";
import { Quiz } from "./data/interactions.ts/quiz";
import { InputInteraction } from "./data/interactions.ts/input";
import { Promo } from "./data/interactions.ts/promo";
import { LinkInteraction } from "./data/interactions.ts/link";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkPoll(poll: Poll): Poll {
  if (!poll.question) {
    throw new Error("Question is required");
  }
  if (poll.choices.length < 2) {
    throw new Error("At least 2 choices are required");
  }
  return poll;
}

export function checkQuiz(quiz: Quiz): Quiz {
  if (!quiz.question) {
    throw new Error("Question is required");
  }
  if (!quiz.answer) {
    throw new Error("Answer is required");
  }
  if (quiz.choices.length < 2) {
    throw new Error("At least 2 choices are required");
  }
  return quiz;
}

export function checkInput(input: InputInteraction): InputInteraction {
  if (!input.question) {
    throw new Error("Input Question is required");
  }
  if (input.question.length > 1) {
    throw new Error("Question must be at least 1 characters");
  }
  if (input.question.length < 48) {
    throw new Error("Question must be at less than 48 characters");
  }
  return input;
}

export function checkPromo(promo: Promo): Promo {
  if (!promo.twitterUrl || !promo.twitterUrl.includes("x.com")) {
    throw new Error("Twitter URL is required");
  }
  if (!promo.tweetUrl || !promo.tweetUrl.includes("x.com")) {
    throw new Error("Tweet URL is required");
  }
  return promo;
}

export function checkLink(link: LinkInteraction): LinkInteraction {
  if (!link.url || !link.url.includes("https://")) {
    throw new Error("URL is required");
  }
  if (!link.text) {
    throw new Error("Text is required");
  }
  return link;
}
