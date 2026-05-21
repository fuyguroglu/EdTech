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

### Project Structure
```
/app                    - Next.js App Router pages
  /courses              - Course catalog page
  layout.tsx            - Root layout with Navbar/Footer
  page.tsx              - Homepage
/components
  /ui                   - shadcn/ui components
  navbar.tsx            - Main navigation
  footer.tsx            - Site footer
/lib
  /generated/prisma     - Generated Prisma Client
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

**Phase 1 Complete** - Foundation is fully set up and ready for feature development.

### Completed
- ✅ Next.js 14+ with TypeScript and App Router
- ✅ Tailwind CSS v4 configured and working
- ✅ shadcn/ui component library integrated
- ✅ PostgreSQL database schema designed
- ✅ Prisma ORM configured (v7 with adapter-based setup)
- ✅ Professional UI layout (Navbar, Footer, Homepage)
- ✅ Responsive design with modern styling
- ✅ Git repository with GitHub integration
- ✅ Build pipeline verified

### Next Steps
- 🔄 Create example course mockups for instructor pitches
- ⏳ Build instructor course creation interface
- ⏳ Implement authentication system
- ⏳ Develop student course viewing experience

## Development Phases

### Phase 1: Foundation (MVP Core) ✅ COMPLETE
- [x] Project documentation
- [x] Next.js + TypeScript setup
- [x] Tailwind CSS + shadcn/ui
- [x] Database setup (Prisma + PostgreSQL)
- [x] Basic UI layout and routing
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

**Approach:** Create visual mockups first (no backend functionality required), then evolve into working examples.

### Proposed Example Courses

**1. Algebra 1: Mastering Linear Equations** (Math)
- Target: 9th-10th grade
- 4 sections, 12-15 lessons total
- Features to showcase:
  - YouTube video embeds (Khan Academy style explanations)
  - Step-by-step problem solving with visual aids
  - Multiple choice quizzes with instant feedback
  - Short answer practice problems
  - Progress tracking dashboard

**2. Biology: Cell Structure & Function** (Science)
- Target: 9th-10th grade
- 3 sections, 10-12 lessons
- Features to showcase:
  - Detailed diagrams and labeled images
  - Video microscopy footage
  - True/false quick checks
  - Essay questions about experimental design
  - Visual progress indicators

**3. Essay Writing Fundamentals** (English)
- Target: 9th-12th grade
- 5 sections, 15 lessons
- Features to showcase:
  - Sample essays with annotations
  - Writing prompts and exercises
  - Rubric examples
  - File upload for essay submissions
  - Instructor feedback interface (manual grading)

### Mockup Strategy

**Phase 1: Static Mockups** (Current Priority)
- Create polished course detail pages
- Design lesson viewer interface
- Mock up quiz/assessment taking experience
- Show instructor dashboard with analytics
- Demonstrate student progress view

**Phase 2: Interactive Demo** (After instructor feedback)
- Seed database with example course data
- Build functional course viewer
- Enable quiz taking (client-side only)
- Add basic progress tracking

**Phase 3: Full Implementation** (Production)
- Complete backend integration
- Real authentication and enrollment
- Stripe payment integration
- Full instructor course builder

### Key Selling Points to Highlight

1. **Ease of Creation:** Show how simple it is to add content
2. **Professional Appearance:** Modern, clean, student-friendly design
3. **Engagement Tools:** Quizzes, videos, progress tracking
4. **Revenue Potential:** Clear analytics showing student engagement
5. **AI Assistance (Future):** Tease upcoming features for content creation and grading

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

## Notes

- Start simple, iterate based on real instructor feedback
- Focus on instructor experience first - they create the value
- Students will come if instructors are happy
- AI features are differentiators but come after core functionality works
- Keep course creation as simple as possible while being powerful
- Mobile-first design (most students use phones)
