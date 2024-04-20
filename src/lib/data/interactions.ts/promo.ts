export type Promo = {
  id: number;
  twitterId: string;
  twitterUrl: string;
  tweetId: string;
  tweetUrl: string;
  type: "PROMO";
};

export const defaultPromo = (lastInteractionId?: number): Promo => ({
  id: lastInteractionId ? lastInteractionId + 1 : 0,
  twitterId: "",
  twitterUrl: "",
  tweetId: "",
  tweetUrl: "",
  type: "PROMO",
});
