import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";``
import { html, LitElement } from 'lit';
import { CARD_TYPE } from "./consts"


// TYPES

interface Dictionary<T> {
    [Key: string]: T;
}

interface Entity extends HassEntity {
    device_id: string
}
interface Device {
    id: string,
    name: string
}

interface HomeAssistant2 extends HomeAssistant {
    entities: Array<Entity>
    devices: Array<Device>
}


export interface SimplePlantCardConfig extends LovelaceCardConfig {
  device: string;
}

export class SimplePlantCard extends LitElement {

    // properties
    private _hass : HomeAssistant2;

    private _device_id: string;
    private _device_name: string;
    private _entity_ids: Dictionary<string> = {} ;
    private _entity_states: Map<string, HassEntity> = new Map() ;


    private _config_updated: boolean = true ;
    private _states_updated: boolean = true ;

    static keys : Array<string> = [
        "mark_watered",
        "todo",
        "problem",
        "last_watered",
        "picture",
        "days_between_waterings",
        "health",
        "next_watering",
    ]


    // Base Card

    set hass(hass : HomeAssistant2) {
        // Triggered everytime a state change and more
        this._hass = hass
        this._update_entites()
    }

    static properties = {
        _device_id: { type: String, state: true },
        _states_updated: {
            type: Boolean,
            state: true,
            hasChanged(newVal: boolean, _oldVal: boolean){
                return newVal
            }
        }
    };

    static styles =  new CSSStyleSheet({ baseURL: "./styles.css" });


    setConfig(config : SimplePlantCardConfig) {
        // Triggers everytime the config of the card change
        console.log("simple-plant: checking config")
        if (!config.device) {
            throw new Error("You need to define a name");
        }
        this._device_id = config.device;
        // while editing the entity in the card editor
        if (this._hass) {
            this.hass = this._hass
        }
        this._config_updated = true;
    }

    // Create card and its content
    render() {
        // Triggers everytime one of the variables in properties changes
        console.log("simple-plant : render")
        // getting entities ids
        if(this._config_updated) {
            this._get_friendly_name();
            this._fetch_entities();
            this._config_updated = false;
        }
        // Updating states
        if(!this._entity_states.size)
            this._update_entites()
        this._states_updated = false;
        // console.log(this._entity_states.get("picture"))
        // return card
        return html`
            <ha-card>
                <div class="card-content">
                    <hui-image
                        .hass=${this._hass}
                        .entity=${this._entity_ids["picture"]}
                    ></hui-image>
                    ${this._device_name}
                    <!-- <p>mark_watered : ${this._entity_states.get("mark_watered").state}</p> -->
                    <p>todo : ${this._entity_states.get("todo").state}</p>
                    <p>problem : ${this._entity_states.get("problem").state}</p>
                    <p>last_watered : ${this._entity_states.get("last_watered").state}</p>
                    <p>days_between_waterings : ${this._entity_states.get("days_between_waterings").state}</p>
                    <p>health : ${this._entity_states.get("health").state}</p>
                    <p>next_watering : ${this._entity_states.get("next_watering").state}</p>
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

    // Specific to Simple Plant

    _update_entites() {
        // Update values of entities that got updated
        var trigger_update = false;
        console.log("Simple Plant Card: _update_entites")
        if (!this._entity_ids || !this._hass)
            return
        console.log("Simple Plant Card: Updating entities")
        for (const [key, id] of Object.entries(this._entity_ids)) {

            if (
                (!this._entity_states.has(key))
                || this._entity_states.get(key).state != this._hass.states[id].state
            ) {
                this._entity_states.set(key, this._hass.states[id])
                trigger_update = true
            }
        }
        if(trigger_update)
            this._states_updated = true
    }

    _get_friendly_name() {
        if(!this._device_id || !this._hass)
            return
        const device = Object.values(this._hass.devices).find(
            (device) => device.id == this._device_id
        );

        if (device)
            this._device_name = device.name;
        else
            throw new Error("Couldn't find selected device");
    }

    _fetch_entities() {
        // Get entities from given device
        console.log("simple-plant: fetching entities")
        if(!this._device_id || !this._hass)
            return
        const entities = Object.values(this._hass.entities)
        const device_entities = entities.filter((entity) => entity.device_id == this._device_id);
        const entity_ids = device_entities.map(({entity_id}) => (entity_id))
        // parse entities
        entity_ids.forEach(id => {
            SimplePlantCard.keys.forEach((key) => {
                if (id.includes(key)) {
                // Associate the corresponding key with the matched string
                this._entity_ids[key] = id;
                }
            });
        });
    }


}
