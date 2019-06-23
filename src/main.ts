import Movie from './Movie'

function createTohoSchedule() {
  const calendar = CalendarApp.getDefaultCalendar()
  const messages = searchTohoEmail()
  for (let message of messages) {
    const body = message.getPlainBody()
    const movie = Movie.createFromEmailBody(body)

    const startDateTime = new Date(`${movie.movieDate} ${movie.movieTime}:00`)
    const endDateTime = new Date(`${movie.movieDate} ${movie.movieTime}:00`)
    // 3時間に設定
    endDateTime.setHours(endDateTime.getHours() + 3)

    const movieEvents = calendar.getEvents(startDateTime, endDateTime, { search: `[${movie.confirmationNumber}] ${movie.movieTitle}` })
    if (movieEvents.length == 0) {
      const event = calendar.createEvent(`[${movie.confirmationNumber}] ${movie.movieTitle}`, startDateTime, endDateTime, {
        description: body,
        location: movie.theater,
      })
      Logger.log('Calendar Registered: ' + event.getId())
    } else {
      Logger.log('Already registered. (count:' + movieEvents.length + ') (' + movieEvents[0].getTitle() + ')')
    }
  }
}

function searchTohoEmail(): GoogleAppsScript.Gmail.GmailMessage[] {
  const from = 'from:i-net.ticket@ml.tohotheater.jp'
  const subject = 'subject:"Notice of Internet Ticket Purchase Completion"'
  const threads = GmailApp.search(`${from} ${subject}`)
  const messages: GoogleAppsScript.Gmail.GmailMessage[] = []
  for (let thread of threads) {
    thread.getMessages().forEach(message => messages.push(message))
  }
  return messages
}

/**
 * トリガーを作成する
 * デフォルトだと日毎に実行される
 */
function creatTrigger() {
  ScriptApp.newTrigger('createTohoSchedule')
    .timeBased()
    .everyDays(1)
    .create()
}
