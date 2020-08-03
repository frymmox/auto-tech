<template>
  <main class="main">
    <section class="grid">
      <div class="grid__wrap">
        <div class="grid__form">
          <input
            type="text"
            v-model="search"
            placeholder="Search user">
        </div>
        <div class="grid__list">
          <div class="grid__item"
            v-for="user in filteredSearch"
            :key="user.id">
            <div class="grid__card">
              <img width="64" height="64" :src="user.avatar" alt="">

              <span @click="deleteUser(user.id)">
                <svg viewBox="0 0 24 24" fill="#fff" width="24px" height="24px">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </span>

              <h2>
                <router-link :to="{name: 'user', params: {id: user.id}}">
                  {{ user.first_name }} {{ user.last_name }}
                </router-link>
              </h2>

              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid">
      <div class="grid__wrap">
        <add-user />
      </div>
    </section>
  </main>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import AddUser from '@/components/AddUser'

  export default {
    data() {
      return {
        search: ''
      }
    },
    components: {
      AddUser
    },
    computed: {
      ...mapGetters(['validUsers']),

      filteredSearch() {
        return this.validUsers.filter(user => {
          return user.first_name.indexOf(this.search) > -1
        })
      }
    },
    methods: {
      ...mapActions(['fetchUsers']),
      ...mapMutations(['removeUser']),

      deleteUser(id) {
        this.removeUser(id);
      }
    },
    mounted() {
      this.fetchUsers()
    }
  }
</script>

<style lang="less">
  @import '@/assets/variables.less';

  .grid {
    width: 100%;
    padding-right: @blockGap;
    padding-left: @blockGap;
    padding-top: @blockGap;
    padding-bottom: @blockGap;

    @media (max-width: @breakpoint-sm - 1px) {
      padding-right: @blockGap / 2;
      padding-left: @blockGap / 2;
    }
  }

  .grid__wrap {
    max-width: @elementBase-maxWidth;
    margin-right: auto;
    margin-left: auto;
  }

  .grid__form {
    display: flex;
    justify-content: center;
    margin-bottom: @elementGap-base;

    input {
      margin-right: @indent-base;
      border-radius: 4px;
      border-color: #000;
      padding: @indent-base;
      min-width: 300px;
    }
  }

  .grid__list {
    display: flex;
    flex-wrap: wrap;
    margin-right: @elementGap-base * -1;
    margin-bottom: @elementGap-base * -1;
  }

  .grid__item {
    width: calc(~'100% - @{elementGap-base}');
    margin-right: @elementGap-base;
    margin-bottom: @elementGap-base;

    @media (min-width: @breakpoint-sm) {
      width: calc(~'50% - @{elementGap-base}');
    }

    @media (min-width: @breakpoint-lg) {
      width: calc(~'33.33% - @{elementGap-base}');
    }
  }

  .grid__card {
    min-height: 100%;
    border-radius: 4px;
    padding: 16px;
    background-color: #ccc;
    position: relative;

    span {
      position: absolute;
      right: 16px;
      top: 16px;
      cursor: pointer;
    }

    img {
      border-radius: 50%;
      margin-bottom: @indent-base;
    }

    h2 {
      margin-bottom: @indent-base;
    }
  }
</style>
