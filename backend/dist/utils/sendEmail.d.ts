type Params = {
    to: string;
    subject: string;
    text: string;
    html: string;
};
export declare const sendEmail: ({ to, subject, text, html }: Params) => Promise<import("resend").CreateEmailResponse>;
export {};
//# sourceMappingURL=sendEmail.d.ts.map