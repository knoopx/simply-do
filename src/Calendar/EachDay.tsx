import Interval, { IntervalBlockProps } from "./Interval";

export default function EachDay({
  start,
  ...props
}: Omit<IntervalBlockProps, "splitBy" | "end">) {
  return (
    <Interval
      {...props}
      className="table-row"
      start={start.startOf("week")}
      end={start.endOf("week")}
      splitBy={{ days: 1 }}
    />
  );
}
