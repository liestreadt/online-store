import { PROMO_CODES, PromoFields } from './constants/constants';

class PromoCode implements PromoFields {
    promoKey: string;
    discount: number;
    description: string;

    constructor(code: PromoFields) {
        this.promoKey = code.promoKey;
        this.discount = code.discount;
        this.description = code.description;
    }
    getFullDescription() {
        return `${this.description} - ${this.discount}% - `;
    }
}

export class PromoHandler {
    _initialPrice: number;
    avaliableCodes: PromoCode[];
    activeCodes: Set<string>;
    constructor(initialPrice: number) {
        this._initialPrice = initialPrice;
        this.avaliableCodes = PROMO_CODES.map((promo) => {
            return new PromoCode(promo);
        });
        this.activeCodes = new Set();
    }
    getPromoByPromoKey(key: string): PromoCode | null {
        return this.avaliableCodes.find((promo) => promo.promoKey === key) ?? null;
    }
    addPromo(promoKey: string) {
        this.activeCodes.add(promoKey);
    }
    removePromo(promoKey: string) {
        this.activeCodes.delete(promoKey);
    }
    set initialPrice(price: number) {
        this._initialPrice = price;
    }
    get initialPrice(): number {
        return this._initialPrice;
    }
    get promoPrice() {
        const totalDiscount = this.getTotalDiscount();
        return (this.initialPrice * (100 - totalDiscount)) / 100;
    }
    getTotalDiscount(): number {
        let totalDiscount = 0;
        this.activeCodes.forEach((key) => {
            const promo = this.getPromoByPromoKey(key);
            if (promo) {
                totalDiscount += promo.discount;
            }
        });
        return totalDiscount;
    }
}
