import { searchTohoEmail, createMovieFromEmailBody } from '../src/Email'
import Movie from '../src/movie'

class GmailThread {
  message: GmailMessage
  constructor(message: string) {
    this.message = new GmailMessage(message)
  }

  getMessages(): GmailMessage[] {
    const ms: GmailMessage[] = []
    ms.push(this.message)
    return ms
  }
}
class GmailMessage {
  message: string
  constructor(message: string) {
    this.message = message
  }
}

describe('searchTohoEmail', (): void => {
  test('normal', (): void => {
    GmailApp.search = jest.fn((arg: string): any[] => {
      const ts: GmailThread[] = []
      if ('from:i-net.ticket@ml.tohotheater.jp subject:"Notice of Internet Ticket Purchase Completion" after:2020-01-02') {
        const t = new GmailThread('my mail')
        ts.push(t)
        return ts
      }
      return ts
    })

    const day = new Date('2020-01-02T15:04:05+09:00')
    const actual = searchTohoEmail(day)
    const expected: GmailMessage[] = [
      {
        message: 'my mail',
      },
    ]
    expect(GmailApp.search).toBeCalledTimes(1)
    expect(actual).toEqual(expected)
  })
})

describe('createMovieFromEmailBody', (): void => {
  test('normal', (): void => {
    const arg = `
    ■購入番号　6992
    ■電話番号　***-****-1234
    ■映画館　ＴＯＨＯシネマズ六本木ヒルズ
    ■作品名　ニューシネマパラダイス
    ■上映日　2020/1/11　
    ■時間　12:30～15:05
    ■スクリーン７
    ■座席番号　A-12
    ■合計金額　1,900円　
    `
    const actual = createMovieFromEmailBody(arg)
    const expected: Movie = {
      confirmationNumber: '6992',
      theater: 'ＴＯＨＯシネマズ六本木ヒルズ',
      movieTitle: 'ニューシネマパラダイス',
      startTime: new Date('2020-01-11T12:30:00+09:00'),
      endTime: new Date('2020-01-11T15:05:00+09:00'),
      seatNumber: 'A-12',
      totalPrice: 1900,
    }
    expect(actual).toStrictEqual(expected)
  })
})
