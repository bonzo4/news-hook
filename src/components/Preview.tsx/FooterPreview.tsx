import { FooterData } from "@/lib/data/FooterData";
import exp from "constants";

type FooterPreviewProps = {
  footer: FooterData;
  timestamp?: string;
};

export default function FooterPreview({
  footer,
  timestamp,
}: FooterPreviewProps) {
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      {footer.icon_url && (
        <img
          src={footer.icon_url}
          alt="footer-icon"
          className="w-6 h-6 rounded-full"
        />
      )}
      <span className="text-white">{footer.text}</span>
      {timestamp && (
        <span className="text-white text-opacity-50">{timestamp}</span>
      )}
    </div>
  );
}
