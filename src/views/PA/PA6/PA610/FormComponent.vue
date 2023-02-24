<template>
  <form>
    <label>
      Name:
      <input v-model="name" />
    </label>
    <br />
    <label>
      Age:
      <input v-model="age" />
    </label>
    <br />
    <button @click="onSubmit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      age: "",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", { name: this.name, age: this.age });
    },
  },
};
</script>
