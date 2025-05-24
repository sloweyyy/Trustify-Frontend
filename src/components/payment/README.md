# Payment Components

This directory contains reusable components for handling payment success and failure states in the application.

## Components

### 1. PaymentSuccess
A component to display a success message after a successful payment transaction.

#### Props
- `title`: The main title of the success message
- `message`: The main description message
- `subMessage`: Additional details about what happens next
- `redirectPath`: Route to navigate to when the button is clicked
- `buttonText`: Text to display on the action button

### 2. PaymentCancel
A component to display when a payment transaction is cancelled or fails.

#### Props
- `title`: The main title of the failure message
- `message`: The main description message
- `subMessage`: Additional details about what can be done
- `redirectPath`: Route to navigate to when the back button is clicked
- `backButtonText`: Text to display on the back button
- `retryButtonText`: Text to display on the retry button
- `onRetry`: Function to call when retry button is clicked

### 3. PaymentRedirect
A component that handles URL parameters after payment provider redirects back to the application.

#### Props
- `successRedirectPath`: Path to redirect to after successful payment
- `cancelRedirectPath`: Path to redirect to after cancelled payment
- `onRetry`: Function to call when retry is requested

## Usage

### Basic Usage
```jsx
// Success page
<PaymentSuccess 
  title="Thanh toán thành công"
  redirectPath="/user/dashboard" 
/>

// Cancel/Failure page
<PaymentCancel 
  title="Thanh toán thất bại"
  redirectPath="/cart" 
  onRetry={() => /* your retry logic */} 
/>
```

### Integration with Payment Provider
After configuring your payment provider (like Stripe, PayPal, etc.), set the redirect URL to:

```
https://your-domain.com/payment/redirect?status=success&payment_id=xxxxx
```

For failures or cancellations:
```
https://your-domain.com/payment/redirect?status=cancel
```

The `PaymentRedirect` component will handle these URL parameters and display the appropriate UI.

## Full Page Implementation
See `src/pages/services/PaymentRedirectPage.js` for a full example of implementing a page with the PaymentRedirect component.