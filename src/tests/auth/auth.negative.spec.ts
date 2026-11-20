import { test, expect } from '@playwright/test';

import { ENDPOINTS } from '../../constants/endpoints';
import { AuthPayloads } from '../../payloads/auth.payloads';



test.describe('Authentication- Negative Test cases', ()=>{
    test('A2- Register without clientName', async({request})=>{
        const response= await request.post(ENDPOINTS.AUTH,{
            data: AuthPayloads.missingClientName()
        });
        console.log('A2 Status', response.status());
        expect(response.status()).toBe(400);
    });




     // A3 - Missing Client Email
    test('A3 - Register without clientEmail', async ({ request }) => {

        const response = await request.post(ENDPOINTS.AUTH, {
            data: AuthPayloads.missingClientEmail()
        });

        console.log('A3 Status:', response.status());

        expect(response.status()).toBe(400);

    });
   
    test('A4- Register with invalid email', async({request})=>{
        const response= await request.post(ENDPOINTS.AUTH,{
            data: AuthPayloads.invalidEmail()
        });
        console.log('A4 Status:', response.status());
        expect(response.status()).toBe(400);
    })

})
