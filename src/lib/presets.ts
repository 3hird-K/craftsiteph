import type { BuilderComponent, ComponentType, SiteTheme } from "./types";
import { DEFAULT_THEME } from "./types";

export function uid(prefix = "c"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export type PaletteItem = {
  type: ComponentType;
  label: string;
  description: string;
  icon: string;
  category: "layout" | "content" | "media" | "interactive";
};

export const PALETTE: PaletteItem[] = [
  { type: "navbar", label: "Navbar", description: "Logo + navigation links", icon: "☰", category: "layout" },
  { type: "hero", label: "Hero", description: "Big headline with CTA", icon: "✦", category: "layout" },
  { type: "heading", label: "Heading", description: "Section title", icon: "H", category: "content" },
  { type: "text", label: "Text", description: "Paragraph body copy", icon: "¶", category: "content" },
  { type: "button", label: "Button", description: "Call-to-action button", icon: "◉", category: "interactive" },
  { type: "image", label: "Image", description: "Photo or illustration", icon: "▣", category: "media" },
  { type: "features", label: "Features", description: "Icon feature grid", icon: "▦", category: "content" },
  { type: "card-grid", label: "Cards", description: "Card grid section", icon: "▤", category: "content" },
  { type: "stats", label: "Stats", description: "Key metrics row", icon: "＃", category: "content" },
  { type: "testimonial", label: "Testimonial", description: "Quote + author", icon: "❝", category: "content" },
  { type: "cta", label: "CTA Band", description: "Full-width call to action", icon: "➤", category: "interactive" },
  { type: "form", label: "Contact Form", description: "Name, email, message", icon: "✎", category: "interactive" },
  { type: "spacer", label: "Spacer", description: "Vertical spacing", icon: "↕", category: "layout" },
  { type: "divider", label: "Divider", description: "Horizontal rule", icon: "—", category: "layout" },
  { type: "footer", label: "Footer", description: "Links and copyright", icon: "⬇", category: "layout" },
];

export function createComponent(type: ComponentType): BuilderComponent {
  const id = uid(type);
  switch (type) {
    case "navbar":
      return {
        id,
        type,
        props: {
          logoText: "Brand",
          links: [
            { label: "Home", href: "#" },
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Contact", href: "#contact" },
          ],
          buttonText: "Get Started",
          buttonHref: "#",
        },
        style: {
          backgroundColor: "#0f172a",
          textColor: "#f8fafc",
          padding: "16px 32px",
          fontWeight: "600",
        },
      };
    case "hero":
      return {
        id,
        type,
        props: {
          heading: "Build something people love",
          subheading:
            "Design beautiful landing pages in minutes. Customize every component, color, and layout — then publish instantly.",
          buttonText: "Start building free",
          buttonHref: "#",
          imageUrl:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
          imageAlt: "Team collaborating",
        },
        style: {
          backgroundColor: "#eef2ff",
          textColor: "#0f172a",
          padding: "80px 32px",
          textAlign: "center",
          gap: "24px",
        },
      };
    case "heading":
      return {
        id,
        type,
        props: { heading: "Section heading", subheading: "A short supporting line" },
        style: {
          textColor: "#0f172a",
          padding: "48px 32px 8px",
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "700",
        },
      };
    case "text":
      return {
        id,
        type,
        props: {
          text: "Write your story here. This paragraph is fully editable — change the copy, colors, size, and alignment to match your brand voice.",
        },
        style: {
          textColor: "#334155",
          padding: "8px 32px 32px",
          textAlign: "center",
          fontSize: "18px",
          maxWidth: "720px",
          lineHeight: "1.7",
        },
      };
    case "button":
      return {
        id,
        type,
        props: { buttonText: "Click me", buttonHref: "#" },
        style: {
          backgroundColor: "#4f46e5",
          textColor: "#ffffff",
          padding: "24px 32px",
          borderRadius: "12px",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "16px",
        },
      };
    case "image":
      return {
        id,
        type,
        props: {
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
          imageAlt: "Workspace",
        },
        style: {
          padding: "24px 32px",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "960px",
        },
      };
    case "features":
      return {
        id,
        type,
        props: {
          heading: "Everything you need",
          items: [
            {
              title: "Drag & drop",
              description: "Assemble pages visually with reusable blocks.",
              icon: "🎯",
            },
            {
              title: "Live styling",
              description: "Tune colors, type, and spacing in real time.",
              icon: "🎨",
            },
            {
              title: "One-click publish",
              description: "Ship a public page the moment you're ready.",
              icon: "🚀",
            },
          ],
          columns: 3,
        },
        style: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          padding: "64px 32px",
          gap: "24px",
        },
      };
    case "card-grid":
      return {
        id,
        type,
        props: {
          heading: "Featured work",
          items: [
            {
              title: "Product launch",
              description: "A bold landing page for a SaaS release.",
              icon: "📦",
            },
            {
              title: "Portfolio",
              description: "Clean case-study layout for creatives.",
              icon: "🖼️",
            },
            {
              title: "Event site",
              description: "Schedule, speakers, and ticket CTA.",
              icon: "🎟️",
            },
          ],
          columns: 3,
        },
        style: {
          backgroundColor: "#f8fafc",
          textColor: "#0f172a",
          padding: "64px 32px",
          gap: "20px",
        },
      };
    case "stats":
      return {
        id,
        type,
        props: {
          items: [
            { title: "12k+", description: "Active builders", icon: "" },
            { title: "48k", description: "Pages published", icon: "" },
            { title: "99.9%", description: "Uptime", icon: "" },
            { title: "4.9★", description: "Average rating", icon: "" },
          ],
          columns: 4,
        },
        style: {
          backgroundColor: "#0f172a",
          textColor: "#f8fafc",
          padding: "48px 32px",
          textAlign: "center",
        },
      };
    case "testimonial":
      return {
        id,
        type,
        props: {
          text: "“This builder cut our landing page time from days to under an hour. The design controls are surprisingly deep.”",
          heading: "Alex Rivera",
          subheading: "Head of Growth, Northstar",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        },
        style: {
          backgroundColor: "#faf5ff",
          textColor: "#3b0764",
          padding: "64px 32px",
          textAlign: "center",
          borderRadius: "0",
        },
      };
    case "cta":
      return {
        id,
        type,
        props: {
          heading: "Ready to ship your next page?",
          subheading: "Join thousands of makers designing with CraftSite.",
          buttonText: "Create free project",
          buttonHref: "#",
        },
        style: {
          backgroundColor: "#4f46e5",
          textColor: "#ffffff",
          padding: "72px 32px",
          textAlign: "center",
          borderRadius: "0",
        },
      };
    case "form":
      return {
        id,
        type,
        props: {
          heading: "Get in touch",
          subheading: "We usually reply within one business day.",
          buttonText: "Send message",
          placeholder: "Tell us about your project…",
        },
        style: {
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          padding: "64px 32px",
          textAlign: "center",
          maxWidth: "560px",
        },
      };
    case "spacer":
      return {
        id,
        type,
        props: {},
        style: { padding: "40px 0", backgroundColor: "transparent" },
      };
    case "divider":
      return {
        id,
        type,
        props: {},
        style: {
          padding: "8px 48px",
          backgroundColor: "transparent",
          textColor: "#e2e8f0",
        },
      };
    case "footer":
      return {
        id,
        type,
        props: {
          logoText: "Brand",
          text: "© 2026 Brand Inc. All rights reserved.",
          links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Contact", href: "#" },
          ],
          socialLinks: [
            { platform: "Twitter", href: "#" },
            { platform: "GitHub", href: "#" },
            { platform: "LinkedIn", href: "#" },
          ],
        },
        style: {
          backgroundColor: "#020617",
          textColor: "#94a3b8",
          padding: "48px 32px",
          textAlign: "center",
        },
      };
    default:
      return { id, type: "text", props: { text: "New block" }, style: { padding: "16px" } };
  }
}

