export default {
  layout: 'default',
  pageTitle: 'Berita & Event - K-Campus',

  data() {
    return {
      activeFilter: 'all',
      filters: ['all', 'fair', 'culture', 'admission'],

      // All Events & News (combined)
      events: [
        // Education Fairs
        {
          id: 1,
          type: 'fair',
          title: 'Korea Education Fair 2024 - Jakarta',
          date: '2024-03-15',
          endDate: '2024-03-16',
          time: '10:00 - 17:00 WIB',
          location: 'Jakarta Convention Center',
          city: 'Jakarta',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
          description: 'Pameran pendidikan terbesar tahun ini dengan partisipasi 20+ universitas Korea terkemuka. Kesempatan bertemu langsung dengan perwakilan universitas dan mendapat info beasiswa.',
          highlights: [
            '20+ universitas Korea',
            'Seminar beasiswa GKS',
            'Konsultasi gratis one-on-one',
            'Workshop study plan & interview',
            'Door prize menarik'
          ],
          registration: 'https://example.com/register',
          isFeatured: true,
          isUpcoming: true
        },
        {
          id: 2,
          type: 'fair',
          title: 'Virtual Education Fair - Study in Korea',
          date: '2024-04-10',
          endDate: '2024-04-10',
          time: '13:00 - 18:00 WIB',
          location: 'Online (Zoom)',
          city: 'Online',
          image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&h=400&fit=crop',
          description: 'Education fair virtual dengan webinar series tentang berbagai program studi di Korea. Gratis untuk semua peserta!',
          highlights: [
            'Webinar oleh university representatives',
            'Virtual booth 15+ universitas',
            'Live Q&A session',
            'E-certificate untuk peserta',
            'Rekaman tersedia setelah acara'
          ],
          registration: 'https://example.com/register',
          isFeatured: false,
          isUpcoming: true
        },
        {
          id: 3,
          type: 'fair',
          title: 'Korea Education Expo - Surabaya',
          date: '2024-05-20',
          endDate: '2024-05-21',
          time: '09:00 - 16:00 WIB',
          location: 'Grand City Convention Hall',
          city: 'Surabaya',
          image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
          description: 'Education expo untuk wilayah Indonesia Timur dengan fokus pada program teknik dan sains.',
          highlights: [
            '12 universitas top Korea',
            'Special: Engineering & Science programs',
            'Alumni sharing session',
            'On-site application assistance'
          ],
          registration: 'https://example.com/register',
          isFeatured: false,
          isUpcoming: true
        },

        // Cultural Events
        {
          id: 4,
          type: 'culture',
          title: 'Korean Language Day Celebration',
          date: '2024-10-09',
          endDate: '2024-10-09',
          time: '14:00 - 20:00 WIB',
          location: 'Korea Cultural Center Indonesia',
          city: 'Jakarta',
          image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop',
          description: 'Perayaan Hari Hangul dengan berbagai kompetisi bahasa Korea, K-pop dance, dan penampilan budaya.',
          highlights: [
            'Korean speech contest',
            'K-pop dance competition',
            'Traditional Korean games (Yutnori, Jegichagi)',
            'Free Korean food tasting',
            'Hadiah untuk pemenang kompetisi'
          ],
          registration: 'https://example.com/register',
          isFeatured: true,
          isUpcoming: true
        },
        {
          id: 5,
          type: 'culture',
          title: 'K-Culture Festival 2024',
          date: '2024-08-15',
          endDate: '2024-08-15',
          time: '11:00 - 21:00 WIB',
          location: 'Gelora Bung Karno',
          city: 'Jakarta',
          image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
          description: 'Festival budaya Korea terbesar di Indonesia dengan K-pop concert, Korean food market, dan cultural workshops.',
          highlights: [
            'K-pop cover dance showcase',
            'Korean food bazaar (50+ vendors)',
            'Hanbok photo booth',
            'K-beauty workshop',
            'Korean language mini class'
          ],
          registration: null,
          isFeatured: true,
          isUpcoming: true
        },
        {
          id: 6,
          type: 'culture',
          title: 'Chuseok Celebration - Indonesian Students in Korea',
          date: '2024-09-17',
          endDate: '2024-09-17',
          time: '15:00 - 19:00 KST',
          location: 'PPI Korea Center, Seoul',
          city: 'Seoul, Korea',
          image: 'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=600&h=400&fit=crop',
          description: 'Perayaan Chuseok (Thanksgiving Korea) untuk mahasiswa Indonesia di Korea dengan games dan makanan tradisional.',
          highlights: [
            'Traditional Chuseok games',
            'Songpyeon making workshop',
            'Indonesian-Korean potluck',
            'Networking session'
          ],
          registration: 'https://example.com/register',
          isFeatured: false,
          isUpcoming: true
        },

        // Admission Announcements
        {
          id: 7,
          type: 'admission',
          title: 'Seoul National University - Spring 2025 Admission',
          date: '2024-09-01',
          endDate: '2024-10-15',
          deadline: '2024-10-15',
          university: 'Seoul National University',
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop',
          description: 'SNU membuka pendaftaran untuk intake Spring 2025 untuk program S1, S2, dan S3. Tersedia berbagai scholarship opportunities.',
          highlights: [
            'Application period: Sep 1 - Oct 15, 2024',
            'Programs: Undergraduate, Master, PhD',
            'Scholarship: up to 100% tuition',
            'English-taught programs available',
            'Required: TOPIK 3+ or TOEFL 88+'
          ],
          applicationLink: 'https://admission.snu.ac.kr',
          isFeatured: true,
          isUpcoming: true
        },
        {
          id: 8,
          type: 'admission',
          title: 'KAIST Graduate Admission - Fall 2025',
          date: '2024-05-01',
          endDate: '2024-06-30',
          deadline: '2024-06-30',
          university: 'KAIST',
          image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop',
          description: 'KAIST membuka pendaftaran program S2 dan S3 untuk Fall 2025 dengan fokus pada STEM fields. Full scholarship tersedia.',
          highlights: [
            'Application deadline: June 30, 2024',
            'Programs: Master & PhD in STEM',
            'Full scholarship (tuition + stipend)',
            '100% English programs',
            'Research-focused curriculum'
          ],
          applicationLink: 'https://admission.kaist.ac.kr',
          isFeatured: true,
          isUpcoming: true
        },
        {
          id: 9,
          type: 'admission',
          title: 'Korea University - International Student Admission',
          date: '2024-08-01',
          endDate: '2024-09-30',
          deadline: '2024-09-30',
          university: 'Korea University',
          image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&h=400&fit=crop',
          description: 'Korea University membuka pendaftaran mahasiswa internasional untuk Spring 2025 intake dengan berbagai program beasiswa.',
          highlights: [
            'Application: Aug 1 - Sep 30, 2024',
            'All degree levels (S1/S2/S3)',
            'KU scholarship: 30-100% tuition',
            'Campus: Seoul (Anam) & Sejong',
            'TOPIK or English proficiency required'
          ],
          applicationLink: 'https://oia.korea.ac.kr',
          isFeatured: false,
          isUpcoming: true
        },
        {
          id: 10,
          type: 'admission',
          title: 'Yonsei University - Underwood International College',
          date: '2024-09-15',
          endDate: '2024-11-15',
          deadline: '2024-11-15',
          university: 'Yonsei University',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
          description: 'Underwood International College (UIC) membuka pendaftaran untuk 100% English-taught programs.',
          highlights: [
            'Application deadline: Nov 15, 2024',
            '100% English-taught programs',
            'Liberal arts focused curriculum',
            'Scholarship opportunities available',
            'No Korean language requirement'
          ],
          applicationLink: 'https://uic.yonsei.ac.kr',
          isFeatured: false,
          isUpcoming: true
        },
        {
          id: 11,
          type: 'admission',
          title: 'GKS Embassy Track 2025 - OPEN',
          date: '2024-02-01',
          endDate: '2024-03-31',
          deadline: '2024-03-31',
          university: 'Korean Government',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
          description: 'Pendaftaran GKS (Global Korea Scholarship) Embassy Track 2025 telah dibuka oleh Kedutaan Besar Korea!',
          highlights: [
            'Application: Feb 1 - Mar 31, 2024',
            'Programs: Undergraduate & Graduate',
            '100% scholarship (tuition + living)',
            'Apply through Korean Embassy',
            'Age limit: 25 (UG), 40 (Master), 45 (PhD)'
          ],
          applicationLink: 'https://www.studyinkorea.go.kr',
          isFeatured: true,
          isUpcoming: false
        },
        {
          id: 12,
          type: 'admission',
          title: 'Hanyang University ERICA - Spring Admission',
          date: '2024-10-01',
          endDate: '2024-11-10',
          deadline: '2024-11-10',
          university: 'Hanyang University',
          image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&h=400&fit=crop',
          description: 'Hanyang University ERICA Campus membuka pendaftaran untuk Spring 2025 dengan fokus pada engineering dan design.',
          highlights: [
            'Application: Oct 1 - Nov 10, 2024',
            'Engineering & Design programs',
            'Merit-based scholarship',
            'Modern campus in Ansan',
            'Industry collaboration programs'
          ],
          applicationLink: 'https://www.hanyang.ac.kr',
          isFeatured: false,
          isUpcoming: true
        }
      ]
    };
  },

  computed: {
    filteredEvents() {
      if (this.activeFilter === 'all') {
        return this.sortedEvents;
      }
      return this.sortedEvents.filter(event => event.type === this.activeFilter);
    },

    sortedEvents() {
      return [...this.events].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Most recent first
      });
    },

    upcomingEvents() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return this.events
        .filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);
    },

    featuredEvents() {
      return this.events.filter(event => event.isFeatured).slice(0, 2);
    },

    eventsByType() {
      return {
        fair: this.events.filter(e => e.type === 'fair').length,
        culture: this.events.filter(e => e.type === 'culture').length,
        admission: this.events.filter(e => e.type === 'admission').length
      };
    },

    filterLabels() {
      return {
        all: `Semua (${this.events.length})`,
        fair: `Pameran Pendidikan (${this.eventsByType.fair})`,
        culture: `Acara Budaya (${this.eventsByType.culture})`,
        admission: `Penerimaan Mahasiswa (${this.eventsByType.admission})`
      };
    }
  },

  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    },

    formatDateShort(dateString) {
      const date = new Date(dateString);
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    },

    getEventIcon(type) {
      const icons = {
        fair: '🎓',
        culture: '🎎',
        admission: '📢'
      };
      return icons[type] || '📅';
    },

    getEventTypeLabel(type) {
      const labels = {
        fair: 'Pameran Pendidikan',
        culture: 'Acara Budaya',
        admission: 'Penerimaan Mahasiswa'
      };
      return labels[type] || type;
    },

    isEventUpcoming(dateString) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const eventDate = new Date(dateString);
      return eventDate >= today;
    },

    getDaysUntil(dateString) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const eventDate = new Date(dateString);
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return 'Sudah berlalu';
      if (diffDays === 0) return 'Hari ini!';
      if (diffDays === 1) return 'Besok';
      return `${diffDays} hari lagi`;
    },

    registerEvent(event) {
      if (event.registration) {
        window.open(event.registration, '_blank');
      } else if (event.applicationLink) {
        window.open(event.applicationLink, '_blank');
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
    this.log('info', 'Berita page loaded with', this.events.length, 'events');
    window.scrollTo(0, 0);
  }
};
