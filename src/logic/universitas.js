export default {
  layout: 'default',
  pageTitle: 'Universitas di Korea - K-Campus',
  data() {
    return {
      quickSearch: '',
      viewMode: 'grid',
      sortBy: 'name',
      currentPage: 1,
      itemsPerPage: 10,
      favorites: [],
      loading: true,

      filters: {
        regions: [],
        levels: [],
        types: [],
        tuitionRange: 'all',
        hasScholarship: false,
        hasEnglishProgram: false,
        hasDormitory: false,
        hasLanguageInstitute: false
      },

      regions: [
        '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시',
        '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원특별자치도',
        '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도',
        '경상남도', '제주특별자치도'
      ],
      degreeLevels: ['D2 (Diploma 2 Tahun)', 'S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)'],
      universityTypes: ['Universitas Negeri', 'Universitas Swasta'],
      tuitionRanges: [
        { value: 'all', label: 'Semua' },
        { value: 'low', label: 'Di bawah ₩5,000,000' },
        { value: 'medium', label: '₩5,000,000 - ₩8,000,000' },
        { value: 'high', label: 'Di atas ₩8,000,000' }
      ],

      universities: []
    };
  },
  computed: {
    totalUniversities() {
      return this.universities.length;
    },
    filteredUniversities() {
      let results = [...this.universities];

      // Quick search filter
      if (this.quickSearch) {
        const search = this.quickSearch.toLowerCase();
        results = results.filter(uni =>
          uni.name.toLowerCase().includes(search) ||
          uni.nameKo.includes(search) ||
          uni.location.toLowerCase().includes(search) ||
          uni.description.toLowerCase().includes(search)
        );
      }

      // Region filter
      if (this.filters.regions.length > 0) {
        results = results.filter(uni =>
          this.filters.regions.includes(uni.location)
        );
      }

      // Degree level filter
      if (this.filters.levels.length > 0) {
        results = results.filter(uni =>
          this.filters.levels.some(level => uni.degreeLevels.includes(level))
        );
      }

      // Type filter
      if (this.filters.types.length > 0) {
        results = results.filter(uni =>
          this.filters.types.includes(uni.type)
        );
      }

      // Tuition range filter
      if (this.filters.tuitionRange !== 'all') {
        results = results.filter(uni => {
          const avgTuition = (uni.tuitionMin + uni.tuitionMax) / 2;
          switch (this.filters.tuitionRange) {
            case 'low':
              return avgTuition < 5000000;
            case 'medium':
              return avgTuition >= 5000000 && avgTuition <= 8000000;
            case 'high':
              return avgTuition > 8000000;
            default:
              return true;
          }
        });
      }

      // Feature filters
      if (this.filters.hasScholarship) {
        results = results.filter(uni => uni.hasScholarship);
      }
      if (this.filters.hasEnglishProgram) {
        results = results.filter(uni => uni.hasEnglishProgram);
      }
      if (this.filters.hasDormitory) {
        results = results.filter(uni => uni.hasDormitory);
      }
      if (this.filters.hasLanguageInstitute) {
        results = results.filter(uni => uni.hasLanguageInstitute);
      }

      return results;
    },
    sortedUniversities() {
      const sorted = [...this.filteredUniversities];

      switch (this.sortBy) {
        case 'name':
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'ranking':
          return sorted.sort((a, b) => {
            const rankA = parseInt(a.ranking.match(/\d+/) || 999);
            const rankB = parseInt(b.ranking.match(/\d+/) || 999);
            return rankA - rankB;
          });
        case 'tuition-low':
          return sorted.sort((a, b) => a.tuitionMin - b.tuitionMin);
        case 'tuition-high':
          return sorted.sort((a, b) => b.tuitionMax - a.tuitionMax);
        default:
          return sorted;
      }
    },
    paginatedUniversities() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedUniversities.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedUniversities.length / this.itemsPerPage);
    }
  },
  methods: {
    applyFilters() {
      this.currentPage = 1;
    },
    resetFilters() {
      this.quickSearch = '';
      this.filters = {
        regions: [],
        levels: [],
        types: [],
        tuitionRange: 'all',
        hasScholarship: false,
        hasEnglishProgram: false,
        hasDormitory: false,
        hasLanguageInstitute: false
      };
      this.currentPage = 1;
    },
    sortResults() {
      this.currentPage = 1;
    },
    viewUniversityDetail(universityId) {
      if (window.router && window.router.navigateTo) {
        window.router.navigateTo(`universitas-detail?id=${universityId}`);
      } else {
        window.location.hash = `#/universitas-detail?id=${universityId}`;
      }
      window.scrollTo(0, 0);
    },
    toggleFavorite(universityId) {
      const index = this.favorites.indexOf(universityId);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(universityId);
      }
      // Save to localStorage
      localStorage.setItem('favoriteUniversities', JSON.stringify(this.favorites));
    },
    isFavorite(universityId) {
      return this.favorites.includes(universityId);
    },
    formatCurrency(amount) {
      return '₩' + amount.toLocaleString('id-ID');
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
  async mounted() {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteUniversities');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }

    // Load universities from JSON file
    try {
      this.loading = true;
      const response = await fetch('data/universities.json');
      if (!response.ok) {
        throw new Error('Failed to load universities data');
      }
      this.universities = await response.json();
      this.log('info', 'Loaded', this.universities.length, 'universities from JSON');
    } catch (error) {
      this.log('error', 'Error loading universities:', error);
      // Fallback to empty array
      this.universities = [];
    } finally {
      this.loading = false;
    }

    window.scrollTo(0, 0);
  }
};
