<template>
  <div class="dashboard-container">
    <component v-bind:is="currentRole"> </component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EditorDashboard from './editor/index';
  import DefaultDashboard from './default/index';

  export default {
    name: 'dashboard',
    components: { EditorDashboard, DefaultDashboard },
    data() {
      return {
        currentRole: 'EditorDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'userName',
        'avatar',
        'userId',
        'auths'
      ])
    },
    created() {
//      if (this.auths.indexOf('ROLE_ADMIN') >= 0) {
//        return;
//      }
      this.currentRole = 'DefaultDashboard';
    }
  }
</script>
