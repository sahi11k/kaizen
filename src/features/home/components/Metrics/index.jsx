import React from "react";
import { METRICS_ITEMS } from "@/features/home/constants";

const Metrics = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border rounded-lg border border-border bg-card overflow-hidden">
        {METRICS_ITEMS.map(({ value, label, key, accent }) => (
          <div key={key} className="flex flex-col gap-3 px-6 py-8 md:px-8">
            <span
              className={`font-mono text-4xl md:text-5xl ${
                accent ? "text-primary" : "text-foreground"
              }`}
            >
              {value}
            </span>
            <span className="text-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Metrics;
