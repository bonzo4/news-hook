export type Wallet = {
  id: number;
  type: "WALLET";
  sol: boolean;
  eth: boolean;
};

export const defaultWallet = (lastInteractionId?: number): Wallet => ({
  id: lastInteractionId ? lastInteractionId + 1 : 1,
  type: "WALLET",
  sol: false,
  eth: false,
});
