export default {
  layout: 'default',
  pageTitle: 'Detail Universitas - K-Campus',
  data() {
    return {
      universityId: null,
      university: null,
      loading: true,
      error: null,
      isFavorited: false,
      activeTab: 'basic',
      tabs: [
        { id: 'basic', label: 'Info Dasar', icon: '📋' },
        { id: 'programs', label: 'Program Studi', icon: '🎓' },
        { id: 'admission', label: 'Pendaftaran', icon: '📝' },
        { id: 'tuition', label: 'Biaya Kuliah', icon: '💰' },
        { id: 'scholarships', label: 'Beasiswa', icon: '🎓' },
        { id: 'dormitory', label: 'Asrama', icon: '🏠' },
        { id: 'language', label: 'Program Bahasa', icon: '🗣️' }
      ],
    };
  },
  computed: {},
  methods: {
    async loadUniversityData() {
      if (!this.universityId) {
        this.error = 'University ID not provided';
        this.loading = false;
        return;
      }

      try {
        this.loading = true;
        this.error = null;

        // Load from individual JSON file
        const response = await fetch(`data/universities/${this.universityId}.json`);

        if (response.ok) {
          this.university = await response.json();
          this.log('info', 'Loaded university data from file:', this.universityId);
        } else {
          this.error = `University "${this.universityId}" not found`;
          this.log('error', 'University not found:', this.universityId);
        }
      } catch (error) {
        this.log('error', 'Error loading university data:', error);
        this.error = 'Failed to load university data';
      } finally {
        this.loading = false;
      }
    },
    getLevelLabel(level) {
      const labels = {
        'bachelor': 'S1 (Sarjana)',
        'master': 'S2 (Magister)',
        'doctoral': 'S3 (Doktor)'
      };
      return labels[level] || level;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    navigateTo(route) {
      if (window.router && window.router.navigateTo) {
        window.router.navigateTo(route);
      } else {
        window.location.hash = `#/${route}`;
      }
      window.scrollTo(0, 0);
    },
    visitWebsite() {
      if (this.university && this.university.contact && this.university.contact.website) {
        window.open(this.university.contact.website, '_blank');
      }
    },
    formatCurrency(amount) {
      return '₩' + amount.toLocaleString('id-ID');
    },
    toggleFavorite() {
      this.isFavorited = !this.isFavorited;
      // Save to localStorage
      const favorites = JSON.parse(localStorage.getItem('favoriteUniversities') || '[]');
      const index = favorites.indexOf(this.universityId);
      if (this.isFavorited && index === -1) {
        favorites.push(this.universityId);
      } else if (!this.isFavorited && index > -1) {
        favorites.splice(index, 1);
      }
      localStorage.setItem('favoriteUniversities', JSON.stringify(favorites));
    }
  },
  async mounted() {
    // Get university ID from URL using ViewLogic's getParam
    this.universityId = this.getParam('id', 'seoul-national');

    this.log('info', 'Loading university detail:', this.universityId);

    // Load university data
    await this.loadUniversityData();

    // Check if favorited
    const favorites = JSON.parse(localStorage.getItem('favoriteUniversities') || '[]');
    this.isFavorited = favorites.includes(this.universityId);
  }
};
