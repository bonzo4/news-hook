"use client";

import Editor from "@/components/Editor";
import Preview from "@/components/Preview.tsx";
import { editorDisplayAtom } from "@/lib/atoms";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAtom } from "jotai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [editorDisplay, setEditorDisplay] = useAtom(editorDisplayAtom);

  const supabase = createSupabaseBrowserClient();

  return (
    <main className="flex items-start justify-start w-full">
      {editorDisplay === "split" && (
        <div className="flex items-start justify-start w-full">
          <Editor supabase={supabase} />
          <Preview />
        </div>
      )}
      {editorDisplay === "preview" && <Preview />}
      {editorDisplay === "editor" && <Editor supabase={supabase} />}
      <ToastContainer />
    </main>
  );
}
