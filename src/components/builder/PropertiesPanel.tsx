"use client";

import type { BuilderComponent, ComponentProps, ComponentStyle, ComponentType, SiteTheme } from "@/lib/types";
import { FONT_OPTIONS } from "@/lib/types";
import { PALETTE, COMPONENT_VARIANTS } from "@/lib/presets";
import { Badge } from "@/components/ui/badge";
import { Layers, Trash2, LayoutGrid, Sun, Moon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type Props = {
  component: BuilderComponent | null;
  theme: SiteTheme;
  components?: BuilderComponent[];
  onChangeProps: (id: string, props: Partial<ComponentProps>) => void;
  onChangeStyle: (id: string, style: Partial<ComponentStyle>) => void;
  onChangeTheme: (theme: Partial<SiteTheme>) => void;
  onDelete?: (id: string) => void;
  onOpenLayoutModal?: (id: string, type: ComponentType) => void;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      className={inputClass}
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// Removed SliderInput as it's no longer used

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      className={inputClass}
      placeholder={placeholder}
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function ColorInput({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        className="h-9 w-10 cursor-pointer rounded border border-border bg-background p-0.5"
        value={value && /^#([0-9a-f]{6})$/i.test(value) ? value : "#000000"}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        className={inputClass}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
      />
    </div>
  );
}

function SelectInput({
  value,
  onChange,
  options,
  disabled,
}: {
  value?: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
}) {
  const hasMatch = value ? options.some((o) => o.value === value) : true;
  const allOptions = !hasMatch && value ? [{ label: value, value }, ...options] : options;
  const currentOption = allOptions.find((o) => o.value === value);

  return (
    <Select value={value ?? ""} onValueChange={(v) => onChange(v)} disabled={disabled}>
      <SelectTrigger
        disabled={disabled}
        className={`w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground shadow-xs hover:bg-muted/50 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <SelectValue placeholder="Select option...">
          {currentOption ? currentOption.label : value || "Select..."}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-xl p-1 z-50">
        {allOptions.map((o, idx) => (
          <SelectItem
            key={`${o.value}-${idx}`}
            value={o.value}
            className="text-xs font-medium cursor-pointer rounded-lg py-2 focus:bg-primary/10 focus:text-primary transition-colors"
          >
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function LinkHrefSelect({
  value = "",
  onChange,
  components = [],
}: {
  value?: string;
  onChange: (v: string) => void;
  components?: BuilderComponent[];
}) {
  const isCustomState = Boolean(value && !value.startsWith("#") && value !== "#");

  const sectionOptions = components.map((c, idx) => {
    const sameType = components.slice(0, idx + 1).filter((item) => item.type === c.type);
    const typeIndex = sameType.length;
    const baseLabel = PALETTE.find((p) => p.type === c.type)?.label || c.type;
    const label = `${baseLabel} ${typeIndex}`;
    const anchorId = c.style.id || c.props.sectionId || `${c.type}-${typeIndex}`;
    return {
      label: `Section #${idx + 1}: ${label} (#${anchorId})`,
      value: `#${anchorId}`,
    };
  });

  const selectOptions = [
    { label: "Top of Page (#top)", value: "#top" },
    ...sectionOptions,
    { label: "Custom External URL (https://...)", value: "CUSTOM_URL" },
  ];

  const currentSelectValue = isCustomState ? "CUSTOM_URL" : value || "#top";

  return (
    <div className="space-y-1">
      <SelectInput
        value={currentSelectValue}
        onChange={(val) => {
          if (val !== "CUSTOM_URL") onChange(val);
        }}
        options={selectOptions}
      />
      {isCustomState && (
        <TextInput
          value={value}
          onChange={onChange}
          placeholder="https://example.com or mailto:user@example.com"
        />
      )}
    </div>
  );
}

export function PropertiesPanel({
  components = [],
  component,
  theme,
  onChangeProps,
  onChangeStyle,
  onChangeTheme,
  onDelete,
  onOpenLayoutModal,
}: Props) {
  const sameTypeComponents = component ? components.filter((c) => c.type === component.type) : [];
  const typeIndex = component ? sameTypeComponents.findIndex((c) => c.id === component.id) + 1 : 1;
  const baseLabel = component ? PALETTE.find((p) => p.type === component.type)?.label || component.type : "";
  const compLabel = component ? `${baseLabel} ${typeIndex}` : "";
  const defaultAnchorId = component ? `${component.type}-${typeIndex}` : "";

  return (
    <div className="flex h-full flex-col">
      {/* Panel Top Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-foreground">Design</h2>
          {component && (
            <Badge
              variant="secondary"
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
              style={{
                backgroundColor: `${theme.primaryColor || "#ea580c"}15`,
                color: theme.primaryColor || "#ea580c",
              }}
            >
              Editing {compLabel}
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {component
            ? `Customize colors and copy for selected ${compLabel}`
            : "Global page theme & colors"}
        </p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {component ? (
          <>
            {/* 1. LAYER STYLING FIRST */}
            <section className="space-y-3 p-3.5 rounded-2xl border border-border/80 bg-muted/20 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <h3
                  className="text-xs font-extrabold uppercase tracking-[0.12em]"
                  style={{ color: theme.primaryColor || "#ea580c" }}
                >
                  {compLabel} Layer Styles
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-semibold">Selected Block</span>
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(component.id)}
                      className="px-2 py-0.5 text-[10px] font-bold text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-md transition-all cursor-pointer flex items-center gap-1"
                      title={`Delete ${compLabel} Layer`}
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  )}
                </div>
              </div>

              {onOpenLayoutModal && COMPONENT_VARIANTS[component.type] && (
                <button
                  type="button"
                  onClick={() => onOpenLayoutModal(component.id, component.type)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Change {compLabel} Layout Design</span>
                </button>
              )}

              <Field label="Section Anchor ID (#id)">
                <TextInput
                  value={component.style.id || component.props.sectionId || defaultAnchorId}
                  onChange={(v) => {
                    const cleanId = v.replace(/^#/, "").trim();
                    onChangeStyle(component.id, { id: cleanId });
                    onChangeProps(component.id, { sectionId: cleanId });
                  }}
                  placeholder={`e.g. ${defaultAnchorId} or features`}
                />
              </Field>

              {component.type === "navbar" && (
                <Field label="Navbar Scroll Behavior">
                  <SelectInput
                    value={
                      component.props.variant === "floating-glass"
                        ? "overlay"
                        : (component.props.scrollBehavior || "overlay")
                    }
                    onChange={(v) =>
                      onChangeProps(component.id, { scrollBehavior: v as ComponentProps["scrollBehavior"] })
                    }
                    disabled={component.props.variant === "floating-glass"}
                    options={[
                      { label: "Overlay — floats over next section", value: "overlay" },
                      { label: "Sticky — pins to top on scroll", value: "sticky" },
                      { label: "Sticky + hide on scroll down", value: "sticky-hide" },
                      { label: "Static — scrolls away normally", value: "static" },
                    ]}
                  />
                  <p className="text-[10px] text-muted-foreground/70 leading-snug">
                    {component.props.variant === "floating-glass"
                      ? "Floating Glass always floats over the next section."
                      : "Overlay adds top clearance to the following section."}
                  </p>
                </Field>
              )}

              {component.type === "navbar" && (
                <Field label="Navbar Shadow">
                  <SelectInput
                    value={component.style.boxShadow || "none"}
                    onChange={(v) => onChangeStyle(component.id, { boxShadow: v })}
                    options={[
                      { label: "None", value: "none" },
                      { label: "Small", value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" },
                      { label: "Medium", value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
                      { label: "Large", value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
                      { label: "Extra Large", value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
                    ]}
                  />
                </Field>
              )}

              {component.type === "navbar" && (
                <Field label="Navbar Height">
                  <SelectInput
                    value={component.style.paddingY || "16px"}
                    onChange={(v) => onChangeStyle(component.id, { paddingY: v })}
                    options={[
                      { label: "Compact (8px)", value: "8px" },
                      { label: "Slim (12px)", value: "12px" },
                      { label: "Normal (16px)", value: "16px" },
                      { label: "Tall (20px)", value: "20px" },
                      { label: "Extra Tall (28px)", value: "28px" },
                    ]}
                  />
                  <p className="text-[10px] text-muted-foreground/70 leading-snug">
                    Adjusts the vertical padding of the navbar bar.
                  </p>
                </Field>
              )}

              {component.type !== "navbar" && (
                <Field label={`${compLabel} Background`}>
                  <ColorInput
                    value={
                      component.style.backgroundColor === "#ea580c" ||
                      component.style.backgroundColor === "#4f46e5" ||
                      component.style.backgroundColor === "#4F46E5" ||
                      !component.style.backgroundColor
                        ? "#f0f9ff"
                        : component.style.backgroundColor
                    }
                    onChange={(v) => onChangeStyle(component.id, { backgroundColor: v })}
                  />
                </Field>
              )}



              {component.type === "spacer" && (
                <Field label="Spacer Height">
                  <SelectInput
                    value={component.style.padding || "40px 0"}
                    onChange={(v) => onChangeStyle(component.id, { padding: v })}
                    options={[
                      { label: "Small (24px)", value: "24px 0" },
                      { label: "Medium (40px)", value: "40px 0" },
                      { label: "Large (64px)", value: "64px 0" },
                      { label: "XL (96px)", value: "96px 0" },
                    ]}
                  />
                </Field>
              )}
            </section>

            {/* 2. LAYER CONTENT & COPY SECOND */}
            <section className="space-y-3.5 p-3.5 rounded-2xl border border-border/80 bg-background shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-foreground">
                Content & Copy
              </h3>
              {"logoText" in component.props ||
              component.type === "navbar" ||
              component.type === "footer" ? (
                <div className="space-y-3">
                  <Field label="Logo / Brand Title">
                    <TextInput
                      value={component.props.logoText}
                      onChange={(v) => onChangeProps(component.id, { logoText: v })}
                    />
                  </Field>
                  <div className="space-y-2.5 pt-2 border-t border-border/50">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Logo Font & Style
                    </div>
                    <Field label="Font Family">
                      <SelectInput
                        value={component.props.logoFontFamily || ""}
                        onChange={(v) => onChangeProps(component.id, { logoFontFamily: v || undefined })}
                        options={[
                          { label: "Default (Theme Font)", value: "" },
                          { label: "Inter", value: "Inter, system-ui, sans-serif" },
                          { label: "Playfair Display (Serif)", value: '"Playfair Display", Georgia, serif' },
                          { label: "Outfit", value: '"Outfit", system-ui, sans-serif' },
                          { label: "Poppins", value: '"Poppins", system-ui, sans-serif' },
                          { label: "Roboto", value: "Roboto, system-ui, sans-serif" },
                          { label: "Cinzel", value: '"Cinzel", serif' },
                          { label: "Pacifico (Cursive)", value: '"Pacifico", cursive' },
                          { label: "Plus Jakarta Sans", value: '"Plus Jakarta Sans", sans-serif' },
                          { label: "Lora (Serif)", value: '"Lora", serif' },
                          { label: "IBM Plex Mono", value: '"IBM Plex Mono", monospace' },
                          { label: "Space Grotesk", value: '"Space Grotesk", sans-serif' },
                        ]}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Font Size">
                        <SelectInput
                          value={component.props.logoFontSize || ""}
                          onChange={(v) => onChangeProps(component.id, { logoFontSize: v || undefined })}
                          options={[
                            { label: "Default (18px)", value: "" },
                            { label: "14px", value: "14px" },
                            { label: "16px", value: "16px" },
                            { label: "18px", value: "18px" },
                            { label: "20px", value: "20px" },
                            { label: "24px", value: "24px" },
                            { label: "28px", value: "28px" },
                            { label: "32px", value: "32px" },
                            { label: "36px", value: "36px" },
                          ]}
                        />
                      </Field>
                      <Field label="Font Weight">
                        <SelectInput
                          value={component.props.logoFontWeight || ""}
                          onChange={(v) => onChangeProps(component.id, { logoFontWeight: v || undefined })}
                          options={[
                            { label: "Default (800)", value: "" },
                            { label: "Normal (400)", value: "400" },
                            { label: "Medium (500)", value: "500" },
                            { label: "Semibold (600)", value: "600" },
                            { label: "Bold (700)", value: "700" },
                            { label: "Extrabold (800)", value: "800" },
                            { label: "Black (900)", value: "900" },
                          ]}
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Font Style">
                        <SelectInput
                          value={component.props.logoFontStyle || "normal"}
                          onChange={(v) => onChangeProps(component.id, { logoFontStyle: v || "normal" })}
                          options={[
                            { label: "Normal", value: "normal" },
                            { label: "Italic", value: "italic" },
                          ]}
                        />
                      </Field>
                      <Field label="Text Case">
                        <SelectInput
                          value={component.props.logoTextTransform || "none"}
                          onChange={(v) => onChangeProps(component.id, { logoTextTransform: v || "none" })}
                          options={[
                            { label: "As Typed", value: "none" },
                            { label: "UPPERCASE", value: "uppercase" },
                            { label: "lowercase", value: "lowercase" },
                            { label: "Capitalize", value: "capitalize" },
                          ]}
                        />
                      </Field>
                    </div>
                    <Field label="Logo Color">
                      <ColorInput
                        value={component.props.logoColor}
                        onChange={(v) => onChangeProps(component.id, { logoColor: v })}
                      />
                    </Field>
                  </div>
                </div>
              ) : null}
              {component.props.heading !== undefined ||
              ["hero", "heading", "features", "card-grid", "cta", "form", "testimonial", "footer"].includes(
                component.type,
              ) ? (
                <Field label="Heading / Newsletter Title">
                  <TextInput
                    value={component.props.heading}
                    onChange={(v) => onChangeProps(component.id, { heading: v })}
                  />
                </Field>
              ) : null}
              {component.props.subheading !== undefined ||
              ["hero", "heading", "cta", "form", "testimonial"].includes(component.type) ? (
                <Field label="Subheading">
                  <TextArea
                    value={component.props.subheading}
                    onChange={(v) => onChangeProps(component.id, { subheading: v })}
                  />
                </Field>
              ) : null}
              {component.type === "form" && (
                <>
                  <Field label="Button Text">
                    <TextInput
                      value={component.props.buttonText || "Send message"}
                      onChange={(v) => onChangeProps(component.id, { buttonText: v })}
                    />
                  </Field>
                  <Field label="Contact Email">
                    <TextInput
                      value={component.props.contactEmail || "hello@craftsite.io"}
                      onChange={(v) => onChangeProps(component.id, { contactEmail: v })}
                    />
                  </Field>
                  <Field label="Phone Number">
                    <TextInput
                      value={component.props.contactPhone || "+1 (555) 234-5678"}
                      onChange={(v) => onChangeProps(component.id, { contactPhone: v })}
                    />
                  </Field>
                  <Field label="Office Address / Location">
                    <TextInput
                      value={component.props.contactAddress || "795 Folsom St, San Francisco, CA"}
                      onChange={(v) => onChangeProps(component.id, { contactAddress: v })}
                    />
                  </Field>
                  <Field label="Business Hours / Subtext">
                    <TextInput
                      value={component.props.contactHours || "Mon - Fri, 9am - 6pm EST"}
                      onChange={(v) => onChangeProps(component.id, { contactHours: v })}
                    />
                  </Field>
                </>
              )}
              {component.type === "footer" && (
                <>
                  <Field label="Tagline / Brand Subtext">
                    <TextInput
                      value={component.props.tagline}
                      onChange={(v) => onChangeProps(component.id, { tagline: v })}
                    />
                  </Field>
                  <Field label="Copyright Line">
                    <TextInput
                      value={component.props.copyright}
                      onChange={(v) => onChangeProps(component.id, { copyright: v })}
                    />
                  </Field>
                </>
              )}
              {component.props.text !== undefined ||
              ["text", "testimonial"].includes(component.type) ? (
                <Field label="Text / Paragraph">
                  <TextArea
                    value={component.props.text}
                    onChange={(v) => onChangeProps(component.id, { text: v })}
                    rows={4}
                  />
                </Field>
              ) : null}
              {/* BUTTONS REPEATER */}
              {(Array.isArray(component.props.buttons) || component.props.buttonText !== undefined ||
                ["navbar", "hero", "button", "cta", "form", "footer"].includes(component.type)) && (
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">Buttons (Component Style)</span>
                    <button
                      type="button"
                      className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                      onClick={() => {
                        const currentButtons = component.props.buttons || (component.props.buttonText ? [{ label: component.props.buttonText, variant: "solid" as const }] : []);
                        onChangeProps(component.id, {
                          buttons: [
                            ...currentButtons,
                            { label: "New Button", variant: currentButtons.length ? "outline" : "solid" },
                          ],
                          buttonText: undefined,
                        });
                      }}
                    >
                      + Add Button
                    </button>
                  </div>
                  {(() => {
                    const currentButtons = component.props.buttons || (component.props.buttonText ? [{ label: component.props.buttonText, href: component.props.buttonHref, variant: "solid" as const }] : []);
                    return currentButtons.map((btn, idx) => (
                      <div key={idx} className="rounded-xl border border-border/80 bg-muted/20 p-2.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase text-muted-foreground">
                            Button #{idx + 1}
                          </span>
                          <button
                            type="button"
                            className="text-[10px] text-destructive hover:underline font-semibold cursor-pointer"
                            onClick={() => {
                              const next = currentButtons.filter((_, i) => i !== idx);
                              onChangeProps(component.id, { buttons: next, buttonText: undefined });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <TextInput
                            value={btn.label}
                            placeholder="Button Text"
                            onChange={(v) => {
                              const next = [...currentButtons];
                              next[idx] = { ...next[idx], label: v };
                              onChangeProps(component.id, { buttons: next, buttonText: undefined });
                            }}
                          />
                          <div className="grid grid-cols-1 gap-2">
                            <LinkHrefSelect
                              value={btn.href}
                              components={components}
                              onChange={(v) => {
                                const next = [...currentButtons];
                                next[idx] = { ...next[idx], href: v };
                                onChangeProps(component.id, { buttons: next, buttonText: undefined });
                              }}
                            />
                            <SelectInput
                              value={btn.variant || "solid"}
                              onChange={(v) => {
                                const next = [...currentButtons];
                                next[idx] = { ...next[idx], variant: v as any };
                                onChangeProps(component.id, { buttons: next, buttonText: undefined });
                              }}
                              options={[
                                { label: "Solid", value: "solid" },
                                { label: "Outline", value: "outline" },
                                { label: "Ghost", value: "ghost" },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
              {component.props.imageUrl !== undefined ||
              ["hero", "image", "testimonial"].includes(component.type) ? (
                <div className="space-y-3">
                  <Field label="Image URL">
                    <TextInput
                      value={component.props.imageUrl}
                      onChange={(v) => onChangeProps(component.id, { imageUrl: v })}
                      placeholder="https://..."
                    />
                  </Field>
                  {["hero", "image"].includes(component.type) || component.props.imageUrl ? (
                    <Field label="Image / Grid Side">
                      <SelectInput
                        value={component.props.imagePosition || (component.props.reverseLayout ? "left" : "right")}
                        onChange={(v) =>
                          onChangeProps(component.id, {
                            imagePosition: v as "left" | "right",
                            reverseLayout: v === "left",
                          })
                        }
                        options={[
                          { label: "Image Right, Text Left (Default)", value: "right" },
                          { label: "Image Left, Text Right (Swapped)", value: "left" },
                        ]}
                      />
                    </Field>
                  ) : null}
                </div>
              ) : null}

              {/* NAVIGATION LINKS REPEATER (Navbar & Footer) */}
              {(Array.isArray(component.props.links) ||
                component.type === "navbar" ||
                component.type === "footer") && (
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">Navigation Links</span>
                    <button
                      type="button"
                      className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                      onClick={() =>
                        onChangeProps(component.id, {
                          links: [
                            ...(component.props.links || []),
                            {
                              label: `Link ${(component.props.links || []).length + 1}`,
                              href: "#",
                            },
                          ],
                        })
                      }
                    >
                      + Add Link
                    </button>
                  </div>
                  {(component.props.links || []).map((link, idx) => (
                    <div key={idx} className="rounded-xl border border-border/80 bg-muted/20 p-2.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-muted-foreground">
                          Link #{idx + 1}
                        </span>
                        <button
                          type="button"
                          className="text-[10px] text-destructive hover:underline font-semibold cursor-pointer"
                          onClick={() => {
                            const next = (component.props.links || []).filter((_, i) => i !== idx);
                            onChangeProps(component.id, { links: next });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <TextInput
                          value={link.label}
                          placeholder="Label (e.g. Home)"
                          onChange={(v) => {
                            const next = [...(component.props.links || [])];
                            next[idx] = { ...next[idx], label: v };
                            onChangeProps(component.id, { links: next });
                          }}
                        />
                        <div className="grid grid-cols-1 gap-2">
                          <LinkHrefSelect
                            value={link.href}
                            components={components}
                            onChange={(v) => {
                              const next = [...(component.props.links || [])];
                              next[idx] = { ...next[idx], href: v };
                              onChangeProps(component.id, { links: next });
                            }}
                          />
                          <SelectInput
                            value={link.variant || "default"}
                            onChange={(v) => {
                              const next = [...(component.props.links || [])];
                              next[idx] = { ...next[idx], variant: v as any };
                              onChangeProps(component.id, { links: next });
                            }}
                            options={[
                              { label: "Default", value: "default" },
                              { label: "Bold", value: "bold" },
                              { label: "Muted", value: "muted" },
                              { label: "Button", value: "button" },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SOCIAL LINKS REPEATER (Footer) */}
              {(Array.isArray(component.props.socialLinks) || component.type === "footer") && (
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">Social Links</span>
                    <button
                      type="button"
                      className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                      onClick={() =>
                        onChangeProps(component.id, {
                          socialLinks: [
                            ...(component.props.socialLinks || []),
                            {
                              platform: "Twitter",
                              href: "#",
                            },
                          ],
                        })
                      }
                    >
                      + Add Social Link
                    </button>
                  </div>
                  {(component.props.socialLinks || []).map((s, idx) => (
                    <div key={idx} className="rounded-xl border border-border/80 bg-muted/20 p-2.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-muted-foreground">
                          Social #{idx + 1}
                        </span>
                        <button
                          type="button"
                          className="text-[10px] text-destructive hover:underline font-semibold cursor-pointer"
                          onClick={() => {
                            const next = (component.props.socialLinks || []).filter((_, i) => i !== idx);
                            onChangeProps(component.id, { socialLinks: next });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <TextInput
                          value={s.platform}
                          placeholder="Platform (e.g. Twitter)"
                          onChange={(v) => {
                            const next = [...(component.props.socialLinks || [])];
                            next[idx] = { ...next[idx], platform: v };
                            onChangeProps(component.id, { socialLinks: next });
                          }}
                        />
                        <TextInput
                          value={s.href}
                          placeholder="URL / Href (#)"
                          onChange={(v) => {
                            const next = [...(component.props.socialLinks || [])];
                            next[idx] = { ...next[idx], href: v };
                            onChangeProps(component.id, { socialLinks: next });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CARD / FEATURE ITEMS REPEATER */}
              {Array.isArray(component.props.items) && (
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">Repeater Items</span>
                    <button
                      type="button"
                      className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                      onClick={() =>
                        onChangeProps(component.id, {
                          items: [
                            ...(component.props.items || []),
                            {
                              title: `New Item ${(component.props.items || []).length + 1}`,
                              description: "Item description text.",
                              icon: "✦",
                            },
                          ],
                        })
                      }
                    >
                      + Add Item
                    </button>
                  </div>
                  {(component.props.items || []).map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-border bg-muted/20 p-2.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">
                          Item #{idx + 1}
                        </span>
                        <button
                          type="button"
                          className="text-[10px] text-destructive hover:underline font-semibold cursor-pointer"
                          onClick={() => {
                            const next = (component.props.items || []).filter((_, i) => i !== idx);
                            onChangeProps(component.id, { items: next });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <TextInput
                        value={item.title}
                        placeholder="Title"
                        onChange={(v) => {
                          const next = [...(component.props.items || [])];
                          next[idx] = { ...next[idx], title: v };
                          onChangeProps(component.id, { items: next });
                        }}
                      />
                      <TextArea
                        value={item.description}
                        placeholder="Description"
                        rows={2}
                        onChange={(v) => {
                          const next = [...(component.props.items || [])];
                          next[idx] = { ...next[idx], description: v };
                          onChangeProps(component.id, { items: next });
                        }}
                      />
                    </div>
                  ))}

                  {component.props.columns !== undefined && (
                    <Field label="Columns">
                      <SelectInput
                        value={String(component.props.columns || 3)}
                        onChange={(v) => onChangeProps(component.id, { columns: Number(v) })}
                        options={[
                          { label: "2 Columns", value: "2" },
                          { label: "3 Columns", value: "3" },
                          { label: "4 Columns", value: "4" },
                        ]}
                      />
                    </Field>
                  )}
                </div>
              )}
            </section>

            {/* 3. GLOBAL PAGE THEME AT THE BOTTOM */}
            <section className="space-y-3 pt-4 border-t border-border/80">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
                  Global Page Theme
                </h3>
                <span className="text-[9px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">Page-wide</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-tight">
                Controls overall page canvas background & global palette.
              </p>
              <Field label="Theme Mode">
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted/60 rounded-xl border border-border/80">
                  <button
                    type="button"
                    onClick={() => onChangeTheme({ mode: "light", backgroundColor: "#f1f5f9", textColor: "#0f172a", headingColor: "#0f172a", bodyColor: "#334155" })}
                    className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      (theme.mode || "light") === "light"
                        ? "bg-background text-foreground shadow-xs border border-border/60"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Sun className="h-3.5 w-3.5" />
                    Light Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeTheme({ mode: "dark", backgroundColor: "#000000", textColor: "#f8fafc", headingColor: "#f8fafc", bodyColor: "#e2e8f0" })}
                    className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      theme.mode === "dark"
                        ? "bg-background text-foreground shadow-xs border border-border/60"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Moon className="h-3.5 w-3.5" />
                    Dark Mode
                  </button>
                </div>
              </Field>
              <Field label="Global Container Width">
                <SelectInput
                  value={theme.containerWidth || "1120px"}
                  onChange={(v) => onChangeTheme({ containerWidth: v })}
                  options={[
                    { label: "Standard (1120px)", value: "1120px" },
                    { label: "Wide (1280px)", value: "1280px" },
                    { label: "Compact (960px)", value: "960px" },
                    { label: "Narrow (800px)", value: "800px" },
                    { label: "Full Width (100%)", value: "100%" },
                  ]}
                />
              </Field>
              <Field label="Primary Color">
                <ColorInput
                  value={theme.primaryColor}
                  onChange={(v) => onChangeTheme({ primaryColor: v })}
                />
              </Field>
              <Field label="Secondary Color">
                <ColorInput
                  value={theme.secondaryColor}
                  onChange={(v) => onChangeTheme({ secondaryColor: v })}
                />
              </Field>
              {/* Headings & Titles Settings */}
              <div className="space-y-3 p-3.5 rounded-xl border border-border/80 bg-muted/20">
                <div className="flex items-center gap-1.5 pb-1 border-b border-border/50">
                  <span className="text-[11px] font-extrabold text-foreground uppercase tracking-wide">
                    Headings & Titles (H1–H6)
                  </span>
                </div>
                <Field label="Heading Font Family">
                  <SelectInput
                    value={theme.headingFontFamily || theme.fontFamily}
                    onChange={(v) => onChangeTheme({ headingFontFamily: v })}
                    options={FONT_OPTIONS}
                  />
                </Field>
                <Field label="Heading Text Color">
                  <ColorInput
                    value={theme.headingColor || theme.textColor}
                    onChange={(v) => onChangeTheme({ headingColor: v })}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Font Weight">
                    <SelectInput
                      value={theme.headingWeight || "800"}
                      onChange={(v) => onChangeTheme({ headingWeight: v })}
                      options={[
                        { label: "Semi-Bold (600)", value: "600" },
                        { label: "Bold (700)", value: "700" },
                        { label: "Extra Bold (800)", value: "800" },
                        { label: "Black (900)", value: "900" },
                      ]}
                    />
                  </Field>
                  <Field label="Text Case">
                    <SelectInput
                      value={theme.headingTransform || "none"}
                      onChange={(v) => onChangeTheme({ headingTransform: v })}
                      options={[
                        { label: "As Typed", value: "none" },
                        { label: "UPPERCASE", value: "uppercase" },
                        { label: "Capitalize", value: "capitalize" },
                      ]}
                    />
                  </Field>
                </div>
              </div>

              {/* Body Text & Paragraph Settings */}
              <div className="space-y-3 p-3.5 rounded-xl border border-border/80 bg-muted/20">
                <div className="flex items-center gap-1.5 pb-1 border-b border-border/50">
                  <span className="text-[11px] font-extrabold text-foreground uppercase tracking-wide">
                    Body Text & Paragraphs
                  </span>
                </div>
                <Field label="Body Font Family">
                  <SelectInput
                    value={theme.bodyFontFamily || theme.fontFamily}
                    onChange={(v) => onChangeTheme({ bodyFontFamily: v })}
                    options={FONT_OPTIONS}
                  />
                </Field>
                <Field label="Body Text Color">
                  <ColorInput
                    value={theme.bodyColor || theme.textColor}
                    onChange={(v) => onChangeTheme({ bodyColor: v })}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Base Font Size">
                    <SelectInput
                      value={theme.bodyFontSize || "16px"}
                      onChange={(v) => onChangeTheme({ bodyFontSize: v })}
                      options={[
                        { label: "Small (14px)", value: "14px" },
                        { label: "Medium (15px)", value: "15px" },
                        { label: "Standard (16px)", value: "16px" },
                        { label: "Large (18px)", value: "18px" },
                        { label: "Extra Large (20px)", value: "20px" },
                      ]}
                    />
                  </Field>
                  <Field label="Line Height">
                    <SelectInput
                      value={theme.bodyLineHeight || "1.6"}
                      onChange={(v) => onChangeTheme({ bodyLineHeight: v })}
                      options={[
                        { label: "Compact (1.4)", value: "1.4" },
                        { label: "Standard (1.6)", value: "1.6" },
                        { label: "Relaxed (1.8)", value: "1.8" },
                        { label: "Spaced (2.0)", value: "2.0" },
                      ]}
                    />
                  </Field>
                </div>
              </div>

              {/* Global Colors & Styling */}
              <div className="space-y-3 p-3.5 rounded-xl border border-border/80 bg-muted/20">
                <div className="flex items-center gap-1.5 pb-1 border-b border-border/50">
                  <span className="text-[11px] font-extrabold text-foreground uppercase tracking-wide">
                    Colors & Layout
                  </span>
                </div>
                <Field label="Global Container Width">
                  <SelectInput
                    value={theme.containerWidth || "1120px"}
                    onChange={(v) => onChangeTheme({ containerWidth: v })}
                    options={[
                      { label: "Standard (1120px)", value: "1120px" },
                      { label: "Wide (1280px)", value: "1280px" },
                      { label: "Compact (960px)", value: "960px" },
                      { label: "Narrow (800px)", value: "800px" },
                      { label: "Full Width (100%)", value: "100%" },
                    ]}
                  />
                </Field>
                <Field label="Primary Color">
                  <ColorInput
                    value={theme.primaryColor}
                    onChange={(v) => onChangeTheme({ primaryColor: v })}
                  />
                </Field>
                <Field label="Secondary Color">
                  <ColorInput
                    value={theme.secondaryColor}
                    onChange={(v) => onChangeTheme({ secondaryColor: v })}
                  />
                </Field>
                <Field label="Accent Color">
                  <ColorInput
                    value={theme.accentColor}
                    onChange={(v) => onChangeTheme({ accentColor: v })}
                  />
                </Field>
                <Field label="Global Page Background">
                  <ColorInput
                    value={
                      theme.mode === "dark"
                        ? (theme.backgroundColor || "#000000")
                        : (!theme.backgroundColor || theme.backgroundColor === "#ffffff" || theme.backgroundColor === "#f8fafc" ? "#f1f5f9" : theme.backgroundColor)
                    }
                    onChange={(v) => onChangeTheme({ backgroundColor: v })}
                  />
                </Field>
                <Field label="Global Base Text Color">
                  <ColorInput
                    value={
                      theme.mode === "dark"
                        ? (theme.textColor || "#f8fafc")
                        : (theme.textColor || "#0f172a")
                    }
                    onChange={(v) => onChangeTheme({ textColor: v })}
                  />
                </Field>
                <Field label="Default Corner Radius">
                  <SelectInput
                    value={theme.borderRadius}
                    onChange={(v) => onChangeTheme({ borderRadius: v })}
                    options={[
                      { label: "Sharp (0px)", value: "0px" },
                      { label: "Soft (8px)", value: "8px" },
                      { label: "Rounded (12px)", value: "12px" },
                      { label: "Large (16px)", value: "16px" },
                      { label: "Pill (24px)", value: "24px" },
                      { label: "Full Pill (9999px)", value: "9999px" },
                    ]}
                  />
                </Field>
                <Field label="Default Box Shadow">
                  <SelectInput
                    value={theme.boxShadow || "none"}
                    onChange={(v) => onChangeTheme({ boxShadow: v })}
                    options={[
                      { label: "None (Flat)", value: "none" },
                      { label: "Subtle Soft", value: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)" },
                      { label: "Medium Card", value: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)" },
                      { label: "Elevated High", value: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" },
                      { label: "Floating Glow", value: "0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1)" },
                    ]}
                  />
                </Field>
              </div>
            </section>
          </>
        ) : (
          /* NO COMPONENT SELECTED VIEW */
          <div className="space-y-6">
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-5 text-center text-xs text-muted-foreground">
              <Layers className="h-6 w-6 mx-auto mb-2 text-muted-foreground/60" />
              <p className="font-bold text-foreground">No Block Selected</p>
              <p className="mt-1 text-[11px] leading-relaxed">
                Click any component on the canvas to customize its specific layer background color, text, and layout.
              </p>
            </div>

            {/* GLOBAL THEME SECTION */}
            <section className="space-y-4 pt-2">
              <h3
                className="text-xs font-extrabold uppercase tracking-[0.12em]"
                style={{ color: theme.primaryColor || "#ea580c" }}
              >
                Global Page Theme
              </h3>

              {/* Headings & Titles Settings */}
              <div className="space-y-3 p-3.5 rounded-xl border border-border/80 bg-muted/20">
                <div className="flex items-center gap-1.5 pb-1 border-b border-border/50">
                  <span className="text-[11px] font-extrabold text-foreground uppercase tracking-wide">
                    Headings & Titles (H1–H6)
                  </span>
                </div>
                <Field label="Heading Font Family">
                  <SelectInput
                    value={theme.headingFontFamily || theme.fontFamily}
                    onChange={(v) => onChangeTheme({ headingFontFamily: v })}
                    options={FONT_OPTIONS}
                  />
                </Field>
                <Field label="Heading Text Color">
                  <ColorInput
                    value={theme.headingColor || theme.textColor}
                    onChange={(v) => onChangeTheme({ headingColor: v })}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Font Weight">
                    <SelectInput
                      value={theme.headingWeight || "800"}
                      onChange={(v) => onChangeTheme({ headingWeight: v })}
                      options={[
                        { label: "Semi-Bold (600)", value: "600" },
                        { label: "Bold (700)", value: "700" },
                        { label: "Extra Bold (800)", value: "800" },
                        { label: "Black (900)", value: "900" },
                      ]}
                    />
                  </Field>
                  <Field label="Text Case">
                    <SelectInput
                      value={theme.headingTransform || "none"}
                      onChange={(v) => onChangeTheme({ headingTransform: v })}
                      options={[
                        { label: "As Typed", value: "none" },
                        { label: "UPPERCASE", value: "uppercase" },
                        { label: "Capitalize", value: "capitalize" },
                      ]}
                    />
                  </Field>
                </div>
              </div>

              {/* Body Text & Paragraph Settings */}
              <div className="space-y-3 p-3.5 rounded-xl border border-border/80 bg-muted/20">
                <div className="flex items-center gap-1.5 pb-1 border-b border-border/50">
                  <span className="text-[11px] font-extrabold text-foreground uppercase tracking-wide">
                    Body Text & Paragraphs
                  </span>
                </div>
                <Field label="Body Font Family">
                  <SelectInput
                    value={theme.bodyFontFamily || theme.fontFamily}
                    onChange={(v) => onChangeTheme({ bodyFontFamily: v })}
                    options={FONT_OPTIONS}
                  />
                </Field>
                <Field label="Body Text Color">
                  <ColorInput
                    value={theme.bodyColor || theme.textColor}
                    onChange={(v) => onChangeTheme({ bodyColor: v })}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Base Font Size">
                    <SelectInput
                      value={theme.bodyFontSize || "16px"}
                      onChange={(v) => onChangeTheme({ bodyFontSize: v })}
                      options={[
                        { label: "Small (14px)", value: "14px" },
                        { label: "Medium (15px)", value: "15px" },
                        { label: "Standard (16px)", value: "16px" },
                        { label: "Large (18px)", value: "18px" },
                        { label: "Extra Large (20px)", value: "20px" },
                      ]}
                    />
                  </Field>
                  <Field label="Line Height">
                    <SelectInput
                      value={theme.bodyLineHeight || "1.6"}
                      onChange={(v) => onChangeTheme({ bodyLineHeight: v })}
                      options={[
                        { label: "Compact (1.4)", value: "1.4" },
                        { label: "Standard (1.6)", value: "1.6" },
                        { label: "Relaxed (1.8)", value: "1.8" },
                        { label: "Spaced (2.0)", value: "2.0" },
                      ]}
                    />
                  </Field>
                </div>
              </div>

              {/* Global Colors & Styling */}
              <div className="space-y-3 p-3.5 rounded-xl border border-border/80 bg-muted/20">
                <div className="flex items-center gap-1.5 pb-1 border-b border-border/50">
                  <span className="text-[11px] font-extrabold text-foreground uppercase tracking-wide">
                    Colors & Layout
                  </span>
                </div>
                <Field label="Global Container Width">
                  <SelectInput
                    value={theme.containerWidth || "1120px"}
                    onChange={(v) => onChangeTheme({ containerWidth: v })}
                    options={[
                      { label: "Standard (1120px)", value: "1120px" },
                      { label: "Wide (1280px)", value: "1280px" },
                      { label: "Compact (960px)", value: "960px" },
                      { label: "Narrow (800px)", value: "800px" },
                      { label: "Full Width (100%)", value: "100%" },
                    ]}
                  />
                </Field>
                <Field label="Primary Color">
                  <ColorInput
                    value={theme.primaryColor}
                    onChange={(v) => onChangeTheme({ primaryColor: v })}
                  />
                </Field>
                <Field label="Secondary Color">
                  <ColorInput
                    value={theme.secondaryColor}
                    onChange={(v) => onChangeTheme({ secondaryColor: v })}
                  />
                </Field>
                <Field label="Accent Color">
                  <ColorInput
                    value={theme.accentColor}
                    onChange={(v) => onChangeTheme({ accentColor: v })}
                  />
                </Field>
                <Field label="Global Page Background">
                  <ColorInput
                    value={theme.backgroundColor}
                    onChange={(v) => onChangeTheme({ backgroundColor: v })}
                  />
                </Field>
                <Field label="Global Base Text Color">
                  <ColorInput
                    value={theme.textColor}
                    onChange={(v) => onChangeTheme({ textColor: v })}
                  />
                </Field>
                <Field label="Default Corner Radius">
                  <SelectInput
                    value={theme.borderRadius}
                    onChange={(v) => onChangeTheme({ borderRadius: v })}
                    options={[
                      { label: "Sharp (0px)", value: "0px" },
                      { label: "Soft (8px)", value: "8px" },
                      { label: "Rounded (12px)", value: "12px" },
                      { label: "Large (16px)", value: "16px" },
                      { label: "Pill (24px)", value: "24px" },
                      { label: "Full Pill (9999px)", value: "9999px" },
                    ]}
                  />
                </Field>
                <Field label="Default Box Shadow">
                  <SelectInput
                    value={theme.boxShadow || "none"}
                    onChange={(v) => onChangeTheme({ boxShadow: v })}
                    options={[
                      { label: "None (Flat)", value: "none" },
                      { label: "Subtle Soft", value: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)" },
                      { label: "Medium Card", value: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)" },
                      { label: "Elevated High", value: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" },
                      { label: "Floating Glow", value: "0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1)" },
                    ]}
                  />
                </Field>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
