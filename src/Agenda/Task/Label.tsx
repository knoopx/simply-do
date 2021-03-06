import classNames from "classnames";
import { HTMLAttributes } from "react";

export const Label = ({
  children,
  className,
  icon: Icon,
  position = "left",
}: {
  icon?: React.ComponentType<any>;
  position?: "left" | "right";
} & HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center space-x-1 whitespace-nowrap",
        className
      )}
    >
      {Icon && position === "left" && <Icon />}
      <span>{children}</span>
      {Icon && position !== "left" && <Icon />}
    </span>
  );
};
