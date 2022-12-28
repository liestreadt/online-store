export interface ProductDetail {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    brand: string;
    category: string;
    images: Array<string>;
    rating: number;
    stock: number;
}
export interface DummyJSON {
    products: Array<ProductDetail>;
    limit: number;
    total: number;
    skip: number;
}

export const filterParamsKeys = ['category', 'brand', 'priceMin', 'priceMax', 'stockMin', 'stockMax'] as const;

export type FilterParamsValues = Record<typeof filterParamsKeys[number], string[]>;

export interface InitialFilterValues {
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    categories: Map<string, number>;
    brands: Map<string, number>;
}
export interface ModelData {
    activeFilters: Partial<FilterParamsValues>;
    initialFilterValues: InitialFilterValues;
    allBrands: string[];
    allCategories: string[];
    filteredProducts: Array<ProductDetail> | null;
    page: string;
}
export interface ElementsToListen {
    store: {
        reset: HTMLButtonElement | null;
        copy: HTMLButtonElement | null;
        category: HTMLDivElement | null;
        brand: HTMLDivElement | null;
        price: HTMLInputElement | null; // double-input element
        stock: HTMLInputElement | null; // double-input element
        sorting: HTMLSelectElement | null;
        searching: HTMLInputElement | null;
        viewButtons: HTMLDivElement | null;
    };
}

export enum EventTargetsIDEnum {
    reset = 'button-reset',
    copy = 'button-copy',
    category = 'category-container',
    brand = 'brand-container',
    price = '', // element id which contains price input
    stock = '', // element id which contains stock input
    sorting = 'sorting-options',
    searching = 'searching-field',
    viewButtons = 'view-buttons-container',
}
