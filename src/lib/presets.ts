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
  { type: "stats", label: "Stats", description: "Key metrics row", icon: "＃", category: "content" },
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
    {
      id: "footer-graphy",
      name: "Graphy Split Footer",
      description: "Clean split footer with 3 columns of links on the right, and social icons under the tagline on the left.",
      badge: "Clean",
      previewType: "grid",
      applyProps: {
        variant: "footer-graphy",
        logoText: "Graphy",
        tagline: "Graphy empowers teams to transform raw data into clear, compelling visuals — making insights easier to share, understand, and act on.",
        copyright: "© 2026 Graphy. All rights reserved.",
        columns: [
          { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
          { title: "Resources", links: ["Documentation", "Tutorials", "Blog", "Support"] },
          { title: "Company", links: ["About", "Careers", "Contact", "Partners"] },
        ],
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Cookies Settings", href: "#" },
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
      id: "footer-square-ui",
      name: "SquareUi Newsletter Footer",
      description: "Figma-style footer with 2 columns of links with arrows, and a newsletter signup form.",
      badge: "Modern",
      previewType: "split",
      applyProps: {
        variant: "footer-square-ui",
        logoText: "SquareUi",
        tagline: "The most Powerful Figma Ui Kit & Design System for designers.",
        copyright: "© 2026 SquareUi · All rights reserved",
        columns: [
          { title: "Company", links: ["Pricing", "Contact Us", "Become an Affiliate", "Projects"] },
          { title: "Socials", links: ["Behance", "Dribbble", "Twitter/X"] },
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
      id: "footer-azimute",
      name: "Azimute Contact Footer",
      description: "Corporate footer with detailed contact information column featuring icons, and a language selector.",
      badge: "Corporate",
      previewType: "grid",
      applyProps: {
        variant: "footer-azimute",
        logoText: "azimute",
        tagline: "Transformação digital que realmente funciona.",
        copyright: "© 2026 Azimute. Todos os direitos reservados.",
        columns: [
          { title: "Empresa", links: ["Sobre Nós", "Serviços", "Testemunhos", "Contacto"] },
          { title: "Navegação", links: ["Benefícios principais", "Os nossos serviços", "Porquê salesforce", "Testemunhos"] },
        ],
        links: [
          { label: "Termos e Condições", href: "#" },
          { label: "Política de Privacidade", href: "#" },
          { label: "Cookies", href: "#" },
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
      id: "footer-blue-office",
      name: "The Blue Office Wide Footer",
      description: "Wide 4-tier layout with business location info, 4 link columns, language dropdown, and centered social icons.",
      badge: "Business",
      previewType: "grid",
      applyProps: {
        variant: "footer-blue-office",
        logoText: "The Blue Office",
        tagline: "Built for innovation and success",
        copyright: "© 2026 - The Blue Office",
        columns: [
          { title: "Solutions", links: ["Virtual Office", "Flex Office", "Fixed Office"] },
          { title: "Locations", links: ["Aarhus", "Copenhagen", "Odense", "All Locations"] },
          { title: "Partnerships", links: ["Franchise", "Investor", "Affiliate"] },
          { title: "About", links: ["Contact", "Careers", "Our People", "Press"] },
        ],
        links: [
          { label: "Terms", href: "#" },
          { label: "Privacy", href: "#" },
          { label: "Cookies", href: "#" },
          { label: "Sitemap", href: "#" },
        ],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "64px",
        paddingX: "32px",
        borderRadius: "0px",
      },
    }
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
      id: "full-width-primary",
      name: "Full-Width Primary Banner",
      description: "Bold full-bleed CTA section with primary background and dual action buttons.",
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
      id: "boxed-glass-card",
      name: "Boxed Floating Glass Card",
      description: "Contained card CTA with rounded corners, shadow elevation, and clear action button.",
      badge: "Modern",
      previewType: "boxed",
      applyProps: {
        variant: "boxed-glass-card",
        heading: "Accelerate your workflow today",
        subheading: "Get instant access to production-ready design templates and visual site builder.",
        buttons: [{ label: "Get Started Now", variant: "solid" }],
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
      id: "split-headline-cta",
      name: "Split 2-Column Headline & Action",
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
      id: "gradient-glow-cta",
      name: "Gradient Glow & Announcement Badge",
      description: "Radiant gradient background with top feature pill and primary CTA button.",
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
      id: "minimal-inline-cta",
      name: "Minimalist Inline Strip",
      description: "Clean, compact horizontal bar layout with title on left and action button on right.",
      badge: "Minimal",
      previewType: "floating",
      applyProps: {
        variant: "minimal-inline-cta",
        heading: "Want to see it in action?",
        subheading: "Watch our 2-minute product walkthrough video.",
        buttons: [{ label: "Watch Demo →", variant: "solid" }],
      },
      applyStyle: {
        backgroundColor: "#f8fafc",
        textColor: "#0f172a",
        paddingY: "32px",
        paddingX: "40px",
        borderRadius: "0px",
        textAlign: "left",
      },
    },
    {
      id: "dark-card-badge",
      name: "Dark Elevated Card & Badge",
      description: "Sleek dark mode card container with highlight border and high-contrast action buttons.",
      badge: "Sleek",
      previewType: "boxed",
      applyProps: {
        variant: "dark-card-badge",
        heading: "Transform how you build for the web",
        subheading: "Join 50,000+ teams building next-generation websites faster than ever.",
        buttons: [{ label: "Join Waitlist", variant: "solid" }],
      },
      applyStyle: {
        backgroundColor: "transparent",
        paddingY: "64px",
        paddingX: "40px",
        borderRadius: "0px",
        textAlign: "center",
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
    {
      id: "light-stats-grid",
      name: "Light Stat Cards",
      description: "Clean light background metrics grid.",
      previewType: "boxed",
      applyProps: { columns: 4 },
      applyStyle: { backgroundColor: "#ffffff", textColor: "#0f172a", paddingY: "48px", paddingX: "32px" },
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
