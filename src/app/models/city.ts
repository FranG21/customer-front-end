import { State } from './state';

export class City {
  id?: number;
  name: string;
  state: State;
  state_id: number;

  constructor(name: string, state_id: number, state: State) {
    this.name = name;
    this.state_id = state_id;
    this.state = state;
  }
}
