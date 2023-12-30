function CardBrandValidator(cardNumber) {
    // Remove non-digit characters from the input
    const cleanCardNumber = cardNumber.replace(/\D/g, '');

    // Define regular expressions for each card brand
    const regexes = {
        jcb: /^(?:2131|1800|35)\d*$/,
        amex: /^3[47]\d*$/,
        diners: /^3(?:0[0-59]|[689])\d*$/,
        visa: /^4\d*$/,
        mastercard: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)\d*$/,
        maestro: /^(5[06789]|6)\d*$/,
        discover: /^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])\d*$/,
    };

    // Iterate through regexes to identify the brand
    for (const brand in regexes) {
        if (regexes[brand].test(cleanCardNumber)) {
            return brand;
        }
    }

    return "unknown";
}