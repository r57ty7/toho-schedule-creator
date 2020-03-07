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
    const confirmationNumber = body.match(/購入番号\s*(\d{4}).*/)[1]
    const theater = body.match(/映画館\s*(\S+).*/)[1]
    const totalPrice = body.match(/合計金額\s*([0-9,]+).*/)[1]
    const seatNumber = body.match(/座席番号\s*([A-Z]+-\d+).*/)[1]
    const movieDate = body.match(/上映日\s*(\d{4}\/\d{1,2}\/\d{1,2}).*/)[1]
    const movieTime = body.match(/時間\s*(\d{2}:\d{2}).*/)[1]
    const movieTitle = body.match(/作品名\s*(\S+).*/)[1]
    return new Movie(confirmationNumber, theater, totalPrice, seatNumber, movieDate, movieTime, movieTitle)
  }
}
