import CSS from "bundle-text:./styles.css";
import HTML from "bundle-text:./template.html";


export class SimplePlantCard extends HTMLElement {

    // properties
    config;
    hass;
    elements = {};

    constructor() {
        super();
        this.renderCard();
        // Create shadow root
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this.elements.style, this.elements.card);
    }

    // Updating content
    set hass(hass) {
        this.hass = hass
        this.updateCard()
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error("You need to define an entity");
        }
        this.config = config;
    }

    // Create card and its content
    renderCard() {
        // root
        this.elements.card = document.createElement("ha-card");
        // card content (required wrapper)
        this.elements.cardContent = document.createElement("div")
        this.elements.cardContent.classList.add("card-content");
        this.elements.cardContent.innerHTML = HTML;
        // Query child elements
        this.elements.img = this.elements.cardContent.querySelector("img");
        this.elements.title = this.elements.cardContent.querySelector(".title");
        this.elements.schedule = this.elements.cardContent.querySelector(".schedule");
        this.elements.health = this.elements.cardContent.querySelector(".health");
        this.elements.button = this.elements.cardContent.querySelector(".button");
        // add card content to the card
        this.elements.card.append(this.elements.cardContent)
        // Get styles
        this.elements.style = document.createElement("style");
        this.elements.style.textContent = CSS;
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
