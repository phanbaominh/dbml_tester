<template>
<div>
    <HeaderButton v-if="isShown" icon="caret-up" @click="hide">
        Hide
    </HeaderButton>
    <HeaderButton v-else icon="caret-down" @click="show">
        Show
    </HeaderButton>
</div>
</template>
<script>
import HeaderButton from './HeaderButton.vue';

export default {
  data() {
    return {
      isShown: true,
    };
  },
  components: {
    HeaderButton,
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
