import {
  saveDirect,
  saveEmbeds,
  saveInput,
  saveLink,
  saveNews,
  savePoll,
  saveProfile,
  savePromo,
  saveQuiz,
  saveTags,
  saveVanityTags,
  saveWallet,
} from "@/lib/actions/saveEmbed";
import {
  scheduledAtAtom,
  selectedTagsAtom,
  selectedVanityTagsAtom,
} from "@/lib/atoms";
import { EmbedData } from "@/lib/data/EmbedData";
import { StaffRole, useStaffUser } from "@/lib/hooks/useUser";
import { Database } from "@/lib/supabase/types";
import {
  checkInput,
  checkLink,
  checkPoll,
  checkPromo,
  checkQuiz,
} from "@/lib/utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "../Input";
import { PrimaryButton } from "../PrimaryButton";
import { useScheduledNews } from "@/lib/hooks/useScheduledNews";
import { IoIosClose } from "react-icons/io";

type ScheduleManager = {
  embeds: EmbedData[];
  staffRole: StaffRole;
  supabase: SupabaseClient<Database>;
};

export default function ScheduleManager({
  embeds,
  supabase,
  staffRole,
}: ScheduleManager) {
  const [refetch, setRefetch] = useState(false);
  const [previewLink, setPreviewLink] = useState<string | null>(null);
  const [hasMention, setHasMention] = useState<boolean>(false);
  const [hasThread, setHasThread] = useState<boolean>(false);
  const [scheduledAt, setScheduledAt] = useState<Date | undefined>();

  const [scheduledNews] = useScheduledNews({ supabase, refetch });

  const [title, setTitle] = useState("");
  const [selectedTags] = useAtom(selectedTagsAtom);
  const [selectedVanityTags] = useAtom(selectedVanityTagsAtom);

  const schedule = async () => {
    try {
      if (!staffRole) {
        toast.error("You must be logged in to schedule news");
        return;
      }

      if (staffRole.staff_role !== "ADMIN") {
        toast.error("You must be admin to schedule news");
        return;
      }

      if (!title) {
        toast.error("Title is required");
        return;
      }

      if (!scheduledAt) {
        toast.error("Scheduled time is required");
        return;
      }

      const now = new Date();
      if (scheduledAt < now) {
        toast.error("Scheduled time must be in the future");
        return;
      }

      // check if time now is at least 30 seconds before scheduled time
      const diff = scheduledAt.getTime() - now.getTime();
      const diffSeconds = diff / 1000;
      if (diffSeconds < 30) {
        toast.error("Scheduled time must be at least 30 seconds in the future");
        return;
      }

      const scheduledAtMs = scheduledAt.getTime();

      const rebootHours = [1, 7, 13, 19];

      const rebootDates = rebootHours.map((hour) => {
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
      });
      const rebootTimesMs = rebootDates.map((time) => time.getTime());

      const isBeforeReboot = rebootTimesMs.some((time) => {
        const thirtyMinutesBefore = time - 30 * 60 * 1000;
        return scheduledAtMs >= thirtyMinutesBefore && scheduledAtMs < time;
      });

      const isAfterReboot = rebootTimesMs.some((time) => {
        const tenMinutesAfter = time + 10 * 60 * 1000;
        return scheduledAtMs > time && scheduledAtMs <= tenMinutesAfter;
      });

      if (isBeforeReboot) {
        toast.error(
          "Scheduled time can't be 30 minutes before reboot at 1 AM/PM and 7 AM/PM"
        );
        return;
      }

      if (isAfterReboot) {
        toast.error(
          "Scheduled time can't be 10 minutes after reboot at 1 AM/PM and 7 AM/PM"
        );
        return;
      }

      const embedImages = embeds.filter((embed) => embed.image);
      if (embedImages.length === 0) {
        toast.error("At least 1 embed image is required");
        return;
      }

      if (selectedTags.length === 0) {
        toast.error("At least 1 tag is required");
        return;
      }

      const options = {
        supabase,
        staffRole,
        title,
        scheduledAt,
        hasMention,
        hasThread,
      };

      const interactionData = embeds.map((embed) => embed.interactions).flat();
      const reactionData = embeds.map((embed) => embed.reactions).flat();

      for (const interaction of interactionData) {
        if (interaction.type === "POLL") checkPoll(interaction);
        if (interaction.type === "QUIZ") checkQuiz(interaction);
        if (interaction.type === "INPUT") checkInput(interaction);
        if (interaction.type === "LINK") checkLink(interaction);
        if (interaction.type === "PROMO") checkPromo(interaction);
      }

      const news = await saveNews(options);
      await saveEmbeds({
        newsId: news.id,
        content: embeds,
        supabase,
      });
      if (staffRole.staff_role === "ADMIN")
        await saveTags({ newsId: news.id, tags: selectedTags, supabase });
      if (staffRole.staff_role === "ADMIN")
        await saveVanityTags({
          newsId: news.id,
          tags: selectedVanityTags,
          supabase,
        });

      toast.success(
        `News scheduled with ${embeds.length} embeds and ${interactionData.length} interactions`
      );
      setPreviewLink(
        `https://admin-site-rouge.vercel.app/dashboard/preview/${news.id}`
      );
    } catch (error: any) {
      toast.error(error.message);
    }
    setRefetch((prev) => !prev);
  };

  const unscheduleNews = async (newsId: number): Promise<void> => {
    try {
      await supabase.from("discord_news").delete().eq("id", newsId);
      toast.success("News unscheduled");
    } catch (error: any) {
      toast.error(error.message);
    }
    setRefetch((prev) => !prev);
  };

  return (
    <div className="flex flex-col space-y-2">
      <span className="font-semibold">Schedule</span>
      <div className="flex flex-row space-x-5 items-end justify-start">
        <Input
          label="Title"
          className="w-full"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          required={true}
        />
        <Input
          label="Scheduled At"
          type="datetime-local"
          onChange={(event) => setScheduledAt(new Date(event.target.value))}
          required={true}
        />
        <PrimaryButton onClick={schedule}>Schedule</PrimaryButton>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        {scheduledNews.map((news, index) => (
          <div key={news.id} className="flex flex-col w-full">
            {index !== 0 && (
              <div className="w-full h-[1px] bg-white opacity-10" />
            )}
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row space-x-2">
                <span>
                  {index + 1}.{news.title}
                </span>
                <span>{new Date(news.schedule).toLocaleString()}</span>
              </div>
              <button onClick={() => unscheduleNews(news.id)}>
                <IoIosClose size={30} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
