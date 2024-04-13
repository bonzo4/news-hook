import { Embed } from "@/lib/atoms";
import Image from "next/image";

type EmbedPreviewProps = {
  embeds: Embed[];
};

export default function EmbedPreview({ embeds }: EmbedPreviewProps) {
  return (
    <div className="flex flex-col space-y-2">
      {embeds.map((embed, index) => (
        <div
          key={index}
          className={`flex flex-row items-center justify-start bg-secondary-bg border-l-4 border-[${embed.color}] py-2 pl-2 rounded-sm pr-5`}
        >
          {/* <Image
            src={embed.imageUrl}
            alt="Author Icon"
            width={50}
            height={50}
            className="rounded-full"
          /> */}
          <div className="flex flex-col items-center justify-start ">
            <h1 className="text-md font-bold">{embed.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
