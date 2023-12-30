# CardBrandValidator Function Documentation

## Overview

The `CardBrandValidator` is a JavaScript function designed to identify the card brand (e.g., Visa, Mastercard, American Express, etc.) based on a provided card number. It uses regular expressions to match the card number against predefined patterns associated with different card brands.

## Usage

To use the `CardBrandValidator` function, follow these steps:

1. Include the function in your JavaScript code.

2. Call the function with the card number you want to validate as its argument.

3. The function will return the identified card brand as a string.

## Function Signature

````javascript
function CardBrandValidator(cardNumber)

## Supported Card Brands and Patterns

The `CardBrandValidator` function supports the following card brands and their associated regular expression patterns:

- **JCB:** Card numbers starting with 2131, 1800, or 35.
- **American Express (Amex):** Card numbers starting with 34 or 37.
- **Diners Club:** Card numbers starting with 30-59 or 68-69.
- **Visa:** Card numbers starting with 4.
- **Mastercard:** Card numbers starting with 51-55, 2221-2720, 22-27, or 2720.
- **Maestro:** Card numbers starting with 50-55 or 6.
- **Discover:** Card numbers starting with 6011, 65, 644-649, 622126-622925, or 62213-62290.

## Example

You can use the `CardBrandValidator` function to identify the card brand of a given card number. Here's an example of how to use it:

```javascript
const cardNumber = "4111 1111 1111 1111"; // Example Visa card number
const brand = CardBrandValidator(cardNumber);
console.log(brand); // Output: "visa"
````
