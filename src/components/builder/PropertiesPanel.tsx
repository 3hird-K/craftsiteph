"use client";

import type { BuilderComponent, ComponentProps, ComponentStyle, SiteTheme } from "@/lib/types";
import { FONT_OPTIONS } from "@/lib/types";
import { PALETTE } from "@/lib/presets";
import { Sun, Moon } from "lucide-react";

type Props = {
  component: BuilderComponent | null;
  theme: SiteTheme;
  onChangeProps: (id: string, props: Partial<ComponentProps>) => void;
  onChangeStyle: (id: string, style: Partial<ComponentStyle>) => void;
  onChangeTheme: (theme: Partial<SiteTheme>) => void;
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
      className={inputClass}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value?: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      className={inputClass}
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
}: {
  value?: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  const hasMatch = value ? options.some((o) => o.value === value) : true;
  const allOptions = !hasMatch && value ? [{ label: value, value }, ...options] : options;

  return (
    <select className={inputClass} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
      {allOptions.map((o, idx) => (
        <option key={`${o.value}-${idx}`} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function PropertiesPanel({
  component,
  theme,
  onChangeProps,
  onChangeStyle,
  onChangeTheme,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">Design</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {component
            ? `Editing ${PALETTE.find((p) => p.type === component.type)?.label || component.type}`
            : "Theme & page settings"}
        </p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {/* Site theme always visible */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3
              className="text-xs font-bold uppercase tracking-[0.12em] transition-colors"
              style={{ color: theme.primaryColor || "#ea580c" }}
            >
              Site Theme
            </h3>
          </div>





          <Field label="Primary">
            <ColorInput
              value={theme.primaryColor}
              onChange={(v) => onChangeTheme({ primaryColor: v })}
            />
          </Field>
          <Field label="Secondary">
            <ColorInput
              value={theme.secondaryColor}
              onChange={(v) => onChangeTheme({ secondaryColor: v })}
            />
          </Field>
          <Field label="Accent">
            <ColorInput
              value={theme.accentColor}
              onChange={(v) => onChangeTheme({ accentColor: v })}
            />
          </Field>
          <Field label="Page background">
            <ColorInput
              value={theme.backgroundColor}
              onChange={(v) => onChangeTheme({ backgroundColor: v })}
            />
          </Field>
          <Field label="Default text">
            <ColorInput
              value={theme.textColor}
              onChange={(v) => onChangeTheme({ textColor: v })}
            />
          </Field>
          <Field label="Font family">
            <SelectInput
              value={theme.fontFamily}
              onChange={(v) => onChangeTheme({ fontFamily: v })}
              options={FONT_OPTIONS}
            />
          </Field>
          <Field label="Corner radius">
            <SelectInput
              value={theme.borderRadius}
              onChange={(v) => onChangeTheme({ borderRadius: v })}
              options={[
                { label: "Sharp (0)", value: "0px" },
                { label: "Soft (8px)", value: "8px" },
                { label: "Rounded (12px)", value: "12px" },
                { label: "Pill (24px)", value: "24px" },
              ]}
            />
          </Field>
        </section>

        {!component ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/50 dark:bg-muted/20 px-4 py-8 text-center text-xs text-muted-foreground">
            Select a component on the canvas to edit its content and styles.
          </div>
        ) : (
          <>
            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                Content
              </h3>
              {"logoText" in component.props ||
              component.type === "navbar" ||
              component.type === "footer" ? (
                <Field label="Logo / brand">
                  <TextInput
                    value={component.props.logoText}
                    onChange={(v) => onChangeProps(component.id, { logoText: v })}
                  />
                </Field>
              ) : null}
              {component.props.heading !== undefined ||
              ["hero", "heading", "features", "card-grid", "cta", "form", "testimonial"].includes(
                component.type,
              ) ? (
                <Field label="Heading">
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
              {component.props.text !== undefined ||
              ["text", "testimonial", "footer"].includes(component.type) ? (
                <Field label="Text">
                  <TextArea
                    value={component.props.text}
                    onChange={(v) => onChangeProps(component.id, { text: v })}
                    rows={4}
                  />
                </Field>
              ) : null}
              {component.props.buttonText !== undefined ||
              ["navbar", "hero", "button", "cta", "form"].includes(component.type) ? (
                <Field label="Button label">
                  <TextInput
                    value={component.props.buttonText}
                    onChange={(v) => onChangeProps(component.id, { buttonText: v })}
                  />
                </Field>
              ) : null}
              {component.props.buttonHref !== undefined ||
              ["navbar", "hero", "button", "cta"].includes(component.type) ? (
                <Field label="Button link">
                  <TextInput
                    value={component.props.buttonHref}
                    onChange={(v) => onChangeProps(component.id, { buttonHref: v })}
                  />
                </Field>
              ) : null}
              {component.props.imageUrl !== undefined ||
              ["hero", "image", "testimonial"].includes(component.type) ? (
                <Field label="Image URL">
                  <TextInput
                    value={component.props.imageUrl}
                    onChange={(v) => onChangeProps(component.id, { imageUrl: v })}
                    placeholder="https://..."
                  />
                </Field>
              ) : null}
              {component.props.imageAlt !== undefined || component.type === "image" ? (
                <Field label="Image alt">
                  <TextInput
                    value={component.props.imageAlt}
                    onChange={(v) => onChangeProps(component.id, { imageAlt: v })}
                  />
                </Field>
              ) : null}
              {component.props.placeholder !== undefined || component.type === "form" ? (
                <Field label="Placeholder">
                  <TextInput
                    value={component.props.placeholder}
                    onChange={(v) => onChangeProps(component.id, { placeholder: v })}
                  />
                </Field>
              ) : null}

              {component.props.links ? (
                <div className="space-y-2">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Links
                  </div>
                  {component.props.links.map((link, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <TextInput
                        value={link.label}
                        placeholder="Label"
                        onChange={(v) => {
                          const links = [...(component.props.links || [])];
                          links[i] = { ...links[i], label: v };
                          onChangeProps(component.id, { links });
                        }}
                      />
                      <TextInput
                        value={link.href}
                        placeholder="Href"
                        onChange={(v) => {
                          const links = [...(component.props.links || [])];
                          links[i] = { ...links[i], href: v };
                          onChangeProps(component.id, { links });
                        }}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                    onClick={() =>
                      onChangeProps(component.id, {
                        links: [...(component.props.links || []), { label: "New link", href: "#" }],
                      })
                    }
                  >
                    + Add link
                  </button>
                </div>
              ) : null}

              {component.props.items ? (
                <div className="space-y-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Items
                  </div>
                  {component.props.items.map((item, i) => (
                    <div
                      key={i}
                      className="space-y-2 rounded-xl border border-border bg-muted/50 dark:bg-muted/20 p-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-muted-foreground">Item {i + 1}</span>
                        <button
                          type="button"
                          className="text-xs text-rose-500"
                          onClick={() => {
                            const items = (component.props.items || []).filter((_, idx) => idx !== i);
                            onChangeProps(component.id, { items });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <TextInput
                        value={item.icon}
                        placeholder="Icon (emoji)"
                        onChange={(v) => {
                          const items = [...(component.props.items || [])];
                          items[i] = { ...items[i], icon: v };
                          onChangeProps(component.id, { items });
                        }}
                      />
                      <TextInput
                        value={item.title}
                        placeholder="Title"
                        onChange={(v) => {
                          const items = [...(component.props.items || [])];
                          items[i] = { ...items[i], title: v };
                          onChangeProps(component.id, { items });
                        }}
                      />
                      <TextArea
                        value={item.description}
                        onChange={(v) => {
                          const items = [...(component.props.items || [])];
                          items[i] = { ...items[i], description: v };
                          onChangeProps(component.id, { items });
                        }}
                        rows={2}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                    onClick={() =>
                      onChangeProps(component.id, {
                        items: [
                          ...(component.props.items || []),
                          { title: "New item", description: "Description", icon: "✨" },
                        ],
                      })
                    }
                  >
                    + Add item
                  </button>
                  {component.props.columns !== undefined ? (
                    <Field label="Columns">
                      <SelectInput
                        value={String(component.props.columns || 3)}
                        onChange={(v) => onChangeProps(component.id, { columns: Number(v) })}
                        options={[
                          { label: "2", value: "2" },
                          { label: "3", value: "3" },
                          { label: "4", value: "4" },
                        ]}
                      />
                    </Field>
                  ) : null}
                </div>
              ) : null}
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                Style
              </h3>
              <Field label="Background">
                <ColorInput
                  value={component.style.backgroundColor}
                  onChange={(v) => onChangeStyle(component.id, { backgroundColor: v })}
                />
              </Field>
              <Field label="Text color">
                <ColorInput
                  value={component.style.textColor}
                  onChange={(v) => onChangeStyle(component.id, { textColor: v })}
                />
              </Field>
              <Field label="Font size">
                <SelectInput
                  value={component.style.fontSize || ""}
                  onChange={(v) => onChangeStyle(component.id, { fontSize: v || undefined })}
                  options={[
                    { label: "Default", value: "" },
                    { label: "14px", value: "14px" },
                    { label: "16px", value: "16px" },
                    { label: "18px", value: "18px" },
                    { label: "20px", value: "20px" },
                    { label: "24px", value: "24px" },
                    { label: "32px", value: "32px" },
                    { label: "40px", value: "40px" },
                    { label: "48px", value: "48px" },
                  ]}
                />
              </Field>
              <Field label="Font weight">
                <SelectInput
                  value={component.style.fontWeight || ""}
                  onChange={(v) => onChangeStyle(component.id, { fontWeight: v || undefined })}
                  options={[
                    { label: "Default", value: "" },
                    { label: "Normal", value: "400" },
                    { label: "Medium", value: "500" },
                    { label: "Semibold", value: "600" },
                    { label: "Bold", value: "700" },
                  ]}
                />
              </Field>
              <Field label="Alignment">
                <SelectInput
                  value={component.style.textAlign || "left"}
                  onChange={(v) =>
                    onChangeStyle(component.id, {
                      textAlign: v as ComponentStyle["textAlign"],
                    })
                  }
                  options={[
                    { label: "Left", value: "left" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "right" },
                  ]}
                />
              </Field>
              <Field label="Padding">
                <SelectInput
                  value={component.style.padding || ""}
                  onChange={(v) => onChangeStyle(component.id, { padding: v || undefined })}
                  options={[
                    { label: "None", value: "0" },
                    { label: "Compact", value: "16px 24px" },
                    { label: "Comfortable", value: "32px 32px" },
                    { label: "Roomy", value: "48px 32px" },
                    { label: "Spacious", value: "64px 32px" },
                    { label: "Hero", value: "80px 32px" },
                  ]}
                />
              </Field>
              <Field label="Border radius">
                <SelectInput
                  value={component.style.borderRadius || ""}
                  onChange={(v) => onChangeStyle(component.id, { borderRadius: v || undefined })}
                  options={[
                    { label: "Theme default", value: "" },
                    { label: "None", value: "0px" },
                    { label: "8px", value: "8px" },
                    { label: "12px", value: "12px" },
                    { label: "16px", value: "16px" },
                    { label: "24px", value: "24px" },
                    { label: "999px", value: "999px" },
                  ]}
                />
              </Field>
              <Field label="Shadow">
                <SelectInput
                  value={component.style.boxShadow || ""}
                  onChange={(v) => onChangeStyle(component.id, { boxShadow: v || undefined })}
                  options={[
                    { label: "None", value: "" },
                    { label: "Soft", value: "0 4px 20px rgba(15,23,42,0.08)" },
                    { label: "Medium", value: "0 12px 40px rgba(15,23,42,0.12)" },
                    { label: "Strong", value: "0 24px 60px rgba(15,23,42,0.18)" },
                  ]}
                />
              </Field>
              {component.type === "spacer" ? (
                <Field label="Spacer height">
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
              ) : null}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
