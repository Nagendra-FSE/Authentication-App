import resend from "../config/resend.js";
import { nodeEnv, sendMailer } from "../constants/env.js";
const getFromEmail = () => nodeEnv === "development" ? "onboarding@resend.dev" : sendMailer;
const getToEmail = (to) => nodeEnv === "development" ? "delivered@resend.dev" : to;
export const sendEmail = async ({ to, subject, text, html }) => {
    return await resend.emails.send({
        from: getFromEmail(),
        to: getToEmail(to),
        subject,
        text,
        html
    });
};
//# sourceMappingURL=sendEmail.js.map