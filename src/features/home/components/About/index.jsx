import React from "react";
import { Card, Button } from "@/shared/ui";
import { ABOUT_CARDS } from "@/features/home/constants";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto gap-16 px-6 lg:px-8 xl:px-0 py-12 flex-col">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="heading-2 text-center">Everything You Need to Grow</h2>
        <p className="body-description text-center">
          Powerful tools designed to support your personal development journey
        </p>
      </div>
      <div className="flex flex-wrap flex-gap overflow-x-auto w-full">
        {ABOUT_CARDS.map((card) => {
          return <AboutCard key={card.title} {...card} />;
        })}
      </div>
    </div>
  );
};

const AboutCard = ({ title, description, Icon, link }) => {
  return (
    <Card
      className="flex-1 flex flex-col gap-4 lg:gap-8 px-3 py-6 bg-background border border-border shadow-none basis-80"
      title={<Icon />}
      titleClassName="text-muted-foreground size-10 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.25]"
      contentClassName="flex-1"
      footer={
        <Link to={link}>
          <Button
            variant="outline"
            icon={<ArrowUpRight className="size-4" />}
            className="rounded-full w-12 !h-12"
          />
        </Link>
      }
    >
      <h3 className="heading-3 text-foreground mb-3">{title}</h3>
      <p className="body-description">{description}</p>
    </Card>
  );
};

export default About;
