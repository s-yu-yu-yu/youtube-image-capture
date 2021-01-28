<template>
  <OverlayLoading v-if="loading" />
  <TheHeader />

  <div class="container">
    <div class="section">
      <p class="section__title">チャンネルバナー</p>
      <p class="section__description">
        YouTubeチャンネルのURLからバナー画像を抽出します
      </p>
      <FormText
        placeholder="YouTubeチャンネルのURL"
        @input="(text) => bannerText = text"
        @enter="captureBannerImage(bannerText)"
      />
    </div>

    <div class="section">
      <p class="section__title">サムネイル</p>
      <p class="section__description">
        YouTube動画のURLからサムネイル画像を抽出します
      </p>
      <FormText
        placeholder="YouTube動画のURL"
        @input="(text) => thumbnailText = text"
        @enter="captureThumbnailImage(thumbnailText)"
      />
    </div>
  </div>

  <ErrorSnackBar :error-message="errorMessage" @close="errorMessage = ''"/>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import 'normalize.css'

import OverlayLoading from './components/OverlayLoading.vue'
import TheHeader from './components/TheHeader.vue'
import FormText from './components/FormText.vue'
import ErrorSnackBar from './components/ErrorSnackBar.vue'

import { captureBanner, captureThumbnail } from './utils/capture'

export default defineComponent({
  name: 'App',
  components: {
    OverlayLoading,
    TheHeader,
    FormText,
    ErrorSnackBar
  },

  setup () {
    const { loading } = toRefs(reactive({ loading: false }))
    const { errorMessage } = toRefs(reactive({ errorMessage: '' }))

    const bannerText = ''
    const thumbnailText = ''

    const captureBannerImage = async (url: string) => {
      if (!url) { return }
      loading.value = true
      const bannerUrl = await captureBanner(url)
        .catch((error) => {
          if (error.response.status === 400) {
            errorMessage.value = 'YouTubeチャンネルのURLではありません'
          } else if (error.response.status === 404) {
            errorMessage.value = '画像が見つかりませんでした'
          } else {
            errorMessage.value = 'エラーが発生しました'
          }
          setTimeout(() => { errorMessage.value = '' }, 3000)
        })
      loading.value = false

      if (bannerUrl) {
        window.open(bannerUrl.url)
      }
    }

    const captureThumbnailImage = async (url: string) => {
      if (!url) { return }
      loading.value = true
      const bannerUrl = await captureThumbnail(url)
        .catch((error) => {
          console.error(error)
          if (error.response.status === 400) {
            errorMessage.value = 'YouTube動画のURLではありません'
          } else if (error.response.status === 404) {
            errorMessage.value = '画像が見つかりませんでした'
          } else {
            errorMessage.value = 'エラーが発生しました'
          }
          setTimeout(() => { errorMessage.value = '' }, 3000)
        })
      loading.value = false

      if (bannerUrl) {
        window.open(bannerUrl.url)
      }
    }

    return {
      loading,
      errorMessage,
      bannerText,
      thumbnailText,

      captureBannerImage,
      captureThumbnailImage
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  width: 100%;
  margin: 0;
}

@media screen and (min-width: 1080px) {
  .container {
    width: 1080px;
    margin: 0 auto;
  }
};

.section {
  width: 100%;
  margin: 100px 0;
}

.section__title {
  font-size: 18px;
  font-weight: 900;
}
</style>
