/* eslint-disable @next/next/no-img-element */
import { EmbedData } from "@/lib/data/EmbedData";
import { cn, formatDiscordText } from "@/lib/utils";
import Image from "next/image";
import AuthorPreview from "./AuthorPreview";
import FieldsPreview from "./FieldsPreview";
import FooterPreview from "./FooterPreview";
import { PARSERS } from "@/lib/markdown/parsers/parsers";
import { MarkdownContainer } from "./MarkdownContainer";
import { Markdown } from "./Markdown";

type EmbedPreviewProps = {
  embeds: EmbedData[];
};

export default function EmbedPreview({ embeds }: EmbedPreviewProps) {
  return (
    <div className="flex flex-col space-y-2 ">
      {embeds.map((embed, index) => (
        <div
          key={index}
          className={cn(
            `flex flex-col items-start justify-start bg-secondary-bg border-l-4 py-3 pl-4 rounded-sm pr-5 space-y-2 max-w-[450px]`
          )}
          style={{ borderColor: embed.color || undefined }}
        >
          <div className="flex flex-row items-start justify-between space-x-3 w-full">
            <div className="flex flex-col items-start justify-center space-y-2">
              {embed.author && <AuthorPreview author={embed.author} />}
              {embed.title && embed.url === undefined && (
                <Markdown
                  content={embed.title}
                  type="embed-header"
                  className="text-md font-bold tracking-wide"
                />
              )}
              {embed.title && embed.url && (
                <a
                  href={embed.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-md font-bold text-blue-500 tracking-wide"
                >
                  <Markdown
                    content={embed.title}
                    type="embed-header"
                    className="text-md font-bold tracking-wide"
                  />
                </a>
              )}
              {embed.description && (
                <Markdown
                  content={embed.description}
                  type="embed-content"
                  className="text-[13px] font-normal tracking-wide"
                />
              )}
              {embed.fields && embed.fields.length > 0 && (
                <FieldsPreview fields={embed.fields} />
              )}
            </div>
            {embed.thumbnail && embed.thumbnail.url !== "" && (
              <img
                src={embed.thumbnail.url}
                alt="Embed Thumbnail"
                className="rounded-md"
                width={100}
              />
            )}
          </div>
          {embed.image && embed.image.url !== "" && (
            <img
              src={embed.image.url}
              alt="Embed Thumbnail"
              className="rounded-md object-contain w-full"
            />
          )}
          {embed.footer && <FooterPreview footer={embed.footer} />}
        </div>
      ))}
    </div>
  );
}
