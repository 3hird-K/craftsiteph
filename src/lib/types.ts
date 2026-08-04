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
  scrollBehavior?: "overlay" | "sticky" | "sticky-hide" | "static";
  text?: string;
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
  buttons?: { label: string; href?: string; variant?: "solid" | "outline" | "ghost"; icon?: string }[];
  imageUrl?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  imageAlt?: string;
  imageBorderRadius?: string;
  imageObjectFit?: "cover" | "contain" | "fill";
  imageAspectRatio?: "auto" | "1/1" | "16/9" | "4/3" | "4/5";
  imageLayout?: "single" | "split" | "bento" | "background";
  imagePosition?: "left" | "right";
  reverseLayout?: boolean;
  items?: { title: string; description: string; icon?: string; imageUrl?: string }[];
  links?: { label: string; href: string; variant?: "default" | "muted" | "bold" | "button" | string; icon?: string }[];
  columns?: number | { title: string; links: string[] }[];
  tagline?: string;
  copyright?: string;
  variant?: string;
  placeholder?: string;
  logoText?: string;
  logoHref?: string;
  logoFontFamily?: string;
  logoFontSize?: string;
  logoFontWeight?: string;
  logoFontStyle?: string;
  logoTextTransform?: string;
  logoColor?: string;
  socialLinks?: { platform: string; href?: string; url?: string }[];
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  contactHours?: string;
  tags?: string[];
  benefits?: string[];
  bentoCard1Title?: string;
  bentoCard1Value?: string;
  bentoCard1Badge?: string;
  bentoCard2Value?: string;
  bentoCard2Label?: string;
  bentoCard3Value?: string;
  bentoCard3Label?: string;
  badgeText?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
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
  mode?: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  containerWidth?: string;
  boxShadow?: string;

  // Global Headings & Titles Typography (H1-H6)
  headingFontFamily?: string;
  headingColor?: string;
  headingWeight?: string;
  headingTransform?: string;

  // Global Body Text & Paragraph Typography
  bodyFontFamily?: string;
  bodyColor?: string;
  bodyFontSize?: string;
  bodyLineHeight?: string;
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
  backgroundColor: "#f1f5f9",
  textColor: "#0f172a",
  fontFamily: "Inter, system-ui, sans-serif",
  borderRadius: "12px",
  containerWidth: "1120px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",

  // Default Global Headings Typography
  headingFontFamily: "Inter, system-ui, sans-serif",
  headingColor: "#0f172a",
  headingWeight: "800",
  headingTransform: "none",

  // Default Global Body Paragraph Typography
  bodyFontFamily: "Inter, system-ui, sans-serif",
  bodyColor: "#475569",
  bodyFontSize: "16px",
  bodyLineHeight: "1.6",
};

export const FONT_OPTIONS = [
  { label: "Inter (Modern Clean)", value: "Inter, system-ui, sans-serif" },
  { label: "Outfit (Trendy Sans)", value: '"Outfit", system-ui, sans-serif' },
  { label: "Plus Jakarta Sans", value: '"Plus Jakarta Sans", system-ui, sans-serif' },
  { label: "Space Grotesk (Tech/Modern)", value: '"Space Grotesk", system-ui, sans-serif' },
  { label: "Playfair Display (Serif/Luxury)", value: '"Playfair Display", Georgia, serif' },
  { label: "Poppins (Friendly Geometric)", value: "Poppins, system-ui, sans-serif" },
  { label: "Roboto (Clean Standard)", value: "Roboto, system-ui, sans-serif" },
  { label: "Georgia (Editorial Serif)", value: "Georgia, serif" },
  { label: "Mono (Developer/Code)", value: "ui-monospace, SFMono-Regular, monospace" },
];
