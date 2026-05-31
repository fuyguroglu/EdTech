# Education Website - High School Supplemental Learning Platform

## Project Vision

A scalable EdTech marketplace connecting private tutors/instructors with high school students. Instructors create and manage their own courses with AI assistance, while students can subscribe to individual courses for supplemental education.

**Key Value Proposition:** "AI that saves instructors time by working for them" - justifying platform revenue share.

## Business Model

**Monetization:** Per-course subscription model
- Students pay monthly subscription per course they enroll in
- Instructors receive 50-60% revenue share
- Platform takes 40-50% (justified by AI assistance and infrastructure)

**Target Users:**
- Private tutors starting small, growing to multiple instructors per subject
- High school students (grades 9-12) seeking supplemental education
- Eventually: Multiple instructors per course/subject area

**Enrollment Model:** Mix of open enrollment and instructor approval (instructor choice)

## Core Features

### For Instructors
- Course creation and management
- Section/lesson builder with rich content
- YouTube video embedding (self-hosted later)
- Multiple assessment types (MC, short answer, essay, file uploads)
- Manual grading interface
- Student progress tracking
- Revenue dashboard
- AI content assistant (Phase 2)

### For Students
- Course marketplace/catalog
- Course enrollment and subscription management
- Interactive lessons with mixed media
- Assessment taking
- Progress tracking and grade book
- Achievement system (Phase 2)

### For Admins
- User management (approve instructors)
- Platform analytics
- Revenue management
- Content moderation

## Tech Stack

### Frontend (Implemented ✅)
- **Framework:** Next.js 16.2.6 (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 with @tailwindcss/postcss
- **Components:** shadcn/ui (accessible, professional) - Button component added
- **Icons:** lucide-react
- **Utilities:** clsx, tailwind-merge for class management
- **State Management:** React Query for server state (to be added)
- **Forms:** React Hook Form with Zod validation (to be added)

### Backend (Implemented ✅)
- **Runtime:** Node.js
- **Framework:** Next.js API Routes
- **Database:** PostgreSQL (connection ready)
- **ORM:** Prisma v7 with @prisma/adapter-pg
- **Database Adapter:** pg (node-postgres) with connection pooling
- **Schema:** Complete with 11 models, enums, and relationships
- **Authentication:** NextAuth.js (to be implemented)
- **File Storage:** AWS S3 or Cloudflare R2 (to be added)

### Payments & Infrastructure (Planned)
- **Payment Processing:** Stripe (subscriptions + Connect for revenue splits)
- **Hosting:** Vercel (ready for deployment)
- **Database Hosting:** Supabase or Neon (configuration ready)
- **Email:** SendGrid or Resend (to be added)

### AI Integration (Phase 2+)
- **Content Assistant:** Anthropic Claude API
- **Essay Grading:** OpenAI GPT-4 or Claude
- **Content Suggestions:** RAG with course content

## Implementation Notes

### Tailwind CSS v4 Configuration

**CRITICAL:** Tailwind v4 uses completely different syntax from v3!

**Correct Setup:**
```css
/* app/globals.css */
@import "tailwindcss";

body {
  font-family: system-ui, sans-serif;
}
```

**PostCSS Config:**
```javascript
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
export default config;
```

**What's Different in v4:**
- ❌ NO `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
- ✅ USE `@import "tailwindcss";` instead
- ❌ NO `tailwind.config.ts` needed (auto-detects content)
- ✅ All default colors work out of the box
- ✅ Custom colors defined with `@theme` directive in CSS

**Custom Colors (if needed):**
```css
@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
  --color-brand-light: #a5b4fc;
}

/* Generates: text-brand, bg-brand, border-brand-light, etc. */
```

**References:**
- [Tailwind CSS v4.0 Official Docs](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind v4 + Next.js Setup Guide](https://designrevision.com/blog/tailwind-nextjs-setup)
- [Moving from Tailwind 3 to 4](https://www.9thco.com/labs/moving-from-tailwind-3-to-tailwind-4)

### Prisma 7 Configuration
- Using adapter-based setup (new in Prisma 7)
- Database URL configured via prisma.config.ts
- Connection pooling via pg library
- Type generation to lib/generated/prisma/

### Interactive Course Architecture

**Card-Based Lesson System:**
- Each course is a series of interactive "cards" that students progress through
- `LessonContainer` manages navigation (prev/next), progress bar, and card state
- `LessonCard` provides consistent wrapper with numbering and styling
- Cards can contain any mix of: text, math, visualizations, quizzes, reveals

**Component Pattern:**
```typescript
// Course page defines cards as render functions (prevents state freezing)
const cards = [
  {
    title: "Card Title",
    description: "Card description",
    component: () => <CardComponent />,  // Function, not JSX element
  },
];

