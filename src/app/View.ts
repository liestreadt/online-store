import {
    productDetail,
    dummyJSON,
    FilterParamsArray,
    FilterParamsFromArray,
    FilterParams,
    InitialFilterValues,
    ModelData,
} from './intefaces/types';

class View {
    modelData: Partial<ModelData>;
    constructor(modelData: Partial<ModelData>) {
        this.modelData = modelData;
        this.renderPage();
    }
    renderPage() {
        this.renderHeader();
        switch (this.modelData.page) {
            case 'store': {
                this.renderStoreContainer();
                this.renderFilters();
                this.renderSortingSection();
            }
        }
    }
    renderHeader() {
        console.log('take cart data and render header');
    }
    renderStoreContainer() {
        console.log('render the external div for filters and cards-container');
    }
    renderFilters() {
        console.log('take model data and render filters section');
    }
    renderSortingSection() {
        console.log('take sorting filters from model and render sorting section');
    }
    renderCards() {
        console.log('method for rendering cards in sorting section');
    }
    getButtonsArray() {
        console.log('for the current page make the array of buttons to listen');
    }
    copyURLtoClipboard() {
        console.log('copy url');
    }
    getElementsForEvents() {
        console.log('get elements to add to listeners');
    }
}

export default View;
