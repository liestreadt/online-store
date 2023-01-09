import { PromoFields } from '../intefaces/types';

export const SLIDER_MAX_ID = 'dual-slider-max';
export const SLIDER_MIN_ID = 'dual-slider-min';
export const DUMMY_SOURCE = 'https://dummyjson.com/products?limit=100';
export const CURRENCY_SYMBOL = '€';
export const PAGES_HASH = {
    store: '#',
    cart: '#cart',
    details: '#details-id-',
    error: '#404',
};
export const CART_ID = 'online-store-cart-neemkashu-liestreadt';
export const PROMO_ID = 'online-store-promo-neemkashu-liestreadt';
export const CAPTION_ADD = 'add to cart';
export const CAPTION_DROP = 'drop from cart';
export const DECREASE_ID_PREFIX = 'cart-button-decrease-';
export const INCREASE_ID_PREFIX = 'cart-button-increase-';
export const PROMO_ADD_ID = 'promo-add-button';

export const PROMO_CODES: PromoFields[] = [
    {
        promoKey: 'rss',
        discount: 10,
        description: 'Rolling Scopes School',
    },
    {
        promoKey: 'epam',
        discount: 10,
        description: 'EPAM Systems',
    },
];
