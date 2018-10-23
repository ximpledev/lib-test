import moment from 'moment';

function greet(name) {
  return `Hello ${name}, it's ${moment().format('YYYY/MM/DD HH:mm:ss')}!`;
}

export default greet;
