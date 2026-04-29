const tags = ["Graphic Design", "Web Design", "UI / UX", "Branding", "Marketing", "Strategy"];

export function Marquee() {
  const items = [...tags, ...tags, ...tags];
  return (
    <div className="relative overflow-hidden bg-deep py-8">
      <div className="flex w-max items-center gap-10 whitespace-nowrap animate-marquee">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className="font-display text-5xl font-bold sm:text-7xl"
              style={{
                WebkitTextStroke: "1.5px oklch(1 0 0 / 0.35)",
                color: "transparent",
              }}
            >
              {t}
            </span>
            <span className="text-3xl text-foreground/40 sm:text-5xl">↗</span>
          </span>
        ))}
      </div>
      <div className="mt-3 flex w-max items-center gap-10 whitespace-nowrap animate-marquee-rev">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-5xl font-bold text-primary sm:text-7xl">{t}</span>
            <span className="text-3xl text-primary sm:text-5xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
