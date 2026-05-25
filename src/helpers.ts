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
    name: string,
    identifiers?: [string, string][]
}

export interface HomeAssistant2 extends HomeAssistant {
    entities: Array<Entity>
    devices: Array<Device>
    states: {
        [entity_id: string]: Entity;
    }
}

//---- DATE ----

function relativeDays(isoDateString: string) {
    // Parse target date string directly to avoid JS interpreting it as UTC midnight
    const [year, month, day] = isoDateString.split('-').map(Number);
    // Get today's local date components
    const now = new Date();
    // Use Date.UTC purely as a way to get comparable day-level numbers
    const utcToday = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const utcTarget = Date.UTC(year, month - 1, day);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.floor((utcTarget - utcToday) / _MS_PER_DAY);
}

export function relativeDate(isoDateString: string, local: string = "en", today: string = "today") {
    const diff_days = relativeDays(isoDateString)
    if (!isFinite(diff_days))
        return isoDateString
    const relativeTimeFormat = new Intl.RelativeTimeFormat(local, { style: "long" });
    if (diff_days === 0)
        return today
    else
        return relativeTimeFormat.format(diff_days, "day");
}
