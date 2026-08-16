// Email Service - Mock implementation for demonstration
// In production, this would integrate with a backend email service like SendGrid, Mailgun, or AWS SES

export class EmailService {
  constructor() {
    this.emailQueue = JSON.parse(localStorage.getItem('emailQueue')) || []
  }

  // Queue email for sending (in production, this would send via API)
  queueEmail(to, subject, template, data) {
    const email = {
      id: Date.now(),
      to,
      subject,
      template,
      data,
      status: 'queued',
      timestamp: new Date().toISOString(),
    }

    this.emailQueue.push(email)
    localStorage.setItem('emailQueue', JSON.stringify(this.emailQueue))

    // Simulate sending email
    setTimeout(() => {
      this.sendEmail(email.id)
    }, 1000)

    return email
  }

  // Send email (mock implementation)
  async sendEmail(emailId) {
    const emailIndex = this.emailQueue.findIndex(e => e.id === emailId)
    if (emailIndex === -1) return

    this.emailQueue[emailIndex].status = 'sent'
    this.emailQueue[emailIndex].sentAt = new Date().toISOString()
    localStorage.setItem('emailQueue', JSON.stringify(this.emailQueue))

    console.log(`Email sent to ${this.emailQueue[emailIndex].to}: ${this.emailQueue[emailIndex].subject}`)
  }

  // Order confirmation email
  sendOrderConfirmation(orderDetails) {
    const template = 'order-confirmation'
    const subject = `Order Confirmation - ${orderDetails.orderId}`
    const data = {
      orderId: orderDetails.orderId,
      customerName: orderDetails.customerName,
      items: orderDetails.items,
      total: orderDetails.total,
      shippingAddress: orderDetails.shippingAddress,
      estimatedDelivery: orderDetails.estimatedDelivery,
    }

    return this.queueEmail(orderDetails.customerEmail, subject, template, data)
  }

  // Shipping confirmation email
  sendShippingConfirmation(orderDetails, trackingNumber) {
    const template = 'shipping-confirmation'
    const subject = `Your Order Has Been Shipped - ${orderDetails.orderId}`
    const data = {
      orderId: orderDetails.orderId,
      customerName: orderDetails.customerName,
      trackingNumber,
      carrier: orderDetails.carrier,
      estimatedDelivery: orderDetails.estimatedDelivery,
    }

    return this.queueEmail(orderDetails.customerEmail, subject, template, data)
  }

  // Delivery confirmation email
  sendDeliveryConfirmation(orderDetails) {
    const template = 'delivery-confirmation'
    const subject = `Order Delivered - ${orderDetails.orderId}`
    const data = {
      orderId: orderDetails.orderId,
      customerName: orderDetails.customerName,
      deliveryDate: new Date().toISOString(),
    }

    return this.queueEmail(orderDetails.customerEmail, subject, template, data)
  }

  // Welcome email
  sendWelcomeEmail(userDetails) {
    const template = 'welcome'
    const subject = 'Welcome to ShopSphere!'
    const data = {
      customerName: userDetails.name,
      email: userDetails.email,
    }

    return this.queueEmail(userDetails.email, subject, template, data)
  }

  // Password reset email
  sendPasswordReset(email, resetToken) {
    const template = 'password-reset'
    const subject = 'Reset Your Password'
    const data = {
      resetLink: `${window.location.origin}/reset-password?token=${resetToken}`,
    }

    return this.queueEmail(email, subject, template, data)
  }

  // Newsletter subscription
  sendNewsletterConfirmation(email) {
    const template = 'newsletter-confirmation'
    const subject = 'Welcome to Our Newsletter'
    const data = {
      email,
    }

    return this.queueEmail(email, subject, template, data)
  }

  // Promotional email
  sendPromotionalEmail(emails, promotionDetails) {
    const template = 'promotion'
    const subject = promotionDetails.subject
    const data = {
      promotionCode: promotionDetails.code,
      discount: promotionDetails.discount,
      validUntil: promotionDetails.validUntil,
    }

    return emails.map(email => 
      this.queueEmail(email, subject, template, data)
    )
  }

  // Get email queue status
  getEmailQueue() {
    return this.emailQueue
  }

 // Clear sent emails
  clearSentEmails() {
    this.emailQueue = this.emailQueue.filter(email => email.status !== 'sent')
    localStorage.setItem('emailQueue', JSON.stringify(this.emailQueue))
  }
}

// Singleton instance
export const emailService = new EmailService()
