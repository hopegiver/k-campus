export default {
  layout: 'default',
  pageTitle: 'Testimoni Alumni - K-Campus',

  data() {
    return {
      activeFilter: 'all',
      filters: ['all', 'gks', 'university', 'gsis', 'language', 'lifestyle'],
      loading: true,

      // Data loaded from JSON
      studentInterviews: [],
      videoTestimonials: [],

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
        gks: 'GKS Scholarship',
        university: 'University Scholarship',
        gsis: 'GSIS Program',
        language: 'Program Bahasa',
        lifestyle: 'Lifestyle & Tips'
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
    }
  },

  async mounted() {
    // Load interviews and videos from JSON files
    try {
      this.loading = true;

      // Load interviews
      const interviewsResponse = await fetch('data/interviews.json');
      if (interviewsResponse.ok) {
        this.studentInterviews = await interviewsResponse.json();
        this.log('info', 'Loaded', this.studentInterviews.length, 'interviews from JSON');
      } else {
        this.log('error', 'Failed to load interviews.json');
      }

      // Load videos
      const videosResponse = await fetch('data/videos.json');
      if (videosResponse.ok) {
        this.videoTestimonials = await videosResponse.json();
        this.log('info', 'Loaded', this.videoTestimonials.length, 'videos from JSON');
      } else {
        this.log('error', 'Failed to load videos.json');
      }

    } catch (error) {
      this.log('error', 'Error loading testimonial data:', error);
    } finally {
      this.loading = false;
    }
  }
};
