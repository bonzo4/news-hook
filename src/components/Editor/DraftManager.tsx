import { SecondaryButton } from "../SecondaryButton";

export default function DraftManager() {
  return (
    <div className="flex flex-row space-x-3 items-center justify-start grow w-full">
      <SecondaryButton>Load Draft</SecondaryButton>
      <SecondaryButton>Save Draft</SecondaryButton>
    </div>
  );
}
