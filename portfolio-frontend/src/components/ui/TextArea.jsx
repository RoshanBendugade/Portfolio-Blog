function TextArea(props) {
  return (
    <textarea
      {...props}
      className="
      w-full
      p-3
      rounded-xl
      border
      border-slate-300
      dark:border-slate-700
      bg-white
      dark:bg-slate-900
      text-slate-900
      dark:text-white
      outline-none
      focus:border-orange-500
      transition
      "
    />
  );
}

export default TextArea;