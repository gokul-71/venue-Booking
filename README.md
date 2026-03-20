# CorpVenue - Corporate Venue Booking Platform

CorpVenue is a web-based platform designed to streamline the process of booking venues for corporate events. It connects corporate clients with venue owners, ensuring a trusted environment for professional gatherings.

## Project Structure

The project is built using vanilla HTML, CSS, and JavaScript, with a focus on a clean, corporate design system.

### Core Technologies
- **HTML5:** Semantic markup for structure.
- **CSS3:** Custom styling with CSS variables for theming (located in `css/style.css`).
  - **Theme:** Dark Blue/Charcoal primary, Corporate Blue accent.
  - **Layout:** Flexbox and CSS Grid.
- **JavaScript:** Vanilla JS for frontend interactivity (located in `js/main.js`).

### User Roles & Key Files

#### 1. Regular User (Corporate Client)
- **Goal:** Search, book, and manage event venues.
- **Key Pages:**
  - `index.html`: Landing page with venue search.
  - `user_listing.html`: Search results and venue filtering.
  - `user_details.html`: Detailed view of a specific venue.
  - `user_booking_request.html`: Form to request a booking.
  - `user_dashboard.html`: Manage bookings, view history and invoices.
  - `user_payment_advance.html`: Process payments.

#### 2. Venue Owner
- **Goal:** List venues and manage bookings.
- **Key Pages:**
  - `owner_dashboard.html`: Overview of venue performance.
  - `owner_manage_venue.html`: Add or edit venue listings.
  - `owner_bookings.html`: Approve or reject booking requests.
  - `owner_invoices.html`: Track earnings and invoices.

#### 3. Administrator
- **Goal:** Oversee the platform, approve users/venues, and resolve disputes.
- **Key Pages:**
  - `admin_dashboard.html`: Platform-wide statistics.
  - `admin_approvals.html`: Approve new venue listings or user accounts.
  - `admin_users_owners.html`: Manage user and owner accounts.
  - `admin_disputes.html`: Handle reported issues.

### Booking Workflow
1. **Search:** User searches for a venue by city, date, and capacity.
2. **Request:** User sends a booking request for a specific venue.
3. **Approval:** Venue Owner receives the request and approves or rejects it.
4. **Payment:** Upon approval, User pays an advance to confirm the booking.
5. **Confirmation:** Booking is confirmed, and the event is scheduled.

## Getting Started
Simply open `index.html` in your browser to start exploring the application.
