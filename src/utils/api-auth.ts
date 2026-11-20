import { APIRequestContext } from '@playwright/test';
import { ENDPOINTS } from '../constants/endpoints';
import { AuthPayloads } from '../payloads/auth.payloads';
import type { AuthResponse } from '../types/auth.types';

export async function getAccessToken(request:APIRequestContext): Promise <string> {
 const response= await request.post(ENDPOINTS.AUTH,{
     data: AuthPayloads.validClient()
 });

   expectAuthResponse(response.status());

    const responseBody = await response.json() as AuthResponse;

    return responseBody.accessToken;
 

 
}

function expectAuthResponse(status: number): void {
    if (status !== 201) {
        throw new Error(`Authentication failed. Status: ${status}`);
    }
}