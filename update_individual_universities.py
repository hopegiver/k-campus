import json
import os

# Load main universities.json
with open('data/universities.json', 'r', encoding='utf-8') as f:
    universities = json.load(f)

print(f'Processing {len(universities)} universities...')

updated_count = 0
logo_updated = 0
image_updated = 0

for univ in universities:
    univ_id = univ.get('id')
    if not univ_id:
        continue

    # Check if individual file exists
    filepath = f'data/universities/{univ_id}.json'
    if not os.path.exists(filepath):
        continue

    # Load individual university file
    with open(filepath, 'r', encoding='utf-8') as f:
        univ_detail = json.load(f)

    changed = False

    # Update logo if available from StudyInKorea
    if univ.get('logo') and isinstance(univ['logo'], str) and univ['logo'].startswith('http'):
        univ_detail['logo'] = univ['logo']
        changed = True
        logo_updated += 1

    # Update image if available from StudyInKorea
    if univ.get('image') and isinstance(univ['image'], str) and univ['image'].startswith('http'):
        univ_detail['image'] = univ['image']
        changed = True
        image_updated += 1

    # Save if changed
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(univ_detail, f, ensure_ascii=False, indent=2)
        updated_count += 1

        if updated_count <= 5:
            print(f'Updated: {univ_detail["name"]} ({univ_id})')

print(f'\n=== Update Results ===')
print(f'Updated {updated_count} individual university files')
print(f'Logo updated: {logo_updated}')
print(f'Image updated: {image_updated}')
print('Done!')
