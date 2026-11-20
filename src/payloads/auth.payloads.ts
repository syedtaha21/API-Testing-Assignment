import { AuthRequest } from "../types/auth.types";

export const AuthPayloads = {

    validClient: (): AuthRequest => ({
        clientName: 'Taha',
        clientEmail: `taha${Date.now()}@gmail.com`
    }),

    missingClientName: (): Partial<AuthRequest> => ({
        clientEmail: `missingname${Date.now()}@gmail.com`
    }),

    missingClientEmail: (): Partial<AuthRequest> => ({
        clientName: 'Taha'
    }),

    invalidEmail: (): AuthRequest => ({
        clientName: 'Taha',
        clientEmail: 'not-an-email'
    })

};
