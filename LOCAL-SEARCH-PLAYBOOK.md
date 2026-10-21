# Google Business Profile and review playbook

This is the practical, low-volume routine for Kinetic Axis. It is deliberately small enough to run alongside delivery. The aim is not to chase a vanity rating; it is to be visible when someone nearby searches for a software developer, web developer or app developer and to make it easy for real clients to leave a review.

## What only you can do

These steps need the Google account that will own the profile. An agent cannot create or verify it on your behalf.

1. Claim or create the profile at <https://business.google.com>.
2. Complete verification (video, postcard or phone, depending on what Google offers).
3. Send the live profile URL (the `https://g.page/...` or Maps link) so it can be added to the site's `sameAs` schema, footer and review-request templates.
4. Decide who will receive review notifications and reply to reviews.

## Profile setup

### Name and category

- **Business name:** Kinetic Axis (no keyword stuffing; Google can suspend profiles that add location or service keywords to the name).
- **Primary category:** Software company. If most enquiries are website-led, test Website designer as the primary and Software company as secondary; the primary category has the strongest influence on which searches the profile can appear in.
- **Secondary categories:** Website designer, Web developer, App developer, Software development agency, Internet marketing service only if you genuinely offer it.
- **Service areas:** Coventry, Birmingham, Warwickshire, Leamington Spa, Nuneaton, Rugby, Solihull, Warwick. Do not add areas you will not serve.

### Contact details

- Use the same phone number, email and address/ service-area settings as the website.
- Website: `https://kineticaxisdigital.com/`.
- Add the contact page and project estimator as appointment/ booking links if the profile type supports them.
- Keep opening hours realistic. If you do not answer the phone during delivery blocks, set the hours you will actually respond.

### Description

Use plain language and the services you actually deliver. A starting point:

> Independent digital design and software studio in Warwickshire. We design and build websites, web applications, customer portals, internal business systems, mobile products and API integrations. Work is led by Carl Fearby, a JavaScript and web engineer with 30+ years of hands-on experience. We work with organisations across Coventry, Birmingham and Warwickshire.

Do not claim client numbers, sectors or awards you cannot evidence.

### Services

Add each service with a short description and a link to the matching page:

- Website design and development — `/web-design`
- Web application development — `/web-app-development`
- Bespoke software development — `/bespoke-software-development`
- Business software and internal systems — `/business-software-development`
- Customer portal development — `/customer-portal-development`
- Mobile app development — `/mobile-app-development`
- API and systems integration — `/api-systems-integration`
- Software development in Coventry — `/software-development-coventry`

### Photos

- Exterior/ studio sign only if there is a real one.
- Team photo with consent.
- Work-in-progress or desk setup that is genuinely yours.
- Project imagery only where the client has agreed to public use.
- Avoid stock photos and AI-generated images; they undermine trust and can look like a different business.

### Questions and answers

Seed the Q&A with real questions you already hear. Answer them yourself if Google allows the owner to post Q&A:

- Do you work with clients outside Coventry and Warwickshire? Yes, across the UK, with remote discovery and delivery.
- Can you take over an existing codebase? Yes, after a technical review.
- Do you build mobile apps as well as websites? Yes, where a mobile experience is the right fit.
- How do I get an estimate? Use the project estimator for a planning range, then a scoped conversation.

## Weekly routine (30–45 minutes)

| Day | Action |
| --- | --- |
| Monday | Check calls, messages, direction requests and new reviews. Reply to anything unanswered. |
| Tuesday | Publish one Google post: a project lesson, a service explanation or a link to a new guide. |
| Wednesday | Send up to two review requests to recent completed work. |
| Thursday | Add one photo or update a service description if there is something real to add. |
| Friday | Review the week's insights: calls, website clicks, searches, direction requests. Record the numbers. |

Do not post every day for the sake of it. One useful post a week is better than five generic ones.

## Review request process

### Who to ask

Ask after a genuine success: a launch, a successful migration, a measurable operational improvement or a smooth support period. Do not ask during a dispute, before handover or in the same message as an invoice.

### How to ask

1. Ask in person or on the final call: "If the project has been useful, would you be comfortable leaving a short review? It genuinely helps other local businesses find us."
2. Send the review request email within 48 hours with the direct review link.
3. Send one reminder after 5–7 days. Do not send a third.
4. Never offer a discount, gift, prize or entry into a draw for a review.
5. Never filter out unhappy clients or ask only for positive reviews. Google prohibits review gating.
6. Never write, edit or translate a review for a client.

### What to do with the review

- Reply within seven days.
- Thank them specifically for what they mentioned; do not paste the same reply every time.
- For a critical review, acknowledge the issue, avoid disclosing confidential project detail and move the conversation offline: "We're sorry this fell short. We'd like to understand what happened and put it right — please email hello@kineticaxisdigital.co.uk."
- Do not argue, identify the client publicly or imply the review is fake.

### Measurement

Track monthly in a simple sheet:

- Profile views
- Searches for the business name vs. category searches
- Calls
- Website clicks
- Direction requests
- New reviews and average rating
- Enquiries that mention Google or the profile (add a "How did you hear about us?" field or ask on the first call)

The review count matters less than whether the profile is producing real conversations. A profile with 8 specific, recent reviews and a completed service list will usually outperform one with 50 old reviews and no activity.

## On-site changes to make once the profile URL exists

1. Add the profile URL to the Organization `sameAs` array in `src/content/page-meta.json` (home entry).
2. Add it to the footer social links if it is a public profile link.
3. Optionally add a short "Leave a review" link on the thank-you page or in the post-project email — not as a pop-up.
4. Do not add `AggregateRating` or `Review` schema for Google reviews on your own site. Self-serving review markup can trigger a manual action and does not guarantee rich results. Link to the profile instead.
5. Add a review request template with the real link to your email system; do not hard-code a placeholder in production.

## Compliance notes

- **UK GDPR/PECR:** only email clients who have a legitimate existing relationship, keep a record of the request, and make it easy to opt out of future requests.
- **Google policy:** no incentives, no review gating, no fake reviews, no bulk review requests, no asking staff or family to review as clients.
- **Testimonials:** if you quote a client on the site, get written permission and keep the quote accurate and in context.

## First 30 days

- Week 1: claim/verify, complete name, category, description, hours, phone, website and services.
- Week 2: add 5–10 real photos, seed 4 Q&A entries, publish the first post.
- Week 3: send review requests to the last 3–5 completed projects (one email each, no bulk).
- Week 4: reply to all reviews, publish a second post, record the baseline metrics.
- Month 2 onward: one post a week, two review requests a week, monthly metrics review.
