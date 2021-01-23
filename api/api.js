const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')

router.get('/banner', async (req, res, next) => {
  if (!/^https:\/\/www.youtube.com\/channel/.test(req.query.url)) {
    res.sendStatus(400)
  } else {
    const browser = await puppeteer.launch()

    const page = (await browser.pages())[0]

    await page.goto(req.query.url)

    const bannerStyle = await page.$eval('ytd-c4-tabbed-header-renderer', item => {
      return item.style.cssText
    })
    const bannerUrl = bannerStyle.replace('--yt-channel-banner:url(', '').replace(');', '').replace(/\\/g, '')
    res.json({
      url: bannerUrl
    })
  }
})

module.exports = router
