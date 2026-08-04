import {
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export type ComponentStyle = {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  padding?: string;
  margin?: string;
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
};

export type ComponentProps = {
  text?: string;
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
  scrollBehavior?: "overlay" | "sticky" | "sticky-hide" | "static";
  scrollAnimation?: string;
  scrollAnimationDuration?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageBorderRadius?: string;
  imagePosition?: "left" | "right";
  reverseLayout?: boolean;
  items?: { title: string; description: string; icon?: string }[];
  links?: { label: string; href: string }[];
  columns?: number | { title: string; links: string[] }[];
  tagline?: string;
  copyright?: string;
  variant?: string;
  placeholder?: string;
  logoText?: string;
  logoFontFamily?: string;
  logoFontSize?: string;
  logoFontWeight?: string;
  logoFontStyle?: string;
  logoTextTransform?: string;
  logoColor?: string;
  socialLinks?: { platform: string; href?: string; url?: string }[];
};

export type BuilderComponent = {
  id: string;
  type:
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
};

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(),
  email: text("email"),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").default(""),
  components: jsonb("components").$type<BuilderComponent[]>().notNull().default([]),
  theme: jsonb("theme").$type<SiteTheme>().notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  slug: text("slug").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").default(""),
  category: text("category").notNull().default("general"),
  thumbnail: text("thumbnail"),
  components: jsonb("components").$type<BuilderComponent[]>().notNull().default([]),
  theme: jsonb("theme").$type<SiteTheme>().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Template = typeof templates.$inferSelect;
