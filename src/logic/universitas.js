export default {
  layout: 'default',
  pageTitle: 'Universitas di Korea - K-Campus',
  data() {
    return {
      quickSearch: '',
      viewMode: 'grid',
      sortBy: 'name',
      currentPage: 1,
      itemsPerPage: 9,
      favorites: [],

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

      regions: ['Seoul', 'Busan', 'Daejeon', 'Incheon', 'Gyeonggi'],
      degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)'],
      universityTypes: ['Negeri', 'Swasta'],
      tuitionRanges: [
        { value: 'all', label: 'Semua' },
        { value: 'low', label: 'Di bawah ₩5,000,000' },
        { value: 'medium', label: '₩5,000,000 - ₩8,000,000' },
        { value: 'high', label: 'Di atas ₩8,000,000' }
      ],

      universities: [
        {
          id: 'snu',
          name: 'Seoul National University',
          nameKo: '서울대학교',
          location: 'Seoul',
          type: 'Negeri',
          ranking: 'QS #41',
          description: 'Universitas terbaik dan paling prestisius di Korea Selatan',
          logo: '🎓',
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop',
          tuitionMin: 4000000,
          tuitionMax: 6000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'kaist',
          name: 'Korea Advanced Institute of Science and Technology',
          nameKo: 'KAIST',
          location: 'Daejeon',
          type: 'Negeri',
          ranking: 'QS #56',
          description: 'Institut teknologi terkemuka di Korea',
          logo: '🔬',
          image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop',
          tuitionMin: 4500000,
          tuitionMax: 7000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: false,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'korea-univ',
          name: 'Korea University',
          nameKo: '고려대학교',
          location: 'Seoul',
          type: 'Swasta',
          ranking: 'QS #79',
          description: 'Salah satu universitas SKY, universitas top di Korea',
          logo: '🦁',
          image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=250&fit=crop',
          tuitionMin: 8000000,
          tuitionMax: 10000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'yonsei',
          name: 'Yonsei University',
          nameKo: '연세대학교',
          location: 'Seoul',
          type: 'Swasta',
          ranking: 'QS #76',
          description: 'Universitas tertua di Korea, bagian dari SKY universities',
          logo: '🦅',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
          tuitionMin: 8500000,
          tuitionMax: 11000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'skku',
          name: 'Sungkyunkwan University',
          nameKo: '성균관대학교',
          location: 'Seoul',
          type: 'Swasta',
          ranking: 'QS #97',
          description: 'Universitas tertua di Asia Timur (didirikan 1398)',
          logo: '📚',
          image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=250&fit=crop',
          tuitionMin: 7500000,
          tuitionMax: 9500000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'hanyang',
          name: 'Hanyang University',
          nameKo: '한양대학교',
          location: 'Seoul',
          type: 'Swasta',
          ranking: 'QS #164',
          description: 'Terkenal dengan program teknik dan arsitektur',
          logo: '🏛️',
          image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=250&fit=crop',
          tuitionMin: 7000000,
          tuitionMax: 9000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'pusan',
          name: 'Pusan National University',
          nameKo: '부산대학교',
          location: 'Busan',
          type: 'Negeri',
          ranking: 'Top 10',
          description: 'Universitas negeri terkemuka di wilayah Busan',
          logo: '🌊',
          image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=250&fit=crop',
          tuitionMin: 3500000,
          tuitionMax: 5500000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'kyunghee',
          name: 'Kyung Hee University',
          nameKo: '경희대학교',
          location: 'Seoul',
          type: 'Swasta',
          ranking: 'QS #270',
          description: 'Universitas dengan kampus indah dan program internasional kuat',
          logo: '🌸',
          image: 'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=400&h=250&fit=crop',
          tuitionMin: 7000000,
          tuitionMax: 8500000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'ewha',
          name: 'Ewha Womans University',
          nameKo: '이화여자대학교',
          location: 'Seoul',
          type: 'Swasta',
          ranking: 'QS #362',
          description: 'Universitas wanita terbesar di dunia',
          logo: '🌺',
          image: 'https://images.unsplash.com/photo-1605289355680-75fb41239154?w=400&h=250&fit=crop',
          tuitionMin: 7500000,
          tuitionMax: 9000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'sogang',
          name: 'Sogang University',
          nameKo: '서강대학교',
          location: 'Seoul',
          type: 'Swasta',
          ranking: 'Top 10',
          description: 'Universitas Jesuit dengan program liberal arts terkemuka',
          logo: '⛪',
          image: 'https://images.unsplash.com/photo-1607706009771-de8808640bcf?w=400&h=250&fit=crop',
          tuitionMin: 7500000,
          tuitionMax: 9000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'inha',
          name: 'Inha University',
          nameKo: '인하대학교',
          location: 'Incheon',
          type: 'Swasta',
          ranking: 'Top 20',
          description: 'Universitas dengan program teknik dan logistik terkemuka',
          logo: '✈️',
          image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=250&fit=crop',
          tuitionMin: 6500000,
          tuitionMax: 8000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        },
        {
          id: 'konkuk',
          name: 'Konkuk University',
          nameKo: '건국대학교',
          location: 'Seoul',
          type: 'Swasta',
          ranking: 'Top 20',
          description: 'Universitas dengan kampus hijau di pusat Seoul',
          logo: '🐂',
          image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=250&fit=crop',
          tuitionMin: 6500000,
          tuitionMax: 8000000,
          hasScholarship: true,
          hasEnglishProgram: true,
          hasDormitory: true,
          hasLanguageInstitute: true,
          degreeLevels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
        }
      ]
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
  mounted() {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteUniversities');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }

    this.log('info', 'Universitas page loaded with', this.universities.length, 'universities');
    window.scrollTo(0, 0);
  }
};
