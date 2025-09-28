import { Order, OrderData } from '../../domain/entities/Order';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { ICartService } from '../services/ICartService';

export class SubmitOrder {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly cartService: ICartService
    ) { }

    async execute(orderData: OrderData): Promise<Order> {
        // Step 1: Create the Order entity
        const order = new Order(orderData);

        // Step 2: Run domain validation
        if (!order.isValid()) {
            throw new Error('Invalid order data provided');
        }

        // Step 3: Persist the order via the injected repository
        await this.orderRepository.save(order);

        // Step 4: Clear the cart via ICartService
        await this.cartService.clear();

        return order;
    }
}
