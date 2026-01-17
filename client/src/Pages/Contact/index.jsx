import { useState } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import './contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            toast.error('Please fill in all required fields', {
                position: 'bottom-center'
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address', {
                position: 'bottom-center'
            });
            return;
        }

        setLoading(true);

        try {

            const serviceId = 'service_ampk6g8'; 
            const templateId = 'template_l0g27xb'; 
            const publicKey = 'kLFTTqwqMDo1RezbQ'; 

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                address: formData.address,
                message: formData.message || 'No additional message',
                to_email_1: 'contactzabirabdullah@gmail.com',
                to_email_2: 'ali.azgor0810@gmail.com'
            };

            // Send email using EmailJS
            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            toast.success('Message sent successfully! We will get back to you soon.', {
                position: 'top-center',
                autoClose: 3000
            });

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                message: ''
            });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again later.', {
                position: 'bottom-center',
                autoClose: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
                </div>
            </div>

            <div className="container contact-container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="contact-info-section">
                            <h2>Get In Touch</h2>
                            <p className="contact-intro">
                                Have a question or need assistance? Fill out the form and our team will get back to you within 24 hours.
                            </p>

                            <div className="contact-details">
                                <div className="contact-detail-item">
                                    <div className="icon-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>contactzabirabdullah@gmail.com</p>
                                        <p>ali.azgor0810@gmail.com</p>
                                    </div>
                                </div>

                                <div className="contact-detail-item">
                                    <div className="icon-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Location</h4>
                                        <p>E-mart Store</p>
                                        <p>Your City, Your Country</p>
                                    </div>
                                </div>

                                <div className="contact-detail-item">
                                    <div className="icon-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                                            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>Available 24/7</p>
                                        <p>Customer Support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="contact-form-section">
                            <h2>Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 234 567 8900"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Address <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Your full address"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message (Optional)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your inquiry..."
                                        rows="4"
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="submit-spinner"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                                            </svg>
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
