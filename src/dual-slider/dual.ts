export class DualSlider {
    protected _minScale: number;
    protected _maxScale: number;
    protected _inputMin: number;
    protected _inputMax: number;
    protected container: HTMLElement;

    constructor(minScale: number, maxScale: number, inputMin = minScale, inputMax = maxScale) {
        this._minScale = minScale;
        this._maxScale = maxScale;
        this._inputMin = inputMin;
        this._inputMax = inputMax;
        this.container = document.createElement('div');
        this.container.className = 'dual-slider';
    }

    private updateSlider() {
        this.container.innerHTML = `
<div class="dual-slider__indicators">
    <div id="dual-slider-label-min" class="dual-slider__label">${this.inputMin}</div>
    <div for="dual-slider-label-max" class="dual-slider__label">${this.inputMax}</div>
</div>
<div class="dual-slider__inputs">
    <input
        type="range"
        id="dual-slider-min"
        class="dual-slider__input"
        min="${this._minScale}"
        max="${this.maxScale}"
        value="${this.inputMin}"
        >
    <input
        type="range"
        id="dual-slider-max"
        class="dual-slider__input dual-slider__max"
        min="${this._minScale}"
        max="${this.maxScale}"
        value="${this.inputMax}"
        >
</div>
        `;
        this.addListeners();
        return this.container;
    }
    private addListeners() {
        const elementMax = this.container.querySelector('#dual-slider-max');
        elementMax?.addEventListener('change', this);
        const elementMin = this.container.querySelector('#dual-slider-min');
        elementMin?.addEventListener('change', this);
    }
    insertSlider(parent: HTMLElement) {
        parent.appendChild(this.updateSlider());
        this.addListeners();
    }
    handleEvent(event: Event) {
        if (event.currentTarget instanceof HTMLInputElement) {
            if (event.currentTarget.id === 'dual-slider-max') {
                this.inputMax = +event.currentTarget.value;
            }
            if (event.currentTarget.id === 'dual-slider-min') {
                this.inputMin = +event.currentTarget.value;
            }
        }
    }
    set minScale(newMin: number) {
        this._minScale = newMin;
        this.updateSlider();
    }
    get minScale(): number {
        return this._minScale;
    }
    set maxScale(newMax: number) {
        this._maxScale = newMax;
        this.updateSlider();
    }
    get maxScale(): number {
        return this._maxScale;
    }
    set inputMin(newMin: number) {
        this._inputMin = newMin;
        this._inputMax = Math.max(this.inputMin, this.inputMax);
        this.updateSlider();
    }
    get inputMin(): number {
        return this._inputMin;
    }
    set inputMax(newMax: number) {
        this._inputMax = newMax;
        this._inputMin = Math.min(this.inputMin, this.inputMax);
        this.updateSlider();
    }
    get inputMax(): number {
        return this._inputMax;
    }
}
//import { DualSlider } from './dual-slider/dual';
// const dualSlider = new DualSlider(0, 500);
// const main = document.querySelector('main');
// if (main !== null) {
//     dualSlider.insertSlider(main);
// }
