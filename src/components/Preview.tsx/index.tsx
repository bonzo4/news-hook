import { embedAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import authorIcon from "@/public/author-icon.png";
import EmbedPreview from "./EmbedPreview";
import { ThemeProvider } from "styled-components";
import { DEFAULT_THEME } from "@/lib/settings/defaultPreferences";

export default function Preview() {
  const [embeds] = useAtom(embedAtom);

  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className="flex flex-row items-start justify-start space-x-3 grow w-full p-3">
        <Image
          src={authorIcon}
          alt="Author Icon"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col items-start justify-center space-y-1 grow w-full">
          <h1 className="text-md font-bold">Syndicate Network</h1>
          {/* <GlobalStyle> */}
          <EmbedPreview embeds={embeds} />
          {/* </GlobalStyle> */}
        </div>
      </div>
    </ThemeProvider>
  );
}
