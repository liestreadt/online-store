import Cart from '../Cart';
import { FilterCalculator } from '../FilterCalculator';
import { PromoHandler } from '../Promo';

export interface ProductDetails {
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
    isImagesUnique: boolean;
}
export interface ProductShort {
    id: number;
    amount: number;
}
export interface ProductCart extends ProductDetails {
    amount: number;
    getProductTotalPrice: () => number;
}

export interface DummyJSON {
    products: Array<ProductDetails>;
    limit: number;
    total: number;
    skip: number;
}
export interface ShownProductInfo {
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    categories: Map<string, number>;
    brands: Map<string, number>;
    shownProducts: ProductDetails[];
}

export const filterParamsKeys = [
    'category',
    'brand',
    'sorting',
    'priceMin',
    'priceMax',
    'stockMin',
    'stockMax',
    'searching',
    'view',
    'cartListLimit',
    'cartListPage',
] as const;

export type FilterKeys = typeof filterParamsKeys[number];

export type FilterParamsValues = Record<FilterKeys, string[]>;

export type FilteredProductsKeys = keyof ProductDetails;

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
    currentView: string | null;
    initialProducts: Array<ProductDetails> | null;
    filteredProducts: Array<ProductDetails> | null;
    currentOption: SortVariantsEnum | null;
    shownProductInfo: ShownProductInfo | null;
    calculatedFilters: FilterCalculator | null;
    page: PageCase;
    detailsID: number;
    detailsMainImageSrc?: string;
    modalDisplayStatus: string;
    cart: Cart | null;
    promo: PromoHandler | null;

    modalErrors: {
        modalName: boolean;
        modalNumber: boolean;
        modalAddress: boolean;
        modalEmail: boolean;
        modalDebitNumber: boolean;
        modalDebitValidTo: boolean;
        modalDebitCode: boolean;
    };
}
export interface ElementsToListen {
    store: {
        reset: HTMLButtonElement | null;
        copy: HTMLButtonElement | null;
        category: HTMLDivElement | null;
        brand: HTMLDivElement | null;
        price: HTMLDivElement | null; // double-input element
        stock: HTMLDivElement | null; // double-input element
        sorting: HTMLSelectElement | null;
        searching: HTMLInputElement | null;
        viewButtons: HTMLDivElement | null;
        modalWindow: HTMLDivElement | null;
        cards: HTMLDivElement | null;
    };
    cart: {
        pageBack: HTMLAnchorElement | null;
        pageForward: HTMLAnchorElement | null;
        listLimit: HTMLButtonElement | null;
        cartList: HTMLDivElement | null;
        promoInput: HTMLInputElement | null;
        buyButton: HTMLButtonElement | null;
        modalWindow: HTMLDivElement | null;
    };
    details: {
        images: HTMLDivElement | null;
        detailsAddToCart: HTMLButtonElement | null;
        buyButton: HTMLButtonElement | null;
        modalWindow: HTMLDivElement | null;
    };
}

export interface ElementsToValidate {
    form: HTMLFormElement | null;
    formElements: {
        name: HTMLInputElement | null;
        number: HTMLInputElement | null;
        address: HTMLInputElement | null;
        email: HTMLInputElement | null;
        debitCardNumber: HTMLInputElement | null;
        debitCardExpireDate: HTMLInputElement | null;
        debitCardCode: HTMLInputElement | null;
    };
}

export enum EventTargetsIDEnum {
    reset = 'button-reset',
    copy = 'button-copy',
    category = 'category-container',
    brand = 'brand-container',
    price = 'side-filter-price', // element id which contains price input
    stock = 'side-filter-stock', // element id which contains stock input
    sorting = 'sorting-options',
    searching = 'searching-field',
    viewButtons = 'view-buttons-container',
    cards = 'card-container',
    detailsAddToCart = 'details-add-to-cart',

    PAGE_BACK = 'pagination-back',
    PAGE_FORWARD = 'pagination-forward',
    LIST_LIMIT = 'list-limit',
    CART_LIST = 'cart-list',
    PROMO = 'promo-input',
    BUY = 'buy-button',
    detailsImages = 'details-images',
    modalWindow = 'modalWindow',
    modalForm = 'modalForm',
    modalName = 'modalName',
    modalNumber = 'modalNumber',
    modalAddress = 'modalAddress',
    modalEmail = 'modalEmail',
    modalDebitNumber = 'modalDebitNumber',
    modalDebitValidTo = 'modalDebitValidTo',
    modalDebitCode = 'modalDebitCode',
}

export enum SortVariantsEnum {
    DEFAULT = 'default-sort',
    PRICE_ASCENDING = 'ascending-price',
    PRICE_DESCENDING = 'descending-price',
    RATING_ASCENDING = 'ascending-rating',
    RATING_DESCENDING = 'descending-rating',
}
export enum PageCase {
    store,
    cart,
    details,
    error,
}
export interface ShowCart {
    limit: number;
    listPage: number;
}
export interface PromoFields {
    promoKey: string;
    discount: number;
    description: string;
}
export enum ViewVariantsEnum {
    SMALL = 'view-small',
    BIG = 'view-big',
}
export enum InputValueStringLength {
    ONE = 1,
    TWO,
    THREE,
    FOUR,
}
