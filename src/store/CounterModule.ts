import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';

@Module({name: "CounterModule"})
export default class CounterModule extends VuexModule {
  public count = 0;

  @Mutation
  public increment(delta: number): void {
    this.count += delta;
  }
  @Mutation
  public decrement(delta: number): void {
    this.count -= delta;
  }

  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  public incr(): number {
    return 5;
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  public decr(): number {
    return 5;
  }

  get getCount(): number {
    return this.count;
  }

}
