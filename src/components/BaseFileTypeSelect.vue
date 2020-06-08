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
import commonFormats from '../constants';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    formats: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  mounted() {
    const allFormats = this.formats || commonFormats;
    Object.keys(allFormats).forEach((type) => {
      this.options.push({
        name: allFormats[type].name,
        value: allFormats[type].value,
      });
    });
    this.$el.value = '';
  },
};
</script>