// Each card is a React component with its own state
function CardComponent() {
  const [state, setState] = useState(initialValue);
  return (
    <LessonCard number={1} title="..." description="...">
      {/* Interactive content */}
    </LessonCard>
  );
}
```

**Visualization Pattern:**
- SVG-based for sharp scaling and animations
- Parametric (accept props like mu, sigma, angle, etc.)
- Use `useMemo` for expensive calculations
- Add `key` prop when SVG doesn't auto-update on prop changes
- Gradients and animations defined inline with `<defs>`

**Sound System:**
- Web Audio API for zero-latency UI feedback
- Different tones for: drop, correct, wrong, reveal, click
- Simple frequency-based oscillators (no audio files needed)
- Call `playSound("correct")` anywhere to play

**Math Rendering:**
- KaTeX for LaTeX math notation
- `<MathText math="\\mu = 0" />` for inline
- `<MathText math="..." display={true} />` for block equations
- Escaping: Use `\\` for backslashes in strings

**Progressive Disclosure:**
- `<RevealBox>` component for step-by-step reveals
- Variants: default (gray), success (green), info (blue), warning (yellow)
- Encourages active learning vs passive reading

### Project Structure
```
/app                    - Next.js App Router pages
  /courses              - Course catalog and course pages
    page.tsx            - Course catalog with 3 courses
    /statistics-normal-distribution  - 10-card interactive lesson
    /physics-electromagnetic-induction-v2  - 7-card interactive lesson
  layout.tsx            - Root layout with Navbar/Footer
  page.tsx              - Homepage
/components
  /ui                   - shadcn/ui components (Button, Card, Badge, etc.)
  /lesson               - Reusable lesson components
    lesson-container.tsx  - Multi-card navigation with progress
    lesson-card.tsx       - Individual card wrapper
    reveal-box.tsx        - Progressive disclosure UI
    math-text.tsx         - KaTeX math rendering
    quiz.tsx              - Interactive quiz component
  /visualizations       - Interactive SVG visualizations
    bell-curve.tsx        - Normal distribution curve
    galton-board.tsx      - Ball drop simulation
    histogram-to-curve.tsx - Histogram to curve transition
    magnet-coil-demo.tsx  - EM induction demo
    flux-demo.tsx         - Magnetic flux visualization
  navbar.tsx            - Main navigation
  footer.tsx            - Site footer
/lib
  /generated/prisma     - Generated Prisma Client
  /utils
    sound-system.ts     - Web Audio API sound effects
  prisma.ts             - Prisma singleton instance
  utils.ts              - Utility functions (cn)
/prisma
  schema.prisma         - Database schema
