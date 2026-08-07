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
  // LAYOUT
  { type: "navbar", label: "Navbar", description: "Logo + navigation links", icon: "☰", category: "layout" },
  { type: "hero", label: "Hero", description: "Big headline with CTA", icon: "✦", category: "layout" },
  { type: "footer", label: "Footer", description: "Links and copyright", icon: "⬇", category: "layout" },
  { type: "spacer", label: "Spacer", description: "Vertical spacing", icon: "↕", category: "layout" },
  { type: "divider", label: "Divider", description: "Horizontal rule", icon: "—", category: "layout" },

  // CONTENT
  { type: "features", label: "Features", description: "Icon feature grid", icon: "▦", category: "content" },
  { type: "card-grid", label: "Cards", description: "Card grid section", icon: "▤", category: "content" },
  { type: "testimonial", label: "Testimonial", description: "Quote + author", icon: "❝", category: "content" },
  { type: "heading", label: "Heading", description: "Section title", icon: "H", category: "content" },
  { type: "text", label: "Text", description: "Paragraph body copy", icon: "¶", category: "content" },

  // INTERACTIVE
  { type: "form", label: "Contact Form", description: "Name, email, message", icon: "✎", category: "interactive" },
  { type: "cta", label: "CTA Band", description: "Full-width call to action", icon: "➤", category: "interactive" },
  { type: "button", label: "Button", description: "Call-to-action button", icon: "◉", category: "interactive" },

  // MEDIA
  { type: "image", label: "Image", description: "Photo or illustration", icon: "▣", category: "media" },
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
        paddingY: "8px",
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
        paddingY: "8px",
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
        paddingY: "8px",
        paddingX: "28px",
        marginY: "0px",
        marginX: "auto",
        maxWidth: "1120px",
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
        paddingY: "8px",
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
        paddingY: "8px",
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
        paddingY: "8px",
        paddingX: "32px",
        marginY: "0px",
        marginX: "0px",
      },
    },
  ],
  hero: [
    {
      id: "fullbleed-image-hero",
      name: "Full-Bleed Background Image Hero",
      description: "Full-width background image with dark overlay, centered title, dual CTA buttons, and bottom trust bar.",
      badge: "Full Image",
      previewType: "centered",
      applyProps: {
        variant: "fullbleed-image-hero",
        heading: "Craft stunning websites with zero limits",
        subheading: "The ultimate visual web builder designed for modern teams, agencies, and creators.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80",
        imageLayout: "background",
        buttons: [
          { label: "Start Building Free", variant: "solid" },
          { label: "View Live Demos", variant: "outline" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "100px",
        paddingX: "32px",
        textAlign: "center",
      },
    },
    {
      id: "split-showcase-hero",
      name: "Split 2-Column Product Showcase",
      description: "Left-aligned headline, rating badge, bullet benefits, and dual CTAs with floating showcase image on right.",
      badge: "High Conversion",
      previewType: "split",
      applyProps: {
        variant: "split-showcase-hero",
        heading: "Turn ideas into live websites in minutes",
        subheading: "Visual drag-and-drop page builder with production-ready code generation and instant publishing.",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
        buttons: [
          { label: "Explore Platform", variant: "solid" },
          { label: "Book a Demo", variant: "outline" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
        textAlign: "left",
      },
    },
    {
      id: "split-bg-showcase-hero",
      name: "Split Showcase with Background Image",
      description: "Left-aligned headline and benefits, floating showcase image on right, all set against a stunning full-bleed background image.",
      badge: "High Conversion",
      previewType: "split",
      applyProps: {
        variant: "split-bg-showcase-hero",
        heading: "Turn ideas into live websites in minutes",
        subheading: "Visual drag-and-drop page builder with production-ready code generation and instant publishing.",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
        imageUrl2: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
        buttons: [
          { label: "Explore Platform", variant: "solid" },
          { label: "Book a Demo", variant: "outline" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "120px",
        paddingX: "32px",
        textAlign: "left",
      },
    },
    {
      id: "centered-dashboard-hero",
      name: "Centered SaaS + 3D Glass Dashboard",
      description: "Centered announcement pill badge, big bold title, dual action buttons, and elevated 3D glass dashboard mockup below.",
      badge: "Glass Dashboard",
      previewType: "centered",
      applyProps: {
        variant: "centered-dashboard-hero",
        heading: "Manage everything in one intuitive workspace",
        subheading: "Streamline workflows, automate tasks, and collaborate with your team seamlessly across every device.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        buttons: [
          { label: "Start Free Trial", variant: "solid" },
          { label: "View Live Demos", variant: "outline" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "88px",
        paddingX: "32px",
        textAlign: "center",
      },
    },
    {
      id: "interactive-search-hero",
      name: "Interactive Search & Category Filters",
      description: "Giant headline with embedded live search bar input, popular category pill tags, and instant discovery.",
      badge: "Search & Directory",
      previewType: "centered",
      applyProps: {
        variant: "interactive-search-hero",
        heading: "Find and build anything visually",
        subheading: "Search thousands of pre-built UI components, responsive landing page templates, and design systems.",
        buttons: [{ label: "Search Templates", variant: "solid" }],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "84px",
        paddingX: "32px",
        textAlign: "center",
      },
    },
    {
      id: "bento-grid-hero",
      name: "Bento Grid Visual Cards Hero",
      description: "Dribbble-style 3-card bento grid hero with live metric card, customer stack, and product feature cards.",
      badge: "Bento Visual",
      previewType: "split",
      applyProps: {
        variant: "bento-grid-hero",
        heading: "Intelligent components engineered for scale",
        subheading: "Customizable design systems, component variants, and automated live publishing built in.",
        imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80",
        buttons: [{ label: "Explore Bento Grid", variant: "solid" }],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
        textAlign: "left",
      },
    },
    {
      id: "three-images-hero",
      name: "3-Image Collage Showcase",
      description: "App landing page hero with headline and a dynamic 3-image masonry collage layout.",
      badge: "Collage",
      previewType: "split",
      applyProps: {
        variant: "three-images-hero",
        heading: "Your entire workspace, now in your pocket",
        subheading: "Download the mobile app for iOS and Android to manage live builds, edit content, and track metrics anywhere.",
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
        imageUrl2: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        imageUrl3: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
        buttons: [
          { label: "Download for iOS", variant: "solid" },
          { label: "Get Android App", variant: "outline" },
        ],
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
      id: "bento-grid-features",
      name: "Dribbble Bento Spotlight Grid",
      description: "Asymmetric Bento grid with primary spotlight feature card, ambient glow border, and interactive metrics.",
      badge: "Dribbble Trending",
      previewType: "grid",
      applyProps: {
        variant: "bento-grid-features",
        heading: "Engineered for speed, scale & aesthetic perfection",
        subheading: "Everything you need to create, customize, and publish production-grade web applications.",
        items: [
          {
            title: "Visual Drag & Drop Engine",
            description: "Build pixel-perfect responsive layouts with real-time DOM updates, interactive component state management, and custom CSS design tokens.",
            icon: "sparkles",
            badgeText: "✦ SPOTLIGHT FEATURE",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
          },
          {
            title: "AI Component Generator",
            description: "Generate production-ready React components and responsive section layouts from natural language text prompts instantly.",
            icon: "zap",
            badgeText: "REAL-TIME AI",
          },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
      },
    },
    {
      id: "glass-cards-features",
      name: "Floating Glassmorphism Feature Cards",
      description: "3-column elevated glass cards with floating glowing icon badges, title, description, and hover border highlights.",
      badge: "Popular",
      previewType: "boxed",
      applyProps: {
        variant: "glass-cards-features",
        heading: "Next-generation creation tools",
        subheading: "Empower your team with a complete suite of visual editing, theme management, and instant publishing tools.",
        items: [
          {
            title: "Live Theme Customization",
            description: "Switch color palettes, typography pairs, border radii, and shadows instantly across your entire site.",
            icon: "sparkles",
            badgeText: "STYLING",
          },
          {
            title: "Unified Mobile & Tablet Editing",
            description: "Preview and fine-tune your designs across desktop, tablet, and mobile viewports effortlessly.",
            icon: "briefcase",
            badgeText: "RESPONSIVE",
          },
          {
            title: "Instant Edge Publishing",
            description: "Deploy to production with single-click publishing, automated SEO meta tags, and global performance optimization.",
            icon: "zap",
            badgeText: "PUBLISHING",
          },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
      },
    },
    {
      id: "split-feature-showcase",
      name: "Split Feature Showcase + Live Image",
      description: "2-column split layout: Left side features interactive benefit cards; Right side features a product dashboard preview card with editable image.",
      badge: "Interactive",
      previewType: "split",
      applyProps: {
        variant: "split-feature-showcase",
        heading: "Designed for modern product teams",
        subheading: "Collaborate in real-time, streamline your visual workflow, and launch websites 10x faster.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        items: [
          {
            title: "Real-Time Visual Canvas",
            description: "Manipulate text, buttons, navigation links, and layout structures directly on screen.",
            icon: "sparkles",
          },
          {
            title: "Reusable Component Libraries",
            description: "Pick from dozens of professionally crafted Navbar, Hero, Feature, and Footer section templates.",
            icon: "shield",
          },
          {
            title: "Zero-Latency Code Sync",
            description: "Your visual changes generate clean React code automatically behind the scenes.",
            icon: "zap",
          },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
      },
    },
    {
      id: "minimal-matrix-features",
      name: "4-Column Minimal Icon Matrix",
      description: "High-density 4-column feature matrix with custom icon badges, crisp headlines, and hover accent underlines.",
      badge: "Clean & Compact",
      previewType: "grid",
      applyProps: {
        variant: "minimal-matrix-features",
        heading: "Everything you need under one roof",
        subheading: "Robust infrastructure, visual design controls, and high-performance hosting.",
        items: [
          { title: "SEO Optimized", description: "Semantic HTML5 tags, meta titles, descriptions, and open-graph previews.", icon: "globe" },
          { title: "Ultra Fast Load", description: "Optimized image loading, zero extra JS bloat, and instant page transitions.", icon: "zap" },
          { title: "Custom Fonts", description: "Choose from Google Fonts typography pairs with live preview.", icon: "sparkles" },
          { title: "Secure Hosting", description: "Built-in HTTPS SSL encryption and DDoS protection out of the box.", icon: "shield" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "64px",
        paddingX: "32px",
      },
    },
  ],
  "card-grid": [
    {
      id: "modern-service-cards",
      name: "3-Column Elevated Service Cards",
      description: "3-column service card grid with category pill badges, top accent borders, icon headers, and Learn More links.",
      badge: "Popular",
      previewType: "boxed",
      applyProps: {
        variant: "modern-service-cards",
        heading: "Tailored solutions for every build",
        subheading: "Whether you are launching a SaaS product, landing page, or personal portfolio.",
        items: [
          {
            title: "Landing Page Builder",
            description: "Convert visitors with high-impact hero sections, features, testimonials, and CTAs.",
            icon: "sparkles",
            badgeText: "POPULAR",
          },
          {
            title: "Agency Design Systems",
            description: "Scale client builds with consistent color palettes, typography, and reusable sections.",
            icon: "briefcase",
            badgeText: "AGENCY",
          },
          {
            title: "Developer Code Export",
            description: "Export clean Next.js + Tailwind React components ready for your codebase.",
            icon: "shield",
            badgeText: "DEV READY",
          },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
      },
    },
    {
      id: "3d-carousel-deck-cards",
      name: "3D Stack Carousel Deck Cards",
      description: "Interactive 3D stacked deck carousel card slider with primary card focus, navigation arrows, pagination dots, pill badges & CTA links.",
      badge: "3D Carousel",
      previewType: "grid",
      applyProps: {
        variant: "3d-carousel-deck-cards",
        heading: "Everything You Need to Ship Beautiful Websites",
        subheading: "Explore the core capabilities of our modern visual builder engine",
        items: [
          {
            stepNumber: "Feature 01",
            badgeText: "COMPONENT LIBRARY",
            icon: "layers",
            title: "15+ Visual Drag & Drop Blocks",
            description: "Compose Navbars, Hero sections, Features, CTAs, and Footers with instant drag & drop feedback.",
            buttonText: "Explore Feature →",
          },
          {
            stepNumber: "Feature 02",
            badgeText: "DESIGN SYSTEM",
            icon: "palette",
            title: "Live OKLCH Theme Editor",
            description: "Customize fonts, background color, margins, padding, and corner radius with instant live feedback.",
            buttonText: "Explore Feature →",
          },
          {
            stepNumber: "Feature 03",
            badgeText: "CLOUD INFRASTRUCTURE",
            icon: "rocket",
            title: "Instant 1-Click Cloud Deploy",
            description: "Publish your web pages with custom slugs in one click. Every project state is safely persisted in PostgreSQL.",
            buttonText: "Explore Feature →",
          },
          {
            stepNumber: "Feature 04",
            badgeText: "RESPONSIVE VIEWPORTS",
            icon: "monitor",
            title: "Multi-Device Viewport Preview",
            description: "Test seamlessly across Desktop, Tablet, and Mobile devices with high-fidelity device frames.",
            buttonText: "Explore Feature →",
          },
          {
            stepNumber: "Feature 05",
            badgeText: "STACK POWER",
            icon: "database",
            title: "Drizzle ORM & Supabase DB",
            description: "Robust database schemas and automated SQL queries generated as you design your visual pages.",
            buttonText: "Explore Feature →",
          },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
      },
    },
    {
      id: "visual-cover-cards",
      name: "Visual Showcase & Case Study Cards",
      description: "Visual-first card layout featuring high-res cover image zoom, floating category pills, sleek titles, and interactive action links.",
      badge: "Visual Grid",
      previewType: "grid",
      applyProps: {
        variant: "visual-cover-cards",
        heading: "Selected Case Studies & Showcase",
        subheading: "Explore real-world web applications and design systems built with CraftSite.",
        items: [
          {
            title: "Smart AI Workflow Platform",
            description: "Next-gen insights dashboard featuring real-time data streaming and custom AI summaries.",
            icon: "sparkles",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            badgeText: "AI PLATFORM",
            buttonText: "Explore Project",
          },
          {
            title: "E-Commerce Mobile Storefront",
            description: "Ultra-fast mobile shopping experience built with Next.js, Tailwind, and headless Shopify API.",
            icon: "zap",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            badgeText: "MOBILE APP",
            buttonText: "View Live Store",
          },
          {
            title: "Design System & React Kit",
            description: "Comprehensive Figma component library synced directly with production React elements.",
            icon: "briefcase",
            imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
            badgeText: "DESIGN SYSTEM",
            buttonText: "Download Kit",
          },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
      },
    },
    {
      id: "numbered-step-cards",
      name: "Editorial Numbered Step Cards",
      description: "Modern editorial card grid with oversized step numbers (01, 02, 03), top glowing accent bars, and structured workflow steps.",
      badge: "Editorial",
      previewType: "boxed",
      applyProps: {
        variant: "numbered-step-cards",
        heading: "How it works in 3 simple steps",
        subheading: "From initial design concept to production deployment in minutes.",
        items: [
          {
            stepNumber: "01",
            title: "Connect & Import",
            description: "Link your custom domain or GitHub repository in 30 seconds with automatic framework detection.",
            badgeText: "STEP 01",
            icon: "sparkles",
            buttonText: "Learn step 1",
          },
          {
            stepNumber: "02",
            title: "Customize & Style",
            description: "Tweak design tokens, edit copy visually, and fine-tune responsive breakpoints effortlessly.",
            badgeText: "STEP 02",
            icon: "zap",
            buttonText: "Learn step 2",
          },
          {
            stepNumber: "03",
            title: "Deploy & Scale",
            description: "Publish to global edge CDN with automated SSL, custom domain mapping, and continuous CI/CD.",
            badgeText: "STEP 03",
            icon: "shield",
            buttonText: "Learn step 3",
          },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
      },
    },
    {
      id: "hover-expand-stack",
      name: "Dribbble Neon Gradient Feature Cards",
      description: "Dribbble-inspired neon gradient cards with glowing icon headers, pill feature tags, and call-to-action buttons.",
      badge: "Gradient Glow",
      previewType: "floating",
      applyProps: {
        variant: "hover-expand-stack",
        heading: "Choose the perfect build plan",
        subheading: "Scalable features and predictable pricing tailored to your growth.",
        items: [
          {
            title: "Starter Builder",
            description: "Everything you need to build and publish your first high-converting landing page.",
            icon: "zap",
            stat: "$19",
            metric: "/ month",
            badgeText: "STARTER",
            buttonText: "Start 14-Day Trial",
          },
          {
            title: "Pro Agency Workspace",
            description: "Full design system control, custom domain routing, and priority AI generation.",
            icon: "sparkles",
            stat: "$49",
            metric: "/ month",
            badgeText: "MOST POPULAR",
            buttonText: "Get Pro Access",
          },
          {
            title: "Enterprise Infrastructure",
            description: "Dedicated edge nodes, SSO authentication, custom SLA, and dedicated manager support.",
            icon: "shield",
            stat: "Custom",
            metric: "tailored billing",
            badgeText: "ENTERPRISE",
            buttonText: "Contact Sales",
          },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "80px",
        paddingX: "32px",
      },
    },
  ],
  footer: [
    {
      id: "multi-column-links",
      name: "Multi-Column Links & Socials",
      description: "Logo, brand tagline, multi-column navigation links, social icons, and copyright bar.",
      badge: "Popular",
      previewType: "grid",
      applyProps: {
        variant: "multi-column-links",
        logoText: "CraftSite",
        tagline: "Building the future of visual web creation, one section at a time.",
        copyright: "© 2026 CraftSite Inc. All rights reserved.",
        socialLinks: [
          { platform: "facebook", url: "https://facebook.com" },
          { platform: "github", url: "https://github.com" },
          { platform: "twitter", url: "https://twitter.com" },
          { platform: "instagram", url: "https://instagram.com" },
          { platform: "linkedin", url: "https://linkedin.com" },
        ],
        columns: [
          { title: "Product", links: ["Features", "Templates", "Integrations", "Changelog"] },
          { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
          { title: "Resources", links: ["Documentation", "Community", "Guides", "API Status"] },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "64px",
        paddingX: "32px",
        borderRadius: "0px",
      },
    },
    {
      id: "centered-minimal",
      name: "Centered Minimal Footer",
      description: "Clean centered logo, horizontal inline navigation links, social icons, and simple copyright.",
      badge: "Minimal",
      previewType: "centered",
      applyProps: {
        variant: "centered-minimal",
        logoText: "CraftSite",
        tagline: "Craft beautiful websites faster.",
        socialLinks: [
          { platform: "facebook", url: "https://facebook.com" },
          { platform: "github", url: "https://github.com" },
          { platform: "twitter", url: "https://twitter.com" },
          { platform: "instagram", url: "https://instagram.com" },
        ],
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Contact Us", href: "#" },
          { label: "Support", href: "#" },
        ],
        copyright: "© 2026 CraftSite. Built with passion.",
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "48px",
        paddingX: "32px",
        borderRadius: "0px",
      },
    },
    {
      id: "newsletter-split-footer",
      name: "Newsletter & Column Grid Split",
      description: "Email newsletter signup form on top paired with multi-column navigation links below.",
      badge: "High Engagement",
      previewType: "split",
      applyProps: {
        variant: "newsletter-split-footer",
        logoText: "CraftSite",
        tagline: "Subscribe to our newsletter for weekly web design inspiration and updates.",
        copyright: "© 2026 CraftSite Inc. All rights reserved.",
        columns: [
          { title: "Platform", links: ["Builder", "Hosting", "CMS", "Domains"] },
          { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "64px",
        paddingX: "32px",
        borderRadius: "0px",
      },
    },
    {
      id: "dark-tech-dock",
      name: "Dark Tech Dock & System Badge",
      description: "Modern dark developer dock with live system status badge, tech stack links, and social pills.",
      badge: "Sleek Tech",
      previewType: "boxed",
      applyProps: {
        variant: "dark-tech-dock",
        logoText: "CraftSite Dev",
        tagline: " All Systems Operational — Cloud Publishing Engine",
        copyright: "© 2026 CraftSite Infrastructure. Powered by DeepMind.",
        links: [
          { label: "System Status", href: "#" },
          { label: "API Docs", href: "#" },
          { label: "GitHub", href: "#" },
          { label: "Discord", href: "#" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "56px",
        paddingX: "32px",
        borderRadius: "0px",
      },
    },
    {
      id: "stacked-brand-statement",
      name: "Stacked Big Brand Watermark",
      description: "Bold statement typography footer with 2-column contact info and bottom legal bar.",
      badge: "Bold Impact",
      previewType: "centered",
      applyProps: {
        variant: "stacked-brand-statement",
        logoText: "CRAFTSITE",
        tagline: "THE VISUAL WEBSITE BUILDER FOR MODERN CREATORS",
        copyright: "© 2026 CRAFTSITE. ALL RIGHTS RESERVED.",
        links: [
          { label: "PRIVACY", href: "#" },
          { label: "TERMS", href: "#" },
          { label: "SECURITY", href: "#" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "72px",
        paddingX: "32px",
        borderRadius: "0px",
      },
    },
    {
      id: "compact-bottom-bar",
      name: "Compact 1-Row Bar",
      description: "Ultra-compact single row bottom strip with logo, copyright, and inline legal links.",
      badge: "Compact",
      previewType: "floating",
      applyProps: {
        variant: "compact-bottom-bar",
        logoText: "CraftSite",
        copyright: "© 2026 CraftSite.",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "24px",
        paddingX: "32px",
        borderRadius: "0px",
      },
    },
  ],
  cta: [
    {
      id: "full-width-primary",
      name: "Full-Width Primary Banner",
      description: "Bold full-bleed CTA section with primary background, dual buttons, and trust rating badge.",
      badge: "Popular",
      previewType: "centered",
      applyProps: {
        variant: "full-width-primary",
        heading: "Ready to ship your next page?",
        subheading: "Join thousands of makers designing and publishing live websites with CraftSite.",
        buttons: [
          { label: "Create Free Project", variant: "solid" },
          { label: "Contact Sales", variant: "outline" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "72px",
        paddingX: "32px",
        textAlign: "center",
        borderRadius: "0px",
      },
    },
    {
      id: "split-headline-cta",
      name: "Split 2-Column Headline & Dual Actions",
      description: "Headline and description on left paired directly with action buttons on right.",
      badge: "High Conversion",
      previewType: "split",
      applyProps: {
        variant: "split-headline-cta",
        heading: "Start building faster today",
        subheading: "Everything you need to launch beautiful, high-converting digital products.",
        buttons: [
          { label: "Start Free Trial", variant: "solid" },
          { label: "Schedule Demo", variant: "outline" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "64px",
        paddingX: "32px",
        textAlign: "left",
        borderRadius: "0px",
      },
    },
    {
      id: "newsletter-input-cta",
      name: "Inline Email Capture & Signup Strip",
      description: "Conversion-optimized CTA bar featuring an inline email input field + instant access button.",
      badge: "Lead Capture",
      previewType: "boxed",
      applyProps: {
        variant: "newsletter-input-cta",
        heading: "Get instant access to CraftSite Pro",
        subheading: "Enter your work email for a 14-day full feature trial and instant template downloads.",
        buttonText: "Claim Free Access",
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "64px",
        paddingX: "40px",
        borderRadius: "0px",
        textAlign: "center",
      },
    },
    {
      id: "gradient-glow-cta",
      name: "Gradient Glow Card & Checkmarks",
      description: "Radiant gradient background with top feature pill, primary CTA button, and benefit checkmarks.",
      badge: "Trending",
      previewType: "centered",
      applyProps: {
        variant: "gradient-glow-cta",
        heading: "Unlock unlimited site creation",
        subheading: "Scale your agency or startup with instant cloud publishing and visual component editing.",
        buttons: [{ label: "Upgrade Pro Plan", variant: "solid" }],
      },
      applyStyle: {
        textColor: "#ffffff",
        paddingY: "80px",
        paddingX: "32px",
        textAlign: "center",
        borderRadius: "0px",
      },
    },
    {
      id: "app-preview-cta",
      name: "Split Showcase & Visual Dashboard Card",
      description: "2-Column layout pairing value proposition & dual CTA buttons with a floating 3D dashboard card.",
      badge: "Visual Showcase",
      previewType: "split",
      applyProps: {
        variant: "app-preview-cta",
        heading: "Accelerate your workflow with live preview",
        subheading: "See changes instantly in real-time with responsive device previews and automatic code generation.",
        buttons: [
          { label: "Explore Platform", variant: "solid" },
          { label: "Watch Demo", variant: "outline" },
        ],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "72px",
        paddingX: "32px",
        textAlign: "left",
        borderRadius: "0px",
      },
    },
    {
      id: "minimal-inline-cta",
      name: "Compact Announcement Strip",
      description: "Clean, compact horizontal bar layout with title on left and action button on right.",
      badge: "Minimal",
      previewType: "floating",
      applyProps: {
        variant: "minimal-inline-cta",
        heading: "Want to see CraftSite in action?",
        subheading: "Watch our 2-minute product walkthrough video.",
        buttons: [{ label: "Watch Demo →", variant: "solid" }],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "32px",
        paddingX: "40px",
        borderRadius: "0px",
        textAlign: "left",
      },
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
  ],

  form: [
    {
      id: "classic-centered-form",
      name: "Classic Centered Card Form",
      description: "Centered, clean contact form card with input fields and full-width primary submit button.",
      badge: "Popular",
      previewType: "centered",
      applyProps: {
        variant: "classic-centered-form",
        heading: "Get in touch",
        subheading: "Have questions or want to start a project? Send us a message and we'll reply within 24 hours.",
        buttonText: "Send message",
        contactEmail: "hello@craftsite.io",
        contactPhone: "+1 (555) 234-5678",
        contactAddress: "795 Folsom St, San Francisco, CA",
      },
      applyStyle: {
        backgroundColor: "transparent",
        textColor: "#0f172a",
        paddingY: "64px",
        paddingX: "32px",
        textAlign: "center",
      },
    },
    {
      id: "split-contact-info-form",
      name: "2-Column Form & Contact Details",
      description: "Side-by-side layout: left column highlights phone, email, office location & hours; right column features the interactive message form.",
      badge: "High Conversion",
      previewType: "split",
      applyProps: {
        variant: "split-contact-info-form",
        heading: "Let's build something together",
        subheading: "Reach out directly or fill out the form and our team will get back to you shortly.",
        buttonText: "Send message",
        contactEmail: "contact@craftsite.io",
        contactPhone: "+1 (800) 555-0199",
        contactAddress: "100 Montgomery St, Suite 1400, San Francisco, CA",
        contactHours: "Mon - Fri, 9am - 6pm EST",
      },
      applyStyle: {
        backgroundColor: "transparent",
        textColor: "#0f172a",
        paddingY: "80px",
        paddingX: "32px",
        textAlign: "left",
      },
    },
    {
      id: "boxed-dark-glass-form",
      name: "Dark Glassmorphism Card",
      description: "Elevated dark mode card container with glowing border accent, subtle backdrop blur, and high-contrast inputs.",
      badge: "Modern",
      previewType: "boxed",
      applyProps: {
        variant: "boxed-dark-glass-form",
        heading: "Start a conversation",
        subheading: "Tell us about your team and vision. We'll tailor a custom solution for your enterprise.",
        buttonText: "Submit Inquiry",
        contactEmail: "enterprise@craftsite.io",
      },
      applyStyle: {
        backgroundColor: "transparent",
        textColor: "#ffffff",
        paddingY: "72px",
        paddingX: "40px",
        textAlign: "center",
      },
    },
    {
      id: "map-split-form",
      name: "Office Location & Contact Form",
      description: "2-Column layout featuring office location badge, interactive map visual card, and detailed contact inquiry form.",
      badge: "Business",
      previewType: "split",
      applyProps: {
        variant: "map-split-form",
        heading: "Visit our studio or drop a line",
        subheading: "We're based in downtown San Francisco, available for in-person meetings and virtual consultations.",
        buttonText: "Send message",
        contactEmail: "studio@craftsite.io",
        contactPhone: "+1 (415) 888-0123",
        contactAddress: "500 Howard Street, San Francisco, CA 94105",
      },
      applyStyle: {
        backgroundColor: "transparent",
        textColor: "#0f172a",
        paddingY: "80px",
        paddingX: "32px",
        textAlign: "left",
      },
    },
    {
      id: "compact-newsletter-contact",
      name: "Inline Quick Support Strip",
      description: "Compact horizontal strip layout for landing page footers with quick contact or sales inquiry fields.",
      badge: "Minimal",
      previewType: "floating",
      applyProps: {
        variant: "compact-newsletter-contact",
        heading: "Have questions before getting started?",
        subheading: "Enter your email and message for instant support callback.",
        buttonText: "Request Callback",
      },
      applyStyle: {
        backgroundColor: "transparent",
        textColor: "#ffffff",
        paddingY: "40px",
        paddingX: "40px",
        textAlign: "left",
      },
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
        type: "stats",
        props: {
          variant: "dark-stats-bar",
          heading: "",
          subheading: "",
          layoutMode: "grid",
          columns: 4,
          items: [],
        },
        style: {
          backgroundColor: "#0f172a",
          paddingY: "48px",
          paddingX: "32px",
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
          backgroundColor: "transparent",
          textColor: "#0f172a",
          paddingY: "64px", paddingX: "32px",
          textAlign: "center",
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
          backgroundColor: "transparent",
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
