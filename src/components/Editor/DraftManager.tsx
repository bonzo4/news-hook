import { SupabaseClient } from "@supabase/supabase-js";
import Input from "../Input";
import { SecondaryButton } from "../SecondaryButton";
import { Database } from "@/lib/supabase/types";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { EmbedData } from "@/lib/data/EmbedData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useDrafts } from "@/lib/hooks/useDrafts";
import * as convert from "color-convert";

type DraftManagerProps = {
  embeds: EmbedData[];
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
  supabase: SupabaseClient<Database>;
};

export default function DraftManager({
  supabase,
  setEmbeds,
  embeds,
}: DraftManagerProps) {
  const [refetch, setRefetch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [draftTitle, setDraftTitle] = useState<string>("");

  const [drafts] = useDrafts({ supabase, refetch, page });

  const loadDraft = async (id: number) => {
    if (!drafts) {
      toast.error("Failed to load drafts");
      return;
    }
    const draft = drafts.find((d) => d.id === id);
    if (!draft) {
      toast.error("Failed to load draft");
      return;
    }
    const { data, error } = await supabase.storage
      .from("news_drafts")
      .download(`${draft.id}.json`);
    if (!data || error) {
      toast.error("Failed to load draft");
      return;
    }
    const json = JSON.parse(await data.text());

    if (json.messages) {
      console.log(json.interactions);
      const embeds: EmbedData[] = json.messages[0].embeds.map((embed: any) => {
        const interactions = json.interactions.filter(
          (interaction: any) => interaction.embedId === embed.id
        );
        console.log(interactions);
        const reactions = json.reactions.filter(
          (reaction: any) => reaction.embedId === embed.id
        );

        return {
          ...embed,
          author: embed.author
            ? {
                name: embed.author,
                url: embed.authorUrl,
                icon_url: embed.authorIcon,
              }
            : undefined,
          color: hsvToHex(
            embed.color.hue,
            embed.color.saturation,
            embed.color.value
          ),
          footer: embed.footer
            ? {
                text: embed.footer,
                icon_url: embed.footerIcon,
              }
            : undefined,
          image: embed.gallery[0]
            ? {
                url: embed.gallery[0],
              }
            : undefined,
          thumbnail: embed.thumbnail
            ? {
                url: embed.thumbnail,
              }
            : undefined,
          expanded: false,
          interactions: interactions,
          reactions: reactions,
        };
      });
      console.log(embeds);
      setEmbeds(embeds);
      return;
    }

    setEmbeds(json.embeds);
  };

  const saveDraft = async () => {
    if (!draftTitle) return;
    const { data, error: error1 } = await supabase
      .from("news_drafts")
      .insert({ title: draftTitle })
      .select("*")
      .single();
    if (error1) {
      toast.error(`Error saving draft doc: ${error1.message}`);
      return;
    }
    if (!data) return;
    const { error: error2 } = await supabase.storage.from("news_drafts").upload(
      `${data.id}.json`,
      JSON.stringify({
        embeds,
      })
    );
    if (error2) {
      toast.error(`Error saving draft file: ${error2.message}`);
      return;
    }
    toast.success("Draft saved");
  };

  return (
    <div className="flex flex-row space-x-3 w-full justify-end items-end">
      <Dialog>
        <DialogTrigger className="w-[130px] px-[10px] py-1 text-white bg-secondary-bg rounded-sm border-2 border-white border-opacity-25 hover:bg-opacity-25 hover:bg-secondary-bg hover:border-opacity-50 transition-colors duration-200 ease-in-out">
          Load Draft
        </DialogTrigger>
        <DialogContent className="bg-primary-bg w-full">
          <DialogHeader>
            <DialogTitle>Drafts</DialogTitle>
            <DialogDescription className="flex flex-col">
              {drafts.map((draft, index) => (
                <div className="flex flex-col w-full" key={index}>
                  {index !== 0 && (
                    <div className="w-full h-[1px] bg-white opacity-10" />
                  )}
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex flex-row space-x-1">
                      <span>{(page - 1) * 32 + (index + 1)}.</span>
                      <span>{draft.title}</span>
                    </div>
                    <div className="flex flex-row space-x-1">
                      <button onClick={() => loadDraft(draft.id)}>Load</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-row space-x-1 items-center ml-auto">
                <span>Page:</span>
                <span>{page}</span>
                {page !== 1 && (
                  <SecondaryButton
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  >
                    Prev
                  </SecondaryButton>
                )}
                <SecondaryButton
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Next
                </SecondaryButton>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Input
        label="Draft Name"
        className="w-full"
        onChange={(e) => setDraftTitle(e.target.value)}
        value={draftTitle}
        required={true}
      />
      <SecondaryButton onClick={() => saveDraft()} className="w-[130px]">
        Save Draft
      </SecondaryButton>
    </div>
  );
}

function hsvToHex(h: number, s: number, v: number) {
  return "#" + convert.hsv.hex([h, s * 100, v * 100]);
}
