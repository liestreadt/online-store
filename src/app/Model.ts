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
            {
                // Delete this block after demonstration of the filter
                const filter = new FilterCalculator();
                filter.addCategory('smartphones');
                filter.addCategory('laptops');
                filter.addCategory('skincare');
                filter.updateMaxUserPrice(499);
                if (this.productJSON?.products) {
                    console.log('FILTER', filter.recalculate(this.productJSON.products));
                }
            }
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
