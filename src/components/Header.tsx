"use client";

import { SecondaryButton } from "@/components/SecondaryButton";
import { editorDisplayAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function Header() {
  const [editorDisplay, setEditorDisplay] = useAtom(editorDisplayAtom);

  return (
    <header className="flex flex-row items-center justify-between w-full p-4 bg-primary-bg text-white shadow-lg">
      <SecondaryButton onClick={() => setEditorDisplay("split")}>
        Global Hook
      </SecondaryButton>
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
    </header>
  );
}
