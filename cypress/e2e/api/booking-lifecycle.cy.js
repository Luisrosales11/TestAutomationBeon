const BookingApi = require('../../support/pages/api/bookingApi')

describe('Booking API lifecycle', () => {
  //new instance of booking API
  const bookingApi = new BookingApi()
  //declaring global variable for the tests
  let credentials
  let booking
  let updatedBooking
  let authToken
  let bookingId

  before(() => {
    //getting data to use on tests from fixtures
    cy.fixture('api/booking').then((data) => {
      credentials = data.credentials
      booking = data.booking
      updatedBooking = data.updatedBooking
    })
  })

  it('generates an auth token', () => {
    //1. Authentication - Generate an auth token (/auth)
    bookingApi.getAuthToken(credentials).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.token).to.be.a('string').and.not.be.empty
      authToken = response.body.token
    })
  })

  it('creates a booking and returns its ID', () => {
    expect(authToken, 'auth token from the first test').to.be.a('string').and.not.be.empty
    //2. Create Booking
    bookingApi.createBooking(booking).then((response) => {
      //Validate 200 OK
      expect(response.status).to.equal(200)
      expect(response.body.bookingid).to.be.a('number')
      expect(response.body.booking).to.deep.equal(booking)
      //Extract bookingid
      bookingId = response.body.bookingid
    })
  })

  it('reads a booking and validates its data', () => {
    expect(bookingId, 'booking ID from the second test').to.be.a('number')

    //3. Read Booking - GET using extracted ID
    bookingApi.getBooking(bookingId).then((readResponse) => {
      expect(readResponse.status).to.equal(200)
      //Validate response data matches
      expect(readResponse.body).to.deep.equal(booking)
    })
  })

  it('updates the checkout date using an auth token', () => {
    expect(authToken, 'auth token from the first test').to.be.a('string').and.not.be.empty
    expect(bookingId, 'booking ID from the second test').to.be.a('number')

    //4. Update Booking
    //PUT request (requires Auth Token in header) and Update checkout date
    bookingApi.updateBooking(bookingId, authToken, updatedBooking).then((updateResponse) => {
      expect(updateResponse.status).to.equal(200)
      //Validate update
      expect(updateResponse.body).to.deep.equal(updatedBooking)

      //Validate update
      bookingApi.getBooking(bookingId).then((readResponse) => {
        expect(readResponse.status).to.equal(200)
        expect(readResponse.body).to.deep.equal(updatedBooking)
      })
    })
  })

  it('deletes a booking and confirms it no longer exists', () => {
    expect(authToken, 'auth token from the first test').to.be.a('string').and.not.be.empty
    expect(bookingId, 'booking ID from the second test').to.be.a('number')

    //5. Delete Booking
    bookingApi.deleteBooking(bookingId, authToken).then((deleteResponse) => {
      //Delete Booking
      expect(deleteResponse.status).to.equal(201)

      //Confirm with GET → 404 Not Found
      bookingApi.getBooking(bookingId, { failOnStatusCode: false }).then((readResponse) => {
        expect(readResponse.status).to.equal(404)
      })
    })
  })
})
