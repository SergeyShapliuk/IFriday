import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./CardsList.module.css"
import {useFridaySelector} from "../../../n1_main/m2-bll/store";
import {CardType, InitialCardsType} from "../../../n1_main/m2-bll/r1-reducers/cardsReducer";
import TableCardsHeader from "../../../n1_main/m1-ui/common/table/TableHeaderCards";
import CardComponent from "./CardComponent";
import TablesCardsPagination from "./TablesCardsPagination";
import {useDebounce} from "use-debounce";
import {useDispatch} from "react-redux";
import {cardsTC} from "../../../n1_main/m2-bll/r3-thunks/ThunkCards";
import {useParams} from "react-router-dom";
import TestAddCardComponent from "./TestAddCardComponent";
import {cardsActions} from "../../../n1_main/m2-bll/r2-actions/ActionsCards";

type CardsListType = {
    name: string
    user_id: string
}
const CardsList = ({name, user_id}: CardsListType) => {
    const dispatch = useDispatch()
    const {packId} = useParams<'packId'>();
    const [newCard, setNewCard] = useState<boolean>(false)
    const cards = useFridaySelector<CardType[]>(state => state.cards.cards)
    const myId = useFridaySelector<string>(state => state.profile.profile._id)
    const cardsState = useFridaySelector<InitialCardsType>(state => state.cards)
    const cardSearchName = useFridaySelector<string>(state => state.cards.cardQuestion)
    const debouncedCardsOnPage = useDebounce<number>(cardsState.pageCount, 1000)
    const debouncedPageCardsChanged = useDebounce<number>(cardsState.page, 1000)
    const debouncedSearchCardQ = useDebounce<string>(cardsState.cardQuestion, 1000)
    const debouncedSearchCardA = useDebounce<string>(cardsState.cardAnswer, 1000)
    const searchCard = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(cardsActions.searchCardAC(e.currentTarget.value))
    }

    useEffect(() => {
        if (packId) {
            dispatch(cardsTC(packId))
        }
    }, [debouncedCardsOnPage[0], debouncedPageCardsChanged[0], debouncedSearchCardQ[0], debouncedSearchCardA[0]])

    return (
        <div className={style.cardsListBlock}>
            {!newCard
                ? (<div className={style.cardsList}>
                    <div style={{display: 'flex'}}>
                        <h2 className={style.title} style={{color: '&#129040'}}> Pack Name: {name}</h2>
                        <input placeholder={"Search..."} value={cardSearchName} onChange={searchCard}/>
                        {myId === user_id ?
                            <button
                                className={style.buttonSearch}
                                onClick={() => setNewCard(true)}>
                                Add New Card
                            </button>
                            : <></>}

                    </div>
                    <div className={style.cardsBlock}>
                        <TableCardsHeader user_id={user_id}/>
                        {cards?.map((m, i) => {
                            // return <TableCards key={i} cards={m}/>
                            return <CardComponent key={i} c={m}/>
                        })}
                        <TablesCardsPagination/>
                    </div>
                </div>)
                : (
                    <div>
                        <TestAddCardComponent packId={packId} setNewCard={setNewCard}/>
                    </div>
                )}


        </div>
    )
}
export default CardsList;