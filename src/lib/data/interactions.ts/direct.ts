export type Direct = {
  id: number;
  type: "DIRECT";
};

export const defaultDirect = (lastInteractionId?: number): Direct => ({
  id: lastInteractionId ? lastInteractionId + 1 : 1,
  type: "DIRECT",
});
