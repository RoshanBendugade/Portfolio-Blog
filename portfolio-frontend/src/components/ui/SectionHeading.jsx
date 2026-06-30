function SectionHeading({
  subtitle,
  title,
  description,
  center = true,
}) {
  return (
    <div className={`${center ? "text-center" : ""} mb-16`}>
      {subtitle && (
        <p className="uppercase tracking-[0.3em] text-orange-500 font-semibold mb-3">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl md:text-5xl font-bold dark:text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;