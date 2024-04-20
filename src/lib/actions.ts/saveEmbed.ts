/* eslint-disable no-await-in-loop */
import type { SupabaseClient, User } from "@supabase/supabase-js";
import type {
  Input,
  InteractionType,
  Link,
  Poll,
  Promo,
  Quiz,
  Wallet,
} from "../atoms";
import { Database } from "../supabase/types";
import { EmbedData } from "../data/EmbedData";

type StaffRole = Database["public"]["Tables"]["staff_users"]["Row"];

type SaveOptions = {
  supabase: SupabaseClient<Database>;
};

type SaveTagsOptions = {
  tags: Database["public"]["Tables"]["tags"]["Row"][];
  newsId: number;
} & SaveOptions;

export async function saveTags(options: SaveTagsOptions): Promise<void> {
  const { tags, supabase, newsId } = options;
  const tagDocs = tags.map(async (tag) => {
    const { error } = await supabase.from("_news_tags").insert({
      news_id: newsId,
      tag: tag.name,
    });
    if (error) {
      throw error.message;
    }
  });
  await Promise.all(tagDocs);
}

type SaveVanityTagsOptions = {
  tags: Database["public"]["Tables"]["vanity_tags"]["Row"][];
  newsId: number;
} & SaveOptions;

export async function saveVanityTags(
  options: SaveVanityTagsOptions
): Promise<void> {
  const { tags, supabase, newsId } = options;
  const tagDocs = tags.map(async (tag) => {
    const { error } = await supabase.from("_news_vanity_tags").insert({
      news_id: newsId,
      tag: tag.name,
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
  interactions: InteractionType[];
  embedTags: { embedId: number; tag: string }[];
  reactions: { emoji: string; embedId: number }[];
} & SaveOptions;

type Embed = {
  localId: number;
} & Database["public"]["Tables"]["news_embeds"]["Row"];

export async function saveEmbeds(options: SaveEmbedOptions): Promise<Embed[]> {
  const { content, supabase, newsId, interactions, reactions, embedTags } =
    options;
  let imageSet = false;
  const embeds = content.map(async (embed, index) => {
    let newsImage = false;
    if (embed.image && !imageSet) {
      newsImage = true;
      imageSet = true;
    }
    const tag = embedTags.find((i) => i.embedId === embed.id) ?? null;
    const { data: embedDoc, error } = await supabase
      .from("news_embeds")
      .insert({
        news_id: newsId,
        content: JSON.stringify(embed),
        interaction_types: interactions
          .filter((i) => i.embedId === embed.id)
          .map((interaction) => interaction.type),
        order: index,
        news_image: newsImage,
        tag: tag?.tag ?? null,
        reactions:
          reactions.length > 0
            ? reactions
                .filter((i) => i.embedId === embed.id)
                .map((reaction) => reaction.emoji)
            : null,
      })
      .select()
      .single();
    if (error) {
      throw error.message;
    }
    if (!embedDoc) {
      throw new Error("Embed not found");
    }
    return {
      ...embedDoc,
      localId: embed.id,
    };
  });

  return Promise.all(embeds);
}

type SaveNewsOptions = {
  user: User;
  staffRole: StaffRole;
  title: string;
  scheduledAt: Date;
  hasMention: boolean;
  hasThread: boolean;
} & SaveOptions;

type DiscordNews = Database["public"]["Tables"]["discord_news"]["Row"];

export async function saveNews(options: SaveNewsOptions): Promise<DiscordNews> {
  const {
    supabase,
    user,
    staffRole,
    title,
    scheduledAt,
    hasThread,
    hasMention,
  } = options;

  const { data: news, error } = await supabase
    .from("discord_news")
    .insert({
      title,
      created_by: user.id,
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
  wallet: Wallet;
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
  input: Input;
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
  link: Link;
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
  const { error } = await supabase.from("promos").insert({
    embed_id: embedId,
    tweet_id: promo.tweetId,
    tweet_url: promo.tweetUrl,
    twitter_id: promo.twitterId,
    twitter_url: promo.twitterUrl,
    order,
  });
  if (error) {
    throw new Error(error.message);
  }
}
