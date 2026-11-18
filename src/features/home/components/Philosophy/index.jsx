import React from "react";
import Section from "@/features/home/components/Section";
import { Reveal } from "@/shared/ui";
import { PHILOSOPHY_ITEMS } from "@/features/home/constants";

const Philosophy = () => {
  return (
    <Section
      eyebrow="Philosophy"
      title={
        <h2 className="heading-3">
          Built around
          <br />
          <span className="italic text-muted-foreground">
            continuous improvement
          </span>
        </h2>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 rounded-lg border border-border md:divide-x divide-y md:divide-y-0 divide-border overflow-hidden">
        {PHILOSOPHY_ITEMS.map((item, index) => (
          <Reveal
            key={item.key}
            delay={index * 100}
            className="flex flex-col gap-6 bg-card p-6 md:p-8"
          >
            <span className="heading-6 italic text-subtle-foreground">
              {item.numeral}
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="heading-6">{item.title}</h3>
              <p className="body-base">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default Philosophy;
