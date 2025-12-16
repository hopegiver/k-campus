import json
import os

# Read universities.json
with open('data/universities.json', 'r', encoding='utf-8') as f:
    universities = json.load(f)

# Create universities directory if not exists
os.makedirs('data/universities', exist_ok=True)

# Template based on universitas-detail.js structure
def create_university_detail(univ):
    """Create detailed university JSON based on basic data"""

    # Extract basic info
    univ_id = univ.get('id', '')
    name = univ.get('name', '')
    name_ko = univ.get('nameKo', '')
    location = univ.get('location', '')
    region = univ.get('region', '')
    founded = univ.get('founded', 'N/A')
    univ_type = univ.get('type', 'Universitas')
    description = univ.get('description', f'{name} di {location}, Korea')

    # Contact info
    contact = univ.get('contact', {})
    website = contact.get('website', '')
    phone = contact.get('phone', '')
    address = contact.get('address', '')

    # Financial info
    tuition_min = univ.get('tuitionMin', 3000000)
    tuition_max = univ.get('tuitionMax', 6000000)

    # Facilities
    has_scholarship = univ.get('hasScholarship', False)
    has_english = univ.get('hasEnglishProgram', False)
    has_dorm = univ.get('hasDormitory', False)
    has_language = univ.get('hasLanguageInstitute', False)

    # Degree levels
    degree_levels = univ.get('degreeLevels', [])

    # Determine if it's a university or polytechnic
    is_polytechnic = '전문대학' in univ.get('universityType', '')

    # Create detailed structure
    detail = {
        "id": univ_id,
        "name": name,
        "nameKo": name_ko,
        "logo": univ.get('logo', '🎓'),
        "image": univ.get('image', f'https://picsum.photos/seed/{univ_id}/800/400'),
        "location": location,
        "region": region,
        "founded": founded,
        "type": univ_type,
        "ranking": "",  # To be filled later
        "totalStudents": "",  # To be filled later
        "internationalStudents": "",  # To be filled later
        "totalFaculty": "",  # To be filled later
        "totalPrograms": "",  # To be filled later
        "isAccredited": True,
        "hasScholarship": has_scholarship,
        "description": description,
        "longDescription": f"{name} adalah institusi pendidikan tinggi yang berlokasi di {location}, Korea Selatan. Didirikan pada tahun {founded}, universitas ini menawarkan berbagai program studi berkualitas.",
        "features": [
            f"Berlokasi di {location}, Korea",
            "Fasilitas kampus modern",
            "Program untuk mahasiswa internasional"
        ],
        "facilities": [
            "Perpustakaan",
            "Laboratorium",
            "Fasilitas olahraga"
        ],
        "contact": {
            "email": f"admission@{website.replace('https://', '').replace('http://', '').replace('www.', '')}",
            "phone": phone,
            "website": website,
            "address": address
        },
        "applicationFee": 80000,
        "requiredDocuments": [
            "Application Form",
            "Passport Copy",
            "Academic Transcripts",
            "Diploma/Graduation Certificate",
            "Letter of Recommendation",
            "Personal Statement",
            "Language Proficiency (TOPIK/TOEFL/IELTS)"
        ],
        "admission": {},
        "tuitionByLevel": {},
        "insuranceFee": 120000,
        "dormitoryFee": 300000 if has_dorm else 0,
        "programs": {},
        "scholarships": [],
        "dormitory": None,
        "languageInstitute": None
    }

    # Add admission requirements based on degree levels
    if "S1 (Sarjana)" in degree_levels or "bachelor" in str(degree_levels).lower():
        detail["admission"]["bachelor"] = [
            "High School Diploma",
            "TOPIK Level 3+ or TOEFL iBT 80+ / IELTS 6.0+" if has_english else "TOPIK Level 3+",
            "GPA 80/100 or above",
            "Letter of Recommendation",
            "Personal Statement"
        ]
        detail["tuitionByLevel"]["bachelor"] = {
            "min": tuition_min,
            "max": tuition_max
        }

    if "S2 (Magister)" in degree_levels or "master" in str(degree_levels).lower():
        detail["admission"]["master"] = [
            "Bachelor's Degree",
            "TOPIK Level 4+ or TOEFL iBT 88+ / IELTS 6.0+" if has_english else "TOPIK Level 4+",
            "GPA 3.0/4.0 or above",
            "Letter of Recommendation",
            "Research Proposal"
        ]
        detail["tuitionByLevel"]["master"] = {
            "min": int(tuition_min * 1.2),
            "max": int(tuition_max * 1.2)
        }

    if "S3 (Doktor)" in degree_levels or "doctoral" in str(degree_levels).lower():
        detail["admission"]["doctoral"] = [
            "Master's Degree",
            "TOPIK Level 4+ or TOEFL iBT 88+ / IELTS 6.0+" if has_english else "TOPIK Level 4+",
            "GPA 3.3/4.0 or above",
            "2 Letters of Recommendation",
            "Detailed Research Proposal"
        ]
        detail["tuitionByLevel"]["doctoral"] = {
            "min": int(tuition_min * 1.3),
            "max": int(tuition_max * 1.3)
        }

    # Add programs (basic template)
    if is_polytechnic:
        detail["programs"]["diploma"] = {
            "Various Programs": [
                "To be updated with specific programs"
            ]
        }
    else:
        detail["programs"]["bachelor"] = {
            "Various Departments": [
                "To be updated with specific programs"
            ]
        }

    # Add scholarship info
    if has_scholarship:
        detail["scholarships"] = [
            {
                "name": f"{name} International Student Scholarship",
                "coverage": "30% - 50% biaya kuliah",
                "criteria": "Berdasarkan prestasi akademik"
            }
        ]

    # Add dormitory info
    if has_dorm:
        detail["dormitory"] = {
            "description": f"{name} menyediakan asrama untuk mahasiswa dengan berbagai pilihan tipe kamar.",
            "capacity": "",
            "priority": "Mahasiswa internasional tahun pertama mendapat prioritas",
            "distance": "Di dalam atau dekat kampus",
            "roomFacilities": [
                "Tempat tidur dan meja belajar",
                "Lemari pakaian",
                "Wi-Fi"
            ],
            "commonFacilities": [
                "Ruang belajar bersama",
                "Laundry",
                "Dapur bersama"
            ],
            "roomTypes": [
                {"type": "Double Room", "price": 300000},
                {"type": "Triple Room", "price": 250000}
            ]
        }

    # Add language institute info
    if has_language:
        detail["languageInstitute"] = {
            "description": f"Korean Language Institute di {name} menawarkan program bahasa Korea untuk mahasiswa internasional.",
            "duration": "10 minggu per semester",
            "hoursPerWeek": "20",
            "classSize": "12-15 siswa per kelas",
            "levels": "Level 1-6 (Beginner hingga Advanced)",
            "intakes": ["Maret", "Juni", "September", "Desember"],
            "curriculum": [
                "Speaking dan Listening",
                "Reading dan Writing",
                "Grammar dan Vocabulary",
                "Korean Culture",
                "TOPIK preparation"
            ],
            "tuition": 1500000,
            "facilities": [
                "Ruang kelas multimedia",
                "Language lab",
                "Self-study room"
            ]
        }

    return detail

# Process all universities
print(f"Processing {len(universities)} universities...")

for i, univ in enumerate(universities):
    univ_id = univ.get('id', f'university-{i}')
    detail = create_university_detail(univ)

    # Save to file
    filename = f'data/universities/{univ_id}.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(detail, f, ensure_ascii=False, indent=2)

    if (i + 1) % 50 == 0:
        print(f"Processed {i + 1}/{len(universities)} universities...")

print(f"✓ Successfully created {len(universities)} university detail files in data/universities/")
print(f"✓ Files are named by university ID (e.g., hallym-polytechnic.json)")
