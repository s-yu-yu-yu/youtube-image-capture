import axios from 'axios'

export const captureBanner = async (url: string) => {
  return await axios.get(`https://youtube-image-capture.an.r.appspot.com/api/banner?url=${url}`)
    .then((res) => {
      return res.data.url
    })
}

export const captureThumbnail = async (url: string) => {
  return await axios.get(`https://youtube-image-capture.an.r.appspot.com/api/thumbnail?url=${url}`)
    .then((res) => {
      return res.data.url
    })
}
