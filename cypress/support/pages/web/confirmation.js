class Confirmation{
    assertOrderComplete(){
        cy.get('[data-test="complete-header"]').should('be.visible').and('have.text', 'Thank you for your order!')
        cy.get('[data-test="complete-text"]').should('be.visible').and('contain.text', 'Your order has been dispatched')
    }
}
module.exports = Confirmation