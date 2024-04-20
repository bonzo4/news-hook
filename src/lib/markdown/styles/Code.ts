import { RichEmbedContainer } from "@/components/Preview.tsx/RichEmbedContainer";
import { em, rem } from "polished";
import styled from "styled-components";

export const Code = styled.code`
  padding: ${em(3.2)};
  margin: ${em(-3.2)} 0;

  border-radius: 3px;
  background: ${({ theme }) => theme.background.secondary};

  font-size: ${em(13.6)};
  line-height: ${rem(18)};

  white-space: pre-wrap;

  ${RichEmbedContainer} && {
    background: ${({ theme }) => theme.background.tertiary};
  }
`;
