# Tire DPP Manager Dashboard — Hi-Fidelity Wireframe Spec

## Frame & Layout
- **Figma Frame**: 1440 × 1024 (Desktop), light mode with high-contrast palette (white background `#F8FAFF`, dark text `#0B1120`, accent `#1D4ED8`).
- **Layout Grid**: 12-column grid, 72 px gutters, 80 px margins. Vertical rhythm 8 px baseline. Apply Auto Layout to all sections for responsive alignment.
- **Typography Styles**:
  - `H1 / 헤더1`: Inter SemiBold 24 px, 32 px line-height, letter-spacing 0.2.
  - `H2 / 섹션 타이틀`: Inter SemiBold 18 px, 24 px line-height.
  - `Body / 본문`: Inter Medium 14 px, 20 px line-height.
  - `Caption / 캡션`: Inter Regular 12 px, 16 px line-height.
- **Color Tokens**:
  - Primary / 주요: `#1D4ED8`
  - Success / 정상: `#0F9D58`
  - Warning / 경고: `#F59E0B`
  - Critical / 심각: `#DC2626`
  - Surface / 카드 배경: `#FFFFFF`
  - Border / 구분선: `#E2E8F0`

## Component Library
- **Top Filter Bar** (`Filters / 필터` component): Auto Layout horizontal, padding 16, gap 12. Each filter as pill with dropdown caret, bilingual label (e.g., `Product / 제품군`). States: default, hover, applied, error.
- **KPI Card**: 216 × 148, elevation shadow `0 4 16 rgba(15,23,42,0.08)`. Header with bilingual label, large metric, trend chip, last-updated caption.
- **Panel Frame**: Two-column Auto Layout (`Left 2fr : Right 3fr`). Nested cards with section headers and tabs if needed.
- **Table**: Header row with sticky style, zebra striping. Bulk actions row on top.
- **Tag Chips**: Rounded 16 px, color-coded (Success, Warning, Critical).
- **Modal**: 960 × 720 centered overlay, with left summary column (320 px) and right tabbed content. Primary CTA button `Resolve / 조치`. Secondary `Download EPCIS / EPCIS 내보내기`.
- **Empty/Error States**: Template card with illustration placeholder, bilingual message, CTA `Adjust Filters / 필터 변경`.

## Global Header & Filters
- Header height 88 px. Left: product logo + title `Tire DPP Manager / 타이어 DPP 관리자`. Right: user avatar with status dot, Help icon.
- Filter bar beneath header, spanning full width. Include dropdowns (default selections):
  1. `Product / 제품군` (default: Tire)
  2. `Period / 기간` (Last 30 days)
  3. `Region / 지역` (Global)
  4. `Brand / 브랜드` (All)
  5. `Plant / 공장` (All Plants)
  6. `Size (ETRTO) / 규격`
  7. `Channel / 유통채널`
- Right side of filter bar: quick actions `Export CSV / 데이터 내보내기`, `Alert Rules / 알림 규칙` button, filter reset icon.
- Below filters, display filter summary chips with remove icon.
- Error state banner example: `Data connection lost / 데이터 연결 끊김` with retry button.

## KPI Deck (6 Cards)
Place immediately under filters in two rows of three cards with Auto Layout 24 px gap.
1. **DPP Completion Rate / DPP 완성률**: 92% with green radial progress ring, subtitle `Required fields filled / 필수 필드 충족`.
2. **SVHC Reports Due / SVHC 신고 필요 건수**: `18` (last 7 days), warning color, trend badge `▲ +3 WoW`.
3. **EPCIS Chain Breaks / 이벤트 단절율**: `4.8%` missing chain, tooltip icon explaining `Commission → Recycling gap`.
4. **Scan Success Rate / 스캔 성공률**: `96.4%` with segmented bar showing UR/QR/SGTIN.
5. **Open Recall & Alerts / 리콜·경보 오픈 티켓**: `12` critical count, list preview of top 3 issues.
6. **Recovery Progress / 재활용·회수 진행률**: `68%` stacked bar for `EPR` vs `PRO` completions.

## Main Panels (2-Column Grid)
### Left: Compliance Funnel Card
- Title: `Compliance Funnel / 컴플라이언스 퍼널` with period chip.
- Horizontal funnel showing stages `Raw Material / 원재료 → Production / 생산 → Distribution / 유통 → Installation / 장착 → Recovery / 회수·재활용`.
- Each stage block: percentage badge, missing fields count, expand icon. Tooltip reveals top missing data fields (e.g., `SVHC declaration missing / SVHC 선언 누락`).
- Legend for color coding (green ≥95%, amber 80–94, red <80).
- Empty state text: `No lots match current filters / 현재 필터에 해당하는 로트가 없습니다.`

