export default {
  layout: 'default',

  data() {
    return {
      loading: true,

      // Search Form
      searchForm: {
        jurusan: '',
        jenjang: '',
        kota: ''
      },

      // Data loaded from JSON
      topUniversities: [],
      scholarships: [],
      testimonials: [],
      latestNews: []
    };
  },

  computed: {
    formattedScholarships() {
      return this.scholarships.map(scholarship => ({
        ...scholarship,
        deadline: this.formatDate(scholarship.deadline)
      }));
    },

    formattedNews() {
      return this.latestNews.map(news => ({
        ...news,
        date: this.formatDate(news.date),
        categoryType: this.getEventCategoryType(news.type)
      }));
    }
  },

  methods: {
    formatDate(dateString) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const date = new Date(dateString);
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    getEventCategoryType(eventType) {
      const typeMap = {
        'education_fair': 'primary',
        'cultural': 'success',
        'admission': 'info'
      };
      return typeMap[eventType] || 'secondary';
    },

    getEventCategoryLabel(eventType) {
      const labelMap = {
        'education_fair': 'Education Fair',
        'cultural': 'Acara Budaya',
        'admission': 'Penerimaan'
      };
      return labelMap[eventType] || 'Acara';
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

    handleSearch() {
      this.log('info', 'Search submitted', this.searchForm);

      // Navigate to university list with search parameters
      this.navigateTo('universitas', {
        jurusan: this.searchForm.jurusan,
        jenjang: this.searchForm.jenjang,
        kota: this.searchForm.kota
      });
    },

    viewUniversity(universityId) {
      this.log('info', 'Viewing university', { universityId });
      this.navigateTo('universitas-detail', { id: universityId });
    },

    viewScholarship(scholarship) {
      this.log('info', 'Viewing scholarship', { scholarship: scholarship.name });
      // Navigate to consultation page for scholarship inquiries
      this.navigateTo('konsultasi');
    },

    viewNews(newsId) {
      this.log('info', 'Viewing news', { newsId });
      this.navigateTo('berita-detail', { id: newsId });
    }
  },

  async mounted() {
    // Load data from JSON files
    try {
      this.loading = true;

      // Load home page static content (universities, scholarships, testimonials)
      const homeResponse = await fetch('data/home.json');
      if (homeResponse.ok) {
        const homeData = await homeResponse.json();
        this.topUniversities = homeData.topUniversities || [];
        this.scholarships = homeData.scholarships || [];
        this.testimonials = homeData.testimonials || [];
        this.log('info', 'Loaded home page data:', {
          universities: this.topUniversities.length,
          scholarships: this.scholarships.length,
          testimonials: this.testimonials.length
        });
      } else {
        this.log('error', 'Failed to load home.json');
      }

      // Load latest news from events.json (real-time data)
      const eventsResponse = await fetch('data/events.json');
      if (eventsResponse.ok) {
        const allEvents = await eventsResponse.json();

        // Get upcoming events, sort by date, take first 3
        this.latestNews = allEvents
          .filter(event => this.isEventUpcoming(event.date))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3)
          .map(event => ({
            id: event.id,
            title: event.title,
            category: this.getEventCategoryLabel(event.type),
            categoryType: this.getEventCategoryType(event.type),
            image: event.image,
            excerpt: event.description,
            date: event.date,
            type: event.type,
            registrationUrl: event.registrationUrl
          }));

        this.log('info', 'Loaded', this.latestNews.length, 'latest events from events.json');
      } else {
        this.log('error', 'Failed to load events.json');
      }

    } catch (error) {
      this.log('error', 'Error loading home page data:', error);
    } finally {
      this.loading = false;
    }

    this.log('info', 'Home page loaded');
  }
};
