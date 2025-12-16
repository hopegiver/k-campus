import re
import json
from html.parser import HTMLParser

class UniversityHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.universities = []
        self.current_univ = {}
        self.in_university_name = False
        self.in_local = False
        self.in_public = False
        self.in_description = False
        self.in_division_items = False
        self.in_univ_code = False
        self.in_image_wrap = False
        self.in_symbol = False
        self.current_link = ''

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)

        # Start of a new university card
        if tag == 'div' and attrs_dict.get('class') == 'card-image-item':
            if self.current_univ:
                self.universities.append(self.current_univ)
            self.current_univ = {
                'degrees': []
            }

        # Image wrap (for main university image)
        elif tag == 'div' and attrs_dict.get('class') == 'image-wrap':
            self.in_image_wrap = True

        # University main image
        elif tag == 'img' and self.in_image_wrap:
            if 'src' in attrs_dict:
                src = attrs_dict['src']
                # Store the image URL (will be processed later)
                self.current_univ['imageUrl'] = src

        # Symbol/Logo span
        elif tag == 'span' and attrs_dict.get('class') == 'simbol':
            self.in_symbol = True

        # University logo
        elif tag == 'img' and self.in_symbol:
            if 'src' in attrs_dict:
                src = attrs_dict['src']
                # Store logo URL
                self.current_univ['logoUrl'] = src

        # University name link
        elif tag == 'a' and 'href' in attrs_dict:
            href = attrs_dict['href']
            if 'universityInfo.do' in href and 'univCd=' in href:
                self.current_link = href
                # Extract univCd from URL
                match = re.search(r'univCd=(\d+)', href)
                if match:
                    self.current_univ['univCd'] = match.group(1)

        # University name (Korean)
        elif tag == 'strong' and attrs_dict.get('class') == 'notranslate':
            self.in_university_name = True

        # Location/Region
        elif tag == 'strong' and attrs_dict.get('class') == 'local':
            self.in_local = True

        # Type (Public/Private)
        elif tag == 'strong' and attrs_dict.get('class') == 'public':
            self.in_public = True

        # Description
        elif tag == 'p' and attrs_dict.get('class') == 'description':
            self.in_description = True

        # Division items (degrees)
        elif tag == 'div' and attrs_dict.get('class') == 'division-items':
            self.in_division_items = True

        # University code (hidden div)
        elif tag == 'div' and attrs_dict.get('class') == 'universityCode':
            self.in_univ_code = True

    def handle_data(self, data):
        data = data.strip()
        if not data:
            return

        if self.in_university_name:
            self.current_univ['nameKo'] = data
        elif self.in_local:
            self.current_univ['location'] = data
        elif self.in_public:
            self.current_univ['type'] = data
        elif self.in_description:
            self.current_univ['description'] = data
        elif self.in_division_items:
            # Degree levels (학사, 석사, 박사, etc.)
            if data:
                self.current_univ['degrees'].append(data)
        elif self.in_univ_code:
            self.current_univ['universityCode'] = data

    def handle_endtag(self, tag):
        if tag == 'strong':
            self.in_university_name = False
            self.in_local = False
            self.in_public = False
        elif tag == 'p':
            self.in_description = False
        elif tag == 'div':
            self.in_division_items = False
            self.in_univ_code = False
            self.in_image_wrap = False
        elif tag == 'span':
            self.in_symbol = False

def parse_html_file(filepath):
    """Parse the HTML file and extract university data"""
    print(f'Reading {filepath}...')

    with open(filepath, 'r', encoding='utf-8') as f:
        html_content = f.read()

    parser = UniversityHTMLParser()
    parser.feed(html_content)

    # Add the last university if exists
    if parser.current_univ:
        parser.universities.append(parser.current_univ)

    return parser.universities

def clean_university_data(universities):
    """Clean and standardize university data"""
    cleaned = []
    base_url = 'https://studyinkorea.go.kr'

    for univ in universities:
        # Skip if no name or code
        if not univ.get('nameKo') or not univ.get('univCd'):
            continue

        # Clean degrees list (remove empty strings and duplicates)
        degrees = [d.strip() for d in univ.get('degrees', []) if d.strip()]
        degrees = list(dict.fromkeys(degrees))  # Remove duplicates while preserving order

        # Process logo URL
        logo_url = univ.get('logoUrl', '')
        if logo_url and not logo_url.startswith('http'):
            logo_url = base_url + logo_url

        # Process image URL
        image_url = univ.get('imageUrl', '')
        if image_url and not image_url.startswith('http'):
            image_url = base_url + image_url

        cleaned_univ = {
            'univCd': univ.get('univCd', univ.get('universityCode', '')),
            'nameKo': univ.get('nameKo', ''),
            'location': univ.get('location', ''),
            'type': univ.get('type', ''),
            'description': univ.get('description', ''),
            'degrees': degrees,
            'logo': logo_url,
            'image': image_url
        }

        cleaned.append(cleaned_univ)

    return cleaned

def main():
    print('Starting to parse univ_list.html...')

    # Parse HTML file
    universities = parse_html_file('data/univ_list.html')

    print(f'Initial parse found {len(universities)} university entries')

    # Clean data
    cleaned_universities = clean_university_data(universities)

    print(f'After cleaning: {len(cleaned_universities)} universities')

    # Show sample data
    if cleaned_universities:
        print('\nSample data (first 3 universities):')
        for univ in cleaned_universities[:3]:
            print(f"\n  univCd: {univ['univCd']}")
            print(f"  Name: {univ['nameKo']}")
            print(f"  Location: {univ['location']}")
            print(f"  Type: {univ['type']}")
            print(f"  Degrees: {', '.join(univ['degrees'])}")
            if univ.get('logo'):
                print(f"  Logo: {univ['logo']}")
            if univ.get('image'):
                print(f"  Image: {univ['image'][:80]}...")
            if univ['description']:
                print(f"  Description: {univ['description'][:50]}...")

    # Save to JSON file
    output_file = 'data/studyinkorea_universities.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'total': len(cleaned_universities),
            'universities': cleaned_universities
        }, f, ensure_ascii=False, indent=2)

    print(f'\nSuccessfully saved {len(cleaned_universities)} universities to {output_file}')

    # Statistics
    print('\n=== Statistics ===')

    # Count by location
    locations = {}
    for univ in cleaned_universities:
        loc = univ['location']
        locations[loc] = locations.get(loc, 0) + 1

    print(f'\nUniversities by location:')
    for loc in sorted(locations.keys()):
        print(f'  {loc}: {locations[loc]}')

    # Count by type
    types = {}
    for univ in cleaned_universities:
        t = univ['type']
        types[t] = types.get(t, 0) + 1

    print(f'\nUniversities by type:')
    for t in sorted(types.keys()):
        print(f'  {t}: {types[t]}')

if __name__ == '__main__':
    main()
