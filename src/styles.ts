import { css } from "lit";

export const styles = css`
    .hidden {
        display: none;
        /* opacity: 0; */
    }

    .card-content {
        padding: 0px;
        position: relative;
    }

    .info {
        padding: 16px;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 16px;
    }

    .content {
        position: relative;
        overflow: hidden;
    }

    .content p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .sub {
        position: absolute;
        top:0;
        left: 0;
        transform: translateY(100%);
        color: var(--secondary-text-color);
        font-size: 12px;
    }


    h1 {
        font-weight: normal;
        font-size: 24px;

        margin-top: 8px;
        margin-bottom: 0px;
        line-height: 24px;
        height: 48px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    hui-image {
        aspect-ratio: 1 / 1;
        border-radius: var(--ha-card-border-radius,12px);
        overflow: hidden;
    }

    ha-button {
        width: 100%;
        margin-top: 8px;
    }


    ha-icon {
        display: flex;
        position: relative;
    }

    ha-icon[data-color] {
        color: var(--color);
    }



    ha-icon-button {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background-color: rgba(var(--rgb-card-background-color), 0.2);
        border-radius: 48px;
    }

    ha-icon-button ha-icon::after {
        content: attr(data-days, "");
        position: absolute;
        top: calc( 50% + 1px );
        left: 0px;
        transform: translateY(-50%);
        width: 100%;
        font-size: 10px;
    }
`