const defaultFormat = /^([a-zA-Z0-9,./& \s-]+)*$/;
const PasswordFormat = /^([a-zA-Z0-9#!@ \s-]+)*$/;
const emailFormat = /^([a-zA-Z0-9._]+(@)+(gmail.com)+)*$/;
const phoneFormat = /^([0-9]+)*$/;

export { defaultFormat, PasswordFormat, emailFormat, phoneFormat }