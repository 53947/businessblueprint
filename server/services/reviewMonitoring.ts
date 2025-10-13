import { storage } from '../storage';
import { EmailService } from './email';
import type { SynupReview, ReviewNotificationPreferences } from '@shared/schema';
import { Server as SocketIOServer } from 'socket.io';

export class ReviewMonitoringService {
  private emailService: EmailService;
  private io?: SocketIOServer;

  constructor(io?: SocketIOServer) {
    this.emailService = new EmailService();
    this.io = io;
  }

  async processNewReview(review: SynupReview): Promise<void> {
    try {
      // Get location to find associated client
      const location = await storage.getSynupLocation(review.locationId);
      if (!location) {
        console.error(`Location not found for review ${review.id}`);
        return;
      }

      const client = await storage.getClient(location.clientId);
      if (!client) {
        console.error(`Client not found for location ${location.id}`);
        return;
      }

      // Get notification preferences (or create defaults)
      let preferences = await storage.getReviewNotificationPreferences(location.clientId);
      if (!preferences) {
        preferences = await storage.createReviewNotificationPreferences({
          clientId: location.clientId,
          enableEmailAlerts: true,
          enableWebSocketAlerts: true,
          notifyOnNegativeReviews: true,
          minimumRatingThreshold: 2,
        });
      }

      // Check if alert should be sent based on preferences
      const shouldAlert = this.shouldSendAlert(review, preferences);
      
      if (!shouldAlert) {
        console.log(`Review ${review.id} does not meet alert criteria`);
        return;
      }

      // Send email alert if enabled
      if (preferences.enableEmailAlerts) {
        const alertEmail = preferences.alertEmail || client.email;
        if (alertEmail) {
          await this.sendEmailAlert(review, location.name, client.companyName, alertEmail);
        }
      }

      // Send WebSocket alert if enabled
      if (preferences.enableWebSocketAlerts && this.io) {
        this.sendWebSocketAlert(review, location.clientId, location.name);
      }

      console.log(`✅ Alert sent for review ${review.id} (Rating: ${review.rating}, Platform: ${review.platform})`);
    } catch (error) {
      console.error(`Error processing review alert for review ${review.id}:`, error);
    }
  }

  private shouldSendAlert(review: SynupReview, preferences: ReviewNotificationPreferences): boolean {
    // If notify on all reviews is enabled
    if (preferences.notifyOnAllReviews) {
      return true;
    }

    // Check negative review notifications
    if (preferences.notifyOnNegativeReviews && review.rating <= (preferences.minimumRatingThreshold || 2)) {
      return true;
    }

    // Check positive review notifications
    if (preferences.notifyOnPositiveReviews && review.rating >= 4) {
      return true;
    }

    return false;
  }

  private async sendEmailAlert(review: SynupReview, locationName: string, businessName: string, email: string): Promise<void> {
    try {
      const alertData = {
        businessName,
        platform: review.platform,
        rating: review.rating,
        reviewText: review.reviewText || 'No text provided',
        reviewerName: review.reviewerName || undefined,
        reviewDate: review.reviewDate,
        locationName,
      };

      const success = await this.emailService.sendReviewAlert(email, alertData);
      if (success) {
        console.log(`📧 Email alert sent to ${email} for review on ${review.platform}`);
      } else {
        console.error(`Failed to send email alert to ${email}`);
      }
    } catch (error) {
      console.error('Error sending email alert:', error);
    }
  }

  private sendWebSocketAlert(review: SynupReview, clientId: number, locationName: string): void {
    try {
      if (!this.io) {
        console.warn('WebSocket server not available for review alerts');
        return;
      }

      const alertPayload = {
        type: 'review:new',
        review: {
          id: review.id,
          platform: review.platform,
          rating: review.rating,
          reviewText: review.reviewText,
          reviewerName: review.reviewerName,
          reviewDate: review.reviewDate,
          locationName,
        },
        timestamp: new Date(),
      };

      // Emit to client-specific room
      this.io.to(`client:${clientId}`).emit('review:alert', alertPayload);
      console.log(`🔔 WebSocket alert sent to client:${clientId} for review on ${review.platform}`);
    } catch (error) {
      console.error('Error sending WebSocket alert:', error);
    }
  }

  async handleAutoResponse(review: SynupReview): Promise<void> {
    try {
      const location = await storage.getSynupLocation(review.locationId);
      if (!location) return;

      const preferences = await storage.getReviewNotificationPreferences(location.clientId);
      if (!preferences) return;

      // Check if auto-response is enabled for this review type
      const shouldAutoRespond = 
        (preferences.autoRespondPositive && review.rating >= 4) ||
        (preferences.autoRespondNegative && review.rating <= 2);

      if (shouldAutoRespond) {
        console.log(`🤖 Auto-response triggered for review ${review.id} (Rating: ${review.rating})`);
        // Note: Auto-response would be handled by the review response route
        // This is just a placeholder for future webhook integration
      }
    } catch (error) {
      console.error('Error handling auto-response:', error);
    }
  }
}
