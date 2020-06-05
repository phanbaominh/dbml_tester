<template>
  <div class="diagram-container">
      <diagram-container-vue :database="database" :headerColor="true"/>
  </div>
</template>

<script>
import DiagramContainerVue from '@holistics/dbrender';

export default {
  name: 'DiagramView',
  components: {
    DiagramContainerVue,
  },
  props: {
    database: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style scoped>
.diagram-container {
  width: 100%;
  height: 100%;
}
</style>
