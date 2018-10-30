import moment from 'moment';

function greet(name) {
  return `Hi ${name}, it's ${moment().format('YYYY/MM/DD HH:mm:ss')}!`;
}

export default greet;
