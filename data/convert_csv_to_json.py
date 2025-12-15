import csv
import json
import re

def clean_text(text):
    """Clean and normalize text"""
    if not text:
        return ''
    return text.strip()

def create_university_id(name_ko, name_en):
    """Create a URL-friendly ID from English name"""
    # Use English name for ID generation
    id_base = name_en.lower()
    # Remove common words
    id_base = id_base.replace('university', '').replace('college', '').replace('institute', '').replace('of', '').replace('and', '').replace('the', '')
    # Clean up
    id_base = re.sub(r'[^a-z0-9]+', '-', id_base).strip('-')
    # Limit length
    return id_base[:50]

def convert_csv_to_json(csv_file, json_file):
    universities = []

    with open(csv_file, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)

        for row in reader:
            # Extract and clean data
            name_ko = clean_text(row.get('학교명', ''))
            name_en = clean_text(row.get('학교 영문명', ''))
            uni_type = clean_text(row.get('학교구분명', ''))
            ownership_type = clean_text(row.get('설립형태구분명', ''))
            region = clean_text(row.get('시도명', ''))
            address = clean_text(row.get('소재지도로명주소', '')) or clean_text(row.get('소재지지번주소', ''))
            website = clean_text(row.get('홈페이지주소', ''))
            phone = clean_text(row.get('대표전화번호', ''))
            founded = clean_text(row.get('설립일자', ''))

            # Skip if essential data is missing
            if not name_ko or not name_en:
                continue

            # Determine degree levels based on university type
            if uni_type == '전문대학':
                degree_levels = ['D2 (Diploma 2 Tahun)']
                description_suffix = 'Politeknik'
            else:
                degree_levels = ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktor)']
                description_suffix = 'Universitas'

            # Create university object matching the structure
            university = {
                'id': create_university_id(name_ko, name_en),
                'name': name_en,
                'nameKo': name_ko,
                'location': region,
                'type': 'Universitas Negeri' if ownership_type in ['국립', '공립'] else 'Universitas Swasta',
                'description': f'{description_suffix} di {region}, Korea',
                'logo': '🎓',  # Default logo
                'image': 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop',  # Default image
                'tuitionMin': 3000000 if uni_type == '전문대학' else 4000000,  # Lower tuition for junior colleges
                'tuitionMax': 6000000 if uni_type == '전문대학' else 8000000,
                'hasScholarship': True,
                'hasEnglishProgram': False,
                'hasDormitory': True,
                'hasLanguageInstitute': False,
                'degreeLevels': degree_levels,
                'universityType': uni_type,  # Add university type for filtering
                'region': region,
                'founded': founded[:4] if len(founded) >= 4 else '',  # Get just the year
                'contact': {
                    'website': website if website.startswith('http') else f'https://{website}' if website else '',
                    'phone': phone,
                    'address': address
                }
            }

            universities.append(university)

    # Write to JSON file
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(universities, f, ensure_ascii=False, indent=2)

    print(f'Converted {len(universities)} universities to {json_file}')
    return universities

if __name__ == '__main__':
    universities = convert_csv_to_json('universities.csv', 'universities.json')
    print(f'Total universities converted: {len(universities)}')

    # Print first university as sample
    if universities:
        print('\nSample university:')
        print(json.dumps(universities[0], ensure_ascii=False, indent=2))
