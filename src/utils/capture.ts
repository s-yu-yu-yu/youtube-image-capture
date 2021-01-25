import axios from 'axios'

export const captureBanner = async (url: string) => {
  return await axios.get(`http://localhost:4000/api/banner?url=${url}`)
    .then((res) => {
      return res.data.url
    })
}

export const captureThumbnail = async (url: string) => {
  return await axios.get(`http://localhost:4000/api/thumbnail?url=${url}`)
    .then((res) => {
      return res.data.url
    })
}
