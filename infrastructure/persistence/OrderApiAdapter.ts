import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../../application/repositories/IOrderRepository';

export class OrderApiAdapter implements IOrderRepository {
    async save(order: Order): Promise<void> {
        try {
            const response = await fetch('/api/submit-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: order.id,
                    items: order.items,
                    shipping: order.shipping,
                    payment: order.payment,
                    total: order.total,
                    vat: order.vat,
                    grandTotal: order.grandTotal,
                    createdAt: order.createdAt.toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to submit order: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Order submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
