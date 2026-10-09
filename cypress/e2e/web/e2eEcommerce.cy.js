const Login = require("../../support/pages/web/login")
const Inventory = require("../../support/pages/web/inventory")
const Cart = require("../../support/pages/web/cart")
const Checkout = require("../../support/pages/web/checkout")
const Confirmation = require("../../support/pages/web/confirmation")
describe('Test for Swag Labs', () => {

beforeEach(function(){
  cy.fixture('web/cart').then((data) => {
    this.data=data
    this.login = new Login()
    this.inventory = new Inventory()
    this.cart = new Cart()
    this.checkout = new Checkout()
    this.confirmation = new Confirmation()
  })
})

  it('TC01 - Validate user is able to complete an order including 2 items', function() {
    cy.visit('')
    //Login as standard_user with Pass: secret_sauce
    cy.log('1. Login as standard user')
    this.login.Login(this.data.username, this.data.pass)

    //add items to the cart
    cy.log('2. add items to the cart (2 items)')
    this.inventory.selectItem(this.data.product1)
    this.inventory.selectItem(this.data.product2)

    //Click on Cart
    cy.log('3. click and go to the cart')
    this.inventory.goToCart()
    const productNames = [this.data.product1, this.data.product2]

    cy.log('4. Validate Items and Quantity')
    this.cart.assertItems(productNames)

    cy.log('5. Click on checkout button')
    this.cart.checkout()

    //Enter customer information and review the order
    cy.log('6. Fill out the form with valid information')
    this.checkout.enterCustomerInformation(this.data.firstName, this.data.lastName, this.data.postalCode)

    cy.log('7. Validate information')
    this.checkout.assertItems(productNames)
    this.checkout.assertOrderTotal()

    //Complete the purchase and verify confirmation
    cy.log('8. Click on Finish')
    this.checkout.finish()

    //Validate order was completed successfull
    cy.log('9. Validate success message')
    this.confirmation.assertOrderComplete()
  })
})