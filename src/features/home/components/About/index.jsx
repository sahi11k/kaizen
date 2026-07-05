import React from "react";
import Section from "@/features/home/components/Section";
import { ABOUT_CARDS } from "@/features/home/constants";

const About = () => {
  return (
    <Section
      id="about"
      eyebrow="Four Tools, One System"
      title={
        <h2 className="heading-3">
          Small tools,
          <br />
          <span className="italic text-muted-foreground">steady growth</span>
        </h2>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {ABOUT_CARDS.map((card, index) => (
          <AboutCard key={card.key} index={index} {...card} />
        ))}
      </div>
    </Section>
  );
};

const AboutCard = ({ title, headline, description, preview, index }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 md:p-8 md:min-h-[22rem]">
      <span className="text-label !text-primary">
        <span className="font-mono">{number}</span> — {title}
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="heading-6">{headline}</h3>
        <p className="body-base">{description}</p>
      </div>
      {preview && <AboutCardPreview preview={preview} />}
    </div>
  );
};

const AboutCardPreview = ({ preview }) => {
  if (preview.type === "quote") {
    return (
      <div className="mt-auto rounded-lg border border-border/50 bg-background px-5 py-4 flex flex-col gap-2">
        <p className="font-sans text-sm md:text-base text-foreground leading-relaxed">
          &quot;{preview.text}&quot;
        </p>
        <span className="text-label">{preview.meta}</span>
      </div>
    );
  }

  return (
    <div className="mt-auto flex divide-x divide-border/50 rounded-lg border border-border/50 bg-background overflow-hidden">
      {preview.items.map((item) => (
        <div key={item.label} className="flex-1 flex flex-col gap-1 px-4 py-3">
          <span className="font-mono text-xl md:text-2xl text-foreground">
            {item.value}
          </span>
          <span className="text-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default About;
