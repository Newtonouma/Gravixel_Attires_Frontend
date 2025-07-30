import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ConsultationData {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  additionalNotes: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationData = await request.json();
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'preferredDate', 'preferredTime', 'consultationType'];
    const missingFields = requiredFields.filter(field => !data[field as keyof ConsultationData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Create email transporter (configure with your email provider)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Format consultation type for display
    const consultationTypeLabels: { [key: string]: string } = {
      'bridal-wear': 'Bridal Wear',
      'formal-wear': 'Formal Wear',
      'casual-everyday': 'Casual/Everyday',
      'other': 'Other'
    };

    const consultationTypeDisplay = consultationTypeLabels[data.consultationType] || data.consultationType;

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@gravixelattires.com',
      to: process.env.CONSULTATION_EMAIL || 'consultations@gravixelattires.com',
      subject: `New Consultation Request - ${data.fullName}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #312f2f; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Consultation Request</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #eee;">
            <h2 style="color: #312f2f; margin-top: 0;">Client Information</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; color: #312f2f;">Full Name:</td>
                <td style="padding: 10px 0;">${data.fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; color: #312f2f;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; color: #312f2f;">Phone:</td>
                <td style="padding: 10px 0;"><a href="tel:${data.phone}">${data.phone}</a></td>
              </tr>
            </table>

            <h2 style="color: #312f2f; margin-top: 30px;">Consultation Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; color: #312f2f;">Type:</td>
                <td style="padding: 10px 0;">${consultationTypeDisplay}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; color: #312f2f;">Preferred Date:</td>
                <td style="padding: 10px 0;">${new Date(data.preferredDate).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; color: #312f2f;">Preferred Time:</td>
                <td style="padding: 10px 0;">${data.preferredTime}</td>
              </tr>
            </table>

            ${data.additionalNotes ? `
              <h2 style="color: #312f2f; margin-top: 30px;">Additional Notes</h2>
              <div style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                ${data.additionalNotes.replace(/\n/g, '<br>')}
              </div>
            ` : ''}

            <div style="background: #312f2f; color: white; padding: 15px; margin-top: 30px; text-align: center;">
              <p style="margin: 0;">Please contact the client within 24 hours to confirm the consultation.</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send email to business
    await transporter.sendMail(mailOptions);

    // Send confirmation email to client
    const clientMailOptions = {
      from: process.env.SMTP_FROM || 'noreply@gravixelattires.com',
      to: data.email,
      subject: 'Consultation Request Received - Gravixel Attires',
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #312f2f; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Gravixel Attires</h1>
            <p style="margin: 10px 0 0 0;">Consultation Request Confirmed</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #eee;">
            <h2 style="color: #312f2f; margin-top: 0;">Dear ${data.fullName},</h2>
            
            <p>Thank you for booking a consultation with Gravixel Attires! We're excited to help you create your perfect attire.</p>
            
            <h3 style="color: #312f2f;">Your Consultation Details:</h3>
            <ul style="line-height: 1.6;">
              <li><strong>Type:</strong> ${consultationTypeDisplay}</li>
              <li><strong>Requested Date:</strong> ${new Date(data.preferredDate).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</li>
              <li><strong>Requested Time:</strong> ${data.preferredTime}</li>
            </ul>
            
            <h3 style="color: #312f2f;">What's Next?</h3>
            <p>Our team will contact you within 24 hours to:</p>
            <ul style="line-height: 1.6;">
              <li>Confirm your appointment time</li>
              <li>Provide our studio address and directions</li>
              <li>Share any preparation tips for your consultation</li>
            </ul>
            
            <div style="background: white; padding: 20px; border: 1px solid #ddd; margin: 20px 0;">
              <h4 style="color: #312f2f; margin-top: 0;">Contact Information</h4>
              <p style="margin: 5px 0;"><strong>Phone:</strong> +254 700 000 000</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> info@gravixelattires.com</p>
              <p style="margin: 5px 0;"><strong>Address:</strong> 123 Fashion Street, Nairobi, Kenya</p>
            </div>
            
            <p>We look forward to meeting you and bringing your vision to life!</p>
            
            <p style="margin-bottom: 0;"><strong>Best regards,</strong><br>The Gravixel Attires Team</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(clientMailOptions);

    // Here you could also save to database
    // await saveConsultationToDatabase(data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consultation request submitted successfully. We will contact you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing consultation request:', error);
    return NextResponse.json(
      { error: 'Failed to process consultation request. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: Database saving function
// async function saveConsultationToDatabase(data: ConsultationData) {
//   // Implement your database logic here
//   // Example with Prisma, MongoDB, or your preferred database
// }
