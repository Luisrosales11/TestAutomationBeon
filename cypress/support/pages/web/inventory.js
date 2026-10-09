class Inventory{
    selectItem(productName){
        cy.contains('[data-test="inventory-item"]', productName)
        .within(() => {
            cy.contains('button', 'Add to cart').click()
        })

    }
    goToCart(){
        cy.get('[data-test="shopping-cart-link"]').click()
    }

}
module.exports = Inventory