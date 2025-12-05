import resend from "../config/resend.js"
import { nodeEnv, sendMailer } from "../constants/env.js";

type Params = {
    to: string;
    subject: string;
    text: string;
    html: string;
}

const getFromEmail = () => 
    nodeEnv === "development" ? "onboarding@resend.dev" : sendMailer

const getToEmail = (to: string) => 
    nodeEnv === "development" ? "delivered@resend.dev" : to

export const sendEmail = async (
        {
            to, subject, text, html
        }: Params
    ) => {
        return await resend.emails.send({
            from: getFromEmail(),
            to: getToEmail(to),
            subject,
            text,
            html
        }, )
    }