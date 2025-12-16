export default {
  layout: 'default',
  pageTitle: 'Konsultasi - K-Campus',

  data() {
    return {
      // 1:1 Inquiry Board Form
      inquiryForm: {
        name: '',
        email: '',
        phone: '',
        category: '',
        title: '',
        content: '',
        privacy: false
      },
      inquiryCategories: [
        'Beasiswa GKS',
        'Pemilihan Universitas',
        'Persyaratan Pendaftaran',
        'Biaya Kuliah & Hidup',
        'Visa & Akomodasi',
        'Program Studi',
        'Lainnya'
      ],

      // Seminar Registration Form
      seminarForm: {
        name: '',
        email: '',
        phone: '',
        university: '',
        interest: '',
        privacy: false
      },
      seminarInterests: [
        'Beasiswa GKS',
        'S1 (Sarjana)',
        'S2 (Magister)',
        'S3 (Doktor)',
        'Program Bahasa Korea',
        'Pertukaran Pelajar'
      ],

      // FAQ Data
      faqs: [
        {
          id: 1,
          question: 'Bagaimana cara mendaftar beasiswa GKS?',
          answer: 'Beasiswa GKS dapat didaftar melalui dua jalur: Embassy Track (melalui Kedutaan Besar Korea) dan University Track (langsung ke universitas). Pendaftaran biasanya dibuka pada Februari-Maret untuk Embassy Track dan bervariasi untuk University Track. Anda perlu menyiapkan dokumen seperti transkrip nilai, surat rekomendasi, study plan, dan sertifikat bahasa.',
          isOpen: false
        },
        {
          id: 2,
          question: 'Apakah saya perlu bisa bahasa Korea untuk kuliah di Korea?',
          answer: 'Tidak harus. Banyak universitas menawarkan program dalam bahasa Inggris. Namun, untuk program beasiswa GKS, Anda akan mendapat 1 tahun kursus bahasa Korea gratis sebelum memulai program kuliah. Menguasai bahasa Korea akan sangat membantu kehidupan sehari-hari Anda di Korea.',
          isOpen: false
        },
        {
          id: 3,
          question: 'Berapa biaya hidup per bulan di Korea?',
          answer: 'Biaya hidup di Korea bervariasi tergantung kota. Di Seoul, estimasi biaya hidup sekitar 800,000-1,200,000 won per bulan (termasuk akomodasi, makan, transportasi). Di kota lain seperti Daejeon atau Busan, biayanya lebih rendah sekitar 600,000-900,000 won per bulan. Penerima beasiswa GKS mendapat tunjangan bulanan yang cukup untuk menutupi biaya hidup.',
          isOpen: false
        },
        {
          id: 4,
          question: 'Apa saja dokumen yang diperlukan untuk pendaftaran?',
          answer: 'Dokumen umum yang diperlukan: (1) Formulir aplikasi, (2) Foto 3x4, (3) Ijazah dan transkrip nilai (dilegalisir dan diterjemahkan), (4) Paspor, (5) Surat rekomendasi (2-3 buah), (6) Study Plan atau Personal Statement, (7) Sertifikat kemampuan bahasa (TOPIK/IELTS/TOEFL), (8) Sertifikat kesehatan, (9) Surat pernyataan finansial (untuk non-beasiswa).',
          isOpen: false
        },
        {
          id: 5,
          question: 'Kapan waktu terbaik untuk mulai mempersiapkan aplikasi?',
          answer: 'Idealnya mulai persiapan 6-12 bulan sebelum deadline pendaftaran. Ini memberi waktu cukup untuk: mengurus dokumen, belajar bahasa (TOPIK/IELTS), mencari informasi universitas dan program studi, menulis study plan yang baik, dan mendapat surat rekomendasi. Untuk beasiswa GKS, mulai persiapan minimal 6 bulan sebelum periode pendaftaran (Feb-Mar).',
          isOpen: false
        },
        {
          id: 6,
          question: 'Apakah ada batasan usia untuk mendaftar?',
          answer: 'Ya, untuk beasiswa GKS ada batasan usia: S1 (Undergraduate) maksimal 25 tahun, S2 (Master) maksimal 40 tahun, S3 (Doctoral) maksimal 45 tahun. Untuk pendaftaran mandiri (non-beasiswa), kebijakan usia bervariasi per universitas, namun umumnya lebih fleksibel.',
          isOpen: false
        },
        {
          id: 7,
          question: 'Bagaimana cara memilih universitas yang tepat?',
          answer: 'Pertimbangkan beberapa faktor: (1) Ranking dan reputasi program studi yang diminati, (2) Lokasi (Seoul vs kota lain, biaya hidup), (3) Ketersediaan program bahasa Inggris, (4) Fasilitas kampus dan asrama, (5) Peluang beasiswa, (6) Alumni network dan prospek karir. Konsultasikan dengan kami untuk mendapat rekomendasi yang sesuai dengan profil Anda.',
          isOpen: false
        },
        {
          id: 8,
          question: 'Apakah bisa bekerja part-time sambil kuliah?',
          answer: 'Ya, mahasiswa internasional dengan visa D-2 diperbolehkan bekerja part-time maksimal 20 jam per minggu selama semester dan full-time saat liburan. Namun, untuk penerima beasiswa GKS, ada aturan khusus dan perlu izin dari pihak yang memberi beasiswa. Upah minimum di Korea sekitar 9,620 won per jam (2024).',
          isOpen: false
        }
      ],

      // Monthly Seminar Schedule
      monthlySchedule: [
        { month: 'Januari', theme: 'Pengenalan Sistem Pendidikan Korea & Beasiswa GKS', date: 'Minggu ke-3 Januari' },
        { month: 'Februari', theme: 'Strategi Lolos Beasiswa GKS Embassy Track', date: 'Minggu ke-3 Februari' },
        { month: 'Maret', theme: 'Memilih Universitas & Program Studi yang Tepat', date: 'Minggu ke-3 Maret' },
        { month: 'April', theme: 'Persiapan Dokumen & Study Plan yang Efektif', date: 'Minggu ke-3 April' },
        { month: 'Mei', theme: 'TOPIK & Tes Bahasa: Tips Persiapan', date: 'Minggu ke-3 Mei' },
        { month: 'Juni', theme: 'Interview Preparation untuk Beasiswa', date: 'Minggu ke-3 Juni' },
        { month: 'Juli', theme: 'Kehidupan Mahasiswa di Korea: Tips & Trik', date: 'Minggu ke-3 Juli' },
        { month: 'Agustus', theme: 'University Track: Pendaftaran Langsung ke Universitas', date: 'Minggu ke-3 Agustus' },
        { month: 'September', theme: 'Program S2 & S3: Riset & Beasiswa', date: 'Minggu ke-3 September' },
        { month: 'Oktober', theme: 'Persiapan Keberangkatan & Adaptasi Budaya', date: 'Minggu ke-3 Oktober' },
        { month: 'November', theme: 'Program Pertukaran Pelajar & Summer School', date: 'Minggu ke-3 November' },
        { month: 'Desember', theme: 'Perencanaan 2025: Roadmap ke Korea', date: 'Minggu ke-3 Desember' }
      ],

      // Form submission states
      inquirySubmitting: false,
      inquirySubmitted: false,
      seminarSubmitting: false,
      seminarSubmitted: false
    };
  },

  computed: {
    currentMonth() {
      return new Date().getMonth(); // 0-11
    },
    nextSeminar() {
      return this.monthlySchedule[this.currentMonth];
    },
    upcomingSeminars() {
      // Return next 3 seminars
      const result = [];
      for (let i = 0; i < 3; i++) {
        const index = (this.currentMonth + i) % 12;
        result.push(this.monthlySchedule[index]);
      }
      return result;
    }
  },

  methods: {
    toggleFaq(faqId) {
      const faq = this.faqs.find(f => f.id === faqId);
      if (faq) {
        faq.isOpen = !faq.isOpen;
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

    validateInquiryForm() {
      if (!this.inquiryForm.name || !this.inquiryForm.email || !this.inquiryForm.phone) {
        alert('Nama, email, dan nomor telepon harus diisi.');
        return false;
      }
      if (!this.inquiryForm.category) {
        alert('Silakan pilih kategori pertanyaan.');
        return false;
      }
      if (!this.inquiryForm.title || !this.inquiryForm.content) {
        alert('Judul dan isi pertanyaan harus diisi.');
        return false;
      }
      if (!this.inquiryForm.privacy) {
        alert('Anda harus menyetujui kebijakan privasi.');
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.inquiryForm.email)) {
        alert('Format email tidak valid.');
        return false;
      }

      return true;
    },

    async submitInquiry() {
      if (!this.validateInquiryForm()) {
        return;
      }

      this.inquirySubmitting = true;

      try {
        // Call API endpoint using ViewLogic's $api
        const data = await this.$api.post('/api/request', {
          type: 'inquiry',
          ...this.inquiryForm
        });

        if (data.success) {
          this.log('info', 'Inquiry submitted successfully');

          // Reset form
          this.inquiryForm = {
            name: '',
            email: '',
            phone: '',
            category: '',
            title: '',
            content: '',
            privacy: false
          };

          this.inquirySubmitted = true;

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.inquirySubmitted = false;
          }, 5000);

          alert(data.message || 'Pertanyaan Anda telah dikirim! Kami akan merespons melalui email dalam 1-2 hari kerja.');
        } else {
          throw new Error(data.error || 'Failed to submit inquiry');
        }

      } catch (error) {
        this.log('error', 'Error submitting inquiry:', error);
        alert('Terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui WhatsApp.');
      } finally {
        this.inquirySubmitting = false;
      }
    },

    validateSeminarForm() {
      if (!this.seminarForm.name || !this.seminarForm.email || !this.seminarForm.phone) {
        alert('Nama, email, dan nomor telepon harus diisi.');
        return false;
      }
      if (!this.seminarForm.interest) {
        alert('Silakan pilih topik yang Anda minati.');
        return false;
      }
      if (!this.seminarForm.privacy) {
        alert('Anda harus menyetujui kebijakan privasi.');
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.seminarForm.email)) {
        alert('Format email tidak valid.');
        return false;
      }

      return true;
    },

    async submitSeminar() {
      if (!this.validateSeminarForm()) {
        return;
      }

      this.seminarSubmitting = true;

      try {
        // Call API endpoint using ViewLogic's $api
        const data = await this.$api.post('/api/request', {
          type: 'seminar',
          ...this.seminarForm
        });

        if (data.success) {
          this.log('info', 'Seminar registration submitted successfully');

          // Reset form
          this.seminarForm = {
            name: '',
            email: '',
            phone: '',
            university: '',
            interest: '',
            privacy: false
          };

          this.seminarSubmitted = true;

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.seminarSubmitted = false;
          }, 5000);

          alert(data.message || 'Pendaftaran seminar berhasil! Kami akan mengirimkan detail acara melalui email dan WhatsApp.');
        } else {
          throw new Error(data.error || 'Failed to submit seminar registration');
        }

      } catch (error) {
        this.log('error', 'Error submitting seminar registration:', error);
        alert('Terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui WhatsApp.');
      } finally {
        this.seminarSubmitting = false;
      }
    },

    openWhatsApp() {
      const phone = '6281234567890'; // Replace with actual WhatsApp number
      const message = encodeURIComponent('Halo K-Campus! Saya ingin berkonsultasi tentang kuliah di Korea.');
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    },

    openLiveChat() {
      // Integrate with actual live chat service (e.g., Tawk.to, Zendesk)
      alert('Fitur Live Chat akan segera hadir! Saat ini silakan gunakan WhatsApp atau kirim pertanyaan melalui formulir 1:1 Inquiry.');
    }
  },

  mounted() {
    this.log('info', 'Konsultasi page loaded');
  }
};
