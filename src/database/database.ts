import { Database } from '@vuex-orm/core'
import CharacterDataWrapper from "@/models/marvel/CharacterDataWrapper";
import CharacterDataContainer from "@/models/marvel/CharacterDataContainer";
import Character from "@/models/marvel/Character";
import Url from "@/models/marvel/Url";
import CharacterSeries from "@/models/marvel/CharacterSeries";

const database = new Database()

database.register(CharacterDataWrapper)
database.register(CharacterDataContainer)
database.register(Character)
database.register(CharacterSeries)
database.register(Url)

export default database
