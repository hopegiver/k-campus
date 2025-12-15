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

      // Why Korea Section (static content)
      whyKorea: [
        {
          id: 1,
          icon: '🎓',
          title: 'Pendidikan Berkualitas',
          description: 'Universitas Korea masuk dalam ranking dunia dengan kurikulum internasional dan fasilitas modern'
        },
        {
          id: 2,
          icon: '🌏',
          title: 'Teknologi Canggih',
          description: 'Negara dengan teknologi terdepan, pusat inovasi dan penelitian global'
        },
        {
          id: 3,
          icon: '💼',
          title: 'Peluang Karir',
          description: 'Lulusan Korea memiliki prospek karir cerah di perusahaan multinasional'
        },
        {
          id: 4,
          icon: '🎯',
          title: 'Beasiswa Melimpah',
          description: 'Banyak program beasiswa pemerintah dan universitas untuk mahasiswa internasional'
        }
      ],

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
        date: this.formatDate(news.date)
      }));
    }
  },

  methods: {
    formatDate(dateString) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const date = new Date(dateString);
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
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
      this.navigateTo('universitas/detail', { id: universityId });
    },

    viewScholarship(scholarshipId) {
      this.log('info', 'Viewing scholarship', { scholarshipId });
      this.navigateTo('beasiswa/detail', { id: scholarshipId });
    },

    viewNews(newsId) {
      this.log('info', 'Viewing news', { newsId });
      this.navigateTo('berita/detail', { id: newsId });
    }
  },

  async mounted() {
    // Load data from JSON files
    try {
      this.loading = true;

      // Load top universities
      const universitiesResponse = await fetch('data/home-universities.json');
      if (universitiesResponse.ok) {
        this.topUniversities = await universitiesResponse.json();
        this.log('info', 'Loaded', this.topUniversities.length, 'top universities from JSON');
      } else {
        this.log('error', 'Failed to load home-universities.json');
      }

      // Load scholarships
      const scholarshipsResponse = await fetch('data/home-scholarships.json');
      if (scholarshipsResponse.ok) {
        this.scholarships = await scholarshipsResponse.json();
        this.log('info', 'Loaded', this.scholarships.length, 'scholarships from JSON');
      } else {
        this.log('error', 'Failed to load home-scholarships.json');
      }

      // Load testimonials
      const testimonialsResponse = await fetch('data/home-testimonials.json');
      if (testimonialsResponse.ok) {
        this.testimonials = await testimonialsResponse.json();
        this.log('info', 'Loaded', this.testimonials.length, 'testimonials from JSON');
      } else {
        this.log('error', 'Failed to load home-testimonials.json');
      }

      // Load latest news
      const newsResponse = await fetch('data/home-news.json');
      if (newsResponse.ok) {
        this.latestNews = await newsResponse.json();
        this.log('info', 'Loaded', this.latestNews.length, 'news items from JSON');
      } else {
        this.log('error', 'Failed to load home-news.json');
      }

    } catch (error) {
      this.log('error', 'Error loading home page data:', error);
    } finally {
      this.loading = false;
    }

    this.log('info', 'Home page loaded');
  }
};
