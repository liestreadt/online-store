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
export const CAPTION_ADD = 'add to cart';
export const CAPTION_DROP = 'drop from cart';
export const DECREASE_ID_PREFIX = 'cart-button-decrease-';
export const INCREASE_ID_PREFIX = 'cart-button-increase-';

export const regexName = /(^[^\s]{3,})(\s{1})([^\s]{3,})$/gi;
export const regexNumber = /\+(\d{9})/g;
export const regexAddress = /(^[^\s]{5,})(\s{1})([^\s]{5,})(\s{1})([^\s]{5,})$/gi;
export const regexDebitNumber = /^(\d{4}\s\d{4}\s\d{4}\s\d{4})$/g;
export const regexValidTo = /^((1[0-2]|0[1-9])\s\/\s\d{2})$/g;
export const regexDebitCode = /^(\d{3})$/g;
// (0\d)(1[0-2])

export const regexToReplaceNumber = /[^0-9\\+]/g;
export const regexToReplacePlus = /\+{2,}/g;
export const regexToReplaceAddress = /[_/\\?.*\-+,><{}\\[\]()!@#;:\\$%\\^&="№|`~]/g;
export const regexToReplaceName = /[_0-9/\\?.*\-+,><{}\\[\]()!@#;:\\$%\\^&="№|`~]/g;
export const regexToReplaceEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
