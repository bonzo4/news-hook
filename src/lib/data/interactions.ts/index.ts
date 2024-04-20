import { Direct } from "./direct";
import { Poll } from "./poll";
import { Profile } from "./profile";
import { Promo } from "./promo";
import { Quiz } from "./quiz";
import { Wallet } from "./wallet";
import { Link } from "./link";
import { Input } from "./input";

export type Interaction =
  | Link
  | Quiz
  | Poll
  | Input
  | Direct
  | Promo
  | Profile
  | Wallet;
