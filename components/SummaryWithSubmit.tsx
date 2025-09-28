import { Box, Typography } from "@mui/material";
import React from "react";
import { Button } from "./Button";
import { ProductType } from "../types";
import Image from "next/image";

interface SummaryWithSubmitProps {
    cartItems: ProductType[];
    cartTotal: number;
    onSubmit: () => void;
    isSubmitting: boolean;
}

const SummaryWithSubmit: React.FC<SummaryWithSubmitProps> = ({
    cartItems,
    cartTotal,
    onSubmit,
    isSubmitting
}) => {
    // Calculate totals
    const shipping = 50;
    const vat = Math.round(cartTotal * 0.2); // 20% VAT
    const grandTotal = cartTotal + vat + shipping;

    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "2rem",
                margin: "4rem 0",
                marginLeft: "2rem",
                width: "25%",
                height: "fit-content",
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: "2rem",
                    textTransform: "uppercase",
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    marginBottom: "2rem",
                }}
            >
                Summary
            </Typography>
            {cartItems.map((product) => {
                return (
                    <Box
                        key={product.id}
                        sx={{
                            display: "flex",
                            margin: "1rem 0",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box sx={{ display: "flex" }}>
                            <Image
                                src={product.image.mobile.replace(".", "")}
                                width={50}
                                height={50}
                                alt="product"
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "1rem",
                                }}
                            >
                                <Typography variant="body1">{product.name}</Typography>
                                <Typography variant="body2" sx={{ color: " #6f7275" }}>
                                    ${product.price}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                            }}
                        >
                            <Typography sx={{ fontSize: "0.75rem" }}>Count</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 800 }}>
                                {product.count}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
            <Box sx={{ marginBottom: "2rem" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#808080",
                            textTransform: "uppercase",
                            fontWeight: 600,
                        }}
                    >
                        Total
                    </Typography>
                    <Typography variant="body1">${cartTotal}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#808080",
                            textTransform: "uppercase",
                            fontWeight: 600,
                        }}
                    >
                        Shipping
                    </Typography>
                    <Typography variant="body1">${shipping}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#808080",
                            textTransform: "uppercase",
                            fontWeight: 600,
                        }}
                    >
                        VAT (included)
                    </Typography>
                    <Typography variant="body1">${vat}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
                <Typography
                    variant="body1"
                    sx={{ color: "#808080", textTransform: "uppercase", fontWeight: 600 }}
                >
                    Grand Total
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 800, color: "#d87d4a" }}>
                    ${grandTotal}
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="#d87d4a"
                onClick={onSubmit}
                disabled={isSubmitting}
                sx={{
                    marginTop: "1rem",
                    width: "100%",
                    opacity: isSubmitting ? 0.6 : 1
                }}
            >
                {isSubmitting ? 'Processing...' : 'Continue & Pay'}
            </Button>
        </Box>
    );
};

export default SummaryWithSubmit;
