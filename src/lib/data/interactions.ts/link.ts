export type LinkInteraction = {
  id: number;
  url: string;
  text: string;
  emoji: string;
  type: "LINK";
};

export function defaultLink(lastInteractionId?: number): LinkInteraction {
  return {
    id: lastInteractionId ? lastInteractionId + 1 : 1,
    url: "",
    text: "",
    emoji: "",
    type: "LINK",
  };
}
