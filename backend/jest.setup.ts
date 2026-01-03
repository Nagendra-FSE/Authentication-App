process.env.MONGO_DB_URI = "mongodb://localhost:27017/test-db";
process.env.JWT_SECRET = "test-secret";
process.env.NODE_ENV = "development";
process.env.APP_ORIGIN=""
process.env.JWT_EXPIRES_IN="1d" 
process.env.BCRYPT_SALT_ROUNDS="10"
process.env.SESSION_SECRET="your_session_secret_key"
process.env.COOKIE_MAX_AGE="86400000"
process.env.LOG_LEVEL="debug"
process.env.SESSION_NAME="sessionId"


process.env.RATE_LIMIT_WINDOW_MS="15*60*1000"
process.env.RATE_LIMIT_MAX="100"
process.env.EMAIL_SERVICE="gmail"
process.env.EMAIL_SENDER="on"
process.env.RESEND_API_KEY="ssd"
