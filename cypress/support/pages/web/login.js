class Login{
    Login(username, pass){
        cy.get('[data-test="username"]').type(username)
        cy.get('[data-test="password"]').type(pass)
        cy.get('[data-test="login-button"]').click()
    }
}
module.exports = Login