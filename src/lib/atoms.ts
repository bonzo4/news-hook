import { atom } from "jotai";
import { Interaction } from "./types";

type EditorDisplay = "editor" | "preview" | "split";
export const editorDisplayAtom = atom<EditorDisplay>("split");

export type Embed = {
  id: number;
  expanded?: boolean;
  tags: string[];
  author: {
    name: string;
    url?: string;
    iconUrl?: string;
  };
  title: string;
  description: string;
  url?: string;
  color: string;
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
  imageUrl?: string;
  thumbnailUrl?: string;
  footer?: {
    text: string;
    timestamp: Date;
    iconUrl: string;
  };
  interactions?: Interaction[];
};

export const embedAtom = atom<Embed[]>([]);
