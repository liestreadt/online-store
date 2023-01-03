import Cart from './Cart';
import increaseValueInMap from './tools/Functions';
import { FilterCalculator } from './FilterCalculator';
import {
    ProductDetail,
    DummyJSON,
    ShownProductInfo,
    filterParamsKeys,
    FilterKeys,
    FilterParamsValues,
    InitialFilterValues,
    ModelData,
    sortVariantsEnum,
} from './intefaces/types';

class Model {
    queryParams: URLSearchParams;
    cart: Cart;
    productJSON: DummyJSON | null;
    modelData: ModelData;
    filterCalculator: FilterCalculator;
    shownProductInfo: ShownProductInfo | null;

    constructor(urlString: string = window.location.href) {
        const url = new URL(urlString);
        this.queryParams = url.searchParams;
        this.cart = new Cart();
        this.filterCalculator = new FilterCalculator();
        this.productJSON = null;
        this.modelData = {
            activeFilters: {},
            initialFilterValues: {
                minPrice: Infinity,
                maxPrice: 0,
                minStock: Infinity,
                maxStock: 0,
                categories: new Map(),
                brands: new Map(),
            },
            allBrands: [],
            allCategories: [],
            filteredProducts: null,
            page: '',
            currentView: 'view-small',
            shownProductInfo: null,
            calculatedFilters: null,
        };
        this.shownProductInfo = null;
    }
    async loadProducts(source = 'https://dummyjson.com/products?limit=100'): Promise<void> {
        try {
            const response = await fetch(source);
            const data = await response.json();
            this.productJSON = data;
            this.readParamsFromURL();
            this.findInitialFilterValues();
            this.applyQueryParamsToFilter();
            this.applyQueryParam();
            console.log('END of loadproducts', this.modelData);
        } catch {
            throw new Error('Fail to connect dummy json');
        }
    }
    readParamsFromURL(): Partial<FilterParamsValues> {
        const activeFilters: Partial<FilterParamsValues> = {};
        this.queryParams = new URL(window.location.href).searchParams;

        for (const key of this.queryParams.keys()) {
            if (filterParamsKeys.includes(key as FilterKeys)) {
                const filter = key;
                activeFilters[filter as keyof typeof activeFilters] = this.queryParams.getAll(key);
            } else {
                console.log(`${key} is not a key!`);
            }
        }
        this.modelData.activeFilters = activeFilters;
        return activeFilters;
    }
    applyQueryParamsToFilter(): void {
        const active = this.modelData.activeFilters;
        this.filterCalculator = new FilterCalculator();
        active.brand?.map((brand) => {
            this.filterCalculator.addBrand(brand);
        });
        active.category?.map((category) => {
            this.filterCalculator.addCategory(category);
        });
        if (active.priceMax) {
            this.filterCalculator.updateMaxUserPrice(+active.priceMax[0]);
        }
        if (active.priceMin) {
            this.filterCalculator.updateMinUserPrice(+active.priceMin[0]);
        }
        if (active.stockMax) {
            this.filterCalculator.updateMaxUserStock(+active.stockMax[0]);
        }
        if (active.stockMin) {
            this.filterCalculator.updateMinUserStock(+active.stockMin[0]);
        }
        if (active.searching) {
            this.filterCalculator.updateSearchName(active.searching[0]);
        }
        this.modelData.calculatedFilters = this.filterCalculator;
        this.shownProductInfo = this.filterCalculator.recalculate(this.productJSON?.products || null);
        console.log('PRODUCT INFO', this.shownProductInfo);
        console.log('FILTER input INFO', this.filterCalculator);
    }
    findInitialFilterValues() {
        if (this.productJSON && this.productJSON.products) {
            const allProducts: Array<ProductDetail> = this.productJSON.products;
            const allCategories: Array<string> = [];
            const allBrands: Array<string> = [];

            const productsSummaryInfo: InitialFilterValues = allProducts.reduce(
                (info: InitialFilterValues, product: ProductDetail) => {
                    info.minPrice = Math.min(info.minPrice, product.price);
                    info.maxPrice = Math.max(info.maxPrice, product.price);

                    info.minStock = Math.min(info.minStock, product.stock);
                    info.maxStock = Math.max(info.maxStock, product.stock);

                    allCategories.push(product.category);
                    allBrands.push(product.brand);

                    increaseValueInMap(info.categories, product.category);
                    increaseValueInMap(info.brands, product.brand);

                    return info;
                },
                {
                    minPrice: Infinity,
                    maxPrice: 0,
                    minStock: Infinity,
                    maxStock: 0,
                    categories: new Map(),
                    brands: new Map(),
                }
            );
            this.modelData.allBrands = [...new Set(allBrands)];
            this.modelData.allCategories = [...new Set(allCategories)];
            this.modelData.initialFilterValues = productsSummaryInfo;
            return productsSummaryInfo;
        }
    }
    createQueryParamFromEvent(key: FilterKeys, value: string) {
        switch (key) {
            case 'sorting': {
                // TODO: create url with added new sorting params
                break;
            }
            case 'category': {
                if (this.filterCalculator.categories.has(value)) {
                    this.deleteParamFromURL('category', value);
                } else {
                    this.appendParamToURL('category', value);
                }
                this.reInit();
                break;
            }
            case 'brand': {
                if (this.filterCalculator.brands.has(value)) {
                    this.deleteParamFromURL('brand', value);
                } else {
                    this.appendParamToURL('brand', value);
                }
                this.reInit();
                break;
            }
            case 'priceMin': {
                this.changeParamInURL('priceMin', value);
                this.reInit();
                break;
            }
            case 'priceMax': {
                this.changeParamInURL('priceMax', value);
                this.reInit();
                break;
            }
        }
    }
    applyQueryParam() {
        console.log('apply filters to product list');
        this.modelData.shownProductInfo = this.shownProductInfo;
        this.modelData.filteredProducts = this.shownProductInfo?.shownProducts || null;
    }
    sortProducts(sortVariant: sortVariantsEnum) {
        // TODO: implemet sorting by option
        // this.modelData.filteredProducts?.sort()
    }
    handleViewChange(view: string): void {
        this.modelData.currentView = view;
    }
    appendParamToURL(key: FilterKeys, value: string) {
        const url: URL = new URL(window.location.href);
        const urlSearch: URLSearchParams = url.searchParams;
        urlSearch.append(key, value);
        url.search = urlSearch.toString();

        history.pushState({ key, value }, '', url.toString());
        console.log('add category to url search params');
    }
    deleteParamFromURL(key: FilterKeys, param: string) {
        const url: URL = new URL(window.location.href);
        const urlSearch: URLSearchParams = url.searchParams;
        let values = urlSearch.getAll(key);
        values = values.filter((value) => value !== param);
        urlSearch.delete(key);
        values.map((value) => {
            urlSearch.append(key, value);
        });
        url.search = urlSearch.toString();

        history.pushState({ key, values }, '', url.toString());
        console.log('delete category from url search params');
    }
    changeParamInURL(key: FilterKeys, value: string) {
        const url: URL = new URL(window.location.href);
        const urlSearch: URLSearchParams = url.searchParams;
        urlSearch.set(key, value);
        url.search = urlSearch.toString();

        history.pushState({ key, value }, '', url.toString());
    }
    reInit() {
        this.readParamsFromURL();
        this.applyQueryParamsToFilter();
        this.applyQueryParam();
    }
}

export default Model;
