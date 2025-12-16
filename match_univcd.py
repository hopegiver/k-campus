import json

def load_json(filepath):
    """Load JSON file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(filepath, data):
    """Save JSON file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def normalize_name(name):
    """Normalize university name for matching"""
    import re
    # Remove common suffixes and whitespace
    name = name.strip()
    # Remove parentheses and their contents (e.g., "호산대학교(본교)" -> "호산대학교")
    name = re.sub(r'\([^)]*\)', '', name)
    name = name.replace(' ', '')
    return name.lower()

def match_universities():
    """Match StudyInKorea data with existing universities.json"""

    # Load data
    print('Loading data files...')
    studyinkorea_data = load_json('data/studyinkorea_universities.json')
    our_universities = load_json('data/universities.json')

    studyinkorea_univs = studyinkorea_data['universities']

    print(f'StudyInKorea universities: {len(studyinkorea_univs)}')
    print(f'Our universities: {len(our_universities)}')

    # Create lookup dictionary by Korean name
    studyinkorea_lookup = {}
    for univ in studyinkorea_univs:
        name_key = normalize_name(univ['nameKo'])
        studyinkorea_lookup[name_key] = univ

    # Match and update
    matched = 0
    not_matched = []

    for our_univ in our_universities:
        name_key = normalize_name(our_univ.get('nameKo', ''))

        if name_key in studyinkorea_lookup:
            sik_univ = studyinkorea_lookup[name_key]

            # Add univCd to our university
            our_univ['univCd'] = sik_univ['univCd']

            # Add logo and image URLs (replace existing)
            if sik_univ.get('logo'):
                our_univ['logo'] = sik_univ['logo']
            if sik_univ.get('image'):
                our_univ['image'] = sik_univ['image']

            # Optionally update other fields if they're missing or empty
            if not our_univ.get('description') and sik_univ.get('description'):
                our_univ['descriptionKo'] = sik_univ['description']

            matched += 1
            print(f'Matched: {our_univ["name"]} ({our_univ["nameKo"]}) -> univCd: {sik_univ["univCd"]}')
        else:
            not_matched.append({
                'id': our_univ.get('id'),
                'name': our_univ.get('name'),
                'nameKo': our_univ.get('nameKo')
            })

    print(f'\n=== Results ===')
    print(f'Matched: {matched} universities')
    print(f'Not matched: {len(not_matched)} universities')

    if not_matched:
        print('\nUniversities not found in StudyInKorea data:')
        for univ in not_matched[:20]:  # Show first 20
            print(f'  - {univ["name"]} ({univ["nameKo"]})')
        if len(not_matched) > 20:
            print(f'  ... and {len(not_matched) - 20} more')

    # Save updated universities.json
    save_json('data/universities.json', our_universities)
    print(f'\nSaved updated data/universities.json with {matched} univCd codes added')

    # Also save not_matched list for reference
    save_json('data/universities_not_matched.json', not_matched)
    print(f'Saved data/universities_not_matched.json with {len(not_matched)} entries')

    return matched, not_matched

if __name__ == '__main__':
    matched, not_matched = match_universities()
