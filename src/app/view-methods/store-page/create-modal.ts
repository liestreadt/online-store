export default function createModal(modalDisplayStatus: string): string {
    return `
        <section id="modalWindow" class="modal" style="display: ${modalDisplayStatus};">
            <form id="modalForm" class="modal__window">
                <h2 class="modal__header">Personal details</h2>
                <div class="modal__name">
                    <input
                        type="text"
                        placeholder="Name"
                        id="modalName"
                        class="modal__name-input">
                    <div class="input-error-message">
                        Error
                    </div>
                </div>
                <div class="modal__number">
                    <input
                        type="text"
                        placeholder="Phone number"
                        id="modalNumber"
                        class="modal__number-input">
                    <div class="input-error-message">
                        Error
                    </div>
                </div>
                <div class="modal__address">
                    <input
                        type="text"
                        placeholder="Delivery address"
                        id="modalAddress"
                        class="modal__address-input">
                    <div class="input-error-message">
                        Error
                    </div>
                </div>
                <div class="modal__e-mail">
                    <input
                        type="email"
                        placeholder="E-mail"
                        id="modalEmail"
                        class="modal__e-mail-input">
                    <div class="input-error-message">
                        Error
                    </div>
                </div>
                <div class="modal__debit-card">
                    <h2 class="modal__header">Debit / Credit card details</h2>
                    <div class="modal__debit-card-data">
                        <div class="modal__debit-card-number">
                            <div class="modal__debit-image-container">
                                <img alt="" id="modalDebitImage" class="modal__debit-image" src="https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71">
                            </div>
                            <input
                                type="text"
                                placeholder="Enter card number"
                                id="modalDebitNumber"
                                class="modal__debit-card-number-input">
                            <div class="input-error-message">
                                Error
                            </div>
                        </div>
                        <div class="modal__debit-card-other">
                            <div>
                                Valid to: <input type="text" id="modalDebitValidTo" class="modal__debit-card-valid-to-input">
                                <div class="input-error-message">
                                    Error
                                </div>
                            </div>
                            <div>
                                CVC2 / CVV2: <input type="text" id="modalDebitCode" class="modal__debit-card-cvc-input">
                                <div class="input-error-message">
                                    Error
                                </div>
                            </div>
                        </div>
                    </div>
                    <input id="modal-confirm" type="submit" class="modal__btn-confirm" value="Confirm">
                </div>
                <div id="modal-error-message" class="modal__error-message">
                    Please fill the fields correctly
                </div>
            </form>
        </section>
    `;
}
