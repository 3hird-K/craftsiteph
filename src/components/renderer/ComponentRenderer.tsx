import type { BuilderComponent, SiteTheme } from "@/lib/types";
import { styleToCss } from "@/lib/style";

type Props = {
  component: BuilderComponent;
  theme: SiteTheme;
  interactive?: boolean;
};

function Center({
  children,
  maxWidth,
  className = "",
  style,
}: {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`mx-auto w-full ${className}`}
      style={{ maxWidth: maxWidth || "1100px", ...style }}
    >
      {children}
    </div>
  );
}

export function ComponentRenderer({ component, theme, interactive = false }: Props) {
  const { type, props, style } = component;
  const css = styleToCss(style);
  const radius = style.borderRadius || theme.borderRadius || "12px";
  const primary = theme.primaryColor;

  if (type === "navbar") {
    return (
      <header style={css} className="w-full">
        <Center>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-lg font-bold tracking-tight">{props.logoText || "Brand"}</div>
            <nav className="flex flex-wrap items-center gap-5 text-sm opacity-90">
              {(props.links || []).map((link, i) => (
                <a
                  key={i}
                  href={interactive ? undefined : link.href}
                  className="transition hover:opacity-100 opacity-80"
                  onClick={interactive ? (e) => e.preventDefault() : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {props.buttonText ? (
              <a
                href={interactive ? undefined : props.buttonHref || "#"}
                onClick={interactive ? (e) => e.preventDefault() : undefined}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm"
                style={{ backgroundColor: primary, borderRadius: radius }}
              >
                {props.buttonText}
              </a>
            ) : null}
          </div>
        </Center>
      </header>
    );
  }

  if (type === "hero") {
    return (
      <section style={css} className="w-full">
        <Center className="flex flex-col items-center gap-6">
          <div className="max-w-3xl space-y-4" style={{ textAlign: style.textAlign || "center" }}>
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              style={{ lineHeight: 1.08, color: style.textColor || theme.textColor }}
            >
              {props.heading}
            </h1>
            {props.subheading ? (
              <p className="text-lg opacity-80 sm:text-xl" style={{ lineHeight: 1.6 }}>
                {props.subheading}
              </p>
            ) : null}
            {props.buttonText ? (
              <div className="pt-2">
                <a
                  href={interactive ? undefined : props.buttonHref || "#"}
                  onClick={interactive ? (e) => e.preventDefault() : undefined}
                  className="inline-flex items-center rounded-full px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:brightness-110"
                  style={{ backgroundColor: primary, borderRadius: radius }}
                >
                  {props.buttonText}
                </a>
              </div>
            ) : null}
          </div>
          {props.imageUrl ? (
            <div className="mt-4 w-full overflow-hidden shadow-2xl" style={{ borderRadius: radius, maxWidth: "900px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={props.imageUrl}
                alt={props.imageAlt || ""}
                className="h-auto w-full object-cover"
                style={{ maxHeight: 420 }}
              />
            </div>
          ) : null}
        </Center>
      </section>
    );
  }

  if (type === "heading") {
    return (
      <section style={css} className="w-full">
        <Center>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{props.heading}</h2>
          {props.subheading ? (
            <p className="mt-2 text-base opacity-70 sm:text-lg">{props.subheading}</p>
          ) : null}
        </Center>
      </section>
    );
  }

  if (type === "text") {
    return (
      <section style={css} className="w-full">
        <Center style={{ maxWidth: style.maxWidth || "720px" } as React.CSSProperties}>
          <p className="mx-auto" style={{ maxWidth: style.maxWidth || "720px" }}>
            {props.text}
          </p>
        </Center>
      </section>
    );
  }

  if (type === "button") {
    return (
      <section style={{ ...css, backgroundColor: css.backgroundColor === primary ? "transparent" : css.backgroundColor }} className="w-full">
        <Center>
          <div style={{ textAlign: style.textAlign || "center" }}>
            <a
              href={interactive ? undefined : props.buttonHref || "#"}
              onClick={interactive ? (e) => e.preventDefault() : undefined}
              className="inline-flex items-center px-6 py-3 font-semibold shadow-md transition hover:brightness-110"
              style={{
                backgroundColor: style.backgroundColor || primary,
                color: style.textColor || "#fff",
                borderRadius: style.borderRadius || radius,
                fontSize: style.fontSize || "16px",
              }}
            >
              {props.buttonText || "Button"}
            </a>
          </div>
        </Center>
      </section>
    );
  }

  if (type === "image") {
    return (
      <section style={css} className="w-full">
        <Center style={{ maxWidth: style.maxWidth || "960px" } as React.CSSProperties}>
          <div
            className="mx-auto overflow-hidden shadow-lg"
            style={{ borderRadius: radius, maxWidth: style.maxWidth || "960px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.imageUrl || ""}
              alt={props.imageAlt || ""}
              className="h-auto w-full object-cover"
            />
          </div>
        </Center>
      </section>
    );
  }

  if (type === "features" || type === "card-grid") {
    const cols = props.columns || 3;
    const isCards = type === "card-grid";
    return (
      <section style={css} className="w-full">
        <Center>
          {props.heading ? (
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              {props.heading}
            </h2>
          ) : null}
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(${cols >= 4 ? "180px" : "240px"}, 1fr))`,
              gap: style.gap || "20px",
            }}
          >
            {(props.items || []).map((item, i) => (
              <div
                key={i}
                className={
                  isCards
                    ? "flex flex-col gap-3 border border-black/5 bg-white p-6 shadow-sm"
                    : "flex flex-col gap-3 p-5"
                }
                style={{ borderRadius: radius }}
              >
                {item.icon ? <div className="text-3xl">{item.icon}</div> : null}
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-75">{item.description}</p>
              </div>
            ))}
          </div>
        </Center>
      </section>
    );
  }

  if (type === "stats") {
    return (
      <section style={css} className="w-full">
        <Center>
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
              textAlign: style.textAlign || "center",
            }}
          >
            {(props.items || []).map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">{item.title}</div>
                <div className="text-sm uppercase tracking-wider opacity-70">{item.description}</div>
              </div>
            ))}
          </div>
        </Center>
      </section>
    );
  }

  if (type === "testimonial") {
    return (
      <section style={css} className="w-full">
        <Center className="max-w-3xl">
          <blockquote className="mx-auto max-w-2xl text-xl font-medium leading-relaxed sm:text-2xl">
            {props.text}
          </blockquote>
          <div className="mt-8 flex flex-col items-center gap-3">
            {props.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={props.imageUrl}
                alt={props.heading || ""}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/50"
              />
            ) : null}
            <div>
              <div className="font-semibold">{props.heading}</div>
              <div className="text-sm opacity-70">{props.subheading}</div>
            </div>
          </div>
        </Center>
      </section>
    );
  }

  if (type === "cta") {
    return (
      <section style={css} className="w-full">
        <Center className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{props.heading}</h2>
          {props.subheading ? <p className="text-lg opacity-90">{props.subheading}</p> : null}
          {props.buttonText ? (
            <div className="pt-2">
              <a
                href={interactive ? undefined : props.buttonHref || "#"}
                onClick={interactive ? (e) => e.preventDefault() : undefined}
                className="inline-flex items-center px-6 py-3 text-base font-semibold shadow-lg transition hover:brightness-110"
                style={{
                  backgroundColor: "#ffffff",
                  color: style.backgroundColor || primary,
                  borderRadius: radius,
                }}
              >
                {props.buttonText}
              </a>
            </div>
          ) : null}
        </Center>
      </section>
    );
  }

  if (type === "form") {
    return (
      <section style={css} className="w-full">
        <Center>
          <div className="mx-auto w-full space-y-6" style={{ maxWidth: style.maxWidth || "560px" }}>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{props.heading}</h2>
              {props.subheading ? <p className="mt-2 opacity-70">{props.subheading}</p> : null}
            </div>
            <form
              className="space-y-4 text-left"
              onSubmit={interactive ? (e) => e.preventDefault() : undefined}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium opacity-80">Name</span>
                  <input
                    className="w-full border border-black/10 bg-white/80 px-3 py-2 outline-none ring-0 focus:border-black/30"
                    style={{ borderRadius: radius }}
                    placeholder="Jane Doe"
                    disabled={interactive}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium opacity-80">Email</span>
                  <input
                    type="email"
                    className="w-full border border-black/10 bg-white/80 px-3 py-2 outline-none focus:border-black/30"
                    style={{ borderRadius: radius }}
                    placeholder="jane@company.com"
                    disabled={interactive}
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block font-medium opacity-80">Message</span>
                <textarea
                  rows={4}
                  className="w-full border border-black/10 bg-white/80 px-3 py-2 outline-none focus:border-black/30"
                  style={{ borderRadius: radius }}
                  placeholder={props.placeholder || "Your message…"}
                  disabled={interactive}
                />
              </label>
              <button
                type="button"
                className="w-full px-4 py-3 font-semibold text-white shadow-md"
                style={{ backgroundColor: primary, borderRadius: radius }}
              >
                {props.buttonText || "Submit"}
              </button>
            </form>
          </div>
        </Center>
      </section>
    );
  }

  if (type === "spacer") {
    const height = style.padding || "40px 0";
    return <div style={{ ...css, padding: height, minHeight: 24 }} aria-hidden />;
  }

  if (type === "divider") {
    return (
      <div style={css} className="w-full">
        <Center>
          <hr style={{ borderColor: style.textColor || "#e2e8f0", borderTopWidth: 1 }} />
        </Center>
      </div>
    );
  }

  if (type === "footer") {
    return (
      <footer style={css} className="w-full">
        <Center className="space-y-6">
          <div className="text-lg font-bold text-white">{props.logoText || "Brand"}</div>
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm">
            {(props.links || []).map((link, i) => (
              <a
                key={i}
                href={interactive ? undefined : link.href}
                onClick={interactive ? (e) => e.preventDefault() : undefined}
                className="hover:opacity-100 opacity-80"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {props.socialLinks?.length ? (
            <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-wider opacity-70">
              {props.socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={interactive ? undefined : s.href}
                  onClick={interactive ? (e) => e.preventDefault() : undefined}
                >
                  {s.platform}
                </a>
              ))}
            </div>
          ) : null}
          <p className="text-sm opacity-60">{props.text}</p>
        </Center>
      </footer>
    );
  }

  return (
    <div style={css} className="p-4 text-sm opacity-60">
      Unknown component: {type}
    </div>
  );
}

export function PageRenderer({
  components,
  theme,
  interactive = false,
}: {
  components: BuilderComponent[];
  theme: SiteTheme;
  interactive?: boolean;
}) {
  return (
    <div
      className="min-h-full w-full"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {components.map((c) => (
        <ComponentRenderer key={c.id} component={c} theme={theme} interactive={interactive} />
      ))}
    </div>
  );
}
