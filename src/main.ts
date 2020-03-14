import { searchTohoEmail, createMovieFromEmailBody } from './Email'

function createTohoSchedule() {
  const calendar = CalendarApp.getDefaultCalendar()
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const messages = searchTohoEmail(date)
  for (const message of messages) {
    const body = message.getPlainBody()
    const movie = createMovieFromEmailBody(body)

    const movieEvents = calendar.getEvents(movie.startTime, movie.endTime, { search: `[${movie.confirmationNumber}] ${movie.movieTitle}` })
    if (movieEvents.length == 0) {
      const event = calendar.createEvent(`[${movie.confirmationNumber}] ${movie.movieTitle}`, movie.startTime, movie.endTime, {
        description: body,
        location: movie.theater,
      })
      Logger.log('Calendar Registered: ' + event.getId())
    } else {
      Logger.log('Already registered. (count:' + movieEvents.length + ') (' + movieEvents[0].getTitle() + ')')
    }
  }
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
