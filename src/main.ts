import { searchTohoEmail, createMovieFromEmailBody } from './Email'
import Movie from './movie'

function createTohoSchedule() {
  const calendar = CalendarApp.getDefaultCalendar()
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const messages = searchTohoEmail(date)
  console.log(`Emails: ${messages}`)
  for (const message of messages) {
    const body = message.getPlainBody()
    const movie = createMovieFromEmailBody(body)

    createEventIfNotExist(calendar, movie)
  }
}

function createEventIfNotExist(calendar: GoogleAppsScript.Calendar.Calendar, movie?: Movie) {
  if (movie == null) {
    return
  }

  const movieEvents = calendar.getEvents(movie.startTime, movie.endTime, { search: `[${movie.confirmationNumber}] ${movie.movieTitle}` })
  if (movieEvents.length > 0) {
    Logger.log('Already registered. (count:' + movieEvents.length + ') (' + movieEvents[0].getTitle() + ')')
    return
  }

  const event = calendar.createEvent(`[${movie.confirmationNumber}] ${movie.movieTitle} (${movie.seatNumber})`, movie.startTime, movie.endTime, {
    location: movie.theater,
  })
  Logger.log('Calendar Registered: ' + event.getId())
}

/**
 * トリガーを作成する
 * デフォルトだと日毎に実行される
 */
function creatTrigger() {
  ScriptApp.newTrigger('createTohoSchedule').timeBased().everyHours(1).create()
}
