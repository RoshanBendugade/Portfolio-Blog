function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const styles = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary:
      "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;