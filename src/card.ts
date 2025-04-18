
import { HassEntity } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";


import CSS from "bundle-text:./styles.css";
import HTML from "bundle-text:./template.html";


interface SimplePlantCardConfig extends LovelaceCardConfig {
  entity: string;
}

interface SimplePlantCardElements {
    card: HTMLElement;
    cardContent: HTMLElement;
    img: HTMLImageElement;
    title: HTMLElement;
    schedule: HTMLElement;
    health: HTMLElement;
    button: HTMLElement;
    style: HTMLStyleElement;
}

export class SimplePlantCard extends HTMLElement {

    // properties
    _hass : HomeAssistant;
    config : SimplePlantCardConfig;
    elements : SimplePlantCardElements ;

    constructor() {
        super();
        this.renderCard();
        // Create shadow root
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this.elements.style, this.elements.card);
    }

    // Updating content
    set hass(hass : HomeAssistant) {
        this._hass = hass
        this.updateCard()
    }

    setConfig(config : SimplePlantCardConfig) {
        if (!config.entity) {
            throw new Error("You need to define an entity");
        }
        this.config = config;
    }

    // Create card and its content
    renderCard() {
        // root
        const card = document.createElement("ha-card");
        const cardContent = document.createElement("div")

        cardContent.classList.add("card-content"); // required wrapper
        cardContent.innerHTML = HTML;
        card.append(cardContent)

        // Get styles
        const style = document.createElement("style");
        style.textContent = CSS;

        this.elements = {
            "card" : card,
            "cardContent" : cardContent,
            "style" : style,
            "img" : cardContent.querySelector("img"),
            "title" : cardContent.querySelector(".title"),
            "schedule" : cardContent.querySelector(".schedule"),
            "health" : cardContent.querySelector(".health"),
            "button" : cardContent.querySelector(".button"),
        }
    }

    // Update card with content
    updateCard() {

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
