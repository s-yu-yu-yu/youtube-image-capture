import axios from 'axios'

export type UrlResponse = {
  url: string
}

export const captureBanner = async (url: string): Promise<UrlResponse> => {
  return await axios.get(`${process.env.VUE_APP_API_BASEURL}/banner?url=${url}`)
    .then(res => res.data)
}

export const captureThumbnail = async (url: string): Promise<UrlResponse> => {
  return await axios.get(`${process.env.VUE_APP_API_BASEURL}/thumbnail?url=${url}`)
    .then(res => res.data)
}
