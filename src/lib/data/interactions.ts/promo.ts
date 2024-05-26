export type Promo = {
  id: number;
  twitterUrl: string;
  tweetUrl: string;
  type: "PROMO";
};

export const defaultPromo = (lastInteractionId?: number): Promo => ({
  id: lastInteractionId ? lastInteractionId + 1 : 1,
  twitterUrl: "",
  tweetUrl: "",
  type: "PROMO",
});
