import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";``
import { html, LitElement } from 'lit';
import { CARD_TYPE } from "./consts"

export interface SimplePlantCardConfig extends LovelaceCardConfig {
  device: string;
}

export class SimplePlantCard extends LitElement {

    // properties
    private _hass : HomeAssistant;

    private _device: string;
    private _entities: Array<HassEntity>;

    // Updating content
    set hass(hass : HomeAssistant) {
        this._hass = hass
    }

    static properties = {
        _device: { type: String, state: true },
        _entities: { type: Array, state: true }
    };

    static styles =  new CSSStyleSheet({ baseURL: "./styles.css" });

    setConfig(config : SimplePlantCardConfig) {
        if (!config.device) {
            throw new Error("You need to define a name");
        }
        this._device = config.device;
        // while editing the entity in the card editor
        if (this._hass) {
            this.hass = this._hass
        }
    }

    // Create card and its content
    render() {
        return html`
            <ha-card>
                <div class="card-content">
                    ${this._device}
                </div>
            </ha-card>
        `;
    }


    static getConfigElement() {
        // Create and return an editor element
        return document.createElement(`${CARD_TYPE}-editor`);
    }

    getCardSize() {
        return 1;
    }

    // The rules for sizing your card in the grid in sections view
    getGridOptions() {
        return {
            rows: 3,
            columns: 6,
            min_rows: 3,
            max_rows: 3,
        };
    }
}
