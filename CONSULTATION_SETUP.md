# Book Consultation Page Setup

## Overview
The Book Consultation page provides clients with multiple ways to schedule appointments with Gravixel Attires tailors. It includes both a form-based booking system and Calendly integration for real-time scheduling.

## Features
- ✅ **Clean, Minimalist Design** matching your blog aesthetic
- ✅ **Comprehensive Booking Form** with all requested fields
- ✅ **Email Notifications** to both business and client
- ✅ **Calendly Integration** for real-time scheduling
- ✅ **Mobile Responsive** design
- ✅ **Form Validation** and error handling
- ✅ **Success/Error Messages** with proper feedback

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in your project root with these variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@gravixelattires.com
CONSULTATION_EMAIL=consultations@gravixelattires.com

# Calendly Integration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-calendly-url
```

### 2. Email Setup (Gmail Example)
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" in your Google Account settings
3. Use your Gmail address as `SMTP_USER`
4. Use the generated app password as `SMTP_PASS`

### 3. Calendly Integration
1. Create a Calendly account at [calendly.com](https://calendly.com)
2. Set up your availability and consultation types
3. Get your Calendly scheduling URL
4. Replace the iframe src in `/book-consultation/page.tsx`:
   ```jsx
   <iframe
     src={process.env.NEXT_PUBLIC_CALENDLY_URL}
     width="100%"
     height="630"
     frameBorder="0"
     title="Book Consultation"
   ></iframe>
   ```

### 4. Database Integration (Optional)
To store consultation requests in a database, implement the `saveConsultationToDatabase` function in `/api/book-consultation/route.ts`:

```typescript
// Example with Prisma
async function saveConsultationToDatabase(data: ConsultationData) {
  const consultation = await prisma.consultation.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      preferredDate: new Date(data.preferredDate),
      preferredTime: data.preferredTime,
      consultationType: data.consultationType,
      additionalNotes: data.additionalNotes,
      status: 'pending'
    }
  });
  return consultation;
}
```

## File Structure
```
src/
├── app/
│   ├── book-consultation/
│   │   ├── page.tsx                 # Main consultation booking page
│   │   └── book-consultation.css    # Styling matching blog design
│   └── api/
│       └── book-consultation/
│           └── route.ts             # API route for form submission
└── .env.example                     # Environment variables template
```

## Form Fields
- ✅ Full Name (required)
- ✅ Email Address (required)
- ✅ Phone Number (required)
- ✅ Preferred Date (required, minimum tomorrow)
- ✅ Preferred Time (required, business hours)
- ✅ Type of Consultation (required dropdown):
  - Bridal Wear
  - Formal Wear
  - Casual/Everyday
  - Other
- ✅ Additional Notes (optional textarea)

## Email Templates
The system sends two emails:
1. **Business Notification**: Detailed consultation request with client info
2. **Client Confirmation**: Professional confirmation with next steps

## Responsive Design
- **Desktop**: Two-column layout with integrated calendar
- **Tablet**: Single column with optimized spacing
- **Mobile**: Stacked layout with touch-friendly inputs

## Integration Points
1. **Homepage CTA**: Update your homepage "Book Consultation" button to link to `/book-consultation`
2. **Navigation**: Add link to main navigation menu
3. **Contact Page**: Cross-reference with contact information

## Testing
1. Fill out the form with test data
2. Check email delivery (both business and client emails)
3. Test Calendly integration
4. Verify mobile responsiveness
5. Test form validation with missing/invalid data

## Customization
- **Colors**: Already matching your `#312f2f` theme
- **Typography**: Using Jost font family consistently
- **Content**: Update contact information and business hours
- **Services**: Modify consultation types in the dropdown
- **Styling**: All CSS follows your minimalist blog design

## Support
The page is now accessible at `/book-consultation` and ready for production use. All styling matches your established design system.
