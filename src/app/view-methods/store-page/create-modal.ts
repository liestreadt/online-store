export default function createModal(): string {
    return `
        <section class="modal">
            <form class="modal__window">
                <h2 class="modal__header">Personal details</h2>
                <div class="modal__name">
                    <input
                        type="text"
                        placeholder="Name"
                        class="modal__name-input">
                </div>
                <div class="modal__number">
                    <input
                        type="text"
                        placeholder="Phone number"
                        class="modal__number-input">
                </div>
                <div class="modal__address">
                    <input
                        type="text"
                        placeholder="Delivery address"
                        class="modal__address-input">
                </div>
                <div class="modal__e-mail">
                    <input
                        type="email"
                        placeholder="E-mail"
                        class="modal__e-mail-input">
                </div>
                <div class="modal__debit-card">
                    <h2 class="modal__header">Debit / Credit card details</h2>
                    <div class="modal__debit-card-data">
                        <div class="modal__debit-card-number">
                            <input
                                type="text"
                                placeholder="Enter card number"
                                class="modal__debit-card-number-input">
                        </div>
                        <div class="modal__debit-card-other">
                            Valid to: <input class="modal__debit-card-valid-to-input">
                            CVC2 / CVV2: <input class="modal__debit-card-cvc-input">
                        </div>
                    </div>
                    <input type="submit" class="modal__btn-confirm" value="Confirm">
                </div>
            </form>
        </section>
    `;
}
