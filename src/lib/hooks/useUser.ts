import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "../supabase/types";

export type StaffRole = Database["public"]["Tables"]["staff_users"]["Row"];
type useUserOptions = {
  supabase: SupabaseClient<Database>;
};

export function useStaffUser({ supabase }: useUserOptions) {
  const [profile, setUser] = useState<StaffRole | undefined>();

  useEffect(() => {
    const fetchTags = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (!authUser) return;
      const { data: user, error } = await supabase
        .from("staff_users")
        .select("*")
        .eq("user_id", authUser.id)
        .single();
      if (error) {
        console.error(error);
        return;
      }
      if (user) {
        setUser(user);
      }
    };
    fetchTags();
  }, [supabase]);

  return [profile, setUser] as const;
}
