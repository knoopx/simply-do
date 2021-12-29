import { DateTime } from "luxon"
import { now as mobxNow } from "mobx-utils"

export function now(interval = 1000) {
  return DateTime.fromMillis(mobxNow(interval))
}
