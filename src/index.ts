import { User } from './models/User';

const user = new User({ name: "new guy", age: 0 })

user.events.on('change', () => {
    console.log('Change!!')
})

console.log(user)

user.events.trigger('change');