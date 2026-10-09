class BookingApi {
  constructor() {
    this.baseUrl = 'https://restful-booker.herokuapp.com'
  }

  getAuthToken(credentials) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/auth`,
      body: credentials,
    })
  }

  createBooking(booking) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/booking`,
      body: booking,
    })
  }

  getBooking(bookingId, options = {}) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/booking/${bookingId}`,
      ...options,
    })
  }

  updateBooking(bookingId, token, booking) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}/booking/${bookingId}`,
      headers: {
        Cookie: `token=${token}`,
      },
      body: booking,
    })
  }

  deleteBooking(bookingId, token) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/booking/${bookingId}`,
      headers: {
        Cookie: `token=${token}`,
      },
    })
  }
}

module.exports = BookingApi
