function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white
        dark:bg-slate-900
        rounded-2xl
        shadow-lg
        p-6
        transition
        hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;