import json

# Load universities.json
with open('data/universities.json', 'r', encoding='utf-8') as f:
    universities = json.load(f)

print(f'Cleaning {len(universities)} universities...')

cleaned_count = 0
for univ in universities:
    # Remove old fields if they exist
    if 'logoUrl' in univ:
        del univ['logoUrl']
        cleaned_count += 1
    if 'imageUrl' in univ:
        del univ['imageUrl']

print(f'Removed old logoUrl/imageUrl fields from {cleaned_count} universities')

# Save updated universities.json
with open('data/universities.json', 'w', encoding='utf-8') as f:
    json.dump(universities, f, ensure_ascii=False, indent=2)

print('Saved updated data/universities.json')
