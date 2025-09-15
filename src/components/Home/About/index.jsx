import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ABOUT_CARDS } from "@/constants/aboutCards";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const About = () => {
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto gap-16 py-12 flex-col">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="heading-2">Everything You Need to Grow</h2>
        <p className="body-description">
          Powerful tools designed to support your personal development journey
        </p>
      </div>
      <div className="flex flex-wrap flex-gap ">
        {ABOUT_CARDS.map((card) => {
          return <AboutCard key={card.title} {...card} />;
        })}
      </div>
    </div>
  );
};

const AboutCard = ({ title, description, icon }) => {
  return (
    <Card
      className={cn(
        "flex-2 flex flex-col gap-8 !p-6 py-6 bg-transparent border border-border shadow-none"
      )}
    >
      <CardHeader>
        <CardTitle className="text-muted-foreground size-10 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.25]">
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="heading-3 text-primary">{title}</h3>
        <CardDescription className="body-description">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          icon={<ArrowUpRight className="size-4" />}
          className="rounded-full w-12 !h-12"
        />
      </CardFooter>
    </Card>
  );
};

export default About;
