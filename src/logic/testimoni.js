export default {
  layout: 'default',
  pageTitle: 'Testimoni Alumni - K-Campus',

  data() {
    return {
      activeFilter: 'all',
      filters: ['all', 'undergraduate', 'graduate', 'language'],

      // Student Interviews
      studentInterviews: [
        {
          id: 1,
          name: 'Sarah Putri',
          nameKo: '사라',
          program: 'S1 Business Administration',
          university: 'Seoul National University',
          year: '2023',
          location: 'Seoul',
          category: 'undergraduate',
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
          quote: 'Kuliah di SNU membuka banyak peluang karir internasional. Beasiswa GKS benar-benar mengubah hidup saya!',
          story: 'Saya mendapat beasiswa GKS Embassy Track tahun 2019. Selama kuliah di SNU, saya aktif di berbagai organisasi mahasiswa internasional dan mendapat kesempatan magang di Samsung. Sekarang saya bekerja sebagai Marketing Manager di perusahaan Korea-Indonesia.',
          achievements: [
            'Cum Laude GPA 3.85/4.0',
            'President of Indonesian Student Association',
            'Internship di Samsung Electronics',
            'TOPIK Level 6'
          ],
          tips: [
            'Mulai belajar bahasa Korea sejak dini',
            'Aktif dalam organisasi mahasiswa',
            'Manfaatkan program mentoring dari universitas',
            'Jangan takut untuk bertanya dan mencari bantuan'
          ]
        },
        {
          id: 2,
          name: 'Ahmad Rizky',
          nameKo: '리즈키',
          program: 'S2 Computer Science',
          university: 'KAIST',
          year: '2022',
          location: 'Daejeon',
          category: 'graduate',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
          quote: 'KAIST memberikan fasilitas penelitian yang luar biasa. Saya berkesempatan publish paper di konferensi internasional.',
          story: 'Setelah lulus S1 dari ITB, saya mendaftar program S2 di KAIST melalui University Track GKS. Program AI dan Machine Learning di KAIST sangat advanced dan saya bisa berkolaborasi dengan profesor-profesor terbaik di bidang ini.',
          achievements: [
            '2 publications di konferensi internasional',
            'Best Student Paper Award',
            'Research Assistant di AI Lab',
            'Job offer dari Naver sebelum lulus'
          ],
          tips: [
            'Fokus pada research proposal yang kuat',
            'Kontak profesor sebelum mendaftar',
            'Perbanyak publikasi sejak S1',
            'Network dengan sesama researcher'
          ]
        },
        {
          id: 3,
          name: 'Devi Lestari',
          nameKo: '데비',
          program: 'Korean Language Program',
          university: 'Yonsei University',
          year: '2024',
          location: 'Seoul',
          category: 'language',
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
          quote: 'Program bahasa Korea di Yonsei sangat intensif. Dalam 1 tahun saya bisa dari level 1 ke level 5 TOPIK.',
          story: 'Saya memulai dari nol pengetahuan bahasa Korea. Korean Language Institute di Yonsei menggunakan metode yang sangat efektif dengan fokus pada speaking dan practical usage. Sekarang saya melanjutkan ke program S1.',
          achievements: [
            'TOPIK Level 5 dalam 1 tahun',
            'Scholarship untuk program S1',
            'Winner Korean Speech Contest',
            'Part-time sebagai translator'
          ],
          tips: [
            'Praktik speaking setiap hari',
            'Ikuti language exchange program',
            'Tonton drama/variety show untuk listening',
            'Jangan malu untuk berbicara meski salah'
          ]
        },
        {
          id: 4,
          name: 'Budi Santoso',
          nameKo: '부디',
          program: 'S1 Mechanical Engineering',
          university: 'Hanyang University',
          year: '2023',
          location: 'Seoul',
          category: 'undergraduate',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
          quote: 'Hanyang terkenal dengan program engineering-nya. Lab dan equipment di sini world-class!',
          story: 'Dari SMA di Surabaya, saya bermimpi kuliah teknik di luar negeri. GKS memberi kesempatan itu. Di Hanyang, saya belajar dari profesor-profesor berpengalaman dan terlibat dalam berbagai research project.',
          achievements: [
            'Dean\'s List 6 semester berturut-turut',
            'Research project dengan Hyundai Motor',
            'Vice President Engineering Student Council',
            'Scholarship continuation untuk S2'
          ],
          tips: [
            'Strong foundation di matematika dan fisika',
            'Ikuti workshop dan seminar teknik',
            'Join research lab sejak semester awal',
            'Build portfolio project'
          ]
        },
        {
          id: 5,
          name: 'Anissa Rahma',
          nameKo: '아니사',
          program: 'S3 International Relations',
          university: 'Korea University',
          year: '2021',
          location: 'Seoul',
          category: 'graduate',
          photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop',
          quote: 'Program S3 di Korea University memberi saya kesempatan untuk berkontribusi pada penelitian Korea-ASEAN relations.',
          story: 'Setelah bekerja 5 tahun di Kementerian Luar Negeri, saya memutuskan melanjutkan S3 untuk memperdalam pengetahuan tentang hubungan internasional Korea-Indonesia. Program doktoral di KU sangat supportive untuk working professionals.',
          achievements: [
            'Dissertation tentang Korea-Indonesia Partnership',
            'Guest lecturer di beberapa universitas',
            'Published 3 journal articles',
            'Consultant untuk ASEAN-Korea Centre'
          ],
          tips: [
            'Pilih topik dissertation yang passion',
            'Time management sangat penting',
            'Manfaatkan advisor dan committee',
            'Present di konferensi untuk networking'
          ]
        },
        {
          id: 6,
          name: 'Fajar Pratama',
          nameKo: '파자르',
          program: 'S2 MBA',
          university: 'Sungkyunkwan University',
          year: '2022',
          location: 'Seoul',
          category: 'graduate',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
          quote: 'SKKU MBA program menggabungkan teori bisnis modern dengan praktik industri Korea yang innovative.',
          story: 'Dengan background 3 tahun di startup Indonesia, saya ingin belajar bagaimana ekosistem startup Korea berkembang pesat. MBA di SKKU memberi exposure ke berbagai industri dan kesempatan belajar langsung dari industry leaders.',
          achievements: [
            'Case competition winner',
            'Internship di Kakao Corp',
            'Founded Korea-Indonesia business network',
            'Job offer dari Big4 consulting'
          ],
          tips: [
            'Work experience sangat membantu di MBA',
            'Active participation di class discussion',
            'Network dengan alumni dan industry',
            'Focus on practical business skills'
          ]
        }
      ],

      // Video Testimonials (YouTube)
      videoTestimonials: [
        {
          id: 1,
          title: 'Kehidupan Sehari-hari Mahasiswa Indonesia di Seoul',
          youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
          thumbnail: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop',
          student: 'Sarah & Devi',
          duration: '15:24',
          views: '125K',
          category: 'undergraduate'
        },
        {
          id: 2,
          title: 'Tips Lolos Beasiswa GKS - Interview dengan Ahmad',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop',
          student: 'Ahmad Rizky',
          duration: '12:45',
          views: '89K',
          category: 'graduate'
        },
        {
          id: 3,
          title: 'Belajar Bahasa Korea dari NOL - My Journey to TOPIK 5',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
          student: 'Devi Lestari',
          duration: '18:32',
          views: '156K',
          category: 'language'
        },
        {
          id: 4,
          title: 'Campus Tour: Hanyang University',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop',
          student: 'Budi Santoso',
          duration: '10:15',
          views: '67K',
          category: 'undergraduate'
        },
        {
          id: 5,
          title: 'Dari Kerja ke S3: Pengalaman Doctoral Program di Korea',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
          student: 'Anissa Rahma',
          duration: '20:18',
          views: '42K',
          category: 'graduate'
        },
        {
          id: 6,
          title: 'MBA di Korea: Worth it or Not?',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
          student: 'Fajar Pratama',
          duration: '14:50',
          views: '93K',
          category: 'graduate'
        }
      ],

      // Community Links by Region
      communities: [
        {
          region: 'Seoul',
          icon: '🏙️',
          description: 'Komunitas mahasiswa Indonesia terbesar di Korea',
          groups: [
            {
              name: 'PPI Seoul',
              platform: 'WhatsApp',
              members: '500+',
              link: 'https://chat.whatsapp.com/example',
              description: 'Official PPI Seoul - Info beasiswa, events, dan networking'
            },
            {
              name: 'Indonesian Students SNU',
              platform: 'KakaoTalk',
              members: '120+',
              link: '#',
              description: 'Khusus mahasiswa Indonesia di Seoul National University'
            },
            {
              name: 'Indo Korea Community Seoul',
              platform: 'Facebook',
              members: '2.5K+',
              link: '#',
              description: 'Mahasiswa & profesional Indonesia di Seoul area'
            },
            {
              name: 'Indonesian Students Yonsei/Korea Univ',
              platform: 'Telegram',
              members: '200+',
              link: '#',
              description: 'Komunitas mahasiswa di Yonsei & Korea University'
            }
          ]
        },
        {
          region: 'Busan',
          icon: '🌊',
          description: 'Komunitas hangat mahasiswa Indonesia di kota pelabuhan',
          groups: [
            {
              name: 'PPI Busan',
              platform: 'WhatsApp',
              members: '150+',
              link: '#',
              description: 'Perhimpunan Pelajar Indonesia Busan'
            },
            {
              name: 'Pusan National University Indonesian',
              platform: 'KakaoTalk',
              members: '80+',
              link: '#',
              description: 'Komunitas PNU Indonesia'
            },
            {
              name: 'Indo Busan Family',
              platform: 'Facebook',
              members: '800+',
              link: '#',
              description: 'Keluarga Indonesia di Busan - mahasiswa & pekerja'
            }
          ]
        },
        {
          region: 'Daejeon',
          icon: '🔬',
          description: 'Komunitas mahasiswa Indonesia di Science City',
          groups: [
            {
              name: 'PPI Daejeon',
              platform: 'WhatsApp',
              members: '100+',
              link: '#',
              description: 'Official PPI Daejeon'
            },
            {
              name: 'KAIST Indonesian Students',
              platform: 'Telegram',
              members: '90+',
              link: '#',
              description: 'Komunitas KAIST Indonesia - Research & networking'
            },
            {
              name: 'Indonesia Daejeon Connect',
              platform: 'KakaoTalk',
              members: '120+',
              link: '#',
              description: 'Connecting Indonesians in Daejeon'
            }
          ]
        },
        {
          region: 'Incheon',
          icon: '✈️',
          description: 'Gateway Korea - Komunitas di kota metropolitan',
          groups: [
            {
              name: 'PPI Incheon',
              platform: 'WhatsApp',
              members: '80+',
              link: '#',
              description: 'Komunitas mahasiswa Indonesia Incheon'
            },
            {
              name: 'Inha University Indonesian',
              platform: 'KakaoTalk',
              members: '60+',
              link: '#',
              description: 'Indonesian students at Inha University'
            }
          ]
        },
        {
          region: 'Gyeonggi',
          icon: '🏞️',
          description: 'Komunitas di provinsi sekitar Seoul',
          groups: [
            {
              name: 'PPI Gyeonggi',
              platform: 'WhatsApp',
              members: '120+',
              link: '#',
              description: 'Mahasiswa Indonesia di area Gyeonggi-do'
            },
            {
              name: 'Indonesia Suwon Community',
              platform: 'Facebook',
              members: '300+',
              link: '#',
              description: 'Komunitas Suwon & sekitarnya'
            }
          ]
        },
        {
          region: 'Nasional',
          icon: '🇰🇷',
          description: 'Komunitas nasional untuk seluruh mahasiswa Indonesia di Korea',
          groups: [
            {
              name: 'PPI Korea (Official)',
              platform: 'WhatsApp',
              members: '1000+',
              link: '#',
              description: 'Perhimpunan Pelajar Indonesia di Korea - Official'
            },
            {
              name: 'Indonesian Students in Korea',
              platform: 'Facebook',
              members: '8K+',
              link: '#',
              description: 'Largest Indonesian student community in Korea'
            },
            {
              name: 'Info Beasiswa Korea',
              platform: 'Telegram',
              members: '5K+',
              link: '#',
              description: 'Info beasiswa, tips, dan sharing pengalaman'
            },
            {
              name: 'Korea Alumni Indonesia',
              platform: 'LinkedIn',
              members: '3K+',
              link: '#',
              description: 'Professional network alumni Korea'
            }
          ]
        }
      ]
    };
  },

  computed: {
    filteredInterviews() {
      if (this.activeFilter === 'all') {
        return this.studentInterviews;
      }
      return this.studentInterviews.filter(interview => interview.category === this.activeFilter);
    },

    filteredVideos() {
      if (this.activeFilter === 'all') {
        return this.videoTestimonials;
      }
      return this.videoTestimonials.filter(video => video.category === this.activeFilter);
    },

    filterLabels() {
      return {
        all: 'Semua',
        undergraduate: 'S1 (Sarjana)',
        graduate: 'S2/S3 (Pascasarjana)',
        language: 'Program Bahasa'
      };
    }
  },

  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
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

    playVideo(youtubeId) {
      // Open YouTube video in modal or new tab
      window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
    },

    joinCommunity(link) {
      if (link && link !== '#') {
        window.open(link, '_blank');
      } else {
        alert('Link komunitas akan segera tersedia. Hubungi kami untuk informasi lebih lanjut.');
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
    this.log('info', 'Testimoni page loaded with', this.studentInterviews.length, 'interviews');
    window.scrollTo(0, 0);
  }
};
