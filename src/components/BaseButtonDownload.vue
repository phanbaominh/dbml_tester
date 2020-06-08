<template>
    <div class="flex">
      <BaseButton :icon="icon" @click="$emit('click')" :disabled="isDownloading">
          <slot v-if="!isDownloading"></slot>
          <span v-else>Downloading</span>
      </BaseButton>
      <div class="loader" v-if="isDownloading"/>
    </div>
</template>
<script>
import BaseButton from './BaseButton.vue';

export default {
  props: {
    isDownloading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'download',
    },
  },
  components: {
    BaseButton,
  },
};
</script>
<style scoped>
@keyframes loading{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.loader {
    height: 1rem;
    width: 1rem;
    border: 0.2rem solid gray;
    border-top: 0.2rem solid white;
    border-radius: 50%;
    animation: loading 1s linear infinite;
    align-self: center;
}
</style>
