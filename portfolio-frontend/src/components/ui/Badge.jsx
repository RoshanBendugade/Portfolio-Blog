function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium dark:bg-orange-900 dark:text-orange-300 transition">
      {children}
    </span>
  );
}

export default Badge;