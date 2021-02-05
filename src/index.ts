import { User } from './models/User';

const user = new User({ name: 'Kevin', age: 34 })

console.log(user)
console.log(user.get('name'))

user.set({ name: "yo" })
console.log(user.get('name'))