import json
import os
import re

# Korean to English region mapping (comprehensive)
REGION_MAPPING = {
    # Cities
    '서울특별시': 'Seoul',
    '부산광역시': 'Busan',
    '대구광역시': 'Daegu',
    '인천광역시': 'Incheon',
    '광주광역시': 'Gwangju',
    '대전광역시': 'Daejeon',
    '울산광역시': 'Ulsan',
    '세종특별자치시': 'Sejong',

    # Provinces
    '경기도': 'Gyeonggi-do',
    '강원특별자치도': 'Gangwon-do',
    '강원도': 'Gangwon-do',
    '충청북도': 'Chungcheongbuk-do',
    '충청남도': 'Chungcheongnam-do',
    '전라북도': 'Jeollabuk-do',
    '전북특별자치도': 'Jeollabuk-do',
    '전라남도': 'Jeollanam-do',
    '경상북도': 'Gyeongsangbuk-do',
    '경상남도': 'Gyeongsangnam-do',
    '제주특별자치도': 'Jeju-do',
    '제주도': 'Jeju-do',

    # Districts/Cities within provinces
    '수원시': 'Suwon',
    '성남시': 'Seongnam',
    '고양시': 'Goyang',
    '용인시': 'Yongin',
    '부천시': 'Bucheon',
    '안산시': 'Ansan',
    '안양시': 'Anyang',
    '남양주시': 'Namyangju',
    '화성시': 'Hwaseong',
    '평택시': 'Pyeongtaek',
    '의정부시': 'Uijeongbu',
    '시흥시': 'Siheung',
    '파주시': 'Paju',
    '김포시': 'Gimpo',
    '광명시': 'Gwangmyeong',
    '광주시': 'Gwangju',
    '군포시': 'Gunpo',
    '하남시': 'Hanam',
    '오산시': 'Osan',
    '양주시': 'Yangju',
    '이천시': 'Icheon',
    '구리시': 'Guri',
    '안성시': 'Anseong',
    '포천시': 'Pocheon',
    '의왕시': 'Uiwang',
    '여주시': 'Yeoju',
    '양평군': 'Yangpyeong',
    '동두천시': 'Dongducheon',
    '과천시': 'Gwacheon',
    '가평군': 'Gapyeong',
    '연천군': 'Yeoncheon',

    '춘천시': 'Chuncheon',
    '원주시': 'Wonju',
    '강릉시': 'Gangneung',
    '동해시': 'Donghae',
    '태백시': 'Taebaek',
    '속초시': 'Sokcho',
    '삼척시': 'Samcheok',

    '청주시': 'Cheongju',
    '충주시': 'Chungju',
    '제천시': 'Jecheon',

    '천안시': 'Cheonan',
    '공주시': 'Gongju',
    '보령시': 'Boryeong',
    '아산시': 'Asan',
    '서산시': 'Seosan',
    '논산시': 'Nonsan',
    '계룡시': 'Gyeryong',
    '당진시': 'Dangjin',

    '전주시': 'Jeonju',
    '군산시': 'Gunsan',
    '익산시': 'Iksan',
    '정읍시': 'Jeongeup',
    '남원시': 'Namwon',
    '김제시': 'Gimje',

    '목포시': 'Mokpo',
    '여수시': 'Yeosu',
    '순천시': 'Suncheon',
    '나주시': 'Naju',
    '광양시': 'Gwangyang',

    '포항시': 'Pohang',
    '경주시': 'Gyeongju',
    '김천시': 'Gimcheon',
    '안동시': 'Andong',
    '구미시': 'Gumi',
    '영주시': 'Yeongju',
    '영천시': 'Yeongcheon',
    '상주시': 'Sangju',
    '문경시': 'Mungyeong',
    '경산시': 'Gyeongsan',

    '창원시': 'Changwon',
    '진주시': 'Jinju',
    '통영시': 'Tongyeong',
    '사천시': 'Sacheon',
    '김해시': 'Gimhae',
    '밀양시': 'Miryang',
    '거제시': 'Geoje',
    '양산시': 'Yangsan',

    '제주시': 'Jeju',
    '서귀포시': 'Seogwipo',

    # Common district names within cities
    '동구': 'Dong-gu',
    '서구': 'Seo-gu',
    '남구': 'Nam-gu',
    '북구': 'Buk-gu',
    '중구': 'Jung-gu',
    '수성구': 'Suseong-gu',
    '달서구': 'Dalseo-gu',
    '달성군': 'Dalseong-gun',
    '연수구': 'Yeonsu-gu',
    '남동구': 'Namdong-gu',
    '부평구': 'Bupyeong-gu',
    '계양구': 'Gyeyang-gu',
    '서귀포': 'Seogwipo',

    # Common words
    '동': 'dong',
    '면': 'myeon',
    '읍': 'eup',
    '리': 'ri',
    '로': 'ro',
    '길': 'gil',
    '가': 'ga',
}

def translate_address(address):
    """Translate Korean address to romanized version"""
    if not address or not isinstance(address, str):
        return address

    # If already in English, return as is
    if not any(ord(c) > 127 for c in address):
        return address

    translated = address

    # Replace known regions/cities
    for korean, english in sorted(REGION_MAPPING.items(), key=lambda x: len(x[0]), reverse=True):
        translated = translated.replace(korean, english)

    return translated

def update_addresses():
    """Update addresses in universities.json and individual files"""

    # Update universities.json
    print('Updating data/universities.json...')
    with open('data/universities.json', 'r', encoding='utf-8') as f:
        universities = json.load(f)

    updated_main = 0
    for univ in universities:
        if 'contact' in univ and 'address' in univ['contact']:
            original = univ['contact']['address']
            if original and any(ord(c) > 127 for c in str(original)):
                translated = translate_address(original)
                if translated != original:
                    univ['contact']['address'] = translated
                    updated_main += 1

    with open('data/universities.json', 'w', encoding='utf-8') as f:
        json.dump(universities, f, ensure_ascii=False, indent=2)

    print(f'Updated {updated_main} addresses in universities.json')

    # Update individual files
    print('\nUpdating individual university files...')
    updated_individual = 0

    for filename in os.listdir('data/universities'):
        if not filename.endswith('.json'):
            continue

        filepath = os.path.join('data/universities', filename)

        with open(filepath, 'r', encoding='utf-8') as f:
            univ_detail = json.load(f)

        changed = False

        if 'contact' in univ_detail and 'address' in univ_detail['contact']:
            original = univ_detail['contact']['address']
            if original and any(ord(c) > 127 for c in str(original)):
                translated = translate_address(original)
                if translated != original:
                    univ_detail['contact']['address'] = translated
                    changed = True

        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(univ_detail, f, ensure_ascii=False, indent=2)
            updated_individual += 1

    print(f'Updated {updated_individual} addresses in individual files')
    print('Done!')

if __name__ == '__main__':
    update_addresses()
