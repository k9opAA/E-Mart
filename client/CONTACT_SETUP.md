# Contact Form Email Setup Instructions

The Contact page uses EmailJS to send emails to the specified addresses. Follow these steps to set it up:

## 1. Install EmailJS Package

The package should already be installed. If not, run:
```bash
npm install @emailjs/browser
```

## 2. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 3. Set Up Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions to connect your Gmail account
5. Note the **Service ID** (you'll need this later)

## 4. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

**Template Name:** E-mart Contact Form

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
You have received a new message from the E-mart contact form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Address: {{address}}

Message:
{{message}}

---
This email was sent from the E-mart contact form.
```

4. In the **To Email** field, you can use a comma-separated list:
   ```
   contactzabirabdullah@gmail.com, ali.azgor0810@gmail.com
   ```

5. Save the template and note the **Template ID**

## 5. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
3. Copy this key

## 6. Update the Contact Component

Open `src/Pages/Contact/index.jsx` and replace these values around line 46-48:

```javascript
const serviceId = 'YOUR_SERVICE_ID';      // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';    // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY';      // Replace with your Public Key
```

## 7. Test the Contact Form

1. Run your application
2. Navigate to the Contact page
3. Fill out the form
4. Click "Send Message"
5. Check both email addresses for the message

## EmailJS Free Plan Limits

- 200 emails per month
- Perfect for testing and small-scale use
- Upgrade available if needed

## Troubleshooting

### Emails not sending?
- Check that all IDs and keys are correct
- Verify your email service is properly connected
- Check EmailJS dashboard for error logs
- Make sure your account is verified

### Want to test without EmailJS?
You can temporarily comment out the EmailJS code and just show a success message to test the UI.

## Alternative: Backend Email Service

If you prefer to handle emails on the backend instead:

1. Create a backend API endpoint (e.g., `/api/contact`)
2. Use NodeMailer or similar library on the backend
3. Update the Contact component to call your API instead of EmailJS

Example backend route:
```javascript
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, address, message } = req.body;
    
    // Use NodeMailer to send email
    // Send to both recipients
    
    res.json({ success: true });
});
```

Then update the Contact component's handleSubmit to call your backend API instead.
