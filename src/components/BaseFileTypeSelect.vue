<template>
    <select :value="value" @change="$emit('input', $event.target.value)">
        <option value="" disabled>
            <slot></slot>
        </option>
        <option v-for="option in options" :key="option.name" :value="option.value">
            {{option.name}}
        </option>
    </select>
</template>
<script>
import formats from '../constants';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      options: [],
    };
  },
  mounted() {
    Object.keys(formats).forEach((type) => {
      this.options.push({
        name: formats[type].name,
        value: formats[type].value,
      });
    });
    this.$el.value = '';
  },
};
</script>
