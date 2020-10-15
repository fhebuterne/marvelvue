import { Database } from '@vuex-orm/core'
import CharacterDataWrapper from "@/models/marvel/CharacterDataWrapper";
import CharacterDataContainer from "@/models/marvel/CharacterDataContainer";
import Character from "@/models/marvel/Character";
import ComicList from "@/models/marvel/ComicList";
import ComicSummary from "@/models/marvel/ComicSummary";
import EventList from "@/models/marvel/EventList";
import EventSummary from "@/models/marvel/EventSummary";
import Image from "@/models/marvel/Image";
import SeriesList from "@/models/marvel/SeriesList";
import SeriesSummary from "@/models/marvel/SeriesSummary";
import StoryList from "@/models/marvel/StoryList";
import StorySummary from "@/models/marvel/StorySummary";
import Url from "@/models/marvel/Url";

const database = new Database()

database.register(CharacterDataWrapper)
database.register(CharacterDataContainer)
database.register(Character)
database.register(ComicList)
database.register(ComicSummary)
database.register(EventList)
database.register(EventSummary)
database.register(Image)
database.register(SeriesList)
database.register(SeriesSummary)
database.register(StoryList)
database.register(StorySummary)
database.register(Url)

export default database
