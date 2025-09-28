import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const orderData = req.body;

        // Mock order submission - in a real application, this would save to a database
        console.log('Order submitted:', orderData);

        // Simulate processing time
        setTimeout(() => {
            res.status(200).json({
                success: true,
                message: 'Order submitted successfully',
                orderId: orderData.id
            });
        }, 1000);

    } catch (error) {
        console.error('Order submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit order'
        });
    }
}
