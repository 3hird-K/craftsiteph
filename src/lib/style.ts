import type { ComponentStyle, SiteTheme } from "./types";
import type { CSSProperties } from "react";

export function styleToCss(style: ComponentStyle = {}): CSSProperties {
  const css: CSSProperties = {};
  if (style.backgroundColor) css.backgroundColor = style.backgroundColor;
  if (style.textColor) css.color = style.textColor;
  if (style.fontSize) css.fontSize = style.fontSize;
  if (style.fontWeight) css.fontWeight = style.fontWeight as CSSProperties["fontWeight"];
  if (style.fontFamily) css.fontFamily = style.fontFamily;
  // Legacy padding fallback
  const padParts = style.padding ? style.padding.split(" ") : [];
  const defaultPadY = padParts[0] || undefined;
  const defaultPadX = padParts[1] || padParts[0] || undefined;

  if (style.paddingY !== undefined) {
    css.paddingTop = style.paddingY;
    css.paddingBottom = style.paddingY;
  } else if (defaultPadY) {
    css.paddingTop = defaultPadY;
    css.paddingBottom = defaultPadY;
  }
  
  if (style.paddingX !== undefined) {
    css.paddingLeft = style.paddingX;
    css.paddingRight = style.paddingX;
  } else if (defaultPadX) {
    css.paddingLeft = defaultPadX;
    css.paddingRight = defaultPadX;
  }

  // Legacy margin fallback
  const margParts = style.margin ? style.margin.split(" ") : [];
  const defaultMargY = margParts[0] || undefined;
  const defaultMargX = margParts[1] || margParts[0] || undefined;

  if (style.marginY !== undefined) {
    css.marginTop = style.marginY;
    css.marginBottom = style.marginY;
  } else if (defaultMargY) {
    // If the user wants 0 margin by default, and this is an old component with margin, we let them override it.
    // However, the user complained about a space. Let's just strip legacy margins if they are exactly "16px auto" 
    // to force the old variants to update, OR just apply it. 
    css.marginTop = defaultMargY === "16px" ? "0px" : defaultMargY;
    css.marginBottom = defaultMargY === "16px" ? "0px" : defaultMargY;
  }

  if (style.marginX !== undefined) {
    css.marginLeft = style.marginX;
    css.marginRight = style.marginX;
  } else if (defaultMargX) {
    css.marginLeft = defaultMargX === "auto" ? "0px" : defaultMargX;
    css.marginRight = defaultMargX === "auto" ? "0px" : defaultMargX;
  }
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
