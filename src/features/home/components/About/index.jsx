import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { ABOUT_CARDS } from "@/features/home/constants/aboutCards";
import { cn } from "@/shared/lib/utils";
import Button from "@/shared/ui/button";
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

const AboutCard = ({ title, description, icon, link }) => {
  return (
    <Card
      className={cn(
        "flex-1 flex flex-col gap-4 lg:gap-8 px-3 py-6 bg-background border border-border shadow-none basis-80"
      )}
      key={title}
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
        <Link to={link}>
          <Button
            variant="outline"
            icon={<ArrowUpRight className="size-4" />}
            className="rounded-full w-12 !h-12"
          />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default About;
