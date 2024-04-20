export type Profile = {
  id: number;
  type: "PROFILE";
};

export const defaultProfile = (lastInteractionId?: number): Profile => ({
  id: lastInteractionId ? lastInteractionId + 1 : 0,
  type: "PROFILE",
});
