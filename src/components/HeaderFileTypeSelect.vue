<template>
    <div>
        <label>{{label}}</label>
        <select v-model="type" @change="setType">
            <option value='' disabled>{{placeholder}}</option>
            <option value="json">JSON</option>
            <option value="mssql">MSSQL</option>
            <option value="dbml">DBML</option>
            <option value="mysql">MySQL</option>
            <option value="postgres">Postgresql</option>
        </select>
    </div>
</template>
<script>
export default {
  name: 'HeaderFileTypeSelect',
  data() {
    return {
      type: '',
    };
  },
  props: {
    isInput: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    placeholder() {
      return this.isInput ? 'Select input type' : 'Select output type';
    },
    label() {
      return this.isInput ? 'Input:' : 'Output:';
    },
  },
  methods: {
    setType() {
      if (this.isInput) {
        this.$store.commit('setInputType', this.type);
      } else {
        this.$store.commit('setOutputType', this.type);
      }
    },
  },
};
</script>
