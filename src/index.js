// module.exports = (name) => {
//   return `Hi hi, ${name}!`;
// }
import _      from 'lodash';
import moment from 'moment';

const GREET_TYPES = {
  GREET1: 'Hello',
  GREET2: 'Hi'
};

function greet(name) {
  const key = _.findKey (
    GREET_TYPES,
    (item) => {
      return item==='Hi';
    }
  );

  return `${GREET_TYPES[key]} ${name}, it's ${moment().format('YYYY/MM/DD HH:mm:ss')}!`;
}

export default greet;
