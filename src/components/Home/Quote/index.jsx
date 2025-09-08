import React from "react";
const Quote = () => {
  return (
    <div className="bg-card p-6 flex flex-col justify-center gap-4 min-h-[400px] rounded-2xl">
      <blockquote className="heading-2 text-center">
        &quot;You have power over your mind — not outside events.
        <br /> Realize this, and you will find strength.&quot;
      </blockquote>
      <span className="body-description text-center italic">
        — Marcus Aurelius, <cite>Meditations</cite>
      </span>
    </div>
  );
};

export default Quote;
