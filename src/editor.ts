import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";``
import { html, LitElement } from 'lit';

import { INTEGRATION } from "./consts"

export class SimplePlantCardEditor extends LitElement {

    private _hass : HomeAssistant;
    private _config : LovelaceCardConfig;

    static schema = [
        {name: "device", selector: { device: { integration: INTEGRATION} }},
    ]

    static properties = {
        _config: { state: true },
    }

    set hass(hass : HomeAssistant) {
        this._hass = hass
    }

    // setConfig works the same way as for the card itself
    setConfig(config: LovelaceCardConfig) {
        this._config = config;
    }

    // This function is called when the input element of the editor loses focus
    _valueChanged(ev: CustomEvent) {
        if (!this._config || !this._hass) {
        return;
        }
        const _config = Object.assign({}, this._config);
        _config.device = ev.detail.value.device;

        this._config = _config;

        const event = new CustomEvent("config-changed", {
        detail: { config: _config },
        bubbles: true,
        composed: true,
        });
        this.dispatchEvent(event);
    }

    private _computeLabel = (schema: any) => {
        let label = this.hass?.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
        if (label) return label;
        label = this.hass?.localize(`ui.panel.lovelace.editor.card.${schema.label}`);
        if (label) return label;
        return schema.label;
    };

    render() {
        if (!this._hass || !this._config) {
        return html`<div>Invalid</div>`;
        }

        return html`
            <ha-form
                .hass=${this._hass}
                .data=${this._config}
                .schema=${SimplePlantCardEditor.schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }
}

