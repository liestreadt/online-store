const template = `
<div class="dual-slider__indicators">
    <div id="dual-slider-label-min" class="dual-slider__label">0</div>
    <div for="dual-slider-label-max" class="dual-slider__label">100</div>
</div>
<div class="dual-slider__inputs">
    <input
        type="range"
        id="dual-slider-min"
        class="dual-slider__input"
        min="0"
        max="1000"
        >
    <input
        type="range"
        id="dual-slider-max"
        class="dual-slider__input dual-slider__max"
        min="0"
        max="1000"
        >
</div>
`;
export class DualSlider {
    protected _minScale: number;
    protected _maxScale: number;
    protected _inputMin: number;
    protected _inputMax: number;
    constructor(min: number, max: number) {
        this._minScale = min;
        this._maxScale = max;
        this._inputMin = min;
        this._inputMax = max;
    }
    private createSlider() {
        const container = document.createElement('div');
        container.className = 'dual-slider';
        container.innerHTML = `
<div class="dual-slider__indicators">
    <div id="dual-slider-label-min" class="dual-slider__label">${this.inputMin}</div>
    <div for="dual-slider-label-max" class="dual-slider__label">${this.inputMax}</div>
</div>
<div class="dual-slider__inputs">
    <input
        type="range"
        id="dual-slider-min"
        class="dual-slider__input"
        min="${this.minScale}"
        max="${this.maxScale}"
        value="${this.inputMin}"
        >
    <input
        type="range"
        id="dual-slider-max"
        class="dual-slider__input dual-slider__max"
        min="${this.minScale}"
        max="${this.maxScale}"
        value="${this.inputMax}"
        >
</div>
        `;
        return container;
    }
    insertSlider(parent: HTMLElement) {
        parent.appendChild(this.createSlider());
    }
    set minScale(newMin: number) {
        this._minScale = newMin;
    }
    get minScale(): number {
        return this._minScale;
    }
    set maxScale(newMax: number) {
        this._maxScale = newMax;
    }
    get maxScale(): number {
        return this._maxScale;
    }
    set inputMin(newMin: number) {
        this._inputMin = newMin;
    }
    get inputMin(): number {
        return this._inputMin;
    }
    set inputMax(newMax: number) {
        this._inputMax = newMax;
    }
    get inputMax(): number {
        return this._inputMax;
    }
}
