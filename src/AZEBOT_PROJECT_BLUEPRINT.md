# Azebot E-Commerce Project Blueprint

## Brand Identity
**Azebot** - Ethiopian Traditional & Casual Clothing

**Mission**: Celebrate Ethiopian heritage through modern, accessible fashion that bridges tradition and contemporary style.

**Target Audience**: Ethiopian diaspora, cultural enthusiasts, fashion-forward individuals seeking unique, culturally-rich clothing.

---

## 1. UI Design Wireframes

### 1.1 Home Page

```
┌─────────────────────────────────────────────┐
│  HEADER                                     │
│  [Logo: Azebot] [Home|Shop|About|Contact] 🛒│
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  HERO SECTION                               │
│  [Large Image: Ethiopian Model in Habesha]  │
│  "Celebrate Heritage, Wear Culture"         │
│  [Shop Traditional] [Shop Casual]           │
└──────────���──────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  FEATURED CATEGORIES                        │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │
│  │Women │  │ Men  │  │Kids  │  │Access│   │
│  │Image │  │Image │  │Image │  │ories │   │
│  └──────┘  └──────┘  └──────┘  └──────┘   │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  BESTSELLERS / NEW ARRIVALS                 │
│  [Product Grid: 4 columns on desktop]      │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │
│  │Img  │ │Img  │ │Img  │ │Img  │          │
│  │Name │ │Name │ │Name │ │Name │          │
│  │$99  │ │$149 │ │$79  │ │$199 │          │
│  └─────┘ └─────┘ └─────┘ └─────┘          │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │
│  │More products...                │          │
│  └─────┘ └─────┘ └─────┘ └─────┘          │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  CULTURAL STORY SECTION                     │
│  [Image: Weaving/Craftsmanship]             │
│  "Each piece tells a story..."              │
│  Ethiopian craftsmanship description        │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  FOOTER                                     │
│  About | Contact | Privacy | Social Links   │
│  © 2025 Azebot. All rights reserved.        │
└─────────────────────────────────────────────┘

Mobile: Single column, hero stacked, 2-column product grid
```

### 1.2 Products Page (Shop)

```
┌─────────────────────────────────────────────┐
│  HEADER (same as home)                      │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  PAGE TITLE: "Shop Traditional Clothing"   │
│  Breadcrumb: Home > Shop > Traditional      │
└─────────────────────────────────────────────┘
┌───────┬─────────────────────────────────────┐
│FILTER │  PRODUCT GRID (3-4 columns)        │
│SIDEBAR│  [Sort: Featured ▼] [24 products]  │
│       │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│Cat:   │  │Img  │ │Img  │ │Img  │ │Img  │  │
│☑ All  │  │Name │ │Name │ │Name │ │Name │  │
│☐Women │  │$99  │ │$149 │ │$79  │ │$199 │  │
│☐Men   │  │[♡]  │ │[♡]  │ │[♡]  │ │[♡]  │  │
│☐Kids  │  └─────┘ └─────┘ └─────┘ └─────┘  │
│       │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│Type:  │  │More products in grid...        │  │
│☐Dress │  └─────┘ └─────┘ └─────┘ └─────┘  │
│☐Shirt │                                    │
│☐Pants │  [Pagination: 1 2 3 ... Next]      │
│       │                                    │
│Price: │                                    │
│[Range]│                                    │
└───────┴─────────────────────────────────────┘

Mobile: Filters in collapsible drawer/modal, 2-column grid
```

### 1.3 Product Detail Page

```
┌─────────────────────────────────────────────┐
│  HEADER (same as home)                      │
└─────────────────────────────────────────────┘
┌────────────────────────────────────────────���┐
│  Breadcrumb: Home > Shop > Women > Product  │
└─────────────────────────────────────────────┘
┌──────────────────┬──────────────────────────┐
│  PRODUCT GALLERY │  PRODUCT INFO            │
│  ┌────────────┐  │  "Habesha Kemis"         │
│  │  Main Img  │  │  ★★★★★ (23 reviews)      │
│  │            │  │  $149.99                 │
│  │            │  │                          │
│  └────────────┘  │  Description:            │
│  [🖼][🖼][🖼][🖼] │  Traditional Ethiopian...│
│  Thumbnails      │                          │
│                  │  Color: [⚪][🔴][⚫]      │
│                  │  Size: [XS][S][M][L][XL] │
│                  │  Quantity: [- 1 +]       │
│                  │                          │
│                  │  [Add to Cart 🛒]        │
│                  │  [Add to Wishlist ♡]     │
│                  │                          │
│                  │  ✓ Free shipping > $100  │
│                  │  ✓ Handcrafted quality   │
│                  │  ✓ 30-day returns        │
└──────────────────┴──────────────────────────┘
┌─────────────────────────────────────────────┐
│  PRODUCT TABS                               │
│  [Description] [Details] [Care] [Reviews]   │
│  Content based on active tab...             │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  RELATED PRODUCTS                           │
│  "You might also like"                      │
│  [4-column product grid]                    │
└─────────────────────────────────────────────┘

Mobile: Stack gallery on top, info below, single column
```

