export type ComponentStyle = {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  padding?: string;
  paddingY?: string;
  paddingX?: string;
  margin?: string;
  marginY?: string;
  marginX?: string;
  borderRadius?: string;
  border?: string;
  textAlign?: "left" | "center" | "right";
  width?: string;
  maxWidth?: string;
  boxShadow?: string;
  gap?: string;
  flexDirection?: "row" | "column";
  alignItems?: string;
  justifyContent?: string;
  opacity?: string;
  lineHeight?: string;
  letterSpacing?: string;
  id?: string;
};

export type ComponentProps = {
  sectionId?: string;
  text?: string;
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
  buttons?: { label: string; href?: string; variant?: "solid" | "outline" | "ghost" }[];
  imageUrl?: string;
  imageAlt?: string;
  items?: { title: string; description: string; icon?: string }[];
  links?: { label: string; href: string; variant?: "default" | "muted" | "bold" | "button" | string }[];
  columns?: number;
  variant?: string;
  placeholder?: string;
  logoText?: string;
  logoHref?: string;
  socialLinks?: { platform: string; href?: string; url?: string }[];
};

export type ComponentType =
  | "navbar"
  | "hero"
  | "heading"
  | "text"
  | "button"
  | "image"
  | "card-grid"
  | "features"
  | "cta"
  | "testimonial"
  | "footer"
  | "spacer"
  | "divider"
  | "form"
  | "stats";

export type BuilderComponent = {
  id: string;
  type: ComponentType;
  props: ComponentProps;
  style: ComponentStyle;
};

export type SiteTheme = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  containerWidth?: string;
};

export type Project = {
  id: number;
  name: string;
  description: string | null;
  components: BuilderComponent[];
  theme: SiteTheme;
  isPublished: boolean;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Template = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  thumbnail: string | null;
  components: BuilderComponent[];
  theme: SiteTheme;
  sortOrder: number;
  createdAt: string;
};

export const DEFAULT_THEME: SiteTheme = {
  primaryColor: "#4f46e5",
  secondaryColor: "#0f172a",
  accentColor: "#f59e0b",
  backgroundColor: "#ffffff",
  textColor: "#0f172a",
  fontFamily: "Inter, system-ui, sans-serif",
  borderRadius: "12px",
  containerWidth: "1120px",
};

export const FONT_OPTIONS = [
  { label: "Inter", value: "Inter, system-ui, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Playfair", value: '"Playfair Display", Georgia, serif' },
  { label: "Roboto", value: "Roboto, system-ui, sans-serif" },
  { label: "Poppins", value: "Poppins, system-ui, sans-serif" },
  { label: "Mono", value: "ui-monospace, SFMono-Regular, monospace" },
  { label: "Space Grotesk", value: '"Space Grotesk", system-ui, sans-serif' },
];
