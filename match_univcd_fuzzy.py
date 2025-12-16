import json
import re

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
    # Remove common suffixes and whitespace
    name = name.strip()
    # Remove parentheses and their contents
    name = re.sub(r'\([^)]*\)', '', name)
    # Remove "국립" prefix
    name = name.replace('국립', '')
    name = name.replace(' ', '')
    return name.lower()

def fuzzy_match_universities():
    """Fuzzy match not_matched universities using contains comparison"""

    # Load data
    print('Loading data files...')
    not_matched = load_json('data/universities_not_matched.json')
    our_universities = load_json('data/universities.json')
    studyinkorea_data = load_json('data/studyinkorea_universities.json')
    studyinkorea_univs = studyinkorea_data['universities']

    print(f'Not matched universities: {len(not_matched)}')
    print(f'StudyInKorea universities: {len(studyinkorea_univs)}')

    # Create lookup by id for our universities
    our_univs_by_id = {u['id']: u for u in our_universities}

    # Try fuzzy matching
    matched = 0
    still_not_matched = []

    for nm in not_matched:
        our_id = nm['id']
        our_name_ko = nm.get('nameKo', '')

        if not our_name_ko:
            still_not_matched.append(nm)
            continue

        normalized_our_name = normalize_name(our_name_ko)

        # Try to find in StudyInKorea using contains
        found = False
        for sik_univ in studyinkorea_univs:
            sik_name_ko = sik_univ['nameKo']
            normalized_sik_name = normalize_name(sik_name_ko)

            # Check if one contains the other
            if normalized_our_name in normalized_sik_name or normalized_sik_name in normalized_our_name:
                # Found a match!
                our_univ = our_univs_by_id.get(our_id)
                if our_univ:
                    our_univ['univCd'] = sik_univ['univCd']
                    if sik_univ.get('logo'):
                        our_univ['logo'] = sik_univ['logo']
                    if sik_univ.get('image'):
                        our_univ['image'] = sik_univ['image']
                    if not our_univ.get('description') and sik_univ.get('description'):
                        our_univ['descriptionKo'] = sik_univ['description']

                    matched += 1
                    print(f'FUZZY MATCHED: {nm["name"]} ({our_name_ko}) -> {sik_name_ko} (univCd: {sik_univ["univCd"]})')
                    found = True
                    break

        if not found:
            still_not_matched.append(nm)

    print(f'\n=== Fuzzy Matching Results ===')
    print(f'Fuzzy matched: {matched} universities')
    print(f'Still not matched: {len(still_not_matched)} universities')

    if still_not_matched:
        print('\nStill not found in StudyInKorea data:')
        for nm in still_not_matched[:20]:
            print(f'  - {nm["name"]} ({nm["nameKo"]})')
        if len(still_not_matched) > 20:
            print(f'  ... and {len(still_not_matched) - 20} more')

    # Save updated data
    save_json('data/universities.json', our_universities)
    print(f'\nSaved updated data/universities.json with {matched} additional univCd codes')

    # Save still not matched list
    save_json('data/universities_not_matched.json', still_not_matched)
    print(f'Saved data/universities_not_matched.json with {len(still_not_matched)} entries')

    return matched, still_not_matched

if __name__ == '__main__':
    matched, not_matched = fuzzy_match_universities()
