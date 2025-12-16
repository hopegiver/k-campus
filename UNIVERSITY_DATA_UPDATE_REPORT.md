# University Data Update Report

Date: 2025-12-16

## Overview

Successfully extracted and matched university data from StudyInKorea.go.kr (Korean government's official study abroad portal) with our existing university database.

## Data Extraction Results

### Source Data
- **Source File**: `data/univ_list.html`
- **Universities Extracted**: 431
- **Output File**: `data/studyinkorea_universities.json`

### Extracted Fields
Each university record includes:
- `univCd`: Official university code (6-digit number)
- `nameKo`: Korean name
- `location`: Korean region name
- `type`: University type (사립/국립/공립)
- `description`: University description
- `degrees`: Array of degree programs offered

### Distribution Statistics

#### By Location (Top regions):
- 서울 (Seoul): 87 universities
- 경기도 (Gyeonggi-do): 77 universities
- 경상북도 (Gyeongsangbuk-do): 34 universities
- 충청남도 (Chungcheongnam-do): 29 universities
- 부산 (Busan): 24 universities

#### By Type:
- 사립 (Private): 365 universities
- 국립 (National): 55 universities
- 공립 (Public): 11 universities

## Matching Results

### Database Statistics
- **Our Database**: 388 universities
- **StudyInKorea Database**: 431 universities
- **Successfully Matched**: 296 universities (76%)
- **Not Matched**: 92 universities (24%)

### Files Updated
1. ✅ `data/universities.json` - Added `univCd` field to 296 universities
2. ✅ `data/studyinkorea_universities.json` - Complete StudyInKorea dataset
3. ✅ `data/universities_not_matched.json` - List of unmatched universities

### Sample Matched Universities

| English Name | Korean Name | univCd |
|--------------|-------------|---------|
| Seoul National University | 서울대학교 | 100211 |
| Korea University | 고려대학교 | 100065 |
| Yonsei University | 연세대학교 | 100144 |
| KAIST | 한국과학기술원 | 100413 |
| Hanyang University | 한양대학교 | 100341 |

## Scripts Created

### 1. `parse_univ_html.py`
**Purpose**: Parse HTML file and extract university data

**Features**:
- Uses Python's HTMLParser for robust parsing
- Extracts all university information including univCd
- Cleans and normalizes data
- Generates statistics by location and type
- Outputs clean JSON format

### 2. `match_univcd.py`
**Purpose**: Match StudyInKorea data with existing database

**Features**:
- Normalizes names for accurate matching
- Updates existing universities.json with univCd codes
- Generates list of unmatched universities
- Preserves all existing data while adding new fields

## Next Steps

### Phase 1: Immediate (Top Priority Universities)
Use the univCd to fetch detailed information for top 50 universities:
```
https://studyinkorea.go.kr/ko/search/universityInfo.do?univCd={code}
```

Universities to prioritize:
- SKY Universities (Seoul National, Korea, Yonsei)
- Top Science/Tech Universities (KAIST, POSTECH, UNIST, etc.)
- Major National Universities
- Popular Private Universities

### Phase 2: Batch Processing
1. Create script to fetch detailed data using univCd
2. Extract comprehensive information:
   - Accurate tuition fees by program
   - Scholarship information
   - Admission requirements
   - Program lists
   - Contact information
   - Campus facilities
3. Update individual university JSON files in `data/universities/`

### Phase 3: Handle Unmatched Universities
Review the 92 unmatched universities to determine:
- Are they in StudyInKorea under different names?
- Are they new universities not in StudyInKorea yet?
- Should they be merged or removed?

## Data Quality Notes

### Strengths
- Official government data source (high reliability)
- Includes unique identifier (univCd) for each university
- Comprehensive coverage (431 universities)
- Direct link to detailed information pages

### Limitations
- 92 universities (24%) could not be automatically matched
  - Possible reasons: name variations, newer universities, closed institutions
- Some universities may have incomplete data
- Web scraping required for detailed information extraction

## Technical Implementation

### Encoding Handling
- All JSON files use UTF-8 encoding
- Console output shows garbled text on Windows (cp949) but files are correct
- Python scripts properly handle Korean character encoding

### Matching Algorithm
- Name normalization: lowercase, remove spaces
- Direct Korean name matching
- Future improvement: fuzzy matching for unmatched universities

## Files Reference

### Input Files
- `data/univ_list.html` - HTML data from StudyInKorea.go.kr

### Output Files
- `data/studyinkorea_universities.json` - Extracted StudyInKorea data (431 universities)
- `data/universities.json` - Updated with univCd codes (296 added)
- `data/universities_not_matched.json` - Unmatched universities list (92)
- `data/studyinkorea_universities_summary.txt` - Statistics and summary

### Scripts
- `parse_univ_html.py` - HTML parser and data extractor
- `match_univcd.py` - University matcher and updater

## Usage Examples

### Find University Code
```python
import json
data = json.load(open('data/universities.json', 'r', encoding='utf-8'))
for univ in data:
    if 'Seoul National' in univ['name']:
        print(f"{univ['name']}: {univ.get('univCd', 'N/A')}")
```

### Access Detailed Info URL
```python
univCd = "100211"  # Seoul National University
url = f"https://studyinkorea.go.kr/ko/search/universityInfo.do?univCd={univCd}"
```

## Conclusion

Successfully established data integration between our university database and the official Korean government StudyInKorea portal. With univCd codes now available for 296 universities (76%), we can systematically fetch accurate, up-to-date information for each institution.

The foundation is now in place to:
1. Update existing university data with accurate information
2. Fetch comprehensive details for top universities
3. Maintain data accuracy through official government source
4. Expand coverage to all Korean universities accepting international students