prisma.config.ts        - Prisma configuration
```

## Database Schema

**Status:** Schema designed and Prisma Client generated. Database connection ready but not yet initialized.

**Setup Instructions:** See `DATABASE_SETUP.md` for PostgreSQL setup options (cloud or local).

### Core Tables

**users**
- id (uuid, pk)
- email (unique)
- password_hash
- role (enum: admin, instructor, student)
- name
- avatar_url
- email_verified
- created_at, updated_at

**instructors**
- id (uuid, pk)
- user_id (fk -> users)
- bio
- expertise (text[])
- approved (boolean)
- revenue_share_percentage (default 50)
- stripe_account_id
- created_at

**courses**
- id (uuid, pk)
- instructor_id (fk -> instructors)
- title
- description (rich text)
- thumbnail_url
- category (enum: math, science, english, history, etc.)
- difficulty_level (enum: beginner, intermediate, advanced)
- price_monthly (cents)
- enrollment_type (enum: open, approval_required)
- published (boolean)
- created_at, updated_at

**sections**
- id (uuid, pk)
- course_id (fk -> courses)
- title
- description
- order (integer)
- created_at

**lessons**
- id (uuid, pk)
- section_id (fk -> sections)
- title
- content (rich text/JSON)
- video_url (YouTube initially)
- duration_minutes
- order (integer)
- created_at, updated_at

**assessments**
- id (uuid, pk)
- lesson_id (fk -> lessons, nullable)
- course_id (fk -> courses)
- title
- description
- passing_score (percentage)
- time_limit_minutes (nullable)
- attempts_allowed (nullable)
- created_at

**questions**
- id (uuid, pk)
- assessment_id (fk -> assessments)
- question_text (text)
- type (enum: multiple_choice, true_false, short_answer, essay, file_upload)
- options (jsonb, for MC questions)
- correct_answer (text, nullable for essays)
- points (integer)
- order (integer)
- created_at

**enrollments**
- id (uuid, pk)
- student_id (fk -> users)
- course_id (fk -> courses)
- status (enum: pending, active, cancelled, completed)
- stripe_subscription_id
- enrolled_at
- expires_at (nullable)

**lesson_progress**
- id (uuid, pk)
- enrollment_id (fk -> enrollments)
- lesson_id (fk -> lessons)
- completed (boolean)
- completed_at

**submissions**
- id (uuid, pk)
- enrollment_id (fk -> enrollments)
- assessment_id (fk -> assessments)
- attempt_number (integer)
- answers (jsonb)
- score (integer, nullable)
- max_score (integer)
- graded (boolean)
- graded_by (fk -> users, nullable)
- graded_at
- feedback (text, nullable)
- submitted_at

**transactions**
- id (uuid, pk)
- enrollment_id (fk -> enrollments)
- stripe_payment_id
- amount (cents)
- instructor_amount (cents)
- platform_amount (cents)
- status (enum: pending, completed, failed, refunded)
- created_at

## Current Status

**Phase 1 Complete + Example Courses Built** - Foundation complete with two fully interactive demo courses.

### Completed
- ✅ Next.js 16.2.6 with TypeScript and App Router
- ✅ Tailwind CSS v4 configured and working
- ✅ shadcn/ui component library integrated
- ✅ PostgreSQL database schema designed
- ✅ Prisma ORM configured (v7 with adapter-based setup)
- ✅ Professional UI layout (Navbar, Footer, Homepage)
- ✅ Responsive design with modern styling
- ✅ Git repository with GitHub integration
- ✅ Build pipeline verified
- ✅ **Reusable lesson component architecture built**
- ✅ **Interactive Normal Distribution course (10 cards)**
- ✅ **Interactive Electromagnetic Induction course (7 cards)**
- ✅ **Course catalog page with 3 courses listed**
- ✅ **Sound system (Web Audio API)**
- ✅ **Math rendering (KaTeX integration)**
- ✅ **Interactive SVG visualizations**

### Demo Courses Built

**1. Statistics: Normal Distribution (FREE Demo)**
- 10 interactive cards with progressive learning
- Features: Galton board simulation, bell curve explorer, z-score calculator
- Interactive sliders for μ and σ (note: known issue with visual updates)
- Practice problems with instant feedback
- Final challenge quiz with scoring
- Route: `/courses/statistics-normal-distribution`

**2. Physics: Electromagnetic Induction (FREE Demo)**
- 7 interactive cards covering Faraday's and Lenz's Laws
- Features: Moving magnet simulation, flux calculator, real-time EMF calculations
- Interactive demos for magnetic flux and induction
- Practice problems and real-world applications
- Route: `/courses/physics-electromagnetic-induction-v2`

**3. A-Level Electromagnetic Induction (Paid - $29.99/month)**
- Listed on catalog (not yet built)
- 24 lessons planned
- Advanced content for exam preparation

### Reusable Component Library

**Lesson Components:**
- `LessonContainer` - Multi-card navigation with progress bar and prev/next controls
- `LessonCard` - Card wrapper with numbering and consistent styling
- `RevealBox` - Progressive disclosure component with variants (default, success, info, warning)
- `MathText` - KaTeX wrapper for LaTeX math rendering (inline and display modes)
- `Quiz` - Multiple choice quiz with instant visual feedback

**Visualization Components:**
- `BellCurve` - Parametric normal distribution with zones and highlighting
- `GaltonBoard` - Animated ball drop with histogram building
- `HistogramToCurve` - 4-phase transition from bars to smooth curve
- `MagnetCoilDemo` - Interactive magnet movement through coil
- `FluxDemo` - Magnetic flux calculator with angle/field controls

**Utilities:**
- `sound-system.ts` - Web Audio API for UI sound effects (drop, correct, wrong, reveal, click)

### Known Issues
- ⚠️ **Slider visual update bug**: On Normal Distribution cards 3-4, sliders update state correctly and trigger recalculations, but the BellCurve SVG doesn't visually re-render. Console logs show proper updates. Needs further investigation.

### Next Steps
- 🔧 Fix BellCurve SVG re-rendering issue
- 🔄 Build instructor course creation interface
- ⏳ Implement authentication system (NextAuth)
- ⏳ Develop student enrollment and progress tracking
- ⏳ Use demo courses for instructor pitches

## Development Phases

### Phase 1: Foundation (MVP Core) ✅ COMPLETE
- [x] Project documentation
- [x] Next.js + TypeScript setup
- [x] Tailwind CSS + shadcw/ui
- [x] Database setup (Prisma + PostgreSQL)
- [x] Basic UI layout and routing
- [x] Interactive demo courses (2 complete)
- [x] Reusable lesson component architecture
- [x] Visualization framework (SVG-based)
- [x] Sound system integration
- [x] Math rendering (KaTeX)
- [ ] Authentication (NextAuth with email verification) - Next phase

### Phase 2: Instructor Features
- [ ] Instructor dashboard
- [ ] Course creation and management
- [ ] Section/lesson builder
- [ ] Rich text editor for content
- [ ] YouTube video embedding
- [ ] Image/PDF upload
- [ ] Course preview

### Phase 3: Student Features
- [ ] Course catalog/marketplace
- [ ] Course detail pages
- [ ] Enrollment system
- [ ] Lesson viewer
- [ ] Progress tracking
- [ ] Student dashboard

### Phase 4: Assessment Engine
- [ ] Assessment creation interface
- [ ] Question builder (MC, short answer, essay, file upload)
- [ ] Student test-taking interface
- [ ] Auto-grading for fixed answers
- [ ] Manual grading interface
- [ ] Grade book view

### Phase 5: Payments
- [ ] Stripe integration setup
- [ ] Per-course subscription checkout
- [ ] Stripe Connect for instructors
- [ ] Revenue split automation
- [ ] Subscription management
- [ ] Billing dashboard
- [ ] Refund handling

### Phase 6: Polish & Launch Prep
- [ ] Analytics dashboards (instructor, student, admin)
- [ ] Email notifications (enrollment, assignments, grades)
- [ ] Responsive design audit
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Testing (unit, integration, e2e)
- [ ] Documentation

### Post-Launch Features
- [ ] AI instructor content assistant
- [ ] AI essay grading
- [ ] Discussion forums per course
- [ ] Gamification (badges, achievements, leaderboards)
- [ ] Advanced analytics
- [ ] Live class scheduling
- [ ] Mobile apps
- [ ] Self-hosted video

## Key Technical Decisions

### Why Next.js App Router?
- Server components for better performance
- Built-in API routes
- Great SEO out of the box
- Excellent developer experience
- Easy deployment to Vercel

### Why Prisma?
- Type-safe database access
- Excellent TypeScript support
- Easy migrations
- Great documentation

### Why Stripe?
- Industry standard for education platforms
- Stripe Connect handles revenue splits
- Excellent subscription management
- Strong fraud protection
- Easy refund handling

### Why PostgreSQL?
- Relational data structure fits our needs
- Strong ACID guarantees for payments
- JSON support for flexible content
- Excellent performance
- Wide hosting options

## Accessibility Requirements

Must meet WCAG 2.1 Level AA standards:
- Color contrast ratios (4.5:1 for normal text, 3:1 for large)
- Keyboard navigation support
- Screen reader compatibility
- Semantic HTML
- Form labels and validation
- Mobile responsive (44x44px touch targets)
- Alt text for images
- Video captions (YouTube's auto-captions)

## Security Considerations

- Password hashing (bcrypt)
- JWT for session management
- CSRF protection
- Rate limiting on auth endpoints
- Input validation and sanitization
- SQL injection prevention (Prisma handles)
- XSS prevention
- Secure file upload validation
- PCI compliance (Stripe handles)
- Data encryption at rest and in transit

## Example Courses for Instructor Pitches

**Status:** ✅ Two fully interactive demo courses built and deployed.

### Built Demo Courses

**1. ✅ Normal Distribution: Interactive Journey** (Statistics - FREE)
- **Target:** A-Level / AP Statistics students
- **Format:** 10 interactive cards with progressive learning
- **Route:** `/courses/statistics-normal-distribution`
- **Features demonstrated:**
  - Interactive simulations (Galton board with ball physics)
  - Real-time visualizations that respond to user input
  - Progressive disclosure (reveal boxes)
  - Multiple choice quizzes with instant feedback
  - Mathematical notation rendering (KaTeX)
  - Sound effects for engagement
  - Progress tracking across cards
  - Clean, modern dark theme
- **Cards:**
  1. Galton Board (ball drop simulation)
  2. Histogram to Curve (animated transition)
  3. Mean Explorer (interactive μ slider)
  4. Sigma Explorer (interactive σ slider)
  5. 68-95-99.7 Rule (zone visualization)
  6. Reading the Curve (practice problems)
  7. Z-Scores (live calculator)
  8. Comparing Distributions (z-score comparison)
  9. Real World Examples
  10. Final Challenge Quiz

**2. ✅ Electromagnetic Induction** (Physics - FREE)
- **Target:** A-Level Physics students
- **Format:** 7 interactive cards covering Faraday's and Lenz's Laws
- **Route:** `/courses/physics-electromagnetic-induction-v2`
- **Features demonstrated:**
  - Physics simulations (moving magnet through coil)
  - Real-time calculations (flux, EMF)
  - Interactive parameter controls
  - Step-by-step concept building
  - Mathematical formulas with visual explanations
- **Cards:**
  1. Introduction to EM Induction
  2. Faraday's Discovery (magnet/coil demo)
  3. Magnetic Flux (φ = B·A·cos(θ))
  4. Faraday's Law (ε = -N·dφ/dt)
  5. Lenz's Law (direction of current)
  6. Practice Problems
  7. Real-World Applications

**3. A-Level Electromagnetic Induction Mastery** (Paid - £29.99)
- Listed on catalog, not yet built
- 24 lessons planned for full course
- Shows pricing model and course card design

### Future Course Ideas

**Algebra 1: Mastering Linear Equations** (Math)
- Target: 9th-10th grade
- Interactive graphing tools
- Step-by-step equation solving
- Real-world word problems

**Cell Structure & Function** (Biology)
- Target: 9th-10th grade
- Labeled diagrams with zoom
- 3D cell models
- Microscopy simulations

**Essay Writing Fundamentals** (English)
- Target: 9th-12th grade
- Annotated examples
- Rubric builders
- Peer review system

### What We've Proven

**Technical Capabilities:**
✅ Complex interactive visualizations with real physics/math
✅ Smooth animations and transitions
✅ Progressive learning paths with navigation
✅ Instant feedback systems
✅ Mobile-responsive design
✅ Professional UI/UX polish
✅ Sound design for engagement
✅ Mathematical notation rendering

**For Instructor Pitches:**
1. **Visual Impact:** The demos are impressive and engaging
2. **Professional Quality:** Production-ready appearance
3. **Engagement:** Interactive elements keep students active
4. **Flexibility:** Can adapt this framework to any subject
5. **Modern Tech:** Fast, responsive, works on all devices

### Next Demo Priorities

If expanding demos before building backend:
1. Add a humanities/English course to show versatility
2. Add a calculator-based math course (algebra/calculus)
3. Show different content types (video embeds, PDFs, etc.)

## MVP Success Metrics

- 5-10 instructors onboarded
- 3-5 courses published
- 50+ student enrollments
- 80%+ course completion rate
- <2s page load time
- 100% WCAG 2.1 AA compliance
- 99.9% uptime

## Future Considerations

- Multi-language support (i18n)
- Mobile native apps (React Native)
- API for third-party integrations
- Webhook system for extensibility
- Advanced analytics (learning patterns, predictive success)
- Content recommendation engine
- Peer-to-peer learning features
- Parent/guardian accounts
- School district partnerships
- White-label platform for schools

## Troubleshooting

### BellCurve Slider Issue (UNRESOLVED)

**Problem:** In Normal Distribution course cards 3-4, sliders update state and trigger recalculations, but the curve doesn't visually update.

**Evidence:**
- Console logs show: "Mu updated to: X", "BellCurve recalculating with mu: X sigma: X"
- State is updating correctly
- useMemo dependencies are correct
- SVG path data is recalculating
- Adding `key={`${mu}-${sigma}`}` to SVG forces re-render but doesn't fix

**Attempted Fixes:**
1. ✗ Added `useMemo` to BellCurve calculations
2. ✗ Added `key` prop to BellCurve component
3. ✗ Added `key` prop to SVG element
4. ✗ Changed cards array to use render functions instead of JSX elements
5. ✗ Added `key={currentCard}` to LessonContainer card wrapper

**Hypothesis:**
- Possible Next.js SSR/hydration issue
- Could be SVG DOM update quirk in React
- Might need to force re-mount entire component
- May need to use `useEffect` + DOM manipulation

**Next Steps to Try:**
- Test in dev mode vs production build
- Try `forceUpdate` or ref-based SVG updates
- Check if issue exists in other browsers
- Simplify BellCurve to minimal reproduction
- Use canvas instead of SVG

## Notes

- Start simple, iterate based on real instructor feedback
- Focus on instructor experience first - they create the value
- Students will come if instructors are happy
- AI features are differentiators but come after core functionality works
- Keep course creation as simple as possible while being powerful
- Mobile-first design (most students use phones)
- Interactive demos are powerful sales tools - invest in polish
