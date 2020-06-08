<template>
<div>
    <BaseButton v-if="isShown" icon="caret-up" @click="hide">
        Hide
    </BaseButton>
    <BaseButton v-else icon="caret-down" @click="show">
        Show
    </BaseButton>
</div>
</template>
<script>
import BaseButton from './BaseButton.vue';

export default {
  data() {
    return {
      isShown: true,
    };
  },
  components: {
    BaseButton,
  },
  methods: {
    hide() {
      this.isShown = false;
      this.$emit('hide');
    },
    show() {
      this.isShown = true;
      this.$emit('show');
    },
  },
};
</script>
