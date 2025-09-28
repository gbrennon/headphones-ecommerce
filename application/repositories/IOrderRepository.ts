import { Order } from '../../domain/entities/Order';

export interface IOrderRepository {
    save(order: Order): Promise<void>;
}
