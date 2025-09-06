# EcoFinds Design System

## Color Tokens

### Primary Colors
- **Primary Green**: `#10B981` (emerald-500) - Main brand color
- **Primary Dark**: `#059669` (emerald-600) - Hover states
- **Primary Light**: `#34D399` (emerald-400) - Light accents

### Secondary Colors
- **Secondary Blue**: `#3B82F6` (blue-500) - Secondary actions
- **Secondary Purple**: `#8B5CF6` (violet-500) - Accent color

### Neutral Colors
- **Neutral 900**: `#111827` (gray-900) - Primary text
- **Neutral 700**: `#374151` (gray-700) - Secondary text
- **Neutral 500**: `#6B7280` (gray-500) - Tertiary text
- **Neutral 300**: `#D1D5DB` (gray-300) - Borders
- **Neutral 100**: `#F3F4F6` (gray-100) - Backgrounds
- **Neutral 50**: `#F9FAFB` (gray-50) - Light backgrounds

### Status Colors
- **Success**: `#10B981` (emerald-500)
- **Warning**: `#F59E0B` (amber-500)
- **Danger**: `#EF4444` (red-500)
- **Info**: `#3B82F6` (blue-500)

## Typography Scale

### Headings
- **H1**: `text-4xl font-bold` (36px, 700 weight) - Page titles
- **H2**: `text-3xl font-semibold` (28px, 600 weight) - Section titles
- **H3**: `text-xl font-semibold` (22px, 600 weight) - Card titles
- **H4**: `text-lg font-medium` (18px, 500 weight) - Subsection titles

### Body Text
- **Body Large**: `text-lg` (18px, 400 weight) - Important text
- **Body**: `text-base` (16px, 400 weight) - Regular text
- **Body Small**: `text-sm` (14px, 400 weight) - Secondary text
- **Caption**: `text-xs` (12px, 400 weight) - Labels, captions

### Font Weights
- **Light**: `font-light` (300)
- **Normal**: `font-normal` (400)
- **Medium**: `font-medium` (500)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)

## Spacing Scale

- **xs**: `4px` (1 unit)
- **sm**: `8px` (2 units)
- **md**: `12px` (3 units)
- **lg**: `16px` (4 units)
- **xl**: `24px` (6 units)
- **2xl**: `32px` (8 units)
- **3xl**: `48px` (12 units)
- **4xl**: `64px` (16 units)

## Component Specifications

### Buttons

#### Primary Button
```css
background: #10B981
color: white
padding: 12px 24px
border-radius: 8px
font-weight: 600
hover: #059669
focus: ring-2 ring-emerald-500 ring-offset-2
```

#### Secondary Button
```css
background: transparent
color: #10B981
border: 2px solid #10B981
padding: 10px 22px
border-radius: 8px
font-weight: 600
hover: background #10B981, color white
```

#### Ghost Button
```css
background: transparent
color: #374151
border: 1px solid #D1D5DB
padding: 8px 16px
border-radius: 6px
font-weight: 500
hover: background #F3F4F6
```

### Product Cards

#### Card Container
```css
background: white
border: 1px solid #E5E7EB
border-radius: 12px
padding: 16px
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
hover: box-shadow 0 4px 12px rgba(0, 0, 0, 0.15)
transition: all 0.2s ease
```

#### Product Image
```css
width: 100%
height: 200px
object-fit: cover
border-radius: 8px
```

#### Price Display
```css
current-price: text-xl font-bold text-gray-900
old-price: text-sm text-gray-500 line-through
```

### Filter Components

#### Filter Panel
```css
background: white
border: 1px solid #E5E7EB
border-radius: 8px
padding: 20px
```

#### Filter Checkbox
```css
width: 16px
height: 16px
accent-color: #10B981
```

#### Price Range Slider
```css
accent-color: #10B981
height: 4px
border-radius: 2px
```

### Badges

#### Badge Container
```css
display: inline-flex
align-items: center
padding: 4px 8px
border-radius: 4px
font-size: 12px
font-weight: 500
```

#### Badge Variants
- **Success**: `background: #D1FAE5, color: #065F46`
- **Warning**: `background: #FEF3C7, color: #92400E`
- **Danger**: `background: #FEE2E2, color: #991B1B`
- **Info**: `background: #DBEAFE, color: #1E40AF`

## Responsive Breakpoints

- **Mobile**: `375px` (1 column)
- **Tablet**: `768px` (2 columns)
- **Desktop**: `1200px` (4 columns)

## Accessibility Requirements

### Color Contrast
- All text must have a contrast ratio of at least 4.5:1
- Interactive elements must have a contrast ratio of at least 3:1

### Focus States
- All interactive elements must have visible focus indicators
- Focus rings should be 2px solid with 2px offset

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order should be logical and intuitive
- Skip links should be provided for main content

## Microcopy Tokens

### Category Page
- **Page Title**: "{Category} • EcoFinds"
- **Hero Description**: "Sustainable {category} for every style"
- **Empty State**: "No items found in {Category}. Try clearing filters or check other categories."
- **Loading**: "Loading curated finds..."

### Product Cards
- **Stock Warning**: "Only {count} left — Limited stock"
- **Clearance**: "Clearance: Once it's gone, it's gone"
- **New Arrival**: "New Arrival"
- **Most Loved**: "Most Loved"
- **Trending**: "Trending Now"
- **Eco-Friendly**: "Eco-Friendly"

### Filters
- **Price Range**: "Price Range"
- **Condition**: "Condition"
- **Eco Rating**: "Eco Rating"
- **Brand**: "Brand"
- **Clear All**: "Clear All Filters"
- **Apply**: "Apply Filters"

### Actions
- **Message Seller**: "Message Seller"
- **Add to Wishlist**: "Add to Wishlist"
- **Quick View**: "Quick View"
- **View Details**: "View Details"
