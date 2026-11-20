export interface CreateOrderRequest{
    bookId: number;
    customerName: string;
}

export interface UpdateOrderRequest{
    customerName: string;
}


export interface CreateOrderResponse {
    orderId: string;
}

export interface OrderResponse {
    id: string;
    bookId: number;
    customerName: string;
}