import { css } from "lit";

export const styles = css`
    .test {
        color: red;
    }

    .card-content {
        padding: 0px;
        position: relative;
    }

    .info {
        padding: 16px;
    }

    h1 {
        font-weight: normal;
    }

    hui-image {
        aspect-ratio: 1 / 1;
        border-radius: var(--ha-card-border-radius,12px);
        overflow: hidden;
    }

    ha-button {
        width: 100%;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 16px;
    }

    ha-icon-button {
        position: absolute;
        bottom: 8px;
        right: 8px;
    }

    ha-icon-button ha-icon::after {
        content: attr(data-days, "");
        position: absolute;
        top: 24px;
        left: 0px;
        width: 100%;
        font-size: 10px;
    }


    /* .img-header span {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(0,0,0,0.3);
        padding: 4px;
    } */
`