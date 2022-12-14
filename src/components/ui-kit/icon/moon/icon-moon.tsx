import styled from "styled-components";

import { IconProps, IconVariant } from "../types";
import { getIconStylesByVariant } from "../utils";

import { ReactComponent as MoonSvg } from "./moon.svg";

const StyledMoonSvg = styled(MoonSvg)<IconProps>`
  ${({ variant }) => variant && getIconStylesByVariant(variant)}
`;

export const IconMoon = ({
  width = "22px",
  height = "22px",
  variant = IconVariant.Primary,
  ...props
}: IconProps) => {
  return (
    <StyledMoonSvg width={width} height={height} variant={variant} {...props} />
  );
};