### 1.4 Cart Page

```
┌─────────────────────────────────────────────┐
│  HEADER (with cart badge)                   │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  SHOPPING CART                              │
│  3 items in your cart                       │
└─────────────────────────────────────────────┘
┌──────────────────────────┬──────────────────┐
│  CART ITEMS              │  ORDER SUMMARY   │
│  ┌─────────────────────┐ │  Subtotal: $398  │
│  │[Img] Product Name   │ │  Shipping: $15   │
│  │Size: M, Color: Red  │ │  Tax: $33        │
│  │$149 x [- 1 +] [❌] │ │  ─────────────   │
│  └─────────────────────┘ │  Total: $446     │
│  ┌─────────────────────┐ │                  │
│  │[Img] Product Name   │ │  [Continue Shop] │
│  │Size: L, Color: Blue │ │  [Checkout →]    │
│  │$249 x [- 1 +] [❌] │ │                  │
│  └─────────────────────┘ │  ✓ Secure pay    │
│  ┌─────────────────────┐ │  ✓ Free returns  │
│  │Another item...      │ │                  │
│  └─────────────────────┘ │                  │
└──────────────────────────┴──────────────────┘
┌─────────────────────────────────────────────┐
│  RECOMMENDED PRODUCTS                       │
│  "Complete your look"                       │
└─────────────────────────────────────────────┘

Mobile: Stack items, then summary at bottom (sticky)
Empty cart: Show empty state with "Start Shopping" CTA
```

### 1.5 Checkout & Verification Page

```
┌─────────────────────────────────────────────┐
│  HEADER (simplified, no cart)               │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  CHECKOUT PROGRESS                          │
│  [●Verify] → [○Info] → [○Payment] → [○Done]│
└─────────────────────────────────────────────┘

STEP 1: VERIFICATION
┌──────────────────────────┬──────────────────┐
│  VERIFY YOUR IDENTITY    │  ORDER SUMMARY   │
│                          │  3 items: $446   │
│  Email or Phone:         │                  │
│  [________________]      │  [Item list...]  │
│                          │                  │
│  [Send OTP Code]         │                  │
│                          │                  │
│  Enter 6-digit code:     │                  │
│  [_][_][_][_][_][_]     │                  │
│                          │                  │
│  Didn't receive code?    │                  │
│  [Resend]                │                  │
│                          │                  │
│  [Verify & Continue →]   │                  │
└──────────────────────────┴──────────────────┘

STEP 2: SHIPPING INFO
┌──────────────────────────┬──────────────────┐
│  SHIPPING ADDRESS        │  ORDER SUMMARY   │
│  Full Name:              │                  │
│  [________________]      │  [condensed view]│
│  Address:                │                  │
│  [________________]      │                  │
│  City/Region:            │                  │
│  [________] [_______]    │                  │
│  Phone: (pre-filled)     │                  │
│  [________________]      │                  │
│                          │                  │
│  [← Back] [Continue →]   │                  │
└──────────────────────────┴──────────────────┘

STEP 3: PAYMENT (Mock)
┌──────────────────────────┬──────────────────┐
│  PAYMENT METHOD          │  ORDER SUMMARY   │
│  ○ Credit/Debit Card     │                  │
│  ○ Mobile Money          │  Final: $446     │
│  ○ Cash on Delivery      │                  │
│                          │  [Place Order]   │
│  [Card details form]     │                  │
│                          │                  │
│  [← Back] [Place Order]  │                  │
└──────────────────────────┴──────────────────┘

STEP 4: CONFIRMATION
┌─────────────────────────────────────────────┐
│  ✓ ORDER CONFIRMED                          │
│  Order #AZ-2025-001234                      │
│                                             │
│  Thank you! Your order has been received.   │
│  Confirmation sent to: [email]              │
│                                             │
│  [View Order Details] [Continue Shopping]   │
└─────────────────────────────────────────────┘

Mobile: Single column, summary slides up as drawer/modal
```

### 1.6 About Page

```
┌─────────────────────────────────────────────┐
│  HEADER                                     │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  HERO: "About Azebot"                       │
│  [Background image: Ethiopian landscape]    │
│  "Connecting Heritage to Modern Fashion"    │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  OUR STORY                                  │
│  [Text + Image side by side]               │
│  Founded in 2023, Azebot bridges...        │
└─────────────────────────────────────────��───┘
┌─────────────────────────────────────────────┐
│  OUR VALUES                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │[Icon]   │  │[Icon]   │  │[Icon]   │    │
│  │Heritage │  │Quality  │  │Community│    │
│  │Text...  │  │Text...  │  │Text...  │    │
│  └─────────┘  └─────────┘  └─────────┘    │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  CRAFTSMANSHIP                              │
│  [Image gallery: artisans, fabrics, weaving]│
│  "Every piece is handcrafted..."            │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  TEAM (Optional)                            │
│  Meet the people behind Azebot              │
└─────────────────────────────────────────────┘

Mobile: Stack all sections vertically
```

### 1.7 Contact Page

```
┌─────────────────────────────────────────────┐
│  HEADER                                     │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  CONTACT US                                 │
│  "We'd love to hear from you"               │
└─────────────────────────────────────────────┘
┌──────────────────────────┬──────────────────┐
│  CONTACT FORM            │  GET IN TOUCH    │
│  Name:                   │  📧 Email:       │
│  [________________]      │  info@azebot.com │
│  Email:                  │                  │
│  [________________]      │  📞 Phone:       │
│  Subject:                │  +251-XX-XXX-XX  │
│  [________________]      │                  │
│  Message:                │  📍 Location:    │
│  [________________]      │  Addis Ababa, ET │
│  [________________]      │                  │
│  [________________]      │  🕒 Hours:       │
│                          │  Mon-Sat, 9-6    │
│  [Send Message]          │                  │
│                          │  [Social Icons]  │
└──────────────────────────┴──────────────────┘
┌─────────────────────────────────────────────┐
│  FAQ SECTION                                │
│  Common questions about shipping, returns,  │
│  sizing, customization, etc.                │
└─────────────────────────────────────────────┘

Mobile: Stack form on top, contact info below
```

---

## 2. Color Palette (Ethiopian-Inspired)

### Primary Brand Colors
```
Azebot Gold          #D4AF37    ███    Royal, heritage, celebration
                                       (Inspired by Ethiopian gold jewelry)

Ethiopian Green      #078930    ███    National pride, growth, land
                                       (From Ethiopian flag)

Sacred Red           #CE1126    ███    Passion, culture, tradition
                                       (From Ethiopian flag, traditional dyes)
```

### Secondary/Accent Colors
```
Nile Blue            #2B5B84    ███    Depth, trust, Blue Nile waters
Coffee Brown         #5D4E37    ███    Ethiopian coffee heritage
Saffron Yellow       #F4C430    ███    Warmth, sunshine, optimism
```

### Neutral & Background Tones
```
Soft Cream           #FAF8F3    ███    Base background, purity
Linen Beige          #E8E0D5    ███    Secondary background, natural fabric
Warm Grey            #9B8B7E    ███    Text secondary, borders
Deep Charcoal        #2C2825    ███    Primary text, headers
Pure White           #FFFFFF    ███    Contrast, clean space
```

### Cultural Inspiration Sources

**Ethiopian Flag**: The green, yellow, and red represent the land, peace, and sacrifice. These form the foundation of our palette.

**Traditional Netela/Tibeb**: The natural white cotton with colored borders (often red, gold, green) inspired our cream base with vibrant accents.

**Ethiopian Gold Jewelry**: Intricate gold designs worn during celebrations inspired our Azebot Gold as the primary brand color.

**Coffee Ceremony**: The rich brown of Ethiopian coffee beans influenced our Coffee Brown accent.

**Landscape**: From the green highlands to the Blue Nile's deep waters, Ethiopia's natural beauty guides our color choices.

### Usage Guidelines

