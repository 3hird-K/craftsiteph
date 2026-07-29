import type { ComponentStyle, SiteTheme } from "./types";
import type { CSSProperties } from "react";

export function styleToCss(style: ComponentStyle = {}): CSSProperties {
  const css: CSSProperties = {};
  if (style.backgroundColor) css.backgroundColor = style.backgroundColor;
  if (style.textColor) css.color = style.textColor;
  if (style.fontSize) css.fontSize = style.fontSize;
  if (style.fontWeight) css.fontWeight = style.fontWeight as CSSProperties["fontWeight"];
  if (style.fontFamily) css.fontFamily = style.fontFamily;
  if (style.padding) css.padding = style.padding;
  if (style.margin) css.margin = style.margin;
  if (style.borderRadius) css.borderRadius = style.borderRadius;
  if (style.border) css.border = style.border;
  if (style.textAlign) css.textAlign = style.textAlign;
  if (style.width) css.width = style.width;
  if (style.maxWidth) css.maxWidth = style.maxWidth;
  if (style.boxShadow) css.boxShadow = style.boxShadow;
  if (style.gap) css.gap = style.gap;
  if (style.flexDirection) css.flexDirection = style.flexDirection;
  if (style.alignItems) css.alignItems = style.alignItems as CSSProperties["alignItems"];
  if (style.justifyContent) css.justifyContent = style.justifyContent as CSSProperties["justifyContent"];
  if (style.opacity) css.opacity = Number(style.opacity);
  if (style.lineHeight) css.lineHeight = style.lineHeight;
  if (style.letterSpacing) css.letterSpacing = style.letterSpacing;
  return css;
}

export function themeVars(theme: SiteTheme): CSSProperties {
  return {
    ["--primary" as string]: theme.primaryColor,
    ["--secondary" as string]: theme.secondaryColor,
    ["--accent" as string]: theme.accentColor,
    ["--page-bg" as string]: theme.backgroundColor,
    ["--page-text" as string]: theme.textColor,
    fontFamily: theme.fontFamily,
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    borderRadius: theme.borderRadius,
  };
}

export function lighten(hex: string, amount = 0.15): string {
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6) return hex;
  const num = parseInt(cleaned, 16);
  const r = Math.min(255, Math.round(((num >> 16) & 0xff) + 255 * amount));
  const g = Math.min(255, Math.round(((num >> 8) & 0xff) + 255 * amount));
  const b = Math.min(255, Math.round((num & 0xff) + 255 * amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
