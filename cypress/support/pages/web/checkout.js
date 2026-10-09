class Checkout{
    enterCustomerInformation(firstName, lastName, postalCode){
        cy.get('[data-test="firstName"]').type(firstName)
        cy.get('[data-test="lastName"]').type(lastName)
        cy.get('[data-test="postalCode"]').type(postalCode)
        cy.get('[data-test="continue"]').click()
    }

    assertItems(productNames){
        cy.get('[data-test="cart-list"] [data-test="inventory-item"]')
            .should('have.length', productNames.length)
            .then(($items) => {
                const itemNames = [...$items].map((item) =>
                    item.querySelector('[data-test="inventory-item-name"]').textContent.trim()
                )
                expect(itemNames).to.deep.equal(productNames)
            })
    }

    assertOrderTotal(){
        cy.get('[data-test="subtotal-label"]').invoke('text').then((subtotalText) => {
            const subtotal = Number(subtotalText.replace('Item total: $', ''))
            cy.get('[data-test="tax-label"]').invoke('text').then((taxText) => {
                const tax = Number(taxText.replace('Tax: $', ''))
                cy.get('[data-test="total-label"]').should(($total) => {
                    const total = Number($total.text().replace('Total: $', ''))
                    expect(total).to.equal(Number((subtotal + tax).toFixed(2)))
                })
            })
        })
    }

    finish(){
        cy.get('[data-test="finish"]').click()
    }
}
module.exports = Checkout