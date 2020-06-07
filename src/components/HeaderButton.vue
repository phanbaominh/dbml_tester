<template>
    <button class="base-menu-btn has-background">
        <font-awesome-icon :icon="icon" />
        <span class="title"><slot></slot></span>
    </button>
</template>
<script>

export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>
<style scoped>
.base-menu-btn.has-background {
  background-color: #373c44;
  border-radius: 4px;
}

.base-menu-btn {
  height: 28px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 6px;
  cursor: pointer;

}

.base-menu-btn .title {
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  margin-left: 5px;
  color: #ffffff;
}
</style>
