import axios from 'axios'

export const captureBanner = async (url: string) => {
  await axios.get(`http://localhost:4000/api/banner?url=${url}`)
    .then((res) => {
      window.open(res.data.url)
    })
    .catch((error) => console.error(error))
}

export const captureThumbnail = (url: string): void => {
  window.open(url, '_blank', 'noreferrer')
}
