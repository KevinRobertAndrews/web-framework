import { Eventing } from './Eventing'
import { Sync } from './Sync'
import { Attributes } from './Attributes'

export interface UserProps {
    id?: number,
    name?: string,
    age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    public attributes: Attributes<UserProps>;

    constructor(private attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(this.attrs);
    }
}