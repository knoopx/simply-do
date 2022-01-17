import { DateTime } from "luxon";
import { getParent, Instance, types as t } from "mobx-state-tree";
import { nanoid } from "nanoid";

import Expression from "./Expression";
import dateTime from "./DateTime";
import { IStore } from ".";
import { ITimeOfTheDay } from "./Store";

const Task = Expression.named("Task")
  .props({
    id: t.optional(t.identifier, () => nanoid()),
    createdAt: t.optional(dateTime, () => DateTime.now()),
    lastCompletedAt: t.optional(dateTime, () => DateTime.now()),
  })
  .actions((self) => ({
    update(props: Partial<ITask>) {
      Object.assign(self, props);
    },

    complete() {
      if (self.isRecurring && self.nextAt) {
        self.lastCompletedAt = self.nextAt;
      } else {
        this.remove();
      }
    },

    remove() {
      const { removeTask } = getParent(self, 2);
      removeTask(self);
    },

    reset() {
      self.lastCompletedAt = self.createdAt;
    },
  }))
  .views((self) => {
    return {
      get isValid() {
        return !!(self.ast && self.subject);
      },

      get implicitStart(): DateTime {
        if (self.start && self.start > self.lastCompletedAt) {
          return self.start;
        }
        return self.lastCompletedAt.toLocal();
      },

      get highlightColor(): string {
        try {
          const parent = getParent(self, 2) as IStore;
          return parent.getContextColor(self.context);
        } catch (e) {
          return "neutral";
        }
      },

      get timeOfTheDay(): ITimeOfTheDay {
        const { timeOfTheDay } = getParent(self, 2);
        return timeOfTheDay;
      },
    };
  });

export default Task;

export interface ITask extends Instance<typeof Task> {}
