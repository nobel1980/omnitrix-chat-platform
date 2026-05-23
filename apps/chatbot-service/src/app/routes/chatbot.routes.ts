import { Router } from 'express';
import { ChatbotController } from '../controllers/chatbot.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { processMessageSchema } from '../validators/chatbot.validator';

const router = Router();
const controller = new ChatbotController();

router.post('/message', validationMiddleware(processMessageSchema), controller.processMessage);
router.post('/session/start', controller.startSession);
router.post('/session/:sessionId/end', controller.endSession);

export default router;
