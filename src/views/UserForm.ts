import { User, UserProps } from '../models/User'
import { View } from './View'

export class UserForm extends View<User, UserProps> {
    template(): string {
        return `
            <div>
                <input placeholder="${this.model.get('name')}"/>
                <button class="set-name">Update Name</button>
                <button class="set-age">Set Random Age</button>
                <button class="save-user">Save</button>
            </div>
        `
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-user': this.onSaveUserClick
        }
    }

    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');

        if (input) {
            const name = input.value
            this.model.set({ name });
        }
    }

    onSaveUserClick = (): void => {
        this.model.save();
    }
}