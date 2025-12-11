export default {
  layout: 'default',
  pageTitle: 'Beasiswa GKS - K-Campus',

  data() {
    return {
      // Page data if needed
    }
  },

  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80; // Height of fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    },

    navigateTo(route) {
      if (window.router && window.router.navigateTo) {
        window.router.navigateTo(route);
      } else {
        window.location.hash = `#/${route}`;
      }
      window.scrollTo(0, 0);
    }
  },

  mounted() {
    this.log('info', 'Beasiswa GKS page loaded');
    window.scrollTo(0, 0);
  }
};
