export default {
  layout: 'default',
  pageTitle: 'Biaya Hidup di Korea - K-Campus',

  data() {
    return {
      // Page data can be added here if needed
    }
  },

  methods: {
    // Navigation method is inherited from ViewLogic
  },

  mounted() {
    this.log('info', 'Biaya Hidup page loaded');
    window.scrollTo(0, 0);
  }
};
