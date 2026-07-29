"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold">FAQ & Details</CardTitle>
        <CardDescription className="text-xs">Interactive accordion component.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-border/60">
            <AccordionTrigger className="text-xs font-bold hover:text-primary transition-colors py-3">
              What is craftsiteph?
            </AccordionTrigger>
            <AccordionContent className="text-[11px] text-muted-foreground leading-relaxed">
              craftsiteph is a visual website builder allowing developers and designers to build clean websites instantly using premium components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-border/60">
            <AccordionTrigger className="text-xs font-bold hover:text-primary transition-colors py-3">
              How does theme sync work?
            </AccordionTrigger>
            <AccordionContent className="text-[11px] text-muted-foreground leading-relaxed">
              Customizations update CSS utility variables globally or locally. This updates component styles automatically.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-border/60">
            <AccordionTrigger className="text-xs font-bold hover:text-primary transition-colors py-3">
              Is it production ready?
            </AccordionTrigger>
            <AccordionContent className="text-[11px] text-muted-foreground leading-relaxed">
              Yes. It compiles to clean, optimized React and Tailwind CSS markup ready for instant deployment.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
