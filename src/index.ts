import { User } from './models/User';

const user = new User({ name: 'Kevin', age: 34 })

user.on('change', () => { console.log("Change") })
user.on('change', () => { console.log("Change") })
user.on('yo', () => { console.log("Yo") })

console.log(user);

user.trigger('change')
user.trigger('yo')