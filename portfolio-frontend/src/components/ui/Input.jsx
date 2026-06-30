function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
    />
  );
}

export default Input;