import puppeteer from 'puppeteer'

const appUrl = 'http://localhost:8080/'

let page
let browser

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80
  })
  page = await browser.newPage()
})

afterAll(() => {
  browser.close()
})

describe('Feedlist test', () => {
  test('Check has posts and control pagination', async () => {
    await page.goto(`${appUrl}`)
    await page.waitForSelector('[data-testid="post"]')
    await page.click('button[data-test-id="btn-next"]')
    await page.waitForSelector('[data-testid="post"]')
    await page.click('button[data-test-id="btn-prev"]')
    await page.waitForSelector('[data-testid="post"]')
  }, 16000)
})
