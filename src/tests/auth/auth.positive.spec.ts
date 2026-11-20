import{test, expect} from '@playwright/test';
import{ENDPOINTS} from '../../constants/endpoints';
import { AuthPayloads} from '../../payloads/auth.payloads';
import type { AuthResponse } from '../../types/auth.types';

test.describe('Authentication- Positive Tests', ()=>{
    test('A1 - Register clients with valid Details', async({request})=>{
        const response= await request.post(ENDPOINTS.AUTH,{
            data: AuthPayloads.validClient()
        });
        
        console.log('Status Code:' , response.status());
        expect(response.status()).toBe(201);
        const responseBody= await response.json() as AuthResponse;
        console.log('Access Token:' ,responseBody.accessToken)
        expect(responseBody.accessToken).toBeTruthy();
        expect(responseBody).toHaveProperty('accessToken');
    });
});