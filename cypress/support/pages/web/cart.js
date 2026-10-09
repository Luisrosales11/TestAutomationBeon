class Cart{
    assertItems(productNames){
        cy.get('[data-test="cart-list"] [data-test="inventory-item"]').should('have.length', productNames.length)
            .then(($items) => {
                const itemNames = [...$items].map((item) =>
                    item.querySelector('[data-test="inventory-item-name"]').textContent.trim()
                )
                expect(itemNames).to.deep.equal(productNames)
            })
    }

    checkout(){
        cy.get('[data-test="checkout"]').click()
    }
}
module.exports = Cart