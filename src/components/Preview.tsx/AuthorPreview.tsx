import { AuthorData } from "@/lib/data/AuthorData";

type AuthorPreviewProps = {
  author: AuthorData;
};

export default function AuthorPreview({ author }: AuthorPreviewProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {author.icon_url && (
          <img
            src={author.icon_url}
            alt="Author Icon"
            className="w-6 h-6 rounded-full"
          />
        )}
        <div className="ml-2">
          {author.url ? (
            <a
              href={author.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-blue-500"
            >
              {author.name}
            </a>
          ) : (
            <p className="text-sm font-semibold">{author.name}</p>
          )}
        </div>
      </div>
    </div>
  );
}
