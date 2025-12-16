import json

# Korean region to English/Romanized mapping
REGION_MAPPING = {
    '서울특별시': 'Seoul',
    '부산광역시': 'Busan',
    '대구광역시': 'Daegu',
    '인천광역시': 'Incheon',
    '광주광역시': 'Gwangju',
    '대전광역시': 'Daejeon',
    '울산광역시': 'Ulsan',
    '세종특별자치시': 'Sejong',
    '경기도': 'Gyeonggi-do',
    '강원특별자치도': 'Gangwon-do',
    '충청북도': 'Chungcheongbuk-do',
    '충청남도': 'Chungcheongnam-do',
    '전라북도': 'Jeollabuk-do',
    '전북특별자치도': 'Jeollabuk-do',
    '전라남도': 'Jeollanam-do',
    '경상북도': 'Gyeongsangbuk-do',
    '경상남도': 'Gyeongsangnam-do',
    '제주특별자치도': 'Jeju-do'
}

# Read universities.json
with open('data/universities.json', 'r', encoding='utf-8') as f:
    universities = json.load(f)

print(f'Updating {len(universities)} universities...')

updated_count = 0
for univ in universities:
    original_location = univ.get('location', '')
    original_region = univ.get('region', '')

    # Update location if it's in Korean
    if original_location in REGION_MAPPING:
        univ['location'] = REGION_MAPPING[original_location]
        updated_count += 1

    # Update region if it's in Korean
    if original_region in REGION_MAPPING:
        univ['region'] = REGION_MAPPING[original_region]

print(f'Updated {updated_count} university locations')

# Save updated universities.json
with open('data/universities.json', 'w', encoding='utf-8') as f:
    json.dump(universities, f, ensure_ascii=False, indent=2)

print('✓ Updated data/universities.json')

# Also update individual university JSON files
import os

updated_files = 0
for filename in os.listdir('data/universities'):
    if not filename.endswith('.json'):
        continue

    filepath = os.path.join('data/universities', filename)

    with open(filepath, 'r', encoding='utf-8') as f:
        univ_detail = json.load(f)

    changed = False

    # Update location
    if univ_detail.get('location') in REGION_MAPPING:
        univ_detail['location'] = REGION_MAPPING[univ_detail['location']]
        changed = True

    # Update region
    if univ_detail.get('region') in REGION_MAPPING:
        univ_detail['region'] = REGION_MAPPING[univ_detail['region']]
        changed = True

    # Update features array (contains Korean region names)
    if 'features' in univ_detail and isinstance(univ_detail['features'], list):
        for i, feature in enumerate(univ_detail['features']):
            for korean, english in REGION_MAPPING.items():
                if korean in feature:
                    univ_detail['features'][i] = feature.replace(korean, english)
                    changed = True

    # Update longDescription
    if 'longDescription' in univ_detail:
        for korean, english in REGION_MAPPING.items():
            if korean in univ_detail['longDescription']:
                univ_detail['longDescription'] = univ_detail['longDescription'].replace(korean, english)
                changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(univ_detail, f, ensure_ascii=False, indent=2)
        updated_files += 1

print(f'✓ Updated {updated_files} individual university files')
print('Done!')
