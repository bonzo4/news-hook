/* eslint-disable no-await-in-loop */
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { EmbedData } from "../data/EmbedData";
import { Interaction } from "../data/interactions.ts";
import { WalletInteraction } from "../data/interactions.ts/wallet";
import { Poll } from "../data/interactions.ts/poll";
import { Quiz } from "../data/interactions.ts/quiz";
import { InputInteraction } from "../data/interactions.ts/input";
import { LinkInteraction } from "../data/interactions.ts/link";
import { Promo } from "../data/interactions.ts/promo";

type StaffRole = Database["public"]["Tables"]["staff_users"]["Row"];

type SaveOptions = {
  supabase: SupabaseClient<Database>;
};

type SaveTagsOptions = {
  tags: string[];
  newsId: number;
  schedule: string;
} & SaveOptions;

export async function saveTags(options: SaveTagsOptions): Promise<void> {
  const { tags, supabase, newsId, schedule } = options;
  const tagDocs = tags.map(async (tag) => {
    const { error } = await supabase.from("_news_tags").insert({
      news_id: newsId,
      tag: tag,
      schedule,
    });
    if (error) {
      throw error.message;
    }
  });
  await Promise.all(tagDocs);
}

type SaveVanityTagsOptions = {
  tags: string[];
  newsId: number;
} & SaveOptions;

export async function saveVanityTags(
  options: SaveVanityTagsOptions
): Promise<void> {
  const { tags, supabase, newsId } = options;
  const tagDocs = tags.map(async (tag) => {
    const { error } = await supabase.from("_news_vanity_tags").insert({
      news_id: newsId,
      tag: tag,
    });
    if (error) {
      throw error.message;
    }
  });
  await Promise.all(tagDocs);
}

type SaveEmbedOptions = {
  content: EmbedData[];
  newsId: number;
} & SaveOptions;

type Embed = {
  localId: number;
} & Database["public"]["Tables"]["news_embeds"]["Row"];

export async function saveEmbeds(options: SaveEmbedOptions): Promise<Embed[]> {
  const { content, supabase, newsId } = options;
  let imageSet = false;
  const embeds = content.map(async (embed, index) => {
    const embedEdited = {
      ...embed,
      color: embed.color ? Number(embed.color.replace("#", "0x")) : undefined,
    };
    let newsImage = false;
    if (embed.image && !imageSet) {
      newsImage = true;
      imageSet = true;
    }
    const { data: embedDoc, error } = await supabase
      .from("news_embeds")
      .insert({
        news_id: newsId,
        content: JSON.stringify(embedEdited),
        interaction_types: embed.interactions.map(
          (interaction) => interaction.type
        ),
        order: index,
        news_image: newsImage,
        tag: embed.tag ?? null,
        reactions: embed.reactions.length > 0 ? embed.reactions : null,
      })
      .select()
      .single();
    if (error) {
      throw error.message;
    }
    if (!embedDoc) {
      throw new Error("Embed not found");
    }
    for (const interaction of embed.interactions) {
      switch (interaction.type) {
        case "POLL":
          await savePoll({
            poll: interaction,
            embedId: embedDoc.id,
            supabase,
            order: index,
          });
          break;
        case "QUIZ":
          await saveQuiz({
            quiz: interaction,
            embedId: embedDoc.id,
            supabase,
            order: index,
          });
          break;
        case "INPUT":
          await saveInput({
            input: interaction,
            embedId: embedDoc.id,
            supabase,
            order: index,
          });
          break;
        case "LINK":
          await saveLink({
            link: interaction,
            embedId: embedDoc.id,
            supabase,
            order: index,
          });
          break;
        case "DIRECT":
          await saveDirect({ embedId: embedDoc.id, supabase, order: index });
          break;
        case "PROFILE":
          await saveProfile({ embedId: embedDoc.id, supabase, order: index });
          break;
        case "WALLET":
          await saveWallet({
            wallet: interaction,
            embedId: embedDoc.id,
            supabase,
            order: index,
          });
          break;
        case "PROMO":
          await savePromo({
            promo: interaction,
            embedId: embedDoc.id,
            supabase,
            order: index,
          });
          break;
      }
    }
    return {
      ...embedDoc,
      localId: embed.id,
    };
  });

  return Promise.all(embeds);
}

type SaveNewsOptions = {
  staffRole: StaffRole;
  title: string;
  scheduledAt: Date;
  hasMention: boolean;
  hasThread: boolean;
} & SaveOptions;

type DiscordNews = Database["public"]["Tables"]["discord_news"]["Row"];

