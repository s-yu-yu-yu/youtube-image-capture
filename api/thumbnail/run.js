const puppeteer = require('puppeteer')

async function run (url) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector('#scriptTag', { timeout: 5000 })

  const scriptTagText = await page.$eval('#scriptTag', item => {
    return item.textContent
  })

  const thumbnailUrl = JSON.parse(scriptTagText).thumbnailUrl

  browser.close()

  return thumbnailUrl
}

module.exports = run
