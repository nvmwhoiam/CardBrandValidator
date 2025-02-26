# Card Brand Validator

<div align="center">
  <h3>Modern Credit Card Brand Validator</h3>
  <p>A sleek, accessible, and real-time credit card brand detection and validation tool.</p>
</div>

## 🌟 Overview

Card Brand Validator is a modern web application that provides real-time credit card brand detection and validation. It features a beautiful UI with live card number formatting, brand detection, and validation using the Luhn algorithm.

## ✨ Key Features

### 🎨 Card Detection & Validation

- Real-time card brand detection
- Support for multiple card types:
  ```javascript
  // Card Pattern Reference
  visa:       ^4[0-9]{15}$ // e.g., 4263 9826 4026 9299
  mastercard: ^(5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}$ // e.g., 5425 2334 3010 9903
  amex:       ^3[47][0-9]{13}$ // e.g., 3782 8224 6310 005
  discover:   ^6(?:011|5[0-9]{2}|4[4-9][0-9]|22)[0-9]{12}$ // e.g., 6011 0009 9013 9424
  jcb:        ^(?:2131|1800|35[0-9]{2})[0-9]{11}$ // e.g., 3530 1113 3330 0000
  diners:     ^3(?:0[0-5]|[689])[0-9]{11,16}$ // e.g., 3056 9309 0259 0404
  maestro:    ^(5[06789]|6[0-9]|639)[0-9]{10,17}$ // e.g., 5018 4000 0009 3939
  ```
- Luhn algorithm validation
- Dynamic card number formatting

### ♿ Accessibility Features

- ARIA labels and roles
- Keyboard navigation support
- Screen reader optimization
- Semantic HTML structure
- Live validation feedback

### 🎯 Technical Highlights

- Framework-free JavaScript
- Real-time validation
- Dynamic cursor positioning
- Live card number formatting
- SVG icon system
- Responsive design

## 🗂️ Project Structure

```text
/assets
├── css/
│   ├── general/
│   │   ├── base.scss      # Base styles and variables
│   │   └── mixin.scss     # SCSS mixins
│   └── styles.scss        # Main stylesheet
├── js/
│   └── main.js           # Card validation logic
└── svgs/                 # Card brand SVG icons
    ├── visa.svg
    ├── mastercard.svg
    ├── amex.svg
    ├── discover.svg
    ├── jcb.svg
    ├── diners.svg
    ├── maestro.svg
    └── unknown.svg
index.html               # Main HTML file
```

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **SCSS/CSS3** - Modern styling with variables and mixins
- **Vanilla JavaScript** - Clean, modern JavaScript with no dependencies
- **SVG System** - Optimized card brand icons

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/card-brand-validator.git
   ```

2. **Navigate to project**

   ```bash
   cd card-brand-validator
   ```

3. **Launch the application**
   - Open `index.html` in a browser, or
   - Use a development server (e.g., VS Code Live Server)

## 🧪 Testing Card Numbers

Test the validator with these valid example numbers:

- Visa: 4263 9826 4026 9299
- Mastercard: 5425 2334 3010 9903
- American Express: 3782 8224 6310 005
- Discover: 6011 0009 9013 9424
- JCB: 3530 1113 3330 0000
- Diners Club: 3056 9309 0259 0404
- Maestro: 5018 4000 0009 3939

Note: These are test numbers that pass the Luhn algorithm validation. Do not use real card numbers for testing.

## 🔮 Future Enhancements

- Card flip animation
- Card expiry date validation
- CVV validation
- Multiple card theme options
- Card scanning capability
- Save card type preferences
- Additional card brand support

## 📬 Contact

- GitHub: [@nvmwhoiam](https://github.com/nvmwhoiam/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
