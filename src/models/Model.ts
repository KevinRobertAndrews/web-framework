import { AxiosPromise, AxiosResponse } from "axios";

// INTERFACE ======================================

interface ModelAttributes<T> {
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
    set(update: T): void;
}

interface ApiSync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number
}

type Callback = () => void;


// MODEL =========================================

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: ApiSync<T>
    ) { }

    // These pass-through methods work because the objects of the constructor 
    // are initialized first, however this approach is a bit brittle.
    on = this.events.on
    trigger = this.events.trigger;
    get = this.attributes.get;

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change')
    }

    fetch(): void {
        const id = this.get('id');

        if (typeof id !== 'number') {
            throw new Error('Cannot fetch without an id')
        }

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data)
        })
    }

    save(): void {
        this.sync.save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger('save')
            })
            .catch(() => { this.trigger('error') });
    }
}