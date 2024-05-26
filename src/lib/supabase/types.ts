export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _guild_tags: {
        Row: {
          guild_id: string;
          tag: string;
        };
        Insert: {
          guild_id: string;
          tag: string;
        };
        Update: {
          guild_id?: string;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_guild_tags_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_guild_tags_tag_fkey";
            columns: ["tag"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["name"];
          }
        ];
      };
      _guild_users: {
        Row: {
          guild_id: string;
          user_id: string;
        };
        Insert: {
          guild_id: string;
          user_id: string;
        };
        Update: {
          guild_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_guild_users_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          }
        ];
      };
      _news_tags: {
        Row: {
          created_at: string;
          news_id: number;
          tag: string;
        };
        Insert: {
          created_at?: string;
          news_id?: number;
          tag: string;
        };
        Update: {
          created_at?: string;
          news_id?: number;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_news_tags_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_news_tags_tag_fkey";
            columns: ["tag"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["name"];
          }
        ];
      };
      _news_users: {
        Row: {
          created_at: string;
          news_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          news_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          news_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_news_users_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_news_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      _news_vanity_tags: {
        Row: {
          news_id: number;
          tag: string;
        };
        Insert: {
          news_id?: number;
          tag: string;
        };
        Update: {
          news_id?: number;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_news_vanity_tags_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_news_vanity_tags_tag_fkey";
            columns: ["tag"];
            isOneToOne: false;
            referencedRelation: "vanity_tags";
            referencedColumns: ["name"];
          }
        ];
      };
      _user_tags: {
        Row: {
          tag: string;
          user_id: string;
        };
        Insert: {
          tag: string;
          user_id: string;
        };
        Update: {
          tag?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_user_tags_tag_fkey";
            columns: ["tag"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "_user_tags_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      ambassador_codes: {
        Row: {
          code: string;
          created_at: string;
          discord_id: string | null;
          id: number;
          last_accessed: string | null;
        };
        Insert: {
          code: string;
          created_at?: string;
          discord_id?: string | null;
          id?: number;
          last_accessed?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string;
          discord_id?: string | null;
          id?: number;
          last_accessed?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ambassador_codes_discord_id_fkey";
            columns: ["discord_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      bot_errors: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: number;
          message: string;
          news_id: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: number;
          message: string;
          news_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: number;
          message?: string;
          news_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bot_errors_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bot_errors_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bot_errors_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      bot_metrics: {
        Row: {
          created_at: string;
          guilds_joined: number;
          id: string;
          members_added: number;
        };
        Insert: {
          created_at?: string;
          guilds_joined: number;
          id: string;
          members_added: number;
        };
        Update: {
          created_at?: string;
          guilds_joined?: number;
          id?: string;
          members_added?: number;
        };
        Relationships: [];
      };
      direct_channels: {
        Row: {
          created_at: string;
          enabled: boolean;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_direct_channels_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      direct_interactions: {
        Row: {
          created_at: string;
          direct_channel_id: string | null;
          direct_id: number;
          guild_id: string | null;
          id: string;
          news_id: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          direct_channel_id?: string | null;
          direct_id: number;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          direct_channel_id?: string | null;
          direct_id?: number;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "direct_interactions_direct_channel_id_fkey";
            columns: ["direct_channel_id"];
            isOneToOne: false;
            referencedRelation: "direct_channels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "direct_interactions_direct_id_fkey";
            columns: ["direct_id"];
            isOneToOne: false;
            referencedRelation: "directs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "direct_interactions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "direct_interactions_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "direct_interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      directs: {
        Row: {
          created_at: string;
          embed_id: number;
          id: number;
          order: number;
        };
        Insert: {
          created_at?: string;
          embed_id: number;
          id?: number;
          order?: number;
        };
        Update: {
          created_at?: string;
          embed_id?: number;
          id?: number;
          order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "directs_embed_id_fkey";
            columns: ["embed_id"];
            isOneToOne: false;
            referencedRelation: "news_embeds";
            referencedColumns: ["id"];
          }
        ];
      };
      discord_actions: {
        Row: {
          action: string;
          created_at: string;
          guild_id: string | null;
          id: number;
          points: number;
          user_id: string;
        };
        Insert: {
          action: string;
          created_at?: string;
          guild_id?: string | null;
          id?: number;
          points: number;
          user_id: string;
        };
        Update: {
          action?: string;
          created_at?: string;
          guild_id?: string | null;
          id?: number;
          points?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "discord_actions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "discord_actions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      discord_news: {
        Row: {
          approved: boolean;
          approved_at: string | null;
          created_at: string;
          created_by: string;
          has_mention: boolean;
          has_thread: boolean;
          id: number;
          schedule: string;
          title: string;
        };
        Insert: {
          approved?: boolean;
          approved_at?: string | null;
          created_at?: string;
          created_by: string;
          has_mention?: boolean;
          has_thread?: boolean;
          id?: number;
          schedule: string;
          title: string;
        };
        Update: {
          approved?: boolean;
          approved_at?: string | null;
          created_at?: string;
          created_by?: string;
          has_mention?: boolean;
          has_thread?: boolean;
          id?: number;
          schedule?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "discord_news_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      discord_users: {
        Row: {
          created_at: string;
          icon: string | null;
          id: string;
          name: string;
          nft_claimed: boolean;
          referral_code: string | null;
          staff_role: Database["public"]["Enums"]["staff_role_type"] | null;
          updated_at: string;
          user_id: string | null;
          user_role: Database["public"]["Enums"]["user_role_type"];
        };
        Insert: {
          created_at?: string;
          icon?: string | null;
          id: string;
          name: string;
          nft_claimed?: boolean;
          referral_code?: string | null;
          staff_role?: Database["public"]["Enums"]["staff_role_type"] | null;
          updated_at?: string;
          user_id?: string | null;
          user_role?: Database["public"]["Enums"]["user_role_type"];
        };
        Update: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          name?: string;
          nft_claimed?: boolean;
          referral_code?: string | null;
          staff_role?: Database["public"]["Enums"]["staff_role_type"] | null;
          updated_at?: string;
          user_id?: string | null;
          user_role?: Database["public"]["Enums"]["user_role_type"];
        };
        Relationships: [
          {
            foreignKeyName: "discord_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      embed_presets: {
        Row: {
          created_at: string;
          embed_json: Json;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          embed_json: Json;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          embed_json?: Json;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      guild_referral_rewards: {
        Row: {
          created_at: string;
          guild_requirement: number;
          id: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          guild_requirement: number;
          id?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          guild_requirement?: number;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      guild_referrals: {
        Row: {
          checked: boolean;
          created_at: string;
          discord_user_id: string | null;
          guild_id: string;
          type: Database["public"]["Enums"]["referral_type"];
          updated_at: string | null;
        };
        Insert: {
          checked?: boolean;
          created_at?: string;
          discord_user_id?: string | null;
          guild_id: string;
          type?: Database["public"]["Enums"]["referral_type"];
          updated_at?: string | null;
        };
        Update: {
          checked?: boolean;
          created_at?: string;
          discord_user_id?: string | null;
          guild_id?: string;
          type?: Database["public"]["Enums"]["referral_type"];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "guild_referrals_discord_user_id_fkey";
            columns: ["discord_user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "guild_referrals_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: true;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          }
        ];
      };
      guild_settings: {
        Row: {
          category_id: string | null;
          created_at: string;
          guild_id: string;
          system_id: string | null;
          updated_at: string;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string;
          guild_id: string;
          system_id?: string | null;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          created_at?: string;
          guild_id?: string;
          system_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "guild_settings_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: true;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          }
        ];
      };
      guilds: {
        Row: {
          banner: string | null;
          created_at: string;
          icon: string | null;
          id: string;
          invite: string | null;
          joined_at: string;
          left_at: string | null;
          member_count: number;
          name: string;
          updated_at: string;
        };
        Insert: {
          banner?: string | null;
          created_at?: string;
          icon?: string | null;
          id: string;
          invite?: string | null;
          joined_at: string;
          left_at?: string | null;
          member_count: number;
          name: string;
          updated_at?: string;
        };
        Update: {
          banner?: string | null;
          created_at?: string;
          icon?: string | null;
          id?: string;
          invite?: string | null;
          joined_at?: string;
          left_at?: string | null;
          member_count?: number;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      input_interactions: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: string;
          input: string | null;
          input_id: number;
          news_id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          input?: string | null;
          input_id: number;
          news_id: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          input?: string | null;
          input_id?: number;
          news_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "input_interactions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "input_interactions_input_id_fkey";
            columns: ["input_id"];
            isOneToOne: false;
            referencedRelation: "inputs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "input_interactions_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "input_interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      inputs: {
        Row: {
          created_at: string;
          embed_id: number;
          id: number;
          order: number;
          question: string;
        };
        Insert: {
          created_at?: string;
          embed_id: number;
          id?: number;
          order?: number;
          question: string;
        };
        Update: {
          created_at?: string;
          embed_id?: number;
          id?: number;
          order?: number;
          question?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inputs_embed_id_fkey";
            columns: ["embed_id"];
            isOneToOne: false;
            referencedRelation: "news_embeds";
            referencedColumns: ["id"];
          }
        ];
      };
      interactions: {
        Row: {
          created_at: string;
          direct_id: number | null;
          guild_id: string | null;
          id: string;
          input: string | null;
          input_id: number | null;
          news_id: number;
          poll_choice_id: number | null;
          poll_id: number | null;
          profile_button_id: number | null;
          promo_action: Database["public"]["Enums"]["promo_action_type"] | null;
          promo_id: number | null;
          quiz_choice_id: number | null;
          quiz_id: number | null;
          redirect_id: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          direct_id?: number | null;
          guild_id?: string | null;
          id?: string;
          input?: string | null;
          input_id?: number | null;
          news_id: number;
          poll_choice_id?: number | null;
          poll_id?: number | null;
          profile_button_id?: number | null;
          promo_action?:
            | Database["public"]["Enums"]["promo_action_type"]
            | null;
          promo_id?: number | null;
          quiz_choice_id?: number | null;
          quiz_id?: number | null;
          redirect_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          direct_id?: number | null;
          guild_id?: string | null;
          id?: string;
          input?: string | null;
          input_id?: number | null;
          news_id?: number;
          poll_choice_id?: number | null;
          poll_id?: number | null;
          profile_button_id?: number | null;
          promo_action?:
            | Database["public"]["Enums"]["promo_action_type"]
            | null;
          promo_id?: number | null;
          quiz_choice_id?: number | null;
          quiz_id?: number | null;
          redirect_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "interactions_direct_id_fkey";
            columns: ["direct_id"];
            isOneToOne: false;
            referencedRelation: "directs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_input_id_fkey";
            columns: ["input_id"];
            isOneToOne: false;
            referencedRelation: "inputs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_poll_choice_id_fkey";
            columns: ["poll_choice_id"];
            isOneToOne: false;
            referencedRelation: "poll_choices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_profile_button_id_fkey";
            columns: ["profile_button_id"];
            isOneToOne: false;
            referencedRelation: "profile_buttons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_promo_id_fkey";
            columns: ["promo_id"];
            isOneToOne: false;
            referencedRelation: "promo_buttons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_quiz_choice_id_fkey";
            columns: ["quiz_choice_id"];
            isOneToOne: false;
            referencedRelation: "quiz_choices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quizzes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_redirect_id_fkey";
            columns: ["redirect_id"];
            isOneToOne: false;
            referencedRelation: "redirects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      links: {
        Row: {
          created_at: string | null;
          embed_id: number;
          emoji: string | null;
          id: number;
          order: number;
          text: string;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          embed_id: number;
          emoji?: string | null;
          id?: number;
          order?: number;
          text: string;
          url: string;
        };
        Update: {
          created_at?: string | null;
          embed_id?: number;
          emoji?: string | null;
          id?: number;
          order?: number;
          text?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "links_embed_id_fkey";
            columns: ["embed_id"];
            isOneToOne: false;
            referencedRelation: "news_embeds";
            referencedColumns: ["id"];
          }
        ];
      };
      mention_roles: {
        Row: {
          created_at: string;
          guild_id: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          guild_id: string;
          id: string;
        };
        Update: {
          created_at?: string;
          guild_id?: string;
          id?: string;
        };
        Relationships: [];
      };
      news_channels: {
        Row: {
          created_at: string;
          guild_id: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          guild_id: string;
          id: string;
        };
        Update: {
          created_at?: string;
          guild_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "news_channels_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guild_settings";
            referencedColumns: ["guild_id"];
          }
        ];
      };
      news_drafts: {
        Row: {
          created_at: string;
          id: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      news_embeds: {
        Row: {
          content: Json;
          created_at: string;
          id: number;
          interaction_types:
            | Database["public"]["Enums"]["interaction_type"][]
            | null;
          news_id: number;
          news_image: boolean;
          order: number;
          reactions: string[] | null;
          tag: string | null;
        };
        Insert: {
          content: Json;
          created_at?: string;
          id?: number;
          interaction_types?:
            | Database["public"]["Enums"]["interaction_type"][]
            | null;
          news_id: number;
          news_image?: boolean;
          order: number;
          reactions?: string[] | null;
          tag?: string | null;
        };
        Update: {
          content?: Json;
          created_at?: string;
          id?: number;
          interaction_types?:
            | Database["public"]["Enums"]["interaction_type"][]
            | null;
          news_id?: number;
          news_image?: boolean;
          order?: number;
          reactions?: string[] | null;
          tag?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "news_embeds_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          }
        ];
      };
      news_metrics: {
        Row: {
          direct_clicks: number;
          inputs: number;
          interactions: number;
          link_clicks: number;
          new_users: number;
          news_id: number;
          poll_votes: number;
          prime_views: number;
          profile_clicks: number;
          quiz_votes: number;
          views: number;
          wallet_clicks: number;
        };
        Insert: {
          direct_clicks?: number;
          inputs?: number;
          interactions?: number;
          link_clicks?: number;
          new_users?: number;
          news_id?: number;
          poll_votes?: number;
          prime_views?: number;
          profile_clicks?: number;
          quiz_votes?: number;
          views?: number;
          wallet_clicks?: number;
        };
        Update: {
          direct_clicks?: number;
          inputs?: number;
          interactions?: number;
          link_clicks?: number;
          new_users?: number;
          news_id?: number;
          poll_votes?: number;
          prime_views?: number;
          profile_clicks?: number;
          quiz_votes?: number;
          views?: number;
          wallet_clicks?: number;
        };
        Relationships: [
          {
            foreignKeyName: "news_metrics_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: true;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          }
        ];
      };
      news_previews: {
        Row: {
          clicks: number;
          created_at: string;
          inputs: number;
          news_id: number;
          slug: string | null;
          tags: string[] | null;
          thumbnail: string | null;
          title: string | null;
          views: number;
        };
        Insert: {
          clicks?: number;
          created_at?: string;
          inputs?: number;
          news_id?: number;
          slug?: string | null;
          tags?: string[] | null;
          thumbnail?: string | null;
          title?: string | null;
          views?: number;
        };
        Update: {
          clicks?: number;
          created_at?: string;
          inputs?: number;
          news_id?: number;
          slug?: string | null;
          tags?: string[] | null;
          thumbnail?: string | null;
          title?: string | null;
          views?: number;
        };
        Relationships: [
          {
            foreignKeyName: "news_previews_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: true;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          }
        ];
      };
      news_trackers: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: number;
          image_url: string | null;
          news_id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: number;
          image_url?: string | null;
          news_id: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: number;
          image_url?: string | null;
          news_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "news_trackers_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "news_trackers_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "news_trackers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      nft_claims: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          wallet: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          wallet: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          wallet?: string;
        };
        Relationships: [];
      };
      nft_email_claims: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          nft_id: number;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          nft_id: number;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          nft_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "nft_email_claims_nft_id_fkey";
            columns: ["nft_id"];
            isOneToOne: false;
            referencedRelation: "nfts";
            referencedColumns: ["id"];
          }
        ];
      };
      nft_promo_codes: {
        Row: {
          claimed: boolean;
          code: string;
          created_at: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          claimed?: boolean;
          code: string;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          claimed?: boolean;
          code?: string;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "nft_promo_codes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      nfts: {
        Row: {
          attributes: Json;
          created_at: string;
          description: string;
          ends_at: string;
          id: number;
          image: string;
          name: string;
          opens_at: string;
        };
        Insert: {
          attributes: Json;
          created_at?: string;
          description: string;
          ends_at: string;
          id?: number;
          image: string;
          name: string;
          opens_at: string;
        };
        Update: {
          attributes?: Json;
          created_at?: string;
          description?: string;
          ends_at?: string;
          id?: number;
          image?: string;
          name?: string;
          opens_at?: string;
        };
        Relationships: [];
      };
      poll_choices: {
        Row: {
          created_at: string;
          emoji: string;
          id: number;
          poll_id: number;
          text: string;
          votes: number;
        };
        Insert: {
          created_at?: string;
          emoji: string;
          id?: number;
          poll_id: number;
          text: string;
          votes?: number;
        };
        Update: {
          created_at?: string;
          emoji?: string;
          id?: number;
          poll_id?: number;
          text?: string;
          votes?: number;
        };
        Relationships: [
          {
            foreignKeyName: "poll_choices_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "polls";
            referencedColumns: ["id"];
          }
        ];
      };
      poll_interactions: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: string;
          news_id: number;
          poll_choice_id: number | null;
          poll_id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id: number;
          poll_choice_id?: number | null;
          poll_id: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number;
          poll_choice_id?: number | null;
          poll_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "poll_interactions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "poll_interactions_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "poll_interactions_poll_choice_id_fkey";
            columns: ["poll_choice_id"];
            isOneToOne: false;
            referencedRelation: "poll_choices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "poll_interactions_poll_id_fkey";
            columns: ["poll_id"];
            isOneToOne: false;
            referencedRelation: "polls";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "poll_interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      polls: {
        Row: {
          created_at: string;
          embed_id: number;
          id: number;
          order: number;
          question: string;
          randomized: boolean;
        };
        Insert: {
          created_at?: string;
          embed_id: number;
          id?: number;
          order?: number;
          question: string;
          randomized?: boolean;
        };
        Update: {
          created_at?: string;
          embed_id?: number;
          id?: number;
          order?: number;
          question?: string;
          randomized?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "polls_embed_id_fkey";
            columns: ["embed_id"];
            isOneToOne: false;
            referencedRelation: "news_embeds";
            referencedColumns: ["id"];
          }
        ];
      };
      prime: {
        Row: {
          "?column?": boolean | null;
        };
        Insert: {
          "?column?"?: boolean | null;
        };
        Update: {
          "?column?"?: boolean | null;
        };
        Relationships: [];
      };
      profile_buttons: {
        Row: {
          created_at: string;
          embed_id: number;
          id: number;
          order: number;
        };
        Insert: {
          created_at?: string;
          embed_id: number;
          id?: number;
          order?: number;
        };
        Update: {
          created_at?: string;
          embed_id?: number;
          id?: number;
          order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "profile_buttons_embed_id_fkey";
            columns: ["embed_id"];
            isOneToOne: false;
            referencedRelation: "news_embeds";
            referencedColumns: ["id"];
          }
        ];
      };
      profile_interactions: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: string;
          news_id: number | null;
          profile_button_id: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          profile_button_id?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          profile_button_id?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_interactions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_interactions_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_interactions_profile_button_id_fkey";
            columns: ["profile_button_id"];
            isOneToOne: false;
            referencedRelation: "profile_buttons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          discord_id: string | null;
          eth_wallet: string | null;
          icon: string | null;
          id: string;
          name: string;
          points: number;
          sol_wallet: string | null;
          twitter_id: string | null;
          user_id: string | null;
          wallet_id: string | null;
        };
        Insert: {
          created_at?: string;
          discord_id?: string | null;
          eth_wallet?: string | null;
          icon?: string | null;
          id?: string;
          name: string;
          points?: number;
          sol_wallet?: string | null;
          twitter_id?: string | null;
          user_id?: string | null;
          wallet_id?: string | null;
        };
        Update: {
          created_at?: string;
          discord_id?: string | null;
          eth_wallet?: string | null;
          icon?: string | null;
          id?: string;
          name?: string;
          points?: number;
          sol_wallet?: string | null;
          twitter_id?: string | null;
          user_id?: string | null;
          wallet_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_discord_id_fkey";
            columns: ["discord_id"];
            isOneToOne: true;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_twitter_id_fkey";
            columns: ["twitter_id"];
            isOneToOne: true;
            referencedRelation: "twitter_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_wallet_id_fkey";
            columns: ["wallet_id"];
            isOneToOne: true;
            referencedRelation: "wallets";
            referencedColumns: ["id"];
          }
        ];
      };
      promo_buttons: {
        Row: {
          created_at: string;
          embed_id: number;
          id: number;
          order: number;
          tweet_url: string | null;
          twitter_url: string | null;
        };
        Insert: {
          created_at?: string;
          embed_id: number;
          id?: number;
          order?: number;
          tweet_url?: string | null;
          twitter_url?: string | null;
        };
        Update: {
          created_at?: string;
          embed_id?: number;
          id?: number;
          order?: number;
          tweet_url?: string | null;
          twitter_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "promos_embed_id_fkey";
            columns: ["embed_id"];
            isOneToOne: false;
            referencedRelation: "news_embeds";
            referencedColumns: ["id"];
          }
        ];
      };
      promo_interactions: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: string;
          news_id: number | null;
          promo_button_id: number;
          type: Database["public"]["Enums"]["promo_action_type"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          promo_button_id: number;
          type: Database["public"]["Enums"]["promo_action_type"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          promo_button_id?: number;
          type?: Database["public"]["Enums"]["promo_action_type"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "promo_interactions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promo_interactions_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promo_interactions_profile_button_id_fkey";
            columns: ["promo_button_id"];
            isOneToOne: false;
            referencedRelation: "profile_buttons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promo_interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      quiz_choices: {
        Row: {
          created_at: string;
          emoji: string;
          id: number;
          quiz_id: number;
          text: string;
          votes: number;
        };
        Insert: {
          created_at?: string;
          emoji: string;
          id?: number;
          quiz_id: number;
          text: string;
          votes?: number;
        };
        Update: {
          created_at?: string;
          emoji?: string;
          id?: number;
          quiz_id?: number;
          text?: string;
          votes?: number;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_choices_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quizzes";
            referencedColumns: ["id"];
          }
        ];
      };
      quiz_interactions: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: string;
          news_id: number;
          quiz_choice_id: number | null;
          quiz_id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id: number;
          quiz_choice_id?: number | null;
          quiz_id: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number;
          quiz_choice_id?: number | null;
          quiz_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_interactions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_interactions_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_interactions_quiz_choice_id_fkey";
            columns: ["quiz_choice_id"];
            isOneToOne: false;
            referencedRelation: "quiz_choices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_interactions_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quiz_choices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      quizzes: {
        Row: {
          answer: string;
          created_at: string;
          embed_id: number;
          id: number;
          order: number;
          question: string;
          randomized: boolean;
        };
        Insert: {
          answer: string;
          created_at?: string;
          embed_id: number;
          id?: number;
          order?: number;
          question: string;
          randomized?: boolean;
        };
        Update: {
          answer?: string;
          created_at?: string;
          embed_id?: number;
          id?: number;
          order?: number;
          question?: string;
          randomized?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "quizzes_embed_id_fkey";
            columns: ["embed_id"];
            isOneToOne: false;
            referencedRelation: "news_embeds";
            referencedColumns: ["id"];
          }
        ];
      };
      redirect_clicks: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: string;
          news_id: number;
          redirect_id: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id: number;
          redirect_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number;
          redirect_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "redirect_clicks_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "redirect_clicks_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "redirect_clicks_redirect_id_fkey";
            columns: ["redirect_id"];
            isOneToOne: false;
            referencedRelation: "redirects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "redirect_clicks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      redirects: {
        Row: {
          clicks: number;
          created_at: string | null;
          guild_id: string | null;
          id: number;
          link_id: number | null;
          news_id: number;
          url: string;
          user_id: string | null;
        };
        Insert: {
          clicks?: number;
          created_at?: string | null;
          guild_id?: string | null;
          id?: number;
          link_id?: number | null;
          news_id: number;
          url: string;
          user_id?: string | null;
        };
        Update: {
          clicks?: number;
          created_at?: string | null;
          guild_id?: string | null;
          id?: number;
          link_id?: number | null;
          news_id?: number;
          url?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "redirects_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "redirects_link_id_fkey";
            columns: ["link_id"];
            isOneToOne: false;
            referencedRelation: "links";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "redirects_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "redirects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      referral_codes: {
        Row: {
          code: string;
          created_at: string;
          discord_id: string | null;
          id: number;
          last_accessed: string | null;
        };
        Insert: {
          code?: string;
          created_at?: string;
          discord_id?: string | null;
          id?: number;
          last_accessed?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string;
          discord_id?: string | null;
          id?: number;
          last_accessed?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "referral_codes_discord_id_fkey";
            columns: ["discord_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      staff_users: {
        Row: {
          created_at: string;
          staff_role: Database["public"]["Enums"]["staff_role_type"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          staff_role: Database["public"]["Enums"]["staff_role_type"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          staff_role?: Database["public"]["Enums"]["staff_role_type"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "staff_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tags: {
        Row: {
          created_at: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          name?: string;
        };
        Relationships: [];
      };
      twitter_users: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          nft_claimed: boolean;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          name: string;
          nft_claimed?: boolean;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          nft_claimed?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "twitter_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_referrals: {
        Row: {
          created_at: string;
          referrer_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          referrer_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          referrer_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_referrals_referrer_id_fkey";
            columns: ["referrer_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_referrals_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      vanity_tags: {
        Row: {
          created_at: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          name?: string;
        };
        Relationships: [];
      };
      views: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: string;
          news_id: number | null;
          prime: boolean;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          prime?: boolean;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          prime?: boolean;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "views_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "views_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "views_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          }
        ];
      };
      views_count: {
        Row: {
          count: number | null;
        };
        Insert: {
          count?: number | null;
        };
        Update: {
          count?: number | null;
        };
        Relationships: [];
      };
      wallet_buttons: {
        Row: {
          created_at: string;
          embed_id: number;
          eth: boolean;
          id: number;
          order: number;
          sol: boolean;
        };
        Insert: {
          created_at?: string;
          embed_id: number;
          eth?: boolean;
          id?: number;
          order?: number;
          sol?: boolean;
        };
        Update: {
          created_at?: string;
          embed_id?: number;
          eth?: boolean;
          id?: number;
          order?: number;
          sol?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "wallet_buttons_embed_id_fkey";
            columns: ["embed_id"];
            isOneToOne: false;
            referencedRelation: "news_embeds";
            referencedColumns: ["id"];
          }
        ];
      };
      wallet_interactions: {
        Row: {
          created_at: string;
          guild_id: string | null;
          id: string;
          news_id: number | null;
          user_id: string;
          wallet_button_id: number | null;
        };
        Insert: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          user_id: string;
          wallet_button_id?: number | null;
        };
        Update: {
          created_at?: string;
          guild_id?: string | null;
          id?: string;
          news_id?: number | null;
          user_id?: string;
          wallet_button_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "wallet_interactions_guild_id_fkey";
            columns: ["guild_id"];
            isOneToOne: false;
            referencedRelation: "guilds";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wallet_interactions_news_id_fkey";
            columns: ["news_id"];
            isOneToOne: false;
            referencedRelation: "discord_news";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wallet_interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "discord_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wallet_interactions_wallet_button_id_fkey";
            columns: ["wallet_button_id"];
            isOneToOne: false;
            referencedRelation: "wallet_buttons";
            referencedColumns: ["id"];
          }
        ];
      };
      wallets: {
        Row: {
          address: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          address: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          address?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      website_redirects: {
        Row: {
          clicks: number;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          clicks?: number;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          clicks?: number;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_query: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      generate_promo_code: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      generate_random_code: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_clicks_by_url: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          clicks_count: number;
          url: string;
        }[];
      };
      get_discord_user_graph: {
        Args: {
          range_type: string;
          range: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_engagement_graph: {
        Args: {
          days: number;
        };
        Returns: {
          news_id: number;
          news_schedule: string;
          interaction_count: number;
        }[];
      };
      get_eth_profile_points: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      get_favorite_guild: {
        Args: {
          discord_user_id: string;
        };
        Returns: string;
      };
      get_guild_graph: {
        Args: {
          range_type: string;
          range: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_interaction_count_by_tag: {
        Args: {
          vanity_tag_name: string;
        };
        Returns: number;
      };
      get_interaction_graph: {
        Args: {
          range_type: string;
          range: number;
          end_date: string;
          news_doc_id?: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_interaction_intervals: {
        Args: {
          hours_range: number;
        };
        Returns: {
          hour_segment: string;
          document_count: number;
        }[];
      };
      get_link_click_day: {
        Args: Record<PropertyKey, never>;
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_link_click_hour: {
        Args: Record<PropertyKey, never>;
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_link_click_month: {
        Args: Record<PropertyKey, never>;
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_link_click_week: {
        Args: Record<PropertyKey, never>;
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_link_click_year: {
        Args: Record<PropertyKey, never>;
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_link_clicks: {
        Args: {
          news_doc_id: number;
        };
        Returns: number;
      };
      get_news_input_day: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_input_hour: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_input_week: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_inputs_per_guild: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          guild_id: string;
          guild_name: string;
          doc_count: number;
        }[];
      };
      get_news_interaction_intervals_by_tag: {
        Args: {
          vanity_tag_name: string;
          hours_range: number;
        };
        Returns: {
          hour_segment: string;
          document_count: number;
        }[];
      };
      get_news_interactions: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          guild_id: string;
          guild_name: string;
          interaction_count: number;
        }[];
      };
      get_news_interactions_intervals: {
        Args: {
          news_doc_id: number;
          hours_range: number;
        };
        Returns: {
          hour_segment: string;
          document_count: number;
        }[];
      };
      get_news_link_clicks_per_guild: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          guild_id: string;
          guild_name: string;
          doc_count: number;
        }[];
      };
      get_news_link_day: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_link_hour: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_link_week: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_poll_day: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_poll_hour: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_poll_week: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_polls_per_guild: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          guild_id: string;
          guild_name: string;
          doc_count: number;
        }[];
      };
      get_news_quiz_day: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_quiz_hour: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_quiz_per_guild: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          guild_id: string;
          guild_name: string;
          doc_count: number;
        }[];
      };
      get_news_quiz_week: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_views_day: {
        Args: {
          news_doc_id: number;
          primed: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_views_hour: {
        Args: {
          news_doc_id: number;
          primed: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_views_intervals: {
        Args: {
          news_doc_id: number;
          hours_range: number;
        };
        Returns: {
          hour_segment: string;
          document_count: number;
        }[];
      };
      get_news_views_per_guild: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          guild_id: string;
          guild_name: string;
          view_count: number;
        }[];
      };
      get_news_views_week: {
        Args: {
          news_doc_id: number;
          primed: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_wallet_day: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_wallet_hour: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_wallet_week: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_news_wallets_per_guild: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          guild_id: string;
          guild_name: string;
          doc_count: number;
        }[];
      };
      get_no_tag_guild_count: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      get_poll_vote_count: {
        Args: {
          discord_user_id: string;
        };
        Returns: number;
      };
      get_prime_view_graph: {
        Args: {
          range_type: string;
          range: number;
          end_date: string;
          news_doc_id?: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_profile_day: {
        Args: Record<PropertyKey, never>;
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_profile_graph: {
        Args: {
          range_type: string;
          range: number;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_profile_hour: {
        Args: Record<PropertyKey, never>;
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_profile_week: {
        Args: Record<PropertyKey, never>;
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_profiles_per_guild: {
        Args: Record<PropertyKey, never>;
        Returns: {
          guild_id: string;
          guild_name: string;
          doc_count: number;
        }[];
      };
      get_redirect_click_graph:
        | {
            Args: {
              range_type: string;
              range: number;
              end_date: string;
              news_doc_id?: number;
            };
            Returns: {
              time_segment: string;
              document_count: number;
            }[];
          }
        | {
            Args: {
              range_type: string;
              range: number;
              end_date: string;
              r_tag: string;
            };
            Returns: {
              time_segment: string;
              document_count: number;
            }[];
          };
      get_sol_profile_points: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      get_tag_interaction_graph: {
        Args: {
          range_type: string;
          range: number;
          end_date: string;
          v_tag: string;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_tag_view_graph: {
        Args: {
          range_type: string;
          range: number;
          end_date: string;
          v_tag: string;
          primed?: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_total_interactions: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      get_total_user_points: {
        Args: {
          discord_user_id: string;
        };
        Returns: number;
      };
      get_total_views: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      get_view_graph: {
        Args: {
          range_type: string;
          range: number;
          end_date: string;
          news_doc_id?: number;
          primed?: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_view_intervals: {
        Args: {
          hours_range: number;
        };
        Returns: {
          hour_segment: string;
          document_count: number;
        }[];
      };
      get_views_by_guild_count: {
        Args: {
          news_doc_id: number;
        };
        Returns: {
          guild_name: string;
          guild_id: string;
          views_count: number;
        }[];
      };
      get_views_count_by_tag: {
        Args: {
          vanity_tag_name: string;
        };
        Returns: number;
      };
      get_views_day: {
        Args: {
          primed: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_views_hour: {
        Args: {
          primed: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_views_month: {
        Args: {
          primed: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_views_week: {
        Args: {
          primed: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      get_views_year: {
        Args: {
          primed: boolean;
        };
        Returns: {
          time_segment: string;
          document_count: number;
        }[];
      };
      give_daily_profile_points: {
        Args: {
          discord_user_id: string;
          guild_id?: string;
          news_id?: number;
        };
        Returns: number;
      };
      give_input_points: {
        Args: {
          news_id: number;
          user_id: string;
          input_id: number;
          input: string;
          created_date?: string;
          guild_id?: string;
        };
        Returns: number;
      };
      give_poll_points: {
        Args: {
          news_id: number;
          user_id: string;
          poll_id: number;
          poll_choice_id: number;
          created_date: string;
          guild_id?: string;
        };
        Returns: number;
      };
      give_quiz_points: {
        Args: {
          news_id: number;
          user_id: string;
          quiz_id: number;
          quiz_choice_id: number;
          created_date?: string;
          guild_id?: string;
        };
        Returns: number;
      };
      increment_views: {
        Args: {
          discord_news_id: number;
        };
        Returns: undefined;
      };
      increment_website_redirects: {
        Args: {
          redirect_name: string;
        };
        Returns: undefined;
      };
      is_admin: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
      is_prime: {
        Args: {
          news_doc_id: number;
        };
        Returns: boolean;
      };
      is_writer: {
        Args: {
          auth_uid: string;
        };
        Returns: boolean;
      };
      owns_discord_account: {
        Args: {
          auth_uid: string;
          discord_user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      interaction_type:
        | "POLL"
        | "QUIZ"
        | "INPUT"
        | "DIRECT"
        | "PROMO"
        | "LINK"
        | "PROFILE"
        | "WALLET";
      log_type: "INFO" | "WARN" | "ERROR";
      promo_action_type: "LIKE" | "RETWEET" | "FOLLOW";
      referral_type: "AMBASSADOR" | "PROFILE";
      staff_role_type:
        | "AFFILIATE"
        | "WRITER"
        | "MOD"
        | "ADMIN"
        | "TRIAL"
        | "AMBASSADOR";
      user_role_type: "VIEWER" | "STAFF";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
