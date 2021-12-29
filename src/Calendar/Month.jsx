import classNames from "classnames"
import { DateTime } from "luxon"
import { observer } from "mobx-react-lite"

import Day from "./Day"
import EachDay from "./EachDay"
import EachWeek from "./EachWeek"

const Month = observer(({ start: monthStart, displayYear }) => {
  const isThisMonth = monthStart.hasSame(DateTime.now(), "month")
  return (
    <div className="flex flex-col m-2">
      <div className="flex items-center justify-between space-x-2">
        <span
          className={classNames("text-neutral-500", {
            // "font-medium": isThisMonth,
            // "text-neutral-500": !isThisMonth,
          })}
        >
          {monthStart.monthLong}
        </span>
        {displayYear && (
          <span className="text-neutral-500 text-xs">{monthStart.year}</span>
        )}
      </div>
      <EachWeek start={monthStart}>
        {({ start: weekStart }) => (
          <EachDay key={weekStart} start={weekStart}>
            {({ start: dayStart }) => (
              <Day
                key={dayStart}
                start={dayStart.startOf("day")}
                end={dayStart.endOf("day")}
                isSameMonth={dayStart.hasSame(monthStart, "month")}
              />
            )}
          </EachDay>
        )}
      </EachWeek>
    </div>
  )
})

export default Month
