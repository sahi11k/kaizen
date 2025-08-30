import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ABOUT_CARDS } from "@/constants/aboutCards";

const About = () => {
  return (
    <div className="flex flex-col flex-gap text-center xl:py-6">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="heading-2">Everything You Need to Grow</h2>
        <p className="text-text-muted">
          Powerful tools designed to support your personal development journey
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex-gap max-w-7xl mx-auto">
        {ABOUT_CARDS.map((card) => (
          <AboutCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

const AboutCard = ({ title, description }) => {
  return (
    <Card className="max-w-80 gap-3 bg-container">
      <CardHeader className="text-title">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-body">
        <CardDescription className="text-description">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default About;
