import { User } from './models/User';

const user = User.buildUser({ id: 1, name: "Hello", age: 1000 });
user.save()

user.on('change', () => {
    console.log(user)
})

user.fetch();

