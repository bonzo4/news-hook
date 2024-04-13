"use client";

import Editor from "@/components/Editor";
import Preview from "@/components/Preview.tsx";
import { editorDisplayAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function Home() {
  const [editorDisplay, setEditorDisplay] = useAtom(editorDisplayAtom);

  return (
    <main className="flex grow items-start justify-start w-full">
      {editorDisplay === "split" && (
        <div className="flex grow items-start justify-start w-full">
          <Editor />
          <Preview />
        </div>
      )}
      {editorDisplay === "preview" && <Preview />}
      {editorDisplay === "editor" && <Editor />}
    </main>
  );
}
