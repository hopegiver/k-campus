import json
import time
import urllib.parse
import re

# Top 50 universities to prioritize (based on rankings and popularity)
TOP_50_UNIVERSITIES = [
    # SKY Universities
    'Seoul National University',
    'Korea University',
    'Yonsei University',

    # Top Science/Tech Universities
    'Korea Advanced Institute of Science and Technology',
    'Pohang University of Science and Technology',
    'UNIST (Ulsan National Institute of Science and Technology)',
    'DGIST (Daegu Gyeongbuk Institute of Science and Technology)',
    'GIST (Gwangju Institute of Science and Technology)',

    # Major National Universities
    'Pusan National University',
    'Kyungpook National University',
    'Chonnam National University',
    'Chungnam National University',
    'Chungbuk National University',
    'Kangwon National University',
    'Gyeongsang National University',
    'Jeonbuk National University',

    # Top Private Universities
    'Sungkyunkwan University',
    'Hanyang University',
    'Chung-Ang University',
    'Kyung Hee University',
    'Hankuk University of Foreign Studies',
    'Seoul National University of Science and Technology',
    'Konkuk University',
    'Dongguk University',
    'Ewha Womans University',
    'Sogang University',
    'Ajou University',
    'Inha University',
    'Kookmin University',
    'Sejong University',
    'Hongik University',
    'Sookmyung Women\'s University',
    'Dankook University',
    'Kwangwoon University',
    'Myongji University',
    'Sangmyung University',

    # Regional Strong Universities
    'Keimyung University',
    'Catholic University of Korea',
    'Yeungnam University',
    'Dong-A University',
    'Inje University',
    'Ulsan University',
    'Hallym University',
    'Gachon University',
    'Kyonggi University',
    'Daegu University',
    'Wonkwang University',
    'Chongshin University',
    'Hoseo University'
]

def load_universities_data():
    """Load existing universities.json data"""
    with open('data/universities.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def find_university_by_name(universities, search_name):
    """Find university in our data by English name"""
    for univ in universities:
        if univ['name'].lower() == search_name.lower():
            return univ
    return None

def create_studyinkorea_url(university_name_korean):
    """Create search URL for studyinkorea.go.kr"""
    encoded_name = urllib.parse.quote(university_name_korean)
    return f'https://studyinkorea.go.kr/ko/search_v1.do?qt={encoded_name}'

def main():
    print('Loading universities data...')
    universities = load_universities_data()

    print(f'Total universities in database: {len(universities)}')
    print(f'Top 50 universities to fetch: {len(TOP_50_UNIVERSITIES)}')

    # Find matching universities
    matched = []
    not_found = []

    for target_name in TOP_50_UNIVERSITIES:
        univ = find_university_by_name(universities, target_name)
        if univ:
            matched.append(univ)
            print(f'✓ Found: {univ["name"]} ({univ["nameKo"]})')
        else:
            not_found.append(target_name)
            print(f'✗ Not found: {target_name}')

    print(f'\nMatched: {len(matched)} universities')
    print(f'Not found: {len(not_found)} universities')

    if not_found:
        print('\nUniversities not found:')
        for name in not_found:
            print(f'  - {name}')

    # Create URLs for manual checking
    print('\n\nStudy in Korea URLs for top universities:')
    print('='*80)
    for univ in matched[:10]:  # Show first 10
        url = create_studyinkorea_url(univ['nameKo'])
        print(f'{univ["name"]}')
        print(f'  Korean: {univ["nameKo"]}')
        print(f'  URL: {url}')
        print()

    # Save matched universities list for reference
    with open('top_50_universities.json', 'w', encoding='utf-8') as f:
        json.dump({
            'matched': [{'id': u['id'], 'name': u['name'], 'nameKo': u['nameKo'],
                        'url': create_studyinkorea_url(u['nameKo'])} for u in matched],
            'not_found': not_found
        }, f, ensure_ascii=False, indent=2)

    print(f'\nSaved top_50_universities.json with {len(matched)} universities')
    print('\nNOTE: Due to website limitations, automatic crawling is not recommended.')
    print('Please use the URLs above to manually collect data or use WebFetch tool.')

if __name__ == '__main__':
    main()
