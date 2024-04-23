export type WalletInteraction = {
  id: number;
  type: "WALLET";
  sol: boolean;
  eth: boolean;
};

export const defaultWallet = (
  lastInteractionId?: number
): WalletInteraction => ({
  id: lastInteractionId ? lastInteractionId + 1 : 1,
  type: "WALLET",
  sol: false,
  eth: false,
});
