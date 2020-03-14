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

export function createMovieFromEmailBody(body: string): Movie {
  const confirmationNumber = body.match(/購入番号\s*(\d{4}).*/)[1]
  const theater = body.match(/映画館\s*(\S+).*/)[1]
  const totalPrice = parseInt(body.match(/合計金額\s*([0-9,]+).*/)[1].replace(',', ''))
  const seatNumber = body.match(/座席番号\s*([A-Z]+-\d+).*/)[1]
  const movieTitle = body.match(/作品名\s*(\S+).*/)[1]

  const date = body.match(/上映日\s*(\d{4}\/\d{1,2}\/\d{1,2}).*/)[1]
  const startTime = body.match(/時間\s*(\d{2}:\d{2}).(\d{2}:\d{2}).*/)[1]
  const endTime = body.match(/時間\s*(\d{2}:\d{2}).(\d{2}:\d{2}).*/)[2]
  const startDatetime = new Date(`${date} ${startTime}:00+09:00`)
  const endDatetime = new Date(`${date} ${endTime}:00+09:00`)

  const movie: Movie = {
    confirmationNumber: confirmationNumber,
    theater: theater,
    totalPrice: totalPrice,
    seatNumber: seatNumber,
    startTime: startDatetime,
    endTime: endDatetime,
    movieTitle: movieTitle,
  }
  return movie
}
