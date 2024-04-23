import { atom } from "jotai";
import { Database } from "./supabase/types";
import { EmbedData } from "./data/EmbedData";

type EditorDisplay = "editor" | "preview" | "split";
export const editorDisplayAtom = atom<EditorDisplay>("split");

export const reactionsAtom = atom<{ emoji: string; embedId: number }[]>([]);

export const titleAtom = atom<string | null>(null);

export type Tag = Database["public"]["Tables"]["tags"]["Row"];
type VanityTag = Database["public"]["Tables"]["vanity_tags"]["Row"];

export const selectedTagsAtom = atom<string[]>([]);

export const selectedVanityTagsAtom = atom<string[]>([]);

export const scheduledAtAtom = atom<Date | null>(null);

export const embedAtom = atom<EmbedData[]>([]);
