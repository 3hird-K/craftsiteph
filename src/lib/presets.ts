import type { BuilderComponent, ComponentProps, ComponentStyle, ComponentType, SiteTheme } from "./types";
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

export type ComponentVariant = {
  id: string;
  name: string;
  description: string;
  badge?: string;
  previewType: "split" | "centered" | "floating" | "minimal" | "grid" | "boxed";
  applyProps?: Partial<ComponentProps>;
  applyStyle?: Partial<ComponentStyle>;
};

export const COMPONENT_VARIANTS: Record<string, ComponentVariant[]> = {
  navbar: [
    {
      id: "classic-split",
      name: "Classic Split Header",
      description: "Logo left, navigation links middle, CTA button right.",
      badge: "Popular",
      previewType: "split",
      applyProps: {
        variant: "classic-split",
        logoText: "Brand",
        links: [
          { label: "Home", href: "#" },
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
        buttons: [{ label: "Get Started", variant: "solid" }],
      },
      applyStyle: {
        paddingY: "16px",
        paddingX: "32px",
        marginY: "0px",
        marginX: "0px",
      },
    },
    {
      id: "centered-minimal",
      name: "Centered Minimal & Stacked",
      description: "Centered logo on top with inline navigation links & CTA below.",
      badge: "Minimal",
      previewType: "centered",
      applyProps: {
        variant: "centered-minimal",
        logoText: "CRAFTSITE",
        links: [
          { label: "Home", href: "#" },
          { label: "Showcase", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Contact", href: "#" },
        ],
        buttons: [{ label: "Explore Platform", variant: "solid" }],
      },
      applyStyle: {
        paddingY: "20px",
        paddingX: "32px",
        textAlign: "center",
        marginY: "0px",
        marginX: "0px",
      },
    },
    {
      id: "floating-glass",
      name: "Floating Glassmorphism",
      description: "Pill header bar with subtle backdrop blur and rounded floating container.",
      badge: "Modern",
      previewType: "floating",
      applyProps: {
        variant: "floating-glass",
        logoText: "Studio",
        links: [
          { label: "Work", href: "#" },
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
        ],
        buttons: [{ label: "Sign In", variant: "solid" }],
      },
      applyStyle: {
        paddingY: "12px",
        paddingX: "28px",
        marginY: "0px",
        marginX: "auto",
        maxWidth: "1120px",
        borderRadius: "9999px",
      },
    },
    {
      id: "inline-left",
      name: "Clean Inline Left",
      description: "Logo and navigation links grouped together on the left, action button on right.",
      badge: "Clean",
      previewType: "split",
      applyProps: {
        variant: "inline-left",
        logoText: "Pulse",
        links: [
          { label: "Overview", href: "#" },
          { label: "Integrations", href: "#" },
          { label: "Changelog", href: "#" },
        ],
        buttons: [{ label: "Launch App", variant: "solid" }],
      },
      applyStyle: {
        paddingY: "16px",
        paddingX: "32px",
        marginY: "0px",
        marginX: "0px",
      },
    },
    {
      id: "dual-action",
      name: "Dual Action Header",
      description: "Logo left, centered navigation, with secondary outline and primary CTA buttons.",
      badge: "Conversion",
      previewType: "split",
      applyProps: {
        variant: "dual-action",
        logoText: "Horizon",
        links: [
          { label: "Features", href: "#" },
          { label: "Enterprise", href: "#" },
          { label: "Pricing", href: "#" },
        ],
        buttons: [
          { label: "Log In", variant: "outline" },
          { label: "Start Free Trial", variant: "solid" },
        ],
      },
      applyStyle: {
        paddingY: "16px",
        paddingX: "32px",
        marginY: "0px",
        marginX: "0px",
      },
    },
    {
      id: "bordered-light",
      name: "Bordered Light Header",
      description: "Crisp light background with subtle bottom border and clean typography.",
      badge: "Sleek",
      previewType: "split",
      applyProps: {
        variant: "bordered-light",
        logoText: "Vanguard",
        links: [
          { label: "Platform", href: "#" },
          { label: "Developers", href: "#" },
          { label: "Resources", href: "#" },
        ],
        buttons: [{ label: "Book Demo", variant: "solid" }],
      },
      applyStyle: {
        border: "1px solid var(--color-border)",
        paddingY: "16px",
        paddingX: "32px",
        marginY: "0px",
        marginX: "0px",
      },
    },
  ],
  hero: [
    {
      id: "centered-hero",
      name: "Centered Big Headline",
      description: "Centered title, subtitle, CTA buttons, and subtle hero glow.",
      badge: "Popular",
      previewType: "centered",
      applyProps: {
        variant: "centered-hero",
        heading: "Build something people love",
        subheading: "Design beautiful landing pages in minutes. Customize every component, color, and layout.",
        buttons: [{ label: "Start building free", variant: "solid" }],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
        textAlign: "center",
      },
    },
    {
      id: "split-image",
      name: "Split Headline + Showcase Image",
      description: "Headline & CTA on left, high-res showcase image on right.",
      badge: "High Conversion",
      previewType: "split",
      applyProps: {
        variant: "split-image",
        heading: "Turn ideas into live websites",
        subheading: "Visual page builder with drag-and-drop flexibility for modern teams.",
        buttons: [{ label: "Explore Platform", variant: "solid" }],
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
        textAlign: "left",
      },
    },
    {
      id: "minimalist-hero",
      name: "Minimalist Typography",
      description: "Clean text-only hero focus with bold typography & subtle CTA.",
      badge: "Clean",
      previewType: "minimal",
      applyProps: {
        variant: "minimalist-hero",
        heading: "Simplicity in visual design.",
        subheading: "Focus on what matters. Minimalist layout for modern creators.",
        buttons: [{ label: "Get Started →", variant: "solid" }],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "72px",
        paddingX: "32px",
        textAlign: "center",
      },
    },
    {
      id: "app-preview",
      name: "App Dashboard & Glass Mockup",
      description: "Modern SaaS hero with title, CTA buttons, and elevated app dashboard mockup.",
      badge: "Modern",
      previewType: "centered",
      applyProps: {
        variant: "app-preview",
        heading: "Manage everything in one intuitive workspace",
        subheading: "Streamline workflows, automate tasks, and collaborate with your team seamlessly.",
        buttons: [
          { label: "Start Free Trial", variant: "solid" },
          { label: "Watch Demo", variant: "outline" },
        ],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "88px",
        paddingX: "32px",
        textAlign: "center",
      },
    },
    {
      id: "gradient-glow",
      name: "Gradient Badge & Dual CTA Hero",
      description: "Dribbble trending SaaS hero with announcement badge and dual CTA action buttons.",
      badge: "Trending",
      previewType: "centered",
      applyProps: {
        variant: "gradient-glow",
        heading: "Build faster with intelligent design components",
        subheading: "Create, iterate, and deploy modern visual applications without touching complex code.",
        buttons: [
          { label: "Get Started Free", variant: "solid" },
          { label: "Book a Demo", variant: "ghost" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "84px",
        paddingX: "32px",
        textAlign: "center",
      },
    },
    {
      id: "bento-hero",
      name: "Bento Feature Grid Hero",
      description: "Headline and quick action on left paired with interactive feature card previews.",
      badge: "Bento",
      previewType: "split",
      applyProps: {
        variant: "bento-hero",
        heading: "Engineered for high-performing digital products",
        subheading: "Customizable design systems and production-ready code generation built in.",
        buttons: [{ label: "Explore Features", variant: "solid" }],
        imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80",
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
        textAlign: "left",
      },
    },
  ],
  features: [
    {
      id: "3-col-grid",
      name: "3-Column Icon Grid",
      description: "Balanced 3-column layout with icon badges & descriptions.",
      previewType: "grid",
      applyProps: { columns: 3 },
      applyStyle: { backgroundColor: "#ffffff", paddingY: "64px", paddingX: "32px" },
    },
    {
      id: "2-col-cards",
      name: "2-Column Feature Cards",
      description: "Large feature cards with highlighted borders.",
      previewType: "boxed",
      applyProps: { columns: 2 },
      applyStyle: { backgroundColor: "#f8fafc", paddingY: "64px", paddingX: "32px" },
    },
  ],
  footer: [
    {
      id: "dark-multi-column",
      name: "Multi-Column Links",
      description: "Logo, multi-column navigation links, social icons, and copyright.",
      previewType: "split",
      applyProps: { logoText: "Brand", text: "© 2026 Brand Inc. All rights reserved." },
      applyStyle: { backgroundColor: "#020617", textColor: "#94a3b8", paddingY: "48px", paddingX: "32px" },
    },
    {
      id: "centered-minimal-footer",
      name: "Centered Minimal Footer",
      description: "Centered logo, inline links, and simple copyright line.",
      previewType: "centered",
      applyProps: { logoText: "Brand", text: "Designed with CraftSite." },
      applyStyle: { backgroundColor: "#ffffff", textColor: "#64748b", paddingY: "40px", paddingX: "32px", textAlign: "center" },
    },
  ],
  "card-grid": [
    {
      id: "3-col-cards",
      name: "3-Column Card Grid",
      description: "Clean 3-column card grid section.",
      previewType: "grid",
      applyProps: { columns: 3 },
      applyStyle: { backgroundColor: "#f8fafc", paddingY: "64px", paddingX: "32px" },
    },
    {
      id: "2-col-elevated",
      name: "2-Column Elevated Cards",
      description: "Wide cards with shadow elevation.",
      previewType: "boxed",
      applyProps: { columns: 2 },
      applyStyle: { backgroundColor: "#ffffff", paddingY: "64px", paddingX: "32px" },
    },
  ],
  cta: [
    {
      id: "full-width-cta",
      name: "Full-Width Primary Banner",
      description: "Bold full-bleed CTA section with primary background.",
      previewType: "centered",
      applyProps: {},
      applyStyle: { backgroundColor: "#4f46e5", textColor: "#ffffff", paddingY: "72px", paddingX: "32px" },
    },
    {
      id: "boxed-cta",
      name: "Boxed Card CTA",
      description: "Contained card CTA with rounded corners.",
      previewType: "boxed",
      applyProps: {},
      applyStyle: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingY: "56px", paddingX: "40px", borderRadius: "24px" },
    },
  ],
  stats: [
    {
      id: "dark-stats-bar",
      name: "4-Column Metric Strip",
      description: "Horizontal metrics bar with numbers & labels.",
      previewType: "grid",
      applyProps: { columns: 4 },
      applyStyle: { backgroundColor: "#0f172a", textColor: "#f8fafc", paddingY: "48px", paddingX: "32px" },
    },
    {
      id: "light-stats-grid",
      name: "Light Stat Cards",
      description: "Clean light background metrics grid.",
      previewType: "boxed",
      applyProps: { columns: 4 },
      applyStyle: { backgroundColor: "#ffffff", textColor: "#0f172a", paddingY: "48px", paddingX: "32px" },
    },
  ],
};

export function createComponent(type: ComponentType, variantId?: string): BuilderComponent {
  const id = uid(type);
  let base: BuilderComponent;
  switch (type) {
    case "navbar":
      base = {
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
          paddingY: "16px", paddingX: "32px",
          fontWeight: "600",
        },
      };
      break;
    case "hero":
      base = {
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
          backgroundColor: "transparent",
          paddingY: "80px", paddingX: "32px",
          textAlign: "center",
          gap: "24px",
        },
      };
      break;
    case "heading":
      base = {
        id,
        type,
        props: { heading: "Section heading", subheading: "A short supporting line" },
        style: {
          textColor: "#0f172a",
          paddingY: "48px", paddingX: "32px",
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "700",
        },
      };
      break;
    case "text":
      base = {
        id,
        type,
        props: {
          text: "Write your story here. This paragraph is fully editable — change the copy, colors, size, and alignment to match your brand voice.",
        },
        style: {
          textColor: "#334155",
          paddingY: "8px", paddingX: "32px",
          textAlign: "center",
          fontSize: "18px",
          maxWidth: "720px",
          lineHeight: "1.7",
        },
      };
      break;
    case "button":
      base = {
        id,
        type,
        props: { buttonText: "Click me", buttonHref: "#" },
        style: {
          backgroundColor: "#4f46e5",
          textColor: "#ffffff",
          paddingY: "24px", paddingX: "32px",
          borderRadius: "12px",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "16px",
        },
      };
      break;
    case "image":
      base = {
        id,
        type,
        props: {
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
          imageAlt: "Workspace",
        },
        style: {
          paddingY: "24px", paddingX: "32px",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "960px",
        },
      };
      break;
    case "features":
      base = {
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
          paddingY: "64px", paddingX: "32px",
          gap: "24px",
        },
      };
      break;
    case "card-grid":
      base = {
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
          paddingY: "64px", paddingX: "32px",
          gap: "20px",
        },
      };
      break;
    case "stats":
      base = {
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
          paddingY: "48px", paddingX: "32px",
          textAlign: "center",
        },
      };
      break;
    case "testimonial":
      base = {
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
          paddingY: "64px", paddingX: "32px",
          textAlign: "center",
          borderRadius: "0",
        },
      };
      break;
    case "cta":
      base = {
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
          paddingY: "72px", paddingX: "32px",
          textAlign: "center",
          borderRadius: "0",
        },
      };
      break;
    case "form":
      base = {
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
          paddingY: "64px", paddingX: "32px",
          textAlign: "center",
          maxWidth: "560px",
        },
      };
      break;
    case "spacer":
      base = {
        id,
        type,
        props: {},
        style: { paddingY: "40px", paddingX: "0px", backgroundColor: "transparent" },
      };
      break;
    case "divider":
      base = {
        id,
        type,
        props: {},
        style: {
          paddingY: "8px", paddingX: "48px",
          backgroundColor: "transparent",
          textColor: "#e2e8f0",
        },
      };
      break;
    case "footer":
      base = {
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
          paddingY: "48px", paddingX: "32px",
          textAlign: "center",
        },
      };
      break;
    default:
      base = { id, type: "text", props: { text: "New block" }, style: { paddingY: "16px", paddingX: "16px" } };
  }

  if (variantId && COMPONENT_VARIANTS[type]) {
    const v = COMPONENT_VARIANTS[type].find((v) => v.id === variantId);
    if (v) {
      if (v.applyProps) base.props = { ...base.props, ...v.applyProps };
      if (v.applyStyle) base.style = { ...base.style, ...v.applyStyle };
    }
  }

  return base;
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
