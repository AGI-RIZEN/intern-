import clsx from "clsx";

export function Card({ children, className, as: Component = "div", ...props }) {
  return (
    <Component
      className={clsx(
        "rounded-xl border border-border-subtle bg-surface card-shadow",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
