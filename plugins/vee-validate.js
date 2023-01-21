

/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import {
  required,
  min,
  max,
  email,
  integer,
  numeric,
  confirmed,
  // eslint-disable-next-line camelcase
  min_value,
  // eslint-disable-next-line camelcase
  required_if,
  is
} from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'

const dictionary = {
  en: {
    confirmed: 'The {_field_} field confirmation does not match'
  },
  fa: {
    confirmed: '{_field_} با رمزعبور تطابق ندارد'
  }
}

Object.assign(en.messages, dictionary.en)

localize('en', en)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('is', is)
extend('required', required)
extend('required_if', required_if)
extend('confirmed', confirmed)
extend('min', min)
extend('max', max)
extend('min_value', min_value)
extend('email', email)
extend('numeric', numeric)
extend('integer', integer)

extend('minPirce', {
  params: ['len'],
  validate: (val, args) => {
    // eslint-disable-next-line eqeqeq
    return val >= args.len
  },
  message: '{_field_}  باید حداقل {len} تومان باشد'
})
extend('maxPrice', {
  params: ['len'],
  validate: (val, args) => {
    // eslint-disable-next-line eqeqeq
    return val <= args.len
  },
  message: '{_field_}  باید حداکثر {len} تومان باشد'
})
extend('length', {
  params: ['len'],
  validate: (val, args) => {
    // eslint-disable-next-line eqeqeq
    return val.length == args.len
  },
  message: '{_field_} باید {len} کارکتر باشد'
})


extend('username', {
  validate: (val) => {
    return/^[a-zA-Z\-]+$/.test(val)
  },
  message: 'فرمت نام کاربری معتبر نیست'
})

extend('phoneNumber', {
  validate: (val) => {
    return /^(\+98|0)?9\d{9}$/g.test(val)
  },
  message: 'فرمت شماره موبایل معتبر نیست'
})
extend('iranianNationalCode', {
  validate: (input) => {
    if (!/^\d{10}$/.test(input)) { return false }
    const check = +input[9]
    const sum = input.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11
    return sum < 2 ? check === sum : check + sum === 11
  },
  message: 'کد ملی وارد شده صحیح نسیت'
})
extend('onlyEnglish', {
  validate: (val) => {
    // eslint-disable-next-line no-control-regex
    return /^[\u0000-\u007F]*$/.test(val)
  },
  message: 'لطفا کیبورد خود را انگلیسی کنید'
})

extend('password', {
  validate: (val) => {
    return true
    // return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})$/g.test(val)
  },
  message: 'فرمت {_field_} معتبر نیست'
})
extend('passwordConfirm', {
  params: ['target'],
  validate (value, { target }) {
    console.log('target',target);
    console.log('value',value);
    return value === target
  },
  message: ' {_field_}  با رمزعبور تطابق ندارد'

})