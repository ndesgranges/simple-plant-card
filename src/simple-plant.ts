import { SimplePlantCard } from "./card";
import { SimplePlantCardEditor } from "./editor";
import {
    CARD_TYPE,
    CARD_NAME,
    CARD_DESCRIPTION,
    CARD_VERSION,
    CARD_AUTHOR } from "./consts";

console.info(
    `%c 🪴 ${CARD_NAME} 🪴 %c ${CARD_VERSION} \n%c  By @${CARD_AUTHOR}`,
    "color: green; background: white; font-weight: bold; border: solid 1px green; border-radius: 4px 0 0 4px",
    "color: white; background: green; font-weight: bold; border: solid 1px green; border-radius:  0 4px 4px 0",
    "color: green;",
);

customElements.define(`${CARD_TYPE}-editor`, SimplePlantCardEditor);
customElements.define(CARD_TYPE, SimplePlantCard);

// Define Window.customCards type for TS not to complain
declare global {
  interface Window {
    customCards: Array<Object>;
  }
}

// Register for the visual selection in the UI
window.customCards = window.customCards || [];
window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description: CARD_DESCRIPTION
});