<template>
  <main class="main">
    <section class="grid">
      <div class="grid__wrap">
          <h1>
            {{ user.first_name }} {{ user.last_name }}
          </h1>

          <p>{{ user.email }}</p>
      </div>
    </section>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['validUsers']),

      user() {
        return this.validUsers.find(user => user.id === this.$route.params.id)
      }
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
</style>