export async function saveNews(options: SaveNewsOptions): Promise<DiscordNews> {
  const { supabase, staffRole, title, scheduledAt, hasThread, hasMention } =
    options;

  const { data: news, error } = await supabase
    .from("discord_news")
    .insert({
      title,
      created_by: staffRole.user_id,
      schedule: scheduledAt.toISOString(),
      approved: staffRole.staff_role === "ADMIN",
      approved_at:
        staffRole.staff_role === "ADMIN" ? new Date().toISOString() : null,
      has_thread: hasThread,
      has_mention: hasMention,
    })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (!news) {
    throw new Error("News not found");
  }
  return news;
}

type SaveInteractionOptions = {
  embedId: number;
  order: number;
} & SaveOptions;

export async function saveDirect(options: SaveInteractionOptions) {
  const { embedId, supabase, order } = options;
  const { error } = await supabase.from("directs").insert({
    embed_id: embedId,
    order,
  });
  if (error) {
    throw new Error(error.message);
  }
}

export async function saveProfile(options: SaveInteractionOptions) {
  const { embedId, supabase, order } = options;
  const { error } = await supabase.from("profile_buttons").insert({
    embed_id: embedId,
    order,
  });
  if (error) {
    throw new Error(error.message);
  }
}

type SaveWalletOptions = {
  wallet: WalletInteraction;
} & SaveInteractionOptions;

export async function saveWallet(options: SaveWalletOptions) {
  const { wallet, embedId, supabase, order } = options;
  const { error } = await supabase.from("wallet_buttons").insert({
    embed_id: embedId,
    sol: wallet.sol,
    eth: wallet.eth,
    order,
  });

  if (error) {
    throw new Error(error.message);
  }
}

type SavePollOptions = {
  poll: Poll;
} & SaveInteractionOptions;

export async function savePoll(options: SavePollOptions) {
  const { poll, embedId, supabase, order } = options;
  const { data: pollDoc, error } = await supabase
    .from("polls")
    .insert({
      embed_id: embedId,
      question: poll.question,
      order,
      randomized: poll.randomized ?? true,
    })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }

  if (!pollDoc) {
    throw new Error("Poll not found");
  }

  poll.choices.map(async (choice) => {
    const { error } = await supabase.from("poll_choices").insert({
      poll_id: pollDoc.id,
      text: choice.text,
      emoji: choice.emoji,
    });
    if (error) {
      throw new Error(error.message);
    }
  });
}

type SaveQuizOptions = {
  quiz: Quiz;
} & SaveInteractionOptions;

export async function saveQuiz(options: SaveQuizOptions) {
  const { quiz, embedId, supabase, order } = options;
  const { data: quizDoc, error } = await supabase
    .from("quizzes")
    .insert({
      embed_id: embedId,
      question: quiz.question,
      answer: quiz.answer,
      order,
      randomized: quiz.randomized ?? true,
    })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (!quizDoc) {
    throw new Error("Quiz not found");
  }
  quiz.choices.map(async (choice) => {
    const { error } = await supabase.from("quiz_choices").insert({
      quiz_id: quizDoc.id,
      text: choice.text,
      emoji: choice.emoji,
    });
    if (error) {
      throw new Error(error.message);
    }
  });
}

type SaveInputOptions = {
  input: InputInteraction;
} & SaveInteractionOptions;

export async function saveInput(options: SaveInputOptions) {
  const { input, embedId, supabase, order } = options;
  const { error } = await supabase.from("inputs").insert({
    embed_id: embedId,
    question: input.question,
    order,
  });
  if (error) {
    throw new Error(error.message);
  }
}

type SaveLinkOptions = {
  link: LinkInteraction;
} & SaveInteractionOptions;

export async function saveLink(options: SaveLinkOptions) {
  const { link, embedId, supabase, order } = options;
  const { error } = await supabase.from("links").insert({
    embed_id: embedId,
    url: link.url,
    text: link.text,
    emoji: link.emoji,
    order,
  });
  if (error) {
    throw new Error(error.message);
  }
}

type SavePromoOptions = {
  promo: Promo;
} & SaveInteractionOptions;

export async function savePromo(options: SavePromoOptions) {
  const { promo, embedId, supabase, order } = options;
  const { error } = await supabase.from("promo_buttons").insert({
    embed_id: embedId,
    tweet_url: promo.tweetUrl,
    twitter_url: promo.twitterUrl,
    order,
  });
  if (error) {
    throw new Error(error.message);
  }
}
