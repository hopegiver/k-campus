export default {
  layout: 'default',
  pageTitle: 'Detail Universitas - K-Campus',
  data() {
    return {
      universityId: 'snu',
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
      universityData: {
        'snu': {
          name: 'Seoul National University',
          nameKo: '서울대학교',
          logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=250&fit=crop',
          location: 'Seoul',
          region: 'Seoul Metropolitan Area',
          founded: '1946',
          type: 'Universitas Negeri',
          ranking: 'QS World Ranking #41',
          totalStudents: '28,000+',
          internationalStudents: '2,500+',
          totalFaculty: '2,000+',
          totalPrograms: '100+',
          isAccredited: true,
          hasScholarship: true,
          description: 'Seoul National University (SNU) adalah universitas paling prestisius di Korea Selatan.',
          longDescription: 'Dikenal dengan keunggulan akademik dan penelitiannya, SNU telah menghasilkan banyak pemimpin di berbagai bidang termasuk politik, bisnis, dan akademik.',
          features: [
            'Universitas #1 di Korea Selatan',
            'Alumni termasuk presiden dan CEO perusahaan besar',
            'Fasilitas penelitian world-class',
            'Kerjasama internasional dengan 300+ universitas'
          ],
          facilities: [
            'Perpustakaan Central dengan 5 juta koleksi',
            'Laboratorium penelitian canggih',
            'Pusat olahraga dan gym',
            'Asrama mahasiswa modern',
            'Museum universitas'
          ],
          contact: {
            email: 'admission@snu.ac.kr',
            phone: '+82-2-880-5114',
            website: 'https://en.snu.ac.kr',
            address: '1 Gwanak-ro, Gwanak-gu, Seoul 08826, Korea'
          },
          applicationFee: 80000,
          requiredDocuments: [
            'Application Form',
            'Passport Copy',
            'Academic Transcripts',
            'Diploma/Graduation Certificate',
            'Letter of Recommendation (2)',
            'Personal Statement',
            'Study Plan',
            'Language Proficiency (TOPIK/TOEFL/IELTS)',
            'Portfolio (for specific majors)'
          ],
          admission: {
            bachelor: [
              'High School Diploma',
              'TOPIK Level 3+ or TOEFL iBT 88+ / IELTS 6.0+',
              'GPA 80/100 or above',
              '2 Letters of Recommendation',
              'Personal Statement',
              'Study Plan'
            ],
            master: [
              "Bachelor's Degree",
              'TOPIK Level 4+ or TOEFL iBT 88+ / IELTS 6.0+',
              'GPA 3.0/4.0 or above',
              '2 Letters of Recommendation',
              'Research Proposal',
              'CV/Resume'
            ],
            doctoral: [
              "Master's Degree",
              'TOPIK Level 4+ or TOEFL iBT 88+ / IELTS 6.0+',
              'GPA 3.3/4.0 or above',
              '2 Letters of Recommendation',
              'Detailed Research Proposal',
              'Publication Record (if any)'
            ]
          },
          tuitionByLevel: {
            'bachelor': { min: 4000000, max: 6000000 },
            'master': { min: 5000000, max: 7000000 },
            'doctoral': { min: 5500000, max: 7500000 }
          },
          insuranceFee: 120000,
          dormitoryFee: 300000,
          programs: {
            bachelor: {
              'College of Humanities': [
                'Korean Language & Literature',
                'English Language & Literature',
                'History',
                'Philosophy',
                'Archaeology'
              ],
              'College of Social Sciences': [
                'Political Science',
                'Economics',
                'Sociology',
                'Anthropology',
                'Psychology'
              ],
              'College of Natural Sciences': [
                'Mathematics',
                'Physics',
                'Chemistry',
                'Biological Sciences',
                'Earth & Environmental Sciences'
              ],
              'College of Engineering': [
                'Computer Science & Engineering',
                'Electrical & Computer Engineering',
                'Mechanical Engineering',
                'Chemical & Biological Engineering',
                'Materials Science & Engineering'
              ],
              'College of Business Administration': [
                'Business Administration'
              ],
              'College of Medicine': [
                'Medicine',
                'Nursing'
              ]
            },
            master: {
              'Graduate School': [
                'All undergraduate programs + specialized tracks',
                'MBA Program',
                'International Studies'
              ],
              'Professional Schools': [
                'Law School',
                'Graduate School of Public Health',
                'Graduate School of International Studies'
              ]
            },
            doctoral: {
              'Graduate School': [
                'All master programs with research focus',
                'Interdisciplinary programs',
                'Joint degree programs'
              ]
            }
          },
          scholarships: [
            {
              name: 'SNU Global Scholarship',
              coverage: '30% - 100% biaya kuliah',
              criteria: 'Berdasarkan prestasi akademik'
            },
            {
              name: 'KGSP (GKS) - Embassy Track',
              coverage: '100% biaya kuliah + tunjangan bulanan',
              criteria: 'Melalui Kedutaan Besar Korea'
            }
          ],
          dormitory: {
            description: 'SNU menyediakan asrama modern untuk mahasiswa internasional dengan berbagai pilihan tipe kamar. Asrama dilengkapi dengan fasilitas lengkap dan akses mudah ke kampus utama.',
            capacity: '3,500+',
            priority: 'Mahasiswa internasional tahun pertama mendapat prioritas',
            distance: '5-10 menit berjalan kaki dari kampus utama',
            roomFacilities: [
              'Tempat tidur dan meja belajar',
              'Lemari pakaian',
              'AC dan pemanas',
              'Wi-Fi berkecepatan tinggi',
              'Kamar mandi dalam (untuk tipe tertentu)'
            ],
            commonFacilities: [
              'Ruang belajar bersama',
              'Laundry otomatis',
              'Dapur bersama',
              'Ruang olahraga',
              'Convenience store',
              'Lounge dan ruang TV'
            ],
            roomTypes: [
              { type: 'Single Room', price: 450000 },
              { type: 'Double Room', price: 300000 },
              { type: 'Triple Room', price: 250000 }
            ],
            cafeteria: {
              description: 'Kafetaria asrama menyediakan menu Korea dan internasional dengan harga terjangkau',
              hours: '07:00 - 22:00'
            }
          },
          languageInstitute: {
            description: 'Korean Language Education Center (KLEC) SNU menawarkan program bahasa Korea intensif untuk mahasiswa internasional yang ingin meningkatkan kemampuan bahasa Korea mereka.',
            duration: '10 minggu per semester',
            hoursPerWeek: '20',
            classSize: '12-15 siswa per kelas',
            levels: 'Level 1-6 (Beginner hingga Advanced)',
            intakes: ['Maret', 'Juni', 'September', 'Desember'],
            curriculum: [
              'Speaking dan Listening intensif',
              'Reading dan Writing',
              'Grammar dan Vocabulary',
              'Korean Culture dan Society',
              'TOPIK preparation'
            ],
            tuition: 1700000,
            facilities: [
              'Ruang kelas multimedia',
              'Language lab',
              'Self-study room',
              'Library dengan material bahasa Korea',
              'Cultural experience program'
            ]
          }
        },
        'kaist': {
          name: 'Korea Advanced Institute of Science and Technology',
          nameKo: 'KAIST',
          logo: '🔬',
          location: 'Daejeon, Korea Selatan',
          founded: '1971',
          type: 'Institut Sains dan Teknologi Negeri',
          ranking: 'QS World Ranking: 56',
          students: '10,000+ mahasiswa',
          international: '800+ mahasiswa internasional',
          website: 'https://admission.kaist.ac.kr',
          description: 'KAIST adalah institut teknologi terkemuka di Korea yang fokus pada penelitian dan inovasi di bidang sains dan teknologi. Semua kuliah pascasarjana dilakukan dalam bahasa Inggris.',
          programs: [
            { name: 'Computer Science', description: 'Program CS terbaik di Korea dengan penelitian AI dan robotika' },
            { name: 'Teknik Elektro', description: 'Program unggulan dengan fasilitas penelitian canggih' },
            { name: 'Teknik Mesin', description: 'Fokus pada otomotif, aerospace, dan robotika' },
            { name: 'Bio & Brain Engineering', description: 'Program interdisipliner di bidang bioengineering' },
            { name: 'Material Science', description: 'Penelitian material maju dan nanoteknologi' }
          ],
          admissions: {
            requirements: [
              'Ijazah SMA atau setara (untuk S1)',
              'Gelar Sarjana (untuk S2/S3)',
              'TOEFL iBT 83+ atau IELTS 6.5+',
              'Tidak memerlukan TOPIK (semua program dalam bahasa Inggris)',
              'Transkrip nilai dengan IPK tinggi',
              'Surat rekomendasi',
              'Research proposal (untuk S2/S3)'
            ],
            deadlines: {
              spring: 'September - Oktober',
              fall: 'Mei - Juni'
            },
            tuition: '₩4,500,000 - ₩7,000,000 per semester (banyak beasiswa tersedia)'
          },
          scholarships: [
            {
              name: 'KAIST Scholarship',
              coverage: '100% biaya kuliah + tunjangan bulanan untuk semua mahasiswa pascasarjana',
              criteria: 'Otomatis untuk program S2/S3'
            },
            {
              name: 'KAIST Undergraduate Scholarship',
              coverage: '50% - 100% biaya kuliah',
              criteria: 'Berdasarkan prestasi akademik'
            }
          ],
          campusLife: {
            facilities: ['Research park', 'Startup incubator', 'Perpustakaan 24/7', 'Gym dan kolam renang', 'Asrama modern'],
            clubs: '100+ klub teknis dan hobi',
            location: 'Kampus di Daejeon, kota sains dan teknologi Korea'
          }
        },
        'korea-univ': {
          name: 'Korea University',
          nameKo: '고려대학교',
          logo: '🦁',
          location: 'Seoul, Korea Selatan',
          founded: '1905',
          type: 'Universitas Swasta',
          ranking: 'QS World Ranking: 79',
          students: '36,000+ mahasiswa',
          international: '3,000+ mahasiswa internasional',
          website: 'https://www.korea.edu',
          description: 'Korea University adalah salah satu universitas SKY (Seoul National University, Korea University, Yonsei University), universitas paling prestisius di Korea. KU terkenal dengan semangat mahasiswanya dan program bisnis yang kuat.',
          programs: [
            { name: 'Business School', description: 'Program bisnis terbaik dengan triple crown accreditation' },
            { name: 'Hukum', description: 'Fakultas hukum bergengsi dengan banyak alumni hakim dan jaksa' },
            { name: 'Media & Komunikasi', description: 'Program media terkemuka menghasilkan banyak jurnalis ternama' },
            { name: 'Teknik', description: 'Program teknik dengan fokus pada aplikasi praktis' },
            { name: 'International Studies', description: 'Program studi internasional dalam bahasa Inggris' }
          ],
          admissions: {
            requirements: [
              'Ijazah SMA atau setara',
              'TOPIK Level 4+ (untuk program Korea) atau TOEFL iBT 80+ / IELTS 6.0+ (untuk program Inggris)',
              'Transkrip nilai dengan IPK minimal 80%',
              'Surat rekomendasi',
              'Personal statement',
              'Portofolio (untuk jurusan tertentu)'
            ],
            deadlines: {
              spring: 'September - Oktober',
              fall: 'April - Mei'
            },
            tuition: '₩8,000,000 - ₩10,000,000 per semester'
          },
          scholarships: [
            {
              name: 'KU International Student Scholarship',
              coverage: '30% - 100% biaya kuliah',
              criteria: 'Berdasarkan prestasi akademik dan TOPIK level'
            },
            {
              name: 'KU KIIS Scholarship',
              coverage: 'Beasiswa khusus untuk program International Studies',
              criteria: 'Prestasi akademik dan kemampuan bahasa Inggris'
            }
          ],
          campusLife: {
            facilities: ['Hwajeong Gymnasium (landmark kampus)', 'Central Library', 'Museum', 'Fasilitas olahraga', 'Asrama internasional'],
            clubs: '300+ klub dan organisasi mahasiswa',
            location: 'Kampus Anam di Seoul Utara dengan pemandangan pegunungan'
          }
        },
        'yonsei': {
          name: 'Yonsei University',
          nameKo: '연세대학교',
          logo: '🦅',
          location: 'Seoul, Korea Selatan',
          founded: '1885',
          type: 'Universitas Swasta',
          ranking: 'QS World Ranking: 76',
          students: '38,000+ mahasiswa',
          international: '4,500+ mahasiswa internasional',
          website: 'https://www.yonsei.ac.kr',
          description: 'Yonsei University adalah universitas tertua di Korea dan bagian dari SKY universities. Yonsei terkenal dengan program internasionalnya yang kuat dan kampus yang indah.',
          programs: [
            { name: 'Underwood International College', description: 'Program liberal arts dalam bahasa Inggris' },
            { name: 'Kedokteran', description: 'Sekolah kedokteran terkemuka dengan Severance Hospital' },
            { name: 'Business School', description: 'Program bisnis internasional dengan AACSB accreditation' },
            { name: 'Teknik', description: 'Program teknik dengan fokus pada penelitian' },
            { name: 'GSIS', description: 'Graduate School of International Studies untuk hubungan internasional' }
          ],
          admissions: {
            requirements: [
              'Ijazah SMA atau setara',
              'TOPIK Level 3+ (untuk program Korea)',
              'TOEFL iBT 80+ atau IELTS 6.5+ (untuk UIC dan program Inggris)',
              'Transkrip nilai dengan IPK minimal 80%',
              '2 surat rekomendasi',
              'Personal statement dan supplementary essays'
            ],
            deadlines: {
              spring: 'September - Oktober',
              fall: 'Maret - April'
            },
            tuition: '₩8,500,000 - ₩11,000,000 per semester'
          },
          scholarships: [
            {
              name: 'Yonsei University Scholarship',
              coverage: '50% - 100% biaya kuliah',
              criteria: 'Berdasarkan IPK dan TOPIK level'
            },
            {
              name: 'UIC Global Leaders Scholarship',
              coverage: '100% biaya kuliah + tunjangan',
              criteria: 'Untuk mahasiswa UIC berprestasi tinggi'
            }
          ],
          campusLife: {
            facilities: ['Sinchon Campus yang iconic', 'Modern libraries', 'International lounge', 'Sports complex', 'International House dormitory'],
            clubs: '400+ klub dan organisasi mahasiswa',
            location: 'Kampus Sinchon di pusat Seoul dengan akses mudah kemana-mana'
          }
        }
      }
    };
  },
  computed: {
    university() {
      return this.universityData[this.universityId] || null;
    }
  },
  methods: {
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
  mounted() {
    // Get university ID from URL
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const requestedId = urlParams.get('id') || '';

    // 모든 대학에 대해 서울대 정보를 표시
    this.universityId = 'snu';

    // Check if favorited
    const favorites = JSON.parse(localStorage.getItem('favoriteUniversities') || '[]');
    this.isFavorited = favorites.includes(this.universityId);

    this.log('info', 'University detail loaded (showing SNU for all):', requestedId);

    window.scrollTo(0, 0);
  }
};
