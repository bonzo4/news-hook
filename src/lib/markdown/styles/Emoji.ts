import { RichEmbedContainer } from "@/components/Preview.tsx/RichEmbedContainer";
import { em, rem, size } from "polished";
import styled, { css } from "styled-components";

export const Emoji = styled.img.attrs({ draggable: false })<{ big?: boolean }>`
  ${size(18)};

  object-fit: contain;

  display: inline-block;

  ${({ theme, big }) =>
    theme.appearance.display === "cozy" &&
    big &&
    css`
      ${size(rem(48))};

      min-height: ${rem(48)};
    `};

  ${RichEmbedContainer} & {
    ${size(18)};
  }
`;
