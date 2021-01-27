const puppeteer = require('puppeteer')

async function run (url) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })

  const page = await browser.newPage()

  await page.goto(url, {
    waitUntil: 'domcontentloaded'
  })

  const bannerStyle = await page.$eval('ytd-c4-tabbed-header-renderer', item => {
    return item.style.cssText
  })

  if (!bannerStyle) {
    throw new Error()
  }

  const bannerUrl = bannerStyle.replace('--yt-channel-banner:url(', '').replace(');', '').replace(/\\/g, '')

  browser.close()
  return bannerUrl
}

module.exports = run
