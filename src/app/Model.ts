import Cart from './Cart';

interface productDetail {
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
interface dummyJSON {
    products?: Array<productDetail>;
    limit?: number;
    total?: number;
    skip?: number;
}
const FilterParamsArray = ['category', 'brand', 'priceMin', 'priceMax', 'stockMin', 'stockMax'] as const;

type FilterParamsFromArray = {
    [K in typeof FilterParamsArray[number]]: string[];
};

const FilterParams = {
    category: 'category',
    brand: 'brand',
    priceMin: 'priceMin',
    priceMax: 'priceMax',
    stockMin: 'stockMin',
    stockMax: 'stockMax',
} as const;

type FilterAmounts = {
    brandOrCategory: string;
    amounts: [avaluableAmount: number, totalAmount: number];
};
interface InitialFilterValues {
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    Categories: Array<FilterAmounts>;
    Brands: Array<FilterAmounts>;
}

interface modelData {
    ActiveFilters: Partial<FilterParamsFromArray>;
    InitialFilterValues: InitialFilterValues;
}
// type FilterParameter = typeof FilterParams[keyof typeof FilterParams];

class Model {
    queryParams: URLSearchParams;
    cart: Cart;
    productJSON: dummyJSON;

    constructor(urlString: string = window.location.href) {
        const url = new URL(urlString);
        this.queryParams = url.searchParams;
        this.cart = new Cart();
        this.productJSON = {};
    }
    async loadProducts(source = 'https://dummyjson.com/products?limit=100'): Promise<void> {
        fetch(source)
            .then((response: Response) => response.json())
            .then((data: dummyJSON) => {
                this.productJSON = data;
                console.log('this.productJSON', this.productJSON);
            })
            .catch(() => {
                throw new Error('Fail to connect dummy json');
            });
    }
    readParamsFromURL(): Partial<FilterParamsFromArray> {
        const activeFilters: Partial<FilterParamsFromArray> = {};

        for (const [key, value] of this.queryParams.entries()) {
            if (Object.keys(FilterParams).includes(key)) {
                const filter = key;
                activeFilters[filter as keyof typeof activeFilters] = [value];
                console.log(key, value);
            } else {
                console.log(`${key} is not a key!`);
            }
        }
        return activeFilters;
    }
    findInitialFilterValues() {
        console.log(this.productJSON.products);
        if (this.productJSON.products) {
            const allProducts: Array<productDetail> = this.productJSON.products;
            const allCategories: Array<string> = [];
            const allBrands: Array<string> = [];

            const productsSummaryInfo: InitialFilterValues = allProducts.reduce(
                (info, product: productDetail) => {
                    info.minPrice = info.minPrice < product.price ? info.minPrice : product.price;
                    info.maxPrice = info.maxPrice > product.price ? info.maxPrice : product.price;
                    allCategories.push(product.category);
                    allBrands.push(product.brand);
                    return info;
                },
                {
                    minPrice: Infinity,
                    maxPrice: 0,
                    minStock: Infinity,
                    maxStock: 0,
                    Categories: [],
                    Brands: [],
                }
            );
            console.log('allBrands', allBrands);
            return productsSummaryInfo;
        }
    }
}

export default Model;
