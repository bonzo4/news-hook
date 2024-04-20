import { PARSERS } from "@/lib/markdown/parsers/parsers";
import React, { memo } from "react";
import { MarkdownContainer } from "./MarkdownContainer";

export type MarkdownProps = {
  className?: string;
  content: string;
  type?: keyof typeof PARSERS;
};

function MarkdownRenderer(props: MarkdownProps) {
  const { className, content, type = "default" } = props;

  const parse = PARSERS[type];

  return (
    <MarkdownContainer className={className}>
      {parse(content.trim())}
    </MarkdownContainer>
  );
}

export const Markdown = memo(MarkdownRenderer);
