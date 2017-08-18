import Vue from 'vue';
import Authenticator from './vue/Authenticator';
import Dashboard from './vue/Dashboard';

new Vue({
  name: 'app',
  el: '#app',
  components: {
      Authenticator,
      Dashboard,
  },
});
