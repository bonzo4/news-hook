"use client";

import Editor from "@/components/Editor";
import Preview from "@/components/Preview.tsx";
import { editorDisplayAtom } from "@/lib/atoms";
import { useStaffUser } from "@/lib/hooks/useUser";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAtom } from "jotai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const supabase = createSupabaseBrowserClient();
  const [staffRole] = useStaffUser({ supabase });
  const [editorDisplay, setEditorDisplay] = useAtom(editorDisplayAtom);

  return (
    <main className="flex items-start justify-start w-full grow">
      {staffRole?.staff_role === "ADMIN" ||
      staffRole?.staff_role === "WRITER" ? (
        <>
          {editorDisplay === "split" && (
            <div className="flex items-start justify-start w-full">
              <Editor supabase={supabase} staffRole={staffRole} />
              <Preview />
            </div>
          )}
          {editorDisplay === "preview" && <Preview />}
          {editorDisplay === "editor" && (
            <Editor supabase={supabase} staffRole={staffRole} />
          )}
          <ToastContainer />
        </>
      ) : (
        <div className="flex items-center justify-center w-full grow">
          <h1 className="text- font-bold">
            You are not authorized to view this page.
          </h1>
        </div>
      )}
    </main>
  );
}
