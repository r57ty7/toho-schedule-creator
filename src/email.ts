import Movie from './movie'

export function searchTohoEmail(fromDate: Date): GoogleAppsScript.Gmail.GmailMessage[] {
  const from = 'from:i-net.ticket@ml.tohotheater.jp'
  const subject = 'subject:"Notice of Internet Ticket Purchase Completion"'
  const after = `after:${fromDate.getFullYear()}-${(fromDate.getMonth() + 1).toString().padStart(2, '0')}-${fromDate
    .getDate()
    .toString()
    .padStart(2, '0')}`

  const threads = GmailApp.search(`${from} ${subject} ${after}`)
  const messages: GoogleAppsScript.Gmail.GmailMessage[] = threads.flatMap(t => t.getMessages())
  return messages
}

export function createFromEmailBody(body: string): Movie {
  const confirmationNumber = body.match(/購入番号\s*(\d{4}).*/)[1]
  const theater = body.match(/映画館\s*(\S+).*/)[1]
  const totalPrice = body.match(/合計金額\s*([0-9,]+).*/)[1]
  const seatNumber = body.match(/座席番号\s*([A-Z]+-\d+).*/)[1]
  const movieDate = body.match(/上映日\s*(\d{4}\/\d{1,2}\/\d{1,2}).*/)[1]
  const movieTime = body.match(/時間\s*(\d{2}:\d{2}).*/)[1]
  const movieTitle = body.match(/作品名\s*(\S+).*/)[1]
  const movie: Movie = {
    confirmationNumber: confirmationNumber,
    theater: theater,
    totalPrice: totalPrice,
    seatNumber: seatNumber,
    movieDate: movieDate,
    movieTime: movieTime,
    movieTitle: movieTitle,
  }
  return movie
}
