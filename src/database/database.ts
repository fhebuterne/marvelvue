import {Database} from '@vuex-orm/core'
import CharacterDataWrapper from "@/models/marvel/character/CharacterDataWrapper";
import CharacterDataContainer from "@/models/marvel/character/CharacterDataContainer";
import Character from "@/models/marvel/character/Character";
import Url from "@/models/marvel/Url";
import CharacterResults from "@/models/marvel/character/CharacterResults";
import Comic from "@/models/marvel/comic/Comic";
import ComicDataContainer from "@/models/marvel/comic/ComicDataContainer";
import ComicResults from "@/models/marvel/comic/ComicResults";

const database = new Database()

database.register(CharacterDataWrapper)
database.register(CharacterDataContainer)
database.register(Character)
database.register(CharacterResults)

database.register(Comic)
database.register(ComicDataContainer)
database.register(ComicResults)

database.register(Url)

export default database
