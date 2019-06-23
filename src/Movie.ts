export default class Movie {
  confirmationNumber: string
  theater: string
  totalPrice: string
  seatNumber: string
  movieDate: string
  movieTime: string
  movieTitle: string
  constructor(
    confirmationNumber: string,
    theater: string,
    totalPrice: string,
    seatNumber: string,
    movieDate: string,
    movieTime: string,
    movieTitle: string
  ) {
    this.confirmationNumber = confirmationNumber
    this.theater = theater
    this.totalPrice = totalPrice
    this.seatNumber = seatNumber
    this.movieDate = movieDate
    this.movieTime = movieTime
    this.movieTitle = movieTitle
  }

  static createFromEmailBody(body: string) {
    const confirmationNumber = body.match(/Confirmation Number\s*(\d{4}).*/)[1]
    const theater = body.match(/Theater\s*(\S+).*/)[1]
    const totalPrice = body.match(/Total Price\s*\\([0-9,]+).*/)[1]
    const seatNumber = body.match(/Seat Number\s*([A-Z]+-\d+).*/)[1]
    const movieDate = body.match(/Date\s*(\d{4}\/\d{1,2}\/\d{1,2}).*/)[1]
    const movieTime = body.match(/Time\s*(\d{2}:\d{2}).*/)[1]
    const movieTitle = body.match(/Movie\s*(\S+).*/)[1]
    return new Movie(confirmationNumber, theater, totalPrice, seatNumber, movieDate, movieTime, movieTitle)
  }
}
