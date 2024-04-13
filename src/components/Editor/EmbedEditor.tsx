import { embedAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { PrimaryButton } from "../PrimaryButton";
import EmbedManager from "./EmbedManager";

export default function EmbedEditor() {
  const [embeds, setEmbeds] = useAtom(embedAtom);

  const addEmbed = () => {
    setEmbeds((prevEmbeds) => {
      const lastEmbed = prevEmbeds.at(-1);
      return [
        ...prevEmbeds,
        {
          id: lastEmbed ? lastEmbed.id + 1 : 0,
          title: "Title",
          description: "Description",
          color: "#ffffff",
          tags: [],
          author: {
            name: "",
          },
        },
      ];
    });
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      {embeds.map((embed, index) => (
        <EmbedManager
          key={embed.id}
          index={index}
          embed={embed}
          embedCount={embeds.length}
          setEmbeds={setEmbeds}
        />
      ))}
      <div className="flex justify-start">
        <PrimaryButton onClick={addEmbed} className="w-auto">
          Add Embed
        </PrimaryButton>
      </div>
    </div>
  );
}
