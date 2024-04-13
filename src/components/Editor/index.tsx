import { SecondaryButton } from "@/components/SecondaryButton";
import DraftManager from "./DraftManager";
import EmbedEditor from "./EmbedEditor";

export default function Editor() {
  return (
    <div className="flex flex-col items-center justify-start space-y-5 grow w-full p-3">
      <DraftManager />
      <EmbedEditor />
    </div>
  );
}
