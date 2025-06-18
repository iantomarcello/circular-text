import { LitElement, PropertyValues } from 'lit';
/**
 * Renders text in a circular layout.
 * based on https://dev.to/jh3y/circular-text-with-css-57jf#introducing-css-trigonometry
 * @cssproperty `--offset` - The offset angle for the text.
 * @cssproperty `--spacing` - The spacing between characters. `full` for full circle.
 */
export declare class CircularText extends LitElement {
    static styles: import("lit").CSSResult[];
    get _slottedChildren(): Node[];
    protected firstUpdated(_changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'circular-text': CircularText;
    }
}
