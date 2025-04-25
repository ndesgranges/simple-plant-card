import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";``


//---- TYPES ----

// TYPES

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface Entity extends HassEntity {
    device_id: string
    translation_key: string
}

interface Device {
    id: string,
    name: string
}

export interface HomeAssistant2 extends HomeAssistant {
    entities: Array<Entity>
    devices: Array<Device>
    states: {
        [entity_id: string]: Entity;
    }
}

//---- DATE ----

// https://stackoverflow.com/a/15289883/13597384
function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function relativeDays(isoDateString: string) {
    const today = new Date(Date.now());
    const dateB = new Date(Date.parse(isoDateString));
    return dateDiffInDays(today, dateB);
}

export function relativeDate(isoDateString: string, local: string = "en", today: string = "today") {
    const diff_days = relativeDays(isoDateString)
    const relativeTimeFormat = new Intl.RelativeTimeFormat(local, { style: "long" });
    if (diff_days === 0)
        return today
    else
        return relativeTimeFormat.format(diff_days, "day");
}
