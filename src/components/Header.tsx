"use client";

import { SecondaryButton } from "@/components/SecondaryButton";
import { editorDisplayAtom } from "@/lib/atoms";
import { useStaffUser } from "@/lib/hooks/useUser";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

type HeaderProps = {
  user: User | null;
};

export default function Header({ user }: HeaderProps) {
  const supabase = createSupabaseBrowserClient();
  const [editorDisplay, setEditorDisplay] = useAtom(editorDisplayAtom);
  const [staffRole] = useStaffUser({ supabase });
  const router = useRouter();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL!}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="flex flex-row items-center justify-between w-full p-4 bg-primary-bg text-white shadow-lg">
      <SecondaryButton onClick={() => setEditorDisplay("split")}>
        Global Hook
      </SecondaryButton>
      <div className="flex flex-row space-x-2">
        {user && (
          <div className="flex flex-row space-x-2">
            {editorDisplay !== "editor" && (
              <SecondaryButton
                className="md:hidden"
                onClick={() => setEditorDisplay("editor")}
              >
                Editor
              </SecondaryButton>
            )}
            {editorDisplay !== "preview" && (
              <SecondaryButton
                className="md:hidden"
                onClick={() => setEditorDisplay("preview")}
              >
                Preview
              </SecondaryButton>
            )}
          </div>
        )}
        {staffRole ? (
          <div className="flex flex-row space-x-2">
            <SecondaryButton>{staffRole.staff_role}</SecondaryButton>
            <SecondaryButton onClick={() => handleLogout()}>
              Logout
            </SecondaryButton>
          </div>
        ) : (
          <SecondaryButton onClick={() => handleLogin()}>Login</SecondaryButton>
        )}
      </div>
    </header>
  );
}
