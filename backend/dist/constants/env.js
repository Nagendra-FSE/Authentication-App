const getEnvVar = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined || value === '') {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return value;
};
export const MONGO_URI = getEnvVar("MONGO_DB_URI");
// export const JWT_SECRET = getEnvVar("JWT_SECRET", "your_jwt_secret_key");
export const PORT = getEnvVar("PORT", "4004");
export const ORIGIN = getEnvVar("APP_ORIGIN", "http://localhost:3000");
export const jwtSecret = getEnvVar("JWT_SECRET", "your_jwt_secret");
export const ResendAPIKey = getEnvVar("RESEND_API_KEY");
export const nodeEnv = getEnvVar("NODE_ENV");
export const sendMailer = getEnvVar("EMAIL_SENDER");
//# sourceMappingURL=env.js.map