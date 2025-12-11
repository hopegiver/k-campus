export default {
  layout: 'default',

  data() {
    return {
      // Search Form
      searchForm: {
        jurusan: '',
        jenjang: '',
        kota: ''
      },

      // Why Korea Section
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

      // Top Universities
      topUniversities: [
        {
          id: 1,
          name: 'Seoul National University',
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
          ranking: 'Top 50 Dunia',
          location: 'Seoul',
          description: 'Universitas tertua dan terprestisius di Korea dengan berbagai program studi unggulan'
        },
        {
          id: 2,
          name: 'KAIST',
          image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
          ranking: 'Top 100 Dunia',
          location: 'Daejeon',
          description: 'Institut teknologi terkemuka dengan fokus pada sains dan engineering'
        },
        {
          id: 3,
          name: 'Korea University',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
          ranking: 'Top 150 Dunia',
          location: 'Seoul',
          description: 'Salah satu universitas tertua dengan reputasi internasional yang kuat'
        },
        {
          id: 4,
          name: 'Yonsei University',
          image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
          ranking: 'Top 150 Dunia',
          location: 'Seoul',
          description: 'Universitas swasta terkemuka dengan program bisnis dan kedokteran yang sangat baik'
        },
        {
          id: 5,
          name: 'Sungkyunkwan University',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
          ranking: 'Top 200 Dunia',
          location: 'Seoul',
          description: 'Universitas bersejarah dengan program akademik yang komprehensif'
        },
        {
          id: 6,
          name: 'Hanyang University',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
          ranking: 'Top 250 Dunia',
          location: 'Seoul',
          description: 'Terkenal dengan program teknik dan teknologi yang unggul'
        }
      ],

      // Scholarships
      scholarships: [
        {
          id: 1,
          name: 'GKS (Global Korea Scholarship)',
          category: 'Pemerintah',
          type: 'primary',
          description: 'Beasiswa penuh dari pemerintah Korea untuk program S1, S2, dan S3 termasuk biaya hidup',
          deadline: '30 September 2024'
        },
        {
          id: 2,
          name: 'Seoul National University Scholarship',
          category: 'Universitas',
          type: 'secondary',
          description: 'Beasiswa prestasi akademik untuk mahasiswa internasional berprestasi',
          deadline: '31 Agustus 2024'
        },
        {
          id: 3,
          name: 'KAIST International Student Scholarship',
          category: 'Universitas',
          type: 'secondary',
          description: 'Beasiswa penuh untuk program S2 dan S3 di bidang sains dan teknologi',
          deadline: '15 Oktober 2024'
        },
        {
          id: 4,
          name: 'Art Major Asian Scholarship',
          category: 'Swasta',
          type: 'info',
          description: 'Beasiswa khusus untuk mahasiswa seni dan desain dari negara Asia',
          deadline: '31 Juli 2024'
        },
        {
          id: 5,
          name: 'Korea Foundation Fellowship',
          category: 'Yayasan',
          type: 'success',
          description: 'Beasiswa untuk penelitian dan studi lanjut di berbagai bidang',
          deadline: '30 November 2024'
        },
        {
          id: 6,
          name: 'Samsung Global Scholarship',
          category: 'Perusahaan',
          type: 'warning',
          description: 'Beasiswa dari Samsung untuk mahasiswa berprestasi di bidang teknologi',
          deadline: '31 Agustus 2024'
        }
      ],

      // Testimonials
      testimonials: [
        {
          id: 1,
          name: 'Ahmad Pratama',
          initial: 'AP',
          university: 'Seoul National University',
          major: 'Teknik Informatika',
          message: 'Kuliah di Korea membuka banyak kesempatan bagi saya. Fasilitas kampus sangat lengkap dan dosen-dosen sangat supportive!'
        },
        {
          id: 2,
          name: 'Siti Nurhaliza',
          initial: 'SN',
          university: 'Korea University',
          major: 'Bisnis Internasional',
          message: 'Mendapat beasiswa GKS adalah mimpi yang jadi kenyataan. Sekarang saya belajar dari professor terbaik di Korea.'
        },
        {
          id: 3,
          name: 'Budi Santoso',
          initial: 'BS',
          university: 'KAIST',
          major: 'Robotika',
          message: 'KAIST memberikan pengalaman belajar yang luar biasa dengan teknologi terkini. Recommended banget untuk yang suka teknologi!'
        }
      ],

      // Latest News
      latestNews: [
        {
          id: 1,
          title: 'Pendaftaran GKS 2025 Dibuka!',
          category: 'Beasiswa',
          categoryType: 'primary',
          image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
          excerpt: 'Program beasiswa pemerintah Korea untuk tahun 2025 resmi dibuka. Daftar sekarang dan raih kesempatan kuliah gratis di Korea!',
          date: '1 Juni 2024'
        },
        {
          id: 2,
          title: 'Education Fair Korea 2024 di Jakarta',
          category: 'Acara',
          categoryType: 'success',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
          excerpt: 'Bertemu langsung dengan perwakilan 30+ universitas Korea di Jakarta Convention Center, 15-16 Juli 2024.',
          date: '28 Mei 2024'
        },
        {
          id: 3,
          title: 'Tips Lolos Seleksi Beasiswa Korea',
          category: 'Panduan',
          categoryType: 'info',
          image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
          excerpt: 'Simak tips dan trik dari alumni penerima beasiswa untuk meningkatkan peluang lolos seleksi beasiswa Korea.',
          date: '25 Mei 2024'
        }
      ]
    };
  },

  methods: {
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

  mounted() {
    this.log('info', 'Beranda page loaded');
  }
};
