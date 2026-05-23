import { Router } from 'express';
import healthRouter from './health.routes';
import chatbotRouter from './chatbot.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/chatbot', chatbotRouter);

export default router;
