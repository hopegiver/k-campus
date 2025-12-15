export default {
  layout: 'default',
  pageTitle: 'Detail Event - K-Campus',

  data() {
    return {
      eventId: null,
      event: null,
      relatedEvents: [],
      loading: true,
      error: null
    };
  },

  methods: {
    formatDate(dateString) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const date = new Date(dateString);
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    formatDateShort(dateString) {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
      const date = new Date(dateString);
      return `${date.getDate()} ${months[date.getMonth()]}`;
    },

    formatDateRange(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        // Same month and year: "15-17 Mar 2026"
        return `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`;
      } else if (start.getFullYear() === end.getFullYear()) {
        // Same year, different months: "30 Mar - 2 Apr 2026"
        return `${start.getDate()} ${months[start.getMonth()]} - ${end.getDate()} ${months[end.getMonth()]} ${start.getFullYear()}`;
      } else {
        // Different years: "30 Des 2025 - 2 Jan 2026"
        return `${start.getDate()} ${months[start.getMonth()]} ${start.getFullYear()} - ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`;
      }
    },

    getEventTypeLabel(type) {
      const labels = {
        'education_fair': 'Education Fair',
        'cultural': 'Acara Budaya',
        'admission': 'Penerimaan'
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

    truncateText(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },

    registerEvent(event) {
      if (event.registrationUrl && event.registrationUrl !== '#') {
        window.open(event.registrationUrl, '_blank');
      } else {
        this.navigateTo('konsultasi');
      }
    },

    shareEvent(platform) {
      const url = window.location.href;
      const text = `${this.event.title} - K-Campus`;

      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
          break;
        case 'copy':
          navigator.clipboard.writeText(url).then(() => {
            alert('Link berhasil disalin!');
          }).catch(() => {
            alert('Gagal menyalin link');
          });
          break;
      }
    },

    viewEventDetail(eventId) {
      this.navigateTo('berita-detail', { id: eventId });
      window.scrollTo(0, 0);

      // Reload event data
      this.eventId = eventId;
      this.loadEventData();
    },

    navigateTo(route, params) {
      if (window.router && window.router.navigateTo) {
        window.router.navigateTo(route, params);
      } else {
        let hash = `#/${route}`;
        if (params) {
          const queryString = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
          hash += `?${queryString}`;
        }
        window.location.hash = hash;
      }
    },

    async loadEventData() {
      try {
        this.loading = true;
        this.error = null;

        // Load events from JSON
        const response = await fetch('data/events.json');
        if (!response.ok) {
          throw new Error('Failed to load events data');
        }

        const events = await response.json();

        // Find the event by ID
        this.event = events.find(e => e.id === parseInt(this.eventId));

        if (!this.event) {
          this.error = 'Event tidak ditemukan. Event mungkin sudah tidak tersedia atau ID tidak valid.';
          return;
        }

        // Find related events (same type, exclude current, limit 3)
        this.relatedEvents = events
          .filter(e => e.type === this.event.type && e.id !== this.event.id)
          .filter(e => this.isEventUpcoming(e.date))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);

        this.log('info', 'Event loaded:', this.event.title);

      } catch (error) {
        this.log('error', 'Error loading event data:', error);
        this.error = 'Terjadi kesalahan saat memuat data event. Silakan coba lagi nanti.';
      } finally {
        this.loading = false;
      }
    }
  },

  async mounted() {
    // Get event ID from URL parameters
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    this.eventId = urlParams.get('id');

    if (!this.eventId) {
      this.error = 'Event ID tidak ditemukan di URL.';
      this.loading = false;
      return;
    }

    await this.loadEventData();
    window.scrollTo(0, 0);
  }
};
