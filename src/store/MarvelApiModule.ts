import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import axios from 'axios';
import {Md5} from 'ts-md5/dist/md5';

@Module({name: "MarvelApiModule"})
export default class MarvelApiModule extends VuexModule {
  public data: any = "test";

  @Mutation
  public setData(data: any): void {
    this.data = data;
  }

  @Action({ commit: 'getData' })
  public incr() {
    const timestamp = new Date().getTime()
    const privateKey = process.env.MARVEL_PRIVATE_KEY;
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const hash = Md5.hashStr(timestamp + privateKey + publicKey);

    axios.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}`)
        .then(value => {
          this.setData(value);
        })
  }

  get getData(): any {
    return this.data;
  }

}
