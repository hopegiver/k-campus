export default {
  layout: 'default',
  pageTitle: 'Berita & Event - K-Campus',

  data() {
    return {
      activeFilter: 'all',
      filters: ['all', 'education_fair', 'cultural', 'admission'],
      loading: true,

      // Events loaded from JSON
      events: [],

      // Newsletter subscription
      newsletterEmail: '',
      newsletterSubmitting: false,
      newsletterMessage: '',
      newsletterSuccess: false
    };
  },

  computed: {
    filteredEvents() {
      if (this.activeFilter === 'all') {
        return this.events;
      }
      return this.events.filter(event => event.type === this.activeFilter);
    },

    featuredEvents() {
      return this.events.filter(event => event.isFeatured && this.isEventUpcoming(event.date));
    },

    upcomingEvents() {
      return this.events
        .filter(event => this.isEventUpcoming(event.date) && !event.isFeatured)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 4);
    },

    filterLabels() {
      return {
        all: 'Semua Event',
        education_fair: 'Education Fair',
        cultural: 'Acara Budaya',
        admission: 'Penerimaan Mahasiswa'
      };
    }
  },

  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
      this.$nextTick(() => {
        const element = document.getElementById('all-events');
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    },

    formatDate(dateString) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const date = new Date(dateString);
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    formatDateShort(dateString) {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
      const date = new Date(dateString);
      return `${months[date.getMonth()]} ${date.getDate()}`;
    },

    getEventIcon(type) {
      const icons = {
        education_fair: '🎓',
        cultural: '🎎',
        admission: '📢'
      };
      return icons[type] || '📅';
    },

    getEventTypeLabel(type) {
      const labels = {
        education_fair: 'Education Fair',
        cultural: 'Acara Budaya',
        admission: 'Penerimaan'
      };
      return labels[type] || type;
    },

    isEventUpcoming(dateString) {
      const eventDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    },

    getDaysUntil(dateString) {
      const eventDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Hari ini';
      if (diffDays === 1) return 'Besok';
      return `${diffDays} hari lagi`;
    },

    registerEvent(event) {
      if (event.registrationUrl && event.registrationUrl !== '#') {
        window.open(event.registrationUrl, '_blank');
      } else {
        this.navigateTo('konsultasi');
      }
    },

    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    },

    viewEventDetail(eventId) {
      this.navigateTo('berita-detail', { id: eventId });
    },

    async subscribeNewsletter() {
      if (!this.newsletterEmail) {
        return;
      }

      this.newsletterSubmitting = true;
      this.newsletterMessage = '';

      try {
        // Use ViewLogic's $api for API calls
        const data = await this.$api.post('/api/mailinglist', {
          email: this.newsletterEmail,
          source: 'berita-newsletter'
        });

        if (data.success) {
          this.newsletterSuccess = true;
          this.newsletterMessage = data.message || 'Terima kasih sudah berlangganan!';
          this.newsletterEmail = '';

          setTimeout(() => {
            this.newsletterMessage = '';
          }, 5000);
        } else {
          this.newsletterSuccess = false;
          this.newsletterMessage = data.error || 'Terjadi kesalahan. Silakan coba lagi.';
        }

      } catch (error) {
        this.log('error', 'Error subscribing to newsletter:', error);
        this.newsletterSuccess = false;
        this.newsletterMessage = 'Terjadi kesalahan. Silakan coba lagi nanti.';
      } finally {
        this.newsletterSubmitting = false;
      }
    }
  },

  async mounted() {
    // Load events from JSON file
    try {
      this.loading = true;

      const response = await fetch('data/events.json');
      if (response.ok) {
        this.events = await response.json();
        this.log('info', 'Loaded', this.events.length, 'events from JSON');
      } else {
        this.log('error', 'Failed to load events.json');
      }

    } catch (error) {
      this.log('error', 'Error loading events data:', error);
    } finally {
      this.loading = false;
    }
  }
};
