import { Interaction } from "./interactions.ts";
import type { AuthorData } from "./AuthorData";
import type { FieldData } from "./FieldData";
import type { FooterData } from "./FooterData";
import type { ImageData } from "./ImageData";

export type EmbedData = {
  id: number;
  title?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: string | null;
  footer?: FooterData;
  image?: ImageData;
  thumbnail?: ImageData;
  author?: AuthorData;
  fields?: FieldData[];
  expanded: boolean;
  tag: string;
  interactions: Interaction[];
  reactions: string[];
};
