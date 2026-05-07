# 🎭 SauceDemo Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.42.0-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-44+-blue?style=for-the-badge)
![POM](https://img.shields.io/badge/Pattern-Page%20Object%20Model-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📌 About This Project

A **professional, production-grade E2E automation testing framework** built with **Playwright** and **JavaScript**, following the **Page Object Model (POM)** design pattern.

This framework covers complete end-to-end testing of the [SauceDemo](https://www.saucedemo.com) e-commerce application — including login, product listing, sorting, cart management, and full checkout flow.

> 🧪 44+ Test Cases &nbsp;|&nbsp; 🧩 Page Object Model &nbsp;|&nbsp; 🌐 Cross-Browser &nbsp;|&nbsp; 📱 Mobile Testing &nbsp;|&nbsp; 📊 HTML Reports

---

## 🗂️ Project Structure

```
saucedemo-automation/
│
├── 📁 pages/                    # Page Object Models (POM)
│   ├── LoginPage.js             # Login page locators & actions
│   ├── ProductsPage.js          # Products/inventory page
│   ├── CartPage.js              # Shopping cart
│   └── CheckoutPage.js          # 3-step checkout flow
│
├── 📁 tests/                    # Test Suites
│   ├── login.spec.js            # 13 Login tests
│   ├── products.spec.js         # 14 Product page tests
│   ├── cart.spec.js             # 8 Cart tests
│   └── checkout.spec.js         # 12 Checkout tests
│
├── 📁 utils/
│   └── testData.js              # Centralized test data & constants
│
├── playwright.config.js         # Playwright configuration
├── package.json
└── README.md
```

---

## ✅ Test Coverage

| Module | Test Cases | Coverage |
|---|---|---|
| 🔐 Login | 13 | Positive, Negative, UI Validation |
| 🛍️ Products | 14 | Listing, Sorting, Add to Cart, Logout |
| 🛒 Cart | 8 | Add, Remove, Navigation |
| 💳 Checkout | 12 | Validation, Price Calc, E2E Flow |
| **Total** | **47** | **Full Website Coverage** |

---

## 🧪 What Is Tested

### 🔐 Login
- ✅ Valid user login
- ❌ Locked out user error
- ❌ Wrong credentials validation
- ❌ Empty username / password
- 🎨 UI elements (visibility, field types)

### 🛍️ Products Page
- ✅ 6 products displayed
- ✅ Names, prices, images verification
- ✅ Sort A-Z, Z-A, Price Low→High, High→Low
- ✅ Add to cart + badge count update
- ✅ Logout functionality

### 🛒 Cart
- ✅ Empty cart on fresh login
- ✅ Add single & multiple products
- ✅ Remove item / remove all
- ✅ Cart badge disappears when empty
- ✅ Continue shopping navigation

### 💳 Checkout
- ✅ Form validation (first name, last name, zip)
- ✅ Correct price calculation (subtotal + tax = total)
- ✅ Order success message
- ✅ Cart cleared after order
- ✅ Full E2E purchase flow

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Mehwish-Ramzan997/saucedemo-automation.git

# Go to project folder
cd saucedemo-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run Tests

```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Run specific module
npm run test:login
npm run test:products
npm run test:cart
npm run test:checkout

# Run on specific browser
npm run test:chrome
npm run test:firefox
npm run test:mobile

# Open interactive UI
npm run test:ui

# View HTML report
npm run test:report
```

---

## 🌐 Cross-Browser Support

| Browser | Type |
|---|---|
| ✅ Chromium | Desktop |
| ✅ Firefox | Desktop |
| ✅ Mobile Chrome | Pixel 5 (Mobile) |

---

## 📊 Test Reports

HTML report auto-generated after every run:

```bash
npx playwright show-report
```

**Includes:**
- ✅ Pass/Fail per test
- 📸 Screenshots on failure
- 🎥 Video recordings on failure
- 🔍 Trace viewer for debugging

---

## 🏗️ Design Patterns & Best Practices

| Practice | Implementation |
|---|---|
| **Page Object Model** | Each page has its own class |
| **Centralized Test Data** | All data in `utils/testData.js` |
| **Descriptive Test IDs** | `TC_LOGIN_001`, `TC_CHK_008` |
| **BeforeEach Hooks** | Login setup before each test |
| **Test Grouping** | `describe` blocks per feature |
| **Cross-Browser Config** | 3 browsers in playwright.config.js |

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev/) | ^1.42.0 | Test automation |
| JavaScript | ES6+ | Language |
| Node.js | 18+ | Runtime |
| HTML Reporter | Built-in | Test reports |

---

## 👩‍💻 Author

**Mehwish Ramzan**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/YOUR_PROFILE)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/Mehwish-Ramzan997)

---

<p align="center">Built with ❤️ for Automation Testing Excellence</p>
