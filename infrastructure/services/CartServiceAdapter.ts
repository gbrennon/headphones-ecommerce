import { ICartService } from '../../application/services/ICartService';

export class CartServiceAdapter implements ICartService {
    constructor(private readonly clearCartAction: () => void) { }

    async clear(): Promise<void> {
        // Clear the cart using the provided Redux action
        this.clearCartAction();
    }
}
