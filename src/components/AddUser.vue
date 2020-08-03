<template>
  <div class="form">
    <form @submit.prevent="submit">
      <input type="text" placeholder="First name" v-model="first_name">
      <input type="text" placeholder="Last name" v-model="last_name">
      <input type="text" placeholder="Email" v-model="email">
      <input type="text" placeholder="Avatar" v-model="avatar">

      <button type="submit">Add user</button>
    </form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
      }
    },
    methods: {
      ...mapMutations(['addUser']),
      submit() {
        this.addUser({
          id: Date.now(),
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          avatar: this.avatar
        })

        this.first_name = this.last_name = this.email = this.avatar = ''
      }
    }
  }
</script>

<style lang="less">
  @import '@/assets/variables.less';

  .form {
    display: flex;
    justify-content: center;

    form {
      display: flex;
      flex-direction: column;
      min-width: 400px;
      align-items: center;
    }

    input {
      margin-bottom: @indent-base;
      width: 100%;
      padding: @indent-base;
    }

    button {
      background-color: darkblue;
      color: #fff;
      padding: @indent-base @indent-base * 2;
      border-radius: 4px;
    }
  }
</style>
