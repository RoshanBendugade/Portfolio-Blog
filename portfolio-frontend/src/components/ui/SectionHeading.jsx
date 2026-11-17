function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="text-sm font-semibold text-accent">{eyebrow}</p>
      )}

      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 leading-7 text-muted">{description}</p>
      )}
    </div>
  );
}

export default SectionHeading;