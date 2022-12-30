import Cart from './Cart';
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

function increaseValueInMap(myMap: Map<string, number>, value: string): void {
    if (!myMap.has(value)) {
        myMap.set(value, 1);
    } else {
        const previousValue = myMap.get(value) as number;
        myMap.set(value, previousValue + 1);
    }
}

class FilterCalculator {
    minUserPrice: number;
    maxUserPrice: number;
    minUserStock: number;
    maxUserStock: number;
    categories: Set<string>;
    brands: Set<string>;
    searchName: '';

    constructor() {
        this.minUserPrice = Infinity;
        this.maxUserPrice = 0;
        this.minUserStock = Infinity;
        this.maxUserStock = 0;
        this.categories = new Set();
        this.brands = new Set();
        this.searchName = '';
    }
    addCategory(category: string): void {
        this.categories.add(category);
    }
    deleteCategory(category: string): void {
        this.categories.delete(category);
    }
    addBrand(brand: string): void {
        this.brands.add(brand);
    }
    deleteBrand(brand: string): void {
        this.brands.delete(brand);
    }
    updateMinUserPrice(newMinPrice: number) {
        this.minUserPrice = newMinPrice;
    }
    checkProductPassFilters(product: ProductDetail): boolean {
        if (this.categories.size > 0 && !this.categories.has(product.category)) {
            return false;
        }
        if (this.brands.size > 0 && !this.brands.has(product.brand)) {
            return false;
        }
        if (this.minUserPrice > product.price || this.maxUserPrice < product.price) {
            return false;
        }
        if (this.minUserStock > product.stock || this.maxUserStock < product.stock) {
            return false;
        }
        if (!product.title.includes(this.searchName)) {
            return false;
        }
        return true;
    }
    recalculate(allProducts: Array<ProductDetail>): ShownProductInfo {
        let minPrice = Infinity;
        let maxPrice = 0;
        let minStock = Infinity;
        let maxStock = 0;
        const categories = new Map();
        const brands = new Map();
        const shownProducts: Array<ProductDetail> = [];

        for (const product of allProducts) {
            if (this.checkProductPassFilters(product)) {
                minPrice = Math.min(minPrice, product.price);
                maxPrice = Math.max(maxPrice, product.price);
                minStock = Math.min(minStock, product.stock);
                maxStock = Math.max(maxStock, product.stock);

                increaseValueInMap(categories, product.category);
                increaseValueInMap(brands, product.brand);
                shownProducts.push(product);
            }
        }
        return {
            minPrice,
            maxPrice,
            minStock,
            maxStock,
            categories,
            brands,
            shownProducts,
        };
    }
}

class Model {
    queryParams: URLSearchParams;
    cart: Cart;
    productJSON: DummyJSON | null;
    modelData: ModelData;

    constructor(urlString: string = window.location.href) {
        const url = new URL(urlString);
        this.queryParams = url.searchParams;
        this.cart = new Cart();
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
        };
    }
    async loadProducts(source = 'https://dummyjson.com/products?limit=100'): Promise<void> {
        try {
            const response = await fetch(source);
            const data = await response.json();
            this.productJSON = data;
            this.readParamsFromURL();
            this.findInitialFilterValues();
            this.applyQueryParam();
            console.log(this.modelData);
        } catch {
            throw new Error('Fail to connect dummy json');
        }
    }
    readParamsFromURL(): Partial<FilterParamsValues> {
        const activeFilters: Partial<FilterParamsValues> = {};

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
            }
        }
    }
    applyQueryParam() {
        console.log('apply filters to product list');
        this.modelData.filteredProducts = this.productJSON && this.productJSON.products;
    }
    sortProducts(sortVariant: sortVariantsEnum) {
        // TODO: implemet sorting by option
        // this.modelData.filteredProducts?.sort()
    }
}

export default Model;
