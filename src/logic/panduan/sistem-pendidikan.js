export default {
  layout: 'default',
  pageTitle: 'Sistem Pendidikan di Korea - K-Campus',

  data() {
    return {
      // Page data can be added here if needed
    }
  },

  methods: {
    // Navigation method is inherited from ViewLogic
  },

  mounted() {
    this.log('info', 'Sistem Pendidikan page loaded');
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }
};
