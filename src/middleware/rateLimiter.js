import rateLimit from "express-rate<-limit";

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100, // Maximal 100 Anfragen pro IP
    standardHeaders: true, // Rate Limit Informationen in den Response-Headern
    legacyHeaders: false, // Veraltete Header deaktivieren
    message: {
      status: 429,
      error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
    },
  });


  export default rateLimiter;