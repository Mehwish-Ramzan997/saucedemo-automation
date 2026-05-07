
const USERS = {
  standard:    { username: 'standard_user',          password: 'secret_sauce' },
  locked:      { username: 'locked_out_user',         password: 'secret_sauce' },
  problem:     { username: 'problem_user',            password: 'secret_sauce' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
};

const PRODUCTS = {
  backpack:     'Sauce Labs Backpack',
  bikeLight:    'Sauce Labs Bike Light',
  boltShirt:    'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie:       'Sauce Labs Onesie',
  redShirt:     'Test.allTheThings() T-Shirt (Red)',
};

const CHECKOUT_INFO = {
  valid:   { firstName: 'Mehwish', lastName: 'Ramzan', postalCode: '75500' },
  invalid: {
    noFirstName: { firstName: '',        lastName: 'Ramzan', postalCode: '75500' },
    noLastName:  { firstName: 'Mehwish', lastName: '',       postalCode: '75500' },
    noZip:       { firstName: 'Mehwish', lastName: 'Ramzan', postalCode: ''      },
  },
};

const MESSAGES = {
  lockedUserError:    'Epic sadface: Sorry, this user has been locked out.',
  wrongCredsError:    'Epic sadface: Username and password do not match any user in this service',
  emptyUsernameError: 'Epic sadface: Username is required',
  emptyPasswordError: 'Epic sadface: Password is required',
  orderSuccess:       'Thank you for your order!',
  checkoutFirstName:  'Error: First Name is required',
  checkoutLastName:   'Error: Last Name is required',
  checkoutPostalCode: 'Error: Postal Code is required',
};

module.exports = { USERS, PRODUCTS, CHECKOUT_INFO, MESSAGES };