### Right: EPCIS Event Stream
- Title: `EPCIS Event Timeline / 이벤트 타임라인` with toggle `Group by lot / 로트별` vs `Group by location / 위치별`.
- Vertical timeline with iconography per EPCIS 2.0 event: `Commission, Aggregation, Shipping, Receiving, Install, Rotation, Retread, Collection, Recycling`.
- Each event row shows: timestamp, location, actor, data quality badge (e.g., `Missing serial`, `Duplicate scan`).
- Include quick filter pills for `Anomalies / 이상`, `Missing mandatory / 필수 누락`.
- Error state overlay example: `Unable to load events / 이벤트를 불러올 수 없습니다.` with retry link.

## Bottom Panels (Three Modules)
Place in three equal cards (Auto Layout horizontal, 24 px gap).

### 1. Lot & Model Table
- Title: `Lots & Models / 로트·모델`
- Table columns: `GTIN`, `SGTIN Range`, `DOT Code`, `Plant`, `Production Date`, `Labels (Fuel/Wet/Noise)`, `Retread Ready`, `Defect Reports`.
- Search bar with placeholder `Search GTIN, DOT or tag / GTIN·DOT·태그 검색`.
- Tag filters (chips): `High Risk`, `Retread`, `Pending SVHC`.
- Row interaction: hover state with `View Tire / 개체 보기` icon triggers drilldown modal.
- Empty state text: `Adjust filters to view lots / 필터를 조정해 로트를 확인하세요.`

### 2. Geo Map Journey
- Title: `Lifecycle Map / 지오 맵`
- Map component stylized with cluster markers at hub, country, city levels. Path lines from `Outbound (Plant)` to `Receiving`, `Install`, `Return`.
- Legend for statuses: `On-Time / 정상`, `Delayed / 지연`, `Missing scan / 스캔 누락`.
- Tooltip on marker: event counts, break rate, latest anomaly.
- Empty/error prompt: `Map unavailable. Check network / 맵을 불러올 수 없습니다. 네트워크를 확인하세요.`

### 3. Alerts & Recalls Inbox
- Title: `Alerts & Recalls / 알림·리콜 인박스`
- List layout with columns: `Severity / 심각도`, `Regulation`, `Category`, `SLA`, `Owner`.
- Each row includes CTA button `Resolve / 조치`, link to evidence upload.
- Filter tabs: `Open`, `In Progress`, `Resolved`.
- Empty state message: `No open alerts / 열려있는 알림이 없습니다.`

## Drilldown Modal
- Triggered from table row or map marker.
- Modal header: `Tire Profile / 타이어 프로필 — SGTIN 0037000...`
- Left summary column: brand, model, GTIN, DOT, Plant, production date, retread eligibility, current lifecycle status.
- Right side with tabs:
  1. `Event History / 이벤트 이력`: timeline with EPCIS events, timestamps, location, actor.
  2. `Inspections & Defects / 점검·결함`: list of reports, severity, attachments.
  3. `Scan Logs / 스캔 로그`: table showing scan type, device, success/failure, duplicates flagged.
  4. `Code Status / 코드 상태`: visual for `Visible / 가시`, `Damaged / 손상`, `Durability index / 내구도 지표` gauge.
- Footer actions: `Resolve` (primary), `Add Comment / 코멘트`, `Attach Evidence / 증빙 첨부` icon.
- Error placeholder inside tabs: `No data recorded / 데이터가 없습니다.`

## States & Interactions
- Filters animate with 200 ms ease-out on open/close.
- All cards include subtle loading skeleton (8 px radii) for data fetch states.
- Provide toast component `Changes saved / 변경 사항이 저장되었습니다.` (bilingual).
- Accessibility: min contrast ratio 4.5:1, focus ring `#2563EB` 2 px.
- Include annotation for responsive considerations (collapsing third row into tabs at < 1200 px).

## Deliverables Checklist
- [x] Filter bar with bilingual labels and error prompt
- [x] Six KPI cards with specified metrics
- [x] Compliance funnel and EPCIS timeline main panels
- [x] Lot/model table, geo map, alerts inbox bottom panels
- [x] Drilldown modal spec with tabs and actions
- [x] Empty/error state messaging provided

