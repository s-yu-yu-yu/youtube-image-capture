const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')

router.get('/banner', async (req, res, next) => {
  if (!/^https:\/\/www.youtube.com\/channel/.test(req.query.url)) {
    res.sendStatus(400)
  } else {
    const browser = await puppeteer.launch()

    const page = (await browser.pages())[0]

    await page.goto(req.query.url, {
      waitUntil: 'domcontentloaded'
    })

    const bannerStyle = await page.$eval('ytd-c4-tabbed-header-renderer', item => {
      return item.style.cssText
    })
    const bannerUrl = bannerStyle.replace('--yt-channel-banner:url(', '').replace(');', '').replace(/\\/g, '')

    browser.close()

    res.json({
      url: bannerUrl
    })
  }
})

router.get('/thumbnail', async (req, res, next) => {
  if (!/^https:\/\/www.youtube.com\/watch\?v=.*/.test(req.query.url)) {
    res.sendStatus(400)
  } else {
    try {
      const browser = await puppeteer.launch()
      const page = (await browser.pages())[0]
      await page.goto(req.query.url, {
        waitUntil: 'domcontentloaded'
      })

      const scriptTagText = await page.$eval('#scriptTag', item => {
        return item.textContent
      })
      if (!scriptTagText) {
        res.sendStatus(404)
        return
      }

      const url = JSON.parse(scriptTagText).thumbnailUrl

      if (!url) {
        res.sendStatus(404)
        return
      }

      browser.close()

      res.json({
        url: url
      })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
})

module.exports = router