**Primary Actions**: Azebot Gold (#D4AF37) - "Add to Cart", "Checkout" buttons
**Hover States**: Ethiopian Green (#078930) or Sacred Red (#CE1126)
**Backgrounds**: Soft Cream (#FAF8F3) primary, Linen Beige (#E8E0D5) sections
**Text**: Deep Charcoal (#2C2825) body, Warm Grey (#9B8B7E) secondary
**Accents**: Saffron Yellow for badges, Coffee Brown for secondary elements

---

## 3. Inspiration Board

### Ethiopian Cultural Elements

**Netela (ነጠላ)**: Traditional handwoven cotton scarf with decorative borders (tibeb). Clean white base with colorful geometric patterns at edges. Represents simplicity meeting artistry.

**Habesha Kemis**: Traditional white dress with elaborate hand-embroidered neckline and hem. Flowing, elegant, worn during celebrations and holidays.

**Ethiopian Cross**: Intricate, geometric designs with spiritual significance. Can inspire icon designs and decorative elements.

**Coffee Ceremony**: Central to Ethiopian culture. The ritual, the jebena (coffee pot), the incense - warmth, community, tradition.

**Meskel Flower**: Bright yellow flowers blooming during Meskel festival. Represents renewal and celebration.

### Pattern References

**Tibeb Borders**: 
- Geometric zigzag patterns
- Horizontal striping with small diamond/cross motifs
- Color blocking (red, green, yellow, orange)
- Symmetrical, repeating designs

**Traditional Weaving Patterns**:
- Diamond lattice work
- Parallel lines with perpendicular accents
- Stepped pyramid patterns
- Interlocking geometric shapes

**African Geometry**:
- Kente-style grid patterns (Ghana influence)
- Mudcloth-inspired organic shapes (Mali influence)
- Adinkra symbols (can be used subtly for texture)

### Mood, Feel, Vibe

**Heritage Meets Modern**: Not costume-like, but authentically rooted. Clean, contemporary layouts that showcase traditional craftsmanship.

**Warm & Inviting**: Like being welcomed into an Ethiopian home for a coffee ceremony. Rich colors, but not overwhelming.

**Celebratory Yet Everyday**: These clothes honor special occasions but are also meant for daily wear. Balance elegance with accessibility.

**Artisan Quality**: Every element should whisper "handcrafted". Thoughtful details, quality materials, respect for the maker.

**Community-Centered**: This isn't just commerce - it's cultural preservation and celebration. Family, togetherness, shared heritage.

**Natural & Organic**: Cotton, linen, natural dyes. The website should feel earthy, textured, real - not plastic or overly digital.

**Confident Simplicity**: Ethiopian design doesn't need to shout. Confident, understated elegance. White space. Let the products breathe.

### Design Inspiration Keywords
- Handwoven texture
- Sun-bleached cotton
- Market vibrancy
- Ancient scripts (Ge'ez alphabet for decorative elements)
- Highland landscapes
- Golden hour lighting
- Ceremonial elegance
- Family gatherings
- Artisan workshops

---

## 4. Component-by-Component Architecture

### 4.1 Layout Components

#### `Header.tsx`
**Purpose**: Main site navigation
**Props**: `cartItemCount?: number`
**Features**:
- Logo (Azebot with optional Ethiopian-inspired iconography)
- Main nav: Home, Shop (dropdown: Women/Men/Kids/All), About, Contact
- Search bar (optional for v1)
- Cart icon with badge count
- Mobile: Hamburger menu
**State**: Mobile menu open/closed
**Styling**: Sticky on scroll, semi-transparent background with backdrop blur

#### `Footer.tsx`
**Purpose**: Site footer with links and info
**Props**: None
**Features**:
- Brand tagline
- Quick links (Shop, About, Contact, FAQs, Shipping, Returns)
- Social media icons (Instagram, Facebook, Twitter)
- Newsletter signup (email input)
- Copyright notice
- Ethiopian flag colors subtle accent at bottom border

#### `Hero.tsx`
**Purpose**: Homepage hero section
**Props**: `title, subtitle, ctaButtons[], backgroundImage`
**Features**:
- Full-width background image with overlay
- Headline + subheadline
- 1-2 CTA buttons
- Responsive typography
**Variants**: `HeroHome`, `HeroPage` (smaller, for internal pages)

#### `PageHeader.tsx`
**Purpose**: Internal page hero/header
**Props**: `title, breadcrumbs[], backgroundImage?`
**Features**:
- Page title
- Breadcrumb navigation
- Optional background image or decorative pattern

#### `Section.tsx`
**Purpose**: Reusable section wrapper
**Props**: `title?, subtitle?, children, backgroundColor?, pattern?`
**Features**:
- Consistent padding/margins
- Optional section title/subtitle
- Background color variants
- Optional Ethiopian pattern overlay (subtle)

#### `Container.tsx`
**Purpose**: Content width container
**Props**: `children, maxWidth?, padding?`
**Features**:
- Max-width constraints (1280px default)
- Responsive padding
- Center alignment

---

### 4.2 Product System Components

#### `ProductCard.tsx`
**Purpose**: Individual product display in grids
**Props**: `product: Product, variant?: 'default' | 'compact'`
**Features**:
- Product image with hover effect (second image or zoom)
- Product name
- Price (with sale price if applicable)
- Quick action: Add to cart button (appears on hover on desktop)
- Wishlist heart icon
- "New" or "Sale" badge
- Color dots indicator (if multiple colors)
**State**: Hover state, adding to cart loading
**Interaction**: Click navigates to product detail

#### `ProductGrid.tsx`
**Purpose**: Responsive grid of product cards
**Props**: `products: Product[], columns?: 3 | 4`
**Features**:
- Responsive grid (4 cols desktop → 3 tablet → 2 mobile)
- Consistent spacing
- Empty state ("No products found")

#### `ProductFilter.tsx` (Sidebar)
**Purpose**: Filter products by category, price, size, color
**Props**: `filters: FilterState, onFilterChange: (filters) => void`
**Features**:
- Category checkboxes (Women, Men, Kids, Accessories)
- Product type checkboxes (Dress, Shirt, Pants, etc.)
- Price range slider
- Color swatches
- Size checkboxes
- "Clear all" button
- "Apply" button (mobile)
**State**: Current filter selections
**Mobile**: Drawer/modal triggered by "Filters" button

#### `ProductSort.tsx`
**Purpose**: Sort dropdown
**Props**: `currentSort, onSortChange`
**Features**:
- Dropdown: Featured, Price Low-High, Price High-Low, Newest, Best Selling
- Clean dropdown UI

#### `ProductGallery.tsx`
**Purpose**: Product detail page image gallery
**Props**: `images: string[]`
**Features**:
- Large main image display
- Thumbnail strip below (or to side on desktop)
- Click thumbnail to change main image
- Zoom on hover (optional for v1)
- Swipe gestures on mobile
**State**: Current active image index

#### `ProductInfo.tsx`
**Purpose**: Product detail page information section
**Props**: `product: Product`
**Features**:
- Product name
- Star rating + review count
- Price (with sale price)
- Description
- Color selector (swatches)
- Size selector (buttons)
- Quantity selector (- input +)
- Add to Cart button (large, prominent)
- Add to Wishlist button
- Product features/benefits (icons + text)
- Accordion for details, care instructions
**State**: Selected color, size, quantity

#### `ProductTabs.tsx`
**Purpose**: Tabbed content for product details
**Props**: `tabs: TabContent[]`
**Features**:
- Tab navigation: Description, Details, Care Instructions, Reviews
- Tab content area
**State**: Active tab

#### `ReviewSummary.tsx` & `ReviewItem.tsx`
**Purpose**: Display product reviews (can use mock data)
**Props**: `reviews: Review[]`
**Features**:
- Average rating with stars
- Rating breakdown bars (5★: 12, 4★: 3, etc.)
- Individual reviews with name, date, rating, text
- Helpful vote buttons (optional)

#### `RelatedProducts.tsx`
**Purpose**: Show related/recommended products
**Props**: `products: Product[], title?: string`
**Features**:
- Section title ("You might also like")
- ProductGrid with 4 products
- Can reuse ProductCard

---

### 4.3 Cart & Checkout Components

#### `CartIcon.tsx`
**Purpose**: Cart icon with badge in header
**Props**: `itemCount: number`
**Features**:
- Shopping cart icon
- Badge with item count (if > 0)
- Click opens cart page or drawer
**State**: Synced with localStorage cart

#### `CartItem.tsx`
**Purpose**: Individual item in cart
**Props**: `item: CartItem, onUpdateQuantity, onRemove`
**Features**:
- Product thumbnail
- Product name, size, color
- Price
- Quantity selector (- input +)
- Remove button (X)
- Subtotal for item
**Interaction**: Update quantity, remove item

#### `CartSummary.tsx`
**Purpose**: Order summary box
**Props**: `items: CartItem[], showActions?: boolean`
**Features**:
- Subtotal calculation
- Shipping estimate
- Tax estimate
- Total (bold, prominent)
- "Continue Shopping" link
- "Proceed to Checkout" button
- Trust badges (secure checkout, free returns)
**Responsive**: Sticky on mobile at bottom

#### `CartEmpty.tsx`
**Purpose**: Empty cart state
**Props**: None
**Features**:
- Illustration or icon
- "Your cart is empty" message
- "Start Shopping" CTA button

#### `CheckoutProgress.tsx`
**Purpose**: Visual stepper for checkout flow
**Props**: `currentStep: number, steps: string[]`
**Features**:
- Steps: Verify → Information → Payment → Confirmation
- Visual indicator (filled dots or progress bar)
- Step labels
**Responsive**: Horizontal on desktop, compact on mobile

#### `VerificationForm.tsx`
**Purpose**: Email/phone + OTP verification
**Props**: `onVerified: (contact) => void`
**Features**:
- Input for email or phone
- "Send OTP" button
- OTP input (6 digits, separate boxes)
- "Resend OTP" link
- "Verify" button
- Fake OTP logic (accept any 6 digits or specific code like "123456")
**State**: Contact info, OTP sent, OTP value, verification status
**Validation**: Basic email/phone format check

#### `OTPInput.tsx`
**Purpose**: Separate input boxes for OTP digits
**Props**: `length: number, value: string, onChange: (value) => void`
**Features**:
- 6 separate input boxes
- Auto-focus next box on digit entry
- Backspace navigates to previous box
- Paste support (splits pasted code across boxes)

#### `ShippingForm.tsx`
**Purpose**: Shipping address form
**Props**: `onSubmit: (address) => void, prefillContact?: string`
**Features**:
- Full name
- Address line 1, 2
- City, Region/State
- Postal code (optional)
- Phone (prefilled from verification)
- "Save address" checkbox (for localStorage)
- Form validation
**State**: Form fields, validation errors

#### `PaymentForm.tsx`
**Purpose**: Payment method selection (mock)
**Props**: `onSubmit: (paymentMethod) => void`
**Features**:
- Payment method radio options:
  - Credit/Debit Card (show mock card form)
  - Mobile Money (show phone number input)
  - Cash on Delivery
- Mock card inputs: number, expiry, CVV, name
- "Place Order" button
- Security badges
**Note**: This is mock - no real payment processing

#### `OrderConfirmation.tsx`
**Purpose**: Success page after order
**Props**: `orderNumber: string, contact: string`
**Features**:
- Success icon/animation
- "Thank you!" message
- Order number
- Confirmation sent to [email/phone]
- Order summary (items, total)
- "View Order" button (can link to a mock order page)
- "Continue Shopping" button
**Behavior**: Clear cart from localStorage

---

### 4.4 Utility & Shared Components

#### `Button.tsx`
**Purpose**: Reusable button component
**Props**: `variant: 'primary' | 'secondary' | 'outline' | 'ghost', size: 'sm' | 'md' | 'lg', children, icon?, onClick, disabled?, loading?`
**Features**:
- Variant styles matching brand colors
- Size variants
- Optional icon (before or after text)
- Loading spinner state
- Disabled state

#### `Input.tsx`
**Purpose**: Form input field
**Props**: `type, label?, placeholder, value, onChange, error?, icon?`
**Features**:
- Label (optional)
- Input field
- Error message display
- Icon (optional, inside input)
- Focus states

#### `Select.tsx`
**Purpose**: Dropdown select
**Props**: `options: {label, value}[], value, onChange, label?, placeholder?`
**Features**:
- Custom styled dropdown
- Label
- Option list

#### `Checkbox.tsx` & `Radio.tsx`
**Purpose**: Form controls
**Props**: `label, checked, onChange, name?`
**Features**:
- Custom styled checkbox/radio
- Label

#### `Badge.tsx`
**Purpose**: Small label/badge
**Props**: `children, variant: 'new' | 'sale' | 'default', color?`
**Features**:
- Small rounded badge
- Color variants

#### `Modal.tsx`
**Purpose**: Modal/dialog overlay
**Props**: `isOpen, onClose, title?, children, size?`
**Features**:
- Overlay backdrop
- Modal box (centered)
- Close button (X)
- Title (optional)
- Content area
- ESC key to close, click outside to close

#### `Drawer.tsx`
**Purpose**: Slide-in panel (for mobile filters, cart)
**Props**: `isOpen, onClose, position: 'left' | 'right' | 'bottom', children`
**Features**:
- Slide animation from side or bottom
- Backdrop overlay
- Close button

#### `Breadcrumbs.tsx`
**Purpose**: Navigation breadcrumbs
**Props**: `crumbs: {label, href}[]`
**Features**:
- Home > Category > Page
- Links except last (current page)
- Separator icon (chevron or /)

#### `Pagination.tsx`
**Purpose**: Page navigation for product listings
**Props**: `currentPage, totalPages, onPageChange`
**Features**:
- Previous/Next buttons
- Page numbers (with ellipsis if many pages)
- Current page highlighted

#### `Loading.tsx` & `LoadingSpinner.tsx`
**Purpose**: Loading states
**Props**: `size?, text?`
**Features**:
- Spinner animation (Ethiopian cross-inspired shape?)
- Optional loading text

#### `EmptyState.tsx`
**Purpose**: Generic empty state
**Props**: `icon?, title, message, action?`
**Features**:
- Icon or illustration
- Title + message
- Optional CTA button

#### `CategoryCard.tsx`
**Purpose**: Featured category tiles on homepage
**Props**: `category: {name, image, href}`
**Features**:
- Category image
- Category name overlay
- Hover effect
- Link to category page

#### `FeatureIcon.tsx`
**Purpose**: Icon + text for features/benefits
**Props**: `icon, text`
**Features**:
- Icon (from lucide-react)
- Short text
- Centered or left-aligned

#### `StarRating.tsx`
**Purpose**: Display star rating
**Props**: `rating: number, maxStars?: 5, showNumber?: boolean, size?`
**Features**:
- Filled stars based on rating
- Partial stars for decimal ratings
- Optional rating number display (4.5)

#### `WishlistButton.tsx`
**Purpose**: Toggle wishlist (save for later)
**Props**: `productId, isSaved?, onToggle`
**Features**:
- Heart icon (outline when not saved, filled when saved)
- Click to toggle
- Can use localStorage or state
**State**: Saved state

#### `NewsletterSignup.tsx`
**Purpose**: Email signup for newsletter
**Props**: `variant?: 'inline' | 'modal'`
**Features**:
- Email input
- "Subscribe" button
- Success message
- Can store in localStorage (mock)

#### `Accordion.tsx`
**Purpose**: Collapsible content sections
**Props**: `items: {title, content}[]`
**Features**:
- Clickable headers
- Expand/collapse animation
- Icon indicator (chevron)
**State**: Open/closed state for each item

#### `ImageWithFallback.tsx` (Already exists as protected)
**Purpose**: Image with loading/error states
**Do not modify or recreate**

---

## 5. Suggested Folder Structure (Next.js App Router)

```
azebot/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── patterns/           # Ethiopian pattern textures
│   │   └── about/
│   ├── icons/
│   │   ├── favicon.ico
│   │   └── azebot-logo.svg
│   └── fonts/                  # Optional: Ethiopian-inspired fonts
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Header, Footer
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles, color variables
│   │   │
│   │   ├── shop/
│   │   │   ├── page.tsx        # All products page
│   │   │   ├── [category]/
│   │   │   │   └── page.tsx    # Category page (women, men, kids)
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Product detail page
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx        # Cart page
│   │   │
│   │   ├── checkout/
│   │   │   ├── page.tsx        # Checkout flow (multi-step)
│   │   │   └── confirmation/
│   │   │       └── page.tsx    # Order confirmation
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx        # About page
│   │   │
│   │   └── contact/
│   │       └── page.tsx        # Contact page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilter.tsx
│   │   │   ├── ProductSort.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── ProductInfo.tsx
│   │   │   ├── ProductTabs.tsx
│   │   │   ├── RelatedProducts.tsx
│   │   │   ├── ReviewSummary.tsx
│   │   │   └── ReviewItem.tsx
│   │   │
│   │   ├── cart/
│   │   │   ├── CartIcon.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartEmpty.tsx
│   │   │
│   │   ├── checkout/
│   │   │   ├── CheckoutProgress.tsx
│   │   │   ├── VerificationForm.tsx
│   │   │   ├── OTPInput.tsx
│   │   │   ├── ShippingForm.tsx
│   │   │   ├── PaymentForm.tsx
│   │   │   └── OrderConfirmation.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Checkbox.tsx
│   │       ├── Radio.tsx
│   │       ├── Badge.tsx
│   │       ├── Modal.tsx
│   │       ├── Drawer.tsx
│   │       ├── Breadcrumbs.tsx
│   │       ├── Pagination.tsx
│   │       ├── Loading.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── CategoryCard.tsx
│   │       ├── FeatureIcon.tsx
│   │       ├── StarRating.tsx
│   │       ├── WishlistButton.tsx
│   │       ├── NewsletterSignup.tsx
│   │       └── Accordion.tsx
│   │
│   ├── lib/
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── constants.ts        # Color palette, config
│   │   ├── utils.ts            # Utility functions (formatPrice, etc.)
│   │   ├── cart.ts             # Cart logic (localStorage)
│   │   ├── products.ts         # Product data & filtering
│   │   └── validation.ts       # Form validation helpers
│   │
│   ├── data/
│   │   ├── products.json       # Mock product data
│   │   ├── categories.json     # Category data
│   │   └── reviews.json        # Mock reviews
│   │
│   └── hooks/
│       ├── useCart.ts          # Custom hook for cart state
│       ├── useLocalStorage.ts  # localStorage hook
│       ├── useMediaQuery.ts    # Responsive breakpoints
│       └── useCheckout.ts      # Checkout flow state
│
├── tailwind.config.ts          # Tailwind with custom colors
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

## 6. Technical Implementation Notes

### 6.1 Data Models (TypeScript)

```typescript
// lib/types.ts

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: 'women' | 'men' | 'kids' | 'accessories';
  type: 'dress' | 'shirt' | 'pants' | 'scarf' | 'jewelry' | 'other';
  colors: Color[];
  sizes: Size[];
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  rating?: number;
  reviewCount?: number;
  details?: {
    material?: string;
    care?: string;
    origin?: string;
    [key: string]: string | undefined;
  };
}

export interface Color {
  name: string;
  hex: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: Color;
  selectedSize?: Size;
}

export interface Cart {
  items: CartItem[];
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  postalCode?: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  contactInfo: string;
  paymentMethod: 'card' | 'mobile-money' | 'cod';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful?: number;
}

export interface FilterState {
  categories: string[];
  types: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: Size[];
}
```

### 6.2 localStorage Strategy

```typescript
// lib/cart.ts

// Keys
const CART_KEY = 'azebot_cart';
const WISHLIST_KEY = 'azebot_wishlist';
const CHECKOUT_KEY = 'azebot_checkout';

// Cart functions
export const getCart = (): Cart => { /* ... */ };
export const addToCart = (product: Product, quantity, color, size) => { /* ... */ };
export const updateCartItem = (productId: string, quantity: number) => { /* ... */ };
export const removeFromCart = (productId: string) => { /* ... */ };
export const clearCart = () => { /* ... */ };
export const getCartTotal = (cart: Cart) => { /* ... */ };
export const getCartItemCount = (cart: Cart) => { /* ... */ };

// Wishlist functions
export const getWishlist = (): string[] => { /* ... */ };
export const addToWishlist = (productId: string) => { /* ... */ };
export const removeFromWishlist = (productId: string) => { /* ... */ };

// Checkout state (persist between steps)
export const saveCheckoutState = (step: number, data: any) => { /* ... */ };
export const getCheckoutState = () => { /* ... */ };
export const clearCheckoutState = () => { /* ... */ };
```

### 6.3 Fake OTP Logic

```typescript
// lib/verification.ts

export const sendOTP = async (contact: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In dev, log the "sent" OTP
  console.log(`OTP for ${contact}: 123456`);
  
  // Store contact in temp state
  sessionStorage.setItem('otp_contact', contact);
  sessionStorage.setItem('otp_sent_at', Date.now().toString());
  
  return true;
};

export const verifyOTP = async (contact: string, otp: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const storedContact = sessionStorage.getItem('otp_contact');
  
  // Accept specific test codes or any 6-digit code for demo
  if (contact === storedContact && (otp === '123456' || otp.length === 6)) {
    sessionStorage.setItem('verified_contact', contact);
    return true;
  }
  
  return false;
};

export const isVerified = (): boolean => {
  return !!sessionStorage.getItem('verified_contact');
};
```

### 6.4 Responsive Breakpoints (Tailwind)

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        'azebot-gold': '#D4AF37',
        'ethiopian-green': '#078930',
        'sacred-red': '#CE1126',
        'nile-blue': '#2B5B84',
        'coffee-brown': '#5D4E37',
        'saffron-yellow': '#F4C430',
        'soft-cream': '#FAF8F3',
        'linen-beige': '#E8E0D5',
        'warm-grey': '#9B8B7E',
        'deep-charcoal': '#2C2825',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
}
```

### 6.5 Mock Product Data Structure

```json
// data/products.json (excerpt)
{
  "products": [
    {
      "id": "prod_001",
      "name": "Habesha Kemis - Traditional White",
      "slug": "habesha-kemis-traditional-white",
      "description": "Elegant handwoven Ethiopian dress with intricate tibeb embroidery. Perfect for celebrations and cultural events.",
      "price": 149.99,
      "images": [
        "/images/products/habesha-kemis-white-1.jpg",
        "/images/products/habesha-kemis-white-2.jpg",
        "/images/products/habesha-kemis-white-3.jpg"
      ],
      "category": "women",
      "type": "dress",
      "colors": [
        { "name": "White", "hex": "#FFFFFF" },
        { "name": "Cream", "hex": "#FAF8F3" }
      ],
      "sizes": ["S", "M", "L", "XL"],
      "inStock": true,
      "featured": true,
      "new": false,
      "rating": 4.8,
      "reviewCount": 23,
      "details": {
        "material": "100% handwoven cotton",
        "care": "Hand wash cold, line dry",
        "origin": "Handcrafted in Ethiopia"
      }
    }
  ]
}
```

---

## 7. Development Phases

### Phase 1: Foundation (Week 1)
- Setup Next.js 14 with TypeScript
- Implement design system (colors, typography, base components)
- Create layout components (Header, Footer, Container)
- Build homepage with hero and featured products
- Setup mock product data

### Phase 2: Product System (Week 2)
- Products listing page with filters
- Product detail page with gallery and info
- Shopping cart functionality (add, remove, update)
- Cart page with summary

### Phase 3: Checkout (Week 3)
- Checkout flow (multi-step)
- Verification with fake OTP
- Shipping form
- Payment form (mock)
- Order confirmation

### Phase 4: Content Pages & Polish (Week 4)
- About page
- Contact page
- Responsive testing and refinement
- Performance optimization
- Accessibility audit
- Ethiopian pattern integration

---

## 8. Ethiopian Pattern Integration Ideas

### Subtle Pattern Overlays
- Use tibeb-inspired borders as subtle background patterns (very low opacity ~5%)
- Section dividers with Ethiopian cross motifs
- Hero section overlays with geometric patterns

### Typography
- Consider Ge'ez-inspired decorative elements for headings (not actual script, just inspired shapes)
- Drop caps with Ethiopian cross shapes

### UI Elements
- Buttons with subtle border patterns on hover
- Product cards with tibeb-style bottom borders
- Loading spinners shaped like Ethiopian crosses

### Color Blocking
- Use Ethiopian flag colors strategically:
  - Green for "In Stock" badges
  - Yellow/Gold for "New Arrival" badges
  - Red for "Sale" badges

---

## 9. Accessibility Considerations

- All images have alt text describing products
- Keyboard navigation for all interactive elements
- ARIA labels for icon-only buttons
- Color contrast ratios meet WCAG AA standards
- Form inputs have associated labels
- Focus indicators visible and clear
- Screen reader announcements for cart updates

---

## 10. Performance Optimizations

- Next.js Image component for all product images
- Lazy loading for below-fold content
- Product images optimized (WebP format)
- Static generation for product pages where possible
- Minimal JavaScript for critical path
- Font subset loading (if using custom fonts)

---

## 11. Future Enhancements (Post-MVP)

- User accounts and order history
- Product search with Algolia or similar
- Wishlist saved to account
- Product reviews (user-submitted)
- Size guide with measurements
- 360° product views
- AR try-on (far future)
- Multi-language support (English + Amharic)
- Real payment integration
- Real backend with database
- Admin panel for product management
- Email notifications
- Social sharing

---

## 12. Brand Voice & Copy Guidelines

**Tone**: Warm, proud, educational, welcoming

**Key Messages**:
- "Heritage you can wear"
- "Handcrafted with love in Ethiopia"
- "From our artisans to your wardrobe"
- "Celebrate culture, every day"

**Product Descriptions Should**:
- Highlight craftsmanship
- Mention cultural significance (where appropriate)
- Use sensory language (soft cotton, vibrant colors, flowing silhouette)
- Include care instructions
- Note handmade nature (slight variations are natural)

**Avoid**:
- Overly salesy language
- Cultural appropriation (ensure authenticity)
- Generic fashion jargon
- Anything that feels inauthentic

---

## End of Blueprint

This blueprint provides a comprehensive foundation for building Azebot. Each section can be expanded during development. The design honors Ethiopian heritage while remaining modern and accessible. Ready to bring this vision to life! 🇪🇹✨
