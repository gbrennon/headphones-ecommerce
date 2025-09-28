export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface ShippingInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface PaymentInfo {
    method: 'cash' | 'emoney';
    emoneyNumber?: string;
    emoneyPin?: string;
}

export interface OrderData {
    items: OrderItem[];
    shipping: ShippingInfo;
    payment: PaymentInfo;
    total: number;
    vat: number;
    grandTotal: number;
}

export class Order {
    public readonly id: string;
    public readonly items: OrderItem[];
    public readonly shipping: ShippingInfo;
    public readonly payment: PaymentInfo;
    public readonly total: number;
    public readonly vat: number;
    public readonly grandTotal: number;
    public readonly createdAt: Date;

    constructor(orderData: OrderData) {
        this.id = this.generateOrderId();
        this.items = orderData.items;
        this.shipping = orderData.shipping;
        this.payment = orderData.payment;
        this.total = orderData.total;
        this.vat = orderData.vat;
        this.grandTotal = orderData.grandTotal;
        this.createdAt = new Date();
    }

    public isValid(): boolean {
        return (
            this.hasValidItems() &&
            this.hasValidShipping() &&
            this.hasValidPayment() &&
            this.hasValidTotals()
        );
    }

    private hasValidItems(): boolean {
        return (
            this.items.length > 0 &&
            this.items.every(item =>
                item.id > 0 &&
                item.name.trim().length > 0 &&
                item.price > 0 &&
                item.quantity > 0 &&
                item.image.trim().length > 0
            )
        );
    }

    private hasValidShipping(): boolean {
        const { name, email, phone, address, zipCode, city, country } = this.shipping;

        return (
            name.trim().length > 0 &&
            this.isValidEmail(email) &&
            phone.trim().length > 0 &&
            address.trim().length > 0 &&
            zipCode.trim().length > 0 &&
            city.trim().length > 0 &&
            country.trim().length > 0
        );
    }

    private hasValidPayment(): boolean {
        if (this.payment.method === 'cash') {
            return true;
        }

        if (this.payment.method === 'emoney') {
            return (
                this.payment.emoneyNumber?.trim().length === 9 &&
                this.payment.emoneyPin?.trim().length === 4 &&
                /^\d+$/.test(this.payment.emoneyNumber) &&
                /^\d+$/.test(this.payment.emoneyPin)
            );
        }

        return false;
    }

    private hasValidTotals(): boolean {
        return (
            this.total > 0 &&
            this.vat >= 0 &&
            this.grandTotal > 0 &&
            this.grandTotal >= this.total
        );
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private generateOrderId(): string {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        return `ORDER-${timestamp}-${randomStr}`.toUpperCase();
    }
}
