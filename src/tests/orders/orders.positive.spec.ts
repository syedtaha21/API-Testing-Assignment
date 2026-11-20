
import { test, expect } from '@playwright/test';
import { ENDPOINTS } from '../../constants/endpoints';
import { validOrderPaymoads } from '../../payloads/valid-order.payloads';
import { getAccessToken } from '../../utils/api-auth';
import type {CreateOrderResponse,OrderResponse} from '../../types/orders.types';

test.describe('Orders - Positive Tests', () => {

    test('O1-O8 - Complete Order Lifecycle', async ({ request }) => {

        // Authentication
        const token = await getAccessToken(request);

        const headers = {
            Authorization: `Bearer ${token}`
        };

        // O1 - Create Order
        const createResponse = await request.post(ENDPOINTS.ORDERS, {
            headers,
            data: validOrderPaymoads.createOrder()
        });

        console.log('O1 Create Order:', createResponse.status());

        expect(createResponse.status()).toBe(201);

        const createBody = await createResponse.json() as CreateOrderResponse;
        const orderId = createBody.orderId;

        expect(orderId).toBeTruthy();

        console.log('Created Order ID:', orderId);

        // O2 - Get Order by ID
        const getResponse = await request.get(
            `${ENDPOINTS.ORDERS}/${orderId}`,
            { headers }
        );

        console.log('O2 Get Order:', getResponse.status());

        expect(getResponse.status()).toBe(200);

        const orderDetails = await getResponse.json() as OrderResponse;

        expect(orderDetails.bookId).toBe(1);
        expect(orderDetails.customerName).toBe('Taha');

        // O3 - Get All Orders
        const listResponse = await request.get(ENDPOINTS.ORDERS, {
            headers
        });

        console.log('O3 Get Orders:', listResponse.status());

        expect(listResponse.status()).toBe(200);

        const orderList = await listResponse.json() as OrderResponse[];

        expect(orderList.some(order => order.id === orderId)).toBeTruthy();

        // O4 - Update Order
        const updateResponse = await request.patch(
            `${ENDPOINTS.ORDERS}/${orderId}`,
            {
                headers,
                data: validOrderPaymoads.updateOrder()
            }
        );

        console.log('O4 Update Order:', updateResponse.status());

        expect(updateResponse.status()).toBe(204);

        // O5 - Verify Updated Order
        const updatedResponse = await request.get(
            `${ENDPOINTS.ORDERS}/${orderId}`,
            { headers }
        );

        console.log('O5 Updated Order:', updatedResponse.status());

        expect(updatedResponse.status()).toBe(200);

        const updatedOrder = await updatedResponse.json() as OrderResponse;

        expect(updatedOrder.customerName).toBe('Taha Updated');
        expect(updatedOrder.bookId).toBe(1);

        // O6 - Delete Order
        const deleteResponse = await request.delete(
            `${ENDPOINTS.ORDERS}/${orderId}`,
            { headers }
        );

        console.log('O6 Delete Order:', deleteResponse.status());

        expect(deleteResponse.status()).toBe(204);

        // O7 - Verify Deleted Order
        const deletedResponse = await request.get(
            `${ENDPOINTS.ORDERS}/${orderId}`,
            { headers }
        );

        console.log('O7 Deleted Order:', deletedResponse.status());

        expect(deletedResponse.status()).toBe(404);

        // O8 - Verify Order Removed From List
        const finalListResponse = await request.get(ENDPOINTS.ORDERS, {
            headers
        });

        console.log('O8 Final Orders List:', finalListResponse.status());

        expect(finalListResponse.status()).toBe(200);

        const finalOrderList = await finalListResponse.json() as OrderResponse[];

        expect(finalOrderList.some(order => order.id === orderId)).toBeFalsy();

    });

});
