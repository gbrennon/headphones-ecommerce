import React from 'react';
import Link from 'next/link';
import { Box, Typography, Container } from '@mui/material';
import Nav from '../components/Nav';
import { Footer } from '../components/shared/Footer';
import { Button } from '../components/Button';

const OrderSuccessPage: React.FC = () => {
    return (
        <div style={{ backgroundColor: "#f1f1f1", minHeight: "100vh" }}>
            <Nav />
            <Container>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <Box sx={{
                        maxWidth: '500px',
                        padding: '3rem',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Typography variant="h1" sx={{
                            color: '#28a745',
                            marginBottom: '1rem',
                            fontSize: '2.5rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: 1.5
                        }}>
                            Order Submitted Successfully!
                        </Typography>
                        <Typography variant="body1" sx={{
                            marginBottom: '2rem',
                            color: '#666',
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                        }}>
                            Thank you for your purchase. Your order has been received and is being processed.
                            You will receive a confirmation email shortly.
                        </Typography>
                        <Link href="/" passHref>
                            <Button
                                variant="contained"
                                color="#d87d4a"
                                sx={{
                                    width: '200px',
                                    fontSize: '1rem'
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default OrderSuccessPage;
