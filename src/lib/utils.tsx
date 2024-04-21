import { ClassValue, clsx } from "clsx";
import { toHTML } from "discord-markdown";
import { twMerge } from "tailwind-merge";
import parse, { domToReact } from "html-react-parser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDiscordText(text: string): string {
  // replace any instance of [text](link) with an anchor tag <a href="link">text</a>
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const subst = `<a href="$2" style={{ color: "#0000ff" }}>1</a>`;

  // replace any instace of <:emoji:123456789> with an img tag <img src="https://cdn.discordapp.com/emojis/123456789.png" alt="emoji">
  const emojiRegex = /<:(.*?):(\d+)>/g;
  const emojiSubst = `<img src="https://cdn.discordapp.com/emojis/$2.png" alt="$1">`;

  const newText = text.replace(emojiRegex, emojiSubst).replace(regex, subst);


  return newText;
}
