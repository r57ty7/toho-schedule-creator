import { searchTohoEmail, createMovieFromEmailBody } from './Email'
import Movie from './movie'

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
