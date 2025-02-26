document.addEventListener('DOMContentLoaded', () => {
    const cardInput = document.getElementById('cardNumber');
    const cardIcons = document.querySelectorAll('.card-icon');
    const validationMessage = document.querySelector('.validation-message');
    const cardType = document.querySelector('.card-type');
    const displayCardNumber = document.getElementById('displayCardNumber');
    const cardBrandImage = document.getElementById('cardBrandImage');

    const cardPatterns = {
        visa: {
            pattern: /^4[0-9]{15}$/,
            length: 16
        },
        mastercard: {
            pattern: /^(5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}$/,
            length: 16
        },
        amex: {
            pattern: /^3[47][0-9]{13}$/,
            length: 15
        },
        discover: {
            pattern: /^6(?:011|5[0-9]{2}|4[4-9][0-9]|22)[0-9]{12}$/,
            length: 16
        },
        jcb: {
            pattern: /^(?:2131|1800|35[0-9]{2})[0-9]{11}$/,
            length: 16
        },
        diners: {
            pattern: /^3(?:0[0-5]|[689])[0-9]{11,16}$/,
            length: { min: 14, max: 19 }
        },
        maestro: {
            pattern: /^(5[06789]|6[0-9]|639)[0-9]{10,17}$/,
            length: { min: 12, max: 19 }
        }
    };

    const cardBrandImages = {
        visa: './assets/svgs/visa.svg',
        mastercard: './assets/svgs/mastercard.svg',
        amex: './assets/svgs/amex.svg',
        discover: './assets/svgs/discover.svg',
        jcb: './assets/svgs/jcb.svg',
        diners: './assets/svgs/diners.svg',
        maestro: './assets/svgs/maestro.svg',
        unknown: './assets/svgs/unknown.svg'
    };

    function updateMaxLength(type) {
        const maxLength = type === 'amex' ? 17 : 19;
        cardInput.setAttribute('maxlength', maxLength);
    }

    function getAdjustedCursorPosition(value, formattedValue, currentPosition) {
        const beforeCursor = value.slice(0, currentPosition);
        const formattedBeforeCursor = formatCardNumber(beforeCursor).length;
        return formattedBeforeCursor;
    }

    function formatCardNumber(value, cardType = 'other') {
        const val = value.replace(/\s+/g, '');
        const groups = cardType === 'amex' ? [4, 6, 5] : [4, 4, 4, 4];
        let formatted = '';
        let index = 0;

        for (const group of groups) {
            if (index >= val.length) break;
            formatted += val.slice(index, index + group) + ' ';
            index += group;
        }

        return formatted.trim();
    }

    function formatDisplayCardNumber(value, cursorPosition) {
        if (!value) return '**** **** **** ****';

        const type = detectCardType(value);
        const formatted = formatCardNumber(value, type);

        if (cursorPosition === undefined || cursorPosition === null) {
            return formatted;
        }

        const chars = formatted.split('');
        const adjustedPos = getAdjustedCursorPosition(value.replace(/\D/g, ''), formatted, cursorPosition);
        const highlightPos = Math.min(adjustedPos, chars.length - 1);

        if (highlightPos >= 0 && highlightPos < chars.length) {
            if (chars[highlightPos] === ' ' && highlightPos + 1 < chars.length) {
                chars[highlightPos + 1] = `<span class="highlight">${chars[highlightPos + 1]}</span>`;
            } else if (chars[highlightPos] !== ' ') {
                chars[highlightPos] = `<span class="highlight">${chars[highlightPos]}</span>`;
            }
        }

        return chars.join('');
    }

    function detectCardType(number) {
        if (!number) return null;
        const cleanNumber = number.replace(/\D/g, '');

        for (const [type, config] of Object.entries(cardPatterns)) {
            if (config.pattern.test(cleanNumber)) {
                return type;
            }
        }
        return null;
    }

    function updateUI(cardType) {
        cardIcons.forEach(icon => {
            icon.classList.remove('active');
            if (cardType && icon.dataset.brand === cardType) {
                icon.classList.add('active');
            }
        });

        if (cardBrandImage) {
            if (!cardType || !cardBrandImages[cardType]) {
                cardBrandImage.src = cardBrandImages.unknown;
                cardBrandImage.alt = 'Unknown Card';
            } else {
                cardBrandImage.src = cardBrandImages[cardType];
                cardBrandImage.alt = cardType.charAt(0).toUpperCase() + cardType.slice(1);
            }
        }

        updateMaxLength(cardType || 'other');
    }

    function validateCardNumber(number) {
        const digits = number.replace(/\D/g, '');
        const cardType = detectCardType(digits);

        if (!cardType) return false;

        const lengthConfig = cardPatterns[cardType].length;
        if (typeof lengthConfig === 'number') {
            if (digits.length !== lengthConfig) return false;
        } else {
            // For variable length cards (Diners, Maestro)
            if (digits.length < lengthConfig.min || digits.length > lengthConfig.max) return false;
        }

        let sum = 0;
        let isEven = false;

        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits[i], 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    cardInput.addEventListener('input', (e) => {
        const originalValue = e.target.value;
        let value = originalValue.replace(/\D/g, '');
        const type = detectCardType(value);
        const cursorPosition = e.target.selectionStart;

        const formattedValue = formatCardNumber(value, type);
        e.target.value = formattedValue;

        const newCursorPos = getAdjustedCursorPosition(value, formattedValue, cursorPosition);

        displayCardNumber.innerHTML = formatDisplayCardNumber(value, newCursorPos);

        updateUI(type);

        if (type) {
            cardType.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        } else {
            cardType.textContent = '';
        }

        if (value.length > 0) {
            const isValid = validateCardNumber(value);
            const isComplete = type && value.length === cardPatterns[type].length;

            if (isComplete) {
                validationMessage.textContent = isValid ? 'Valid card number' : 'Invalid card number';
                validationMessage.className = `validation-message ${isValid ? 'success' : 'error'}`;
                cardInput.classList.toggle('valid', isValid);
                cardInput.classList.toggle('invalid', !isValid);
            } else {
                validationMessage.textContent = 'Keep typing...';
                validationMessage.className = 'validation-message';
                cardInput.classList.remove('valid', 'invalid');
            }
        } else {
            validationMessage.textContent = '';
            validationMessage.className = 'validation-message';
            cardInput.classList.remove('valid', 'invalid');
            displayCardNumber.innerHTML = '**** **** **** ****';
        }

        requestAnimationFrame(() => {
            e.target.setSelectionRange(newCursorPos, newCursorPos);
        });
    });

    cardInput.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const value = e.target.value;
            const cursorPos = e.target.selectionStart;
            displayCardNumber.innerHTML = formatDisplayCardNumber(value.replace(/\D/g, ''), cursorPos);
        }
    });

    cardInput.addEventListener('click', (e) => {
        const value = e.target.value;
        const cursorPos = e.target.selectionStart;
        displayCardNumber.innerHTML = formatDisplayCardNumber(value.replace(/\D/g, ''), cursorPos);
    });
}); 