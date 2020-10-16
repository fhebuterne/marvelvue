import {Database} from '@vuex-orm/core'
import CharacterDataWrapper from "@/models/marvel/character/CharacterDataWrapper";
import CharacterDataContainer from "@/models/marvel/character/CharacterDataContainer";
import Character from "@/models/marvel/character/Character";
import Url from "@/models/marvel/Url";
import CharacterResults from "@/models/marvel/character/CharacterResults";
import Comic from "@/models/marvel/comic/Comic";
import ComicDataContainer from "@/models/marvel/comic/ComicDataContainer";
import ComicResults from "@/models/marvel/comic/ComicResults";
import Event from "@/models/marvel/event/Event";
import EventDataContainer from "@/models/marvel/event/EventDataContainer";
import EventResults from "@/models/marvel/event/EventResults";

const database = new Database()

database.register(Url)

database.register(CharacterDataWrapper)
database.register(CharacterDataContainer)
database.register(Character)
database.register(CharacterResults)

database.register(Comic)
database.register(ComicDataContainer)
database.register(ComicResults)

database.register(Event)
database.register(EventDataContainer)
database.register(EventResults)

export default database
