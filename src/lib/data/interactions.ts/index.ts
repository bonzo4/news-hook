import { Direct } from "./direct";
import { Poll } from "./poll";
import { Profile } from "./profile";
import { Promo } from "./promo";
import { Quiz } from "./quiz";
import { WalletInteraction } from "./wallet";
import { LinkInteraction } from "./link";
import { InputInteraction } from "./input";

export type Interaction =
  | LinkInteraction
  | Quiz
  | Poll
  | InputInteraction
  | Direct
  | Promo
  | Profile
  | WalletInteraction;
