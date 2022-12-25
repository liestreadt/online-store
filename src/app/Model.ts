import Cart from './Cart';
import {
    productDetail,
    dummyJSON,
    FilterParamsArray,
    FilterParamsFromArray,
    FilterParams,
    InitialFilterValues,
    ModelData,
} from './intefaces/types';

// type FilterAmounts = {
//     brandOrCategory: string;
//     totalAmount: number;
// };
// type FilterParameter = typeof FilterParams[keyof typeof FilterParams];

function increaseValueInMap(myMap: Map<string, number>, value: string): void {
    if (!myMap.has(value)) {
        myMap.set(value, 1);
    } else {
        const previousValue = myMap.get(value) as number;
        myMap.set(value, previousValue + 1);
    }
}
class Model {
    queryParams: URLSearchParams;
    cart: Cart;
    productJSON: Partial<dummyJSON>;
    modelData: Partial<ModelData>;

    constructor(urlString: string = window.location.href) {
        const url = new URL(urlString);
        this.queryParams = url.searchParams;
        this.cart = new Cart();
        this.productJSON = {};
        this.modelData = {};
    }
    async loadProducts(source = 'https://dummyjson.com/products?limit=100'): Promise<void> {
        try {
            const response = await fetch(source);
            const data = await response.json();
            this.productJSON = data;
            this.readParamsFromURL();
            this.findInitialFilterValues();
            console.log(this.modelData);
        } catch {
            throw new Error('Fail to connect dummy json');
        }
    }
    readParamsFromURL(): Partial<FilterParamsFromArray> {
        const activeFilters: Partial<FilterParamsFromArray> = {};

        for (const key of this.queryParams.keys()) {
            if (Object.keys(FilterParams).includes(key)) {
                const filter = key;
                activeFilters[filter as keyof typeof activeFilters] = this.queryParams.getAll(key);
                console.log(key);
            } else {
                console.log(`${key} is not a key!`);
            }
        }
        this.modelData.activeFilters = activeFilters;
        return activeFilters;
    }
    findInitialFilterValues() {
        console.log('this.productJSON and products', this.productJSON);
        if (this.productJSON.products) {
            const allProducts: Array<productDetail> = this.productJSON.products;
            const allCategories: Array<string> = [];
            const allBrands: Array<string> = [];

            const productsSummaryInfo: InitialFilterValues = allProducts.reduce(
                (info: InitialFilterValues, product: productDetail) => {
                    info.minPrice = info.minPrice < product.price ? info.minPrice : product.price;
                    info.maxPrice = info.maxPrice > product.price ? info.maxPrice : product.price;

                    info.minStock = info.minStock < product.stock ? info.minStock : product.stock;
                    info.maxStock = info.maxStock > product.stock ? info.maxStock : product.stock;

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
}

export default Model;
