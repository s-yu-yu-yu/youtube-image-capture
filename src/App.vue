<template>
  <TheHeader />

  <div class="container">
    <div class="section">
      <p class="section__title">チャンネルバナー</p>
      <p class="section__description">
        YouTubeチャンネルのURLからバナー画像を抽出します
      </p>
      <FormText
        placeholder="placeholder"
        @input="(text) => bannerText = text"
        @enter="captureBanner(bannerText)"
      />
    </div>

    <div class="section">
      <p class="section__title">サムネイル</p>
      <p class="section__description">
        YouTube動画のURLからサムネイル画像を抽出します
      </p>
      <FormText
        placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'normalize.css'

import TheHeader from './components/TheHeader.vue'
import FormText from './components/FormText.vue'

import { captureBanner } from './utils/capture'

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    FormText
  },

  setup () {
    const bannerText = ''

    return {
      bannerText,

      captureBanner
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
