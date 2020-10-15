import Vue from 'vue';
import Vuex from 'vuex';
import database from '@/database/database';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import axios from 'axios';

//Vue.use(Vuex)
VuexORM.use(VuexORMAxios, { axios, baseURL: 'https://gateway.marvel.com/v1/public', })

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})

export default store
