import { Database } from '@vuex-orm/core'
import CharacterDataWrapper from "@/models/marvel/CharacterDataWrapper";

const database = new Database()

database.register(CharacterDataWrapper)

export default database
