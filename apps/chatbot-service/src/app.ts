import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import router from './app/routes/index.routes';
import { errorMiddleware } from './app/middlewares/error.middleware';
import { notFoundMiddleware } from './app/middlewares/notFound.middleware';
import { loggerMiddleware } from './app/middlewares/logger.middleware';
import { requestIdMiddleware } from './app/middlewares/requestId.middleware';

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Parse JSON request body
app.use(express.json());

// Trace requests
app.use(requestIdMiddleware);
app.use(loggerMiddleware);

// API Routes
app.use('/api', router);

// Handle 404 Route Not Found
app.use(notFoundMiddleware);

// Centralized error handler
app.use(errorMiddleware);

export default app;