export function blankProjectComponents(): BuilderComponent[] {
  return [];
}

export const SEED_TEMPLATES: {
  name: string;
  description: string;
  category: string;
  theme: SiteTheme;
  build: () => BuilderComponent[];
}[] = [
  {
    name: "SaaS Launch",
    description: "Modern product landing with features, stats, and CTA.",
    category: "saas",
    theme: {
      ...DEFAULT_THEME,
      primaryColor: "#4f46e5",
      secondaryColor: "#0f172a",
      accentColor: "#22d3ee",
      backgroundColor: "#ffffff",
    },
    build: () => {
      const nav = createComponent("navbar");
      nav.props.logoText = "Launchly";
      const hero = createComponent("hero");
      hero.props.heading = "Ship product pages that convert";
      hero.props.subheading =
        "A polished SaaS landing template with hero, social proof, and pricing-ready sections.";
      hero.style.backgroundColor = "#eef2ff";
      const stats = createComponent("stats");
      const features = createComponent("features");
      const cta = createComponent("cta");
      const footer = createComponent("footer");
      footer.props.logoText = "Launchly";
      return [nav, hero, stats, features, cta, footer];
    },
  },
  {
    name: "Creative Portfolio",
    description: "Elegant portfolio with testimonial and project cards.",
    category: "portfolio",
    theme: {
      ...DEFAULT_THEME,
      primaryColor: "#db2777",
      secondaryColor: "#1e1b4b",
      accentColor: "#fbbf24",
      backgroundColor: "#fffbeb",
      fontFamily: '"Playfair Display", Georgia, serif',
    },
    build: () => {
      const nav = createComponent("navbar");
      nav.props.logoText = "Studio";
      nav.style.backgroundColor = "#1e1b4b";
      const hero = createComponent("hero");
      hero.props.heading = "Design with intention";
      hero.props.subheading =
        "A refined portfolio template for designers, photographers, and studios.";
      hero.style.backgroundColor = "#fdf2f8";
      hero.props.buttonText = "View work";
      const cards = createComponent("card-grid");
      cards.props.heading = "Selected projects";
      const testimonial = createComponent("testimonial");
      const footer = createComponent("footer");
      footer.props.logoText = "Studio";
      footer.style.backgroundColor = "#1e1b4b";
      return [nav, hero, cards, testimonial, footer];
    },
  },
  {
    name: "Event Promo",
    description: "Bold event page with countdown-style stats and form.",
    category: "event",
    theme: {
      ...DEFAULT_THEME,
      primaryColor: "#ea580c",
      secondaryColor: "#111827",
      accentColor: "#facc15",
      backgroundColor: "#fff7ed",
    },
    build: () => {
      const nav = createComponent("navbar");
      nav.props.logoText = "Summit '26";
      nav.style.backgroundColor = "#111827";
      const hero = createComponent("hero");
      hero.props.heading = "The conference for builders";
      hero.props.subheading =
        "Two days of talks, workshops, and networking. Secure your seat today.";
      hero.props.buttonText = "Reserve ticket";
      hero.style.backgroundColor = "#ffedd5";
      const stats = createComponent("stats");
      stats.props.items = [
        { title: "40+", description: "Speakers", icon: "" },
        { title: "2", description: "Days", icon: "" },
        { title: "1.2k", description: "Attendees", icon: "" },
        { title: "12", description: "Workshops", icon: "" },
      ];
      stats.style.backgroundColor = "#ea580c";
      const form = createComponent("form");
      form.props.heading = "Request an invite";
      form.props.buttonText = "Join waitlist";
      const footer = createComponent("footer");
      footer.props.logoText = "Summit '26";
      return [nav, hero, stats, form, footer];
    },
  },
  {
    name: "Minimal Blank",
    description: "A clean navbar + hero starter you can build on.",
    category: "starter",
    theme: { ...DEFAULT_THEME },
    build: () => {
      const nav = createComponent("navbar");
      const hero = createComponent("hero");
      hero.props.heading = "Your next page starts here";
      hero.props.subheading = "Add components from the left panel and style them on the right.";
      const footer = createComponent("footer");
      return [nav, hero, footer];
    },
  },
];
