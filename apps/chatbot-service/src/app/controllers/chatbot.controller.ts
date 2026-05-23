import { Request, Response, NextFunction } from 'express';
import { ChatbotService } from '../../core/chatbot/chatbot.service';
import { logger } from '../../infrastructure/logger/logger';

export class ChatbotController {
  private service = new ChatbotService();

  public processMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sessionId, text } = req.body;
      logger.info(`Received message for session: ${sessionId}`);
      const result = await this.service.handleMessage(sessionId, text);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  public startSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { customerId } = req.body;
      const session = await this.service.createSession(customerId);
      res.json({ success: true, data: session });
    } catch (error) {
      next(error);
    }
  };

  public endSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sessionId } = req.params;
      if (!sessionId) throw new Error('Session ID required');
      await this.service.terminateSession(sessionId);
      res.json({ success: true, message: 'Session ended successfully' });
    } catch (error) {
      next(error);
    }
  };
}
