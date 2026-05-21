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

### Frontend
- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (accessible, professional)
- **State Management:** React Query for server state
- **Forms:** React Hook Form with Zod validation

### Backend
- **Runtime:** Node.js
- **Framework:** Next.js API Routes (scalable to Express if needed)
- **Database:** PostgreSQL
- **ORM:** Prisma (type-safe)
- **Authentication:** NextAuth.js with email verification
- **File Storage:** AWS S3 or Cloudflare R2

### Payments & Infrastructure
- **Payment Processing:** Stripe (subscriptions + Connect for revenue splits)
- **Hosting:** Vercel
- **Database Hosting:** Supabase or Neon
- **Email:** SendGrid or Resend

### AI Integration (Phase 2+)
- **Content Assistant:** Anthropic Claude API
- **Essay Grading:** OpenAI GPT-4 or Claude
- **Content Suggestions:** RAG with course content

## Database Schema

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

## Development Phases

### Phase 1: Foundation (MVP Core)
- [x] Project documentation
- [ ] Next.js + TypeScript setup
- [ ] Tailwind CSS + shadcn/ui
- [ ] Database setup (Prisma + PostgreSQL)
- [ ] Authentication (NextAuth with email verification)
- [ ] Basic UI layout and routing

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

*To be created after MVP foundation is built*

Example courses to demonstrate platform capabilities:
1. **Math - Algebra 1:** Interactive problem sets, video explanations
2. **Science - Biology:** Visual diagrams, lab simulations, quizzes
3. **English - Essay Writing:** Sample essays, rubrics, peer review features
4. **History - World War II:** Timeline visualizations, primary source analysis

Each example should showcase:
- Rich multimedia content
- Various assessment types
- Student engagement features
- Progress tracking
- Instructor dashboard capabilities

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
