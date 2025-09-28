import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    paymentMethod: 'cash' | 'emoney';
    emoneyNumber: string;
    emoneyPin: string;
}

interface PaymentDetailsFormProps {
    formData: FormData;
    onInputChange: (field: keyof FormData, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    submitError: string | null;
}

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({
    formData,
    onInputChange,
    onSubmit,
    isSubmitting,
    submitError
}) => {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                backgroundColor: "white",
                padding: "4rem",
                margin: "4rem 0",
                width: "70%",
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
                Checkout
            </Typography>

            {submitError && (
                <Box sx={{
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    padding: '1rem',
                    marginBottom: '2rem',
                    borderRadius: '4px'
                }}>
                    {submitError}
                </Box>
            )}

            <Box sx={{ marginBottom: "4rem" }}>
                <Typography
                    variant="h2"
                    sx={{
                        textTransform: "uppercase",
                        fontSize: "1.25rem",
                        color: "#d87d4a",
                        fontWeight: 500,
                        marginBottom: "1.5rem",
                    }}
                >
                    Billing Details
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            placeholder="Alexei Ward"
                            value={formData.name}
                            onChange={(e) => onInputChange('name', e.target.value)}
                            required
                            sx={{ width: "20rem", marginBottom: "1.5rem" }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            placeholder="alexi@mail.com"
                            type="email"
                            value={formData.email}
                            onChange={(e) => onInputChange('email', e.target.value)}
                            required
                            sx={{ width: "20rem" }}
                        />
                    </Box>
                    <TextField
                        id="phone"
                        label="Phone Number"
                        variant="outlined"
                        placeholder="+1 202-555-0136"
                        value={formData.phone}
                        onChange={(e) => onInputChange('phone', e.target.value)}
                        required
                        sx={{ width: "20rem" }}
                    />
                </Box>
            </Box>

            <Box sx={{ marginBottom: "4rem" }}>
                <Typography
                    variant="h2"
                    sx={{
                        textTransform: "uppercase",
                        fontSize: "1.25rem",
                        color: "#d87d4a",
                        fontWeight: 500,
                        marginBottom: "1.5rem",
                    }}
                >
                    Shipping Info
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <TextField
                        id="address"
                        label="Address"
                        variant="outlined"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => onInputChange('address', e.target.value)}
                        required
                        sx={{ width: "100%", marginBottom: "1.5rem" }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <TextField
                            id="zipcode"
                            label="Zip Code"
                            variant="outlined"
                            placeholder="11001"
                            value={formData.zipCode}
                            onChange={(e) => onInputChange('zipCode', e.target.value)}
                            required
                            sx={{ width: "20rem", marginBottom: "1.5rem" }}
                        />
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            placeholder="New York"
                            value={formData.city}
                            onChange={(e) => onInputChange('city', e.target.value)}
                            required
                            sx={{ width: "20rem" }}
                        />
                    </Box>
                </Box>
                <TextField
                    id="country"
                    label="Country"
                    variant="outlined"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => onInputChange('country', e.target.value)}
                    required
                    sx={{ width: "20rem" }}
                />
            </Box>

            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        textTransform: "uppercase",
                        fontSize: "1.25rem",
                        color: "#d87d4a",
                        fontWeight: 500,
                        marginBottom: "1.5rem",
                    }}
                >
                    Payment Details
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Typography>Payment Method</Typography>
                        <RadioGroup
                            value={formData.paymentMethod}
                            onChange={(e) => onInputChange('paymentMethod', e.target.value as 'cash' | 'emoney')}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: "1rem",
                            }}
                        >
                            <Box
                                sx={{
                                    padding: "1rem 2rem",
                                    border: "1px solid lightgrey",
                                    marginBottom: "1rem",
                                }}
                            >
                                <FormControlLabel
                                    value="emoney"
                                    control={<Radio />}
                                    label="e-Money"
                                />
                            </Box>
                            <Box
                                sx={{
                                    padding: "1rem 2rem",
                                    border: "1px solid lightgrey",
                                }}
                            >
                                <FormControlLabel
                                    value="cash"
                                    control={<Radio />}
                                    label="Cash on Delivery"
                                />
                            </Box>
                        </RadioGroup>
                    </Box>

                    {formData.paymentMethod === 'emoney' && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <TextField
                                id="e-money-number"
                                label="e-Money Number"
                                variant="outlined"
                                placeholder="238590288"
                                value={formData.emoneyNumber}
                                onChange={(e) => onInputChange('emoneyNumber', e.target.value)}
                                required={formData.paymentMethod === 'emoney'}
                                sx={{ width: "20rem", marginBottom: "1.5rem" }}
                            />
                            <TextField
                                id="e-money-pin"
                                label="e-Money Pin"
                                variant="outlined"
                                placeholder="6891"
                                value={formData.emoneyPin}
                                onChange={(e) => onInputChange('emoneyPin', e.target.value)}
                                required={formData.paymentMethod === 'emoney'}
                                sx={{ width: "20rem" }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default PaymentDetailsForm;
