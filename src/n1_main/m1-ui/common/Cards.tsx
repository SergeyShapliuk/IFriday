import React, {useEffect} from 'react';
import CardsList from "../../../n2_features/f2-packs&cards_YM/b2-cards/CardsList";
import {useFridaySelector} from "../../m2-bll/store";
import {Navigate, useLocation, useParams, useSearchParams} from "react-router-dom";
import {PackType} from "../../m2-bll/r1-reducers/packsReducer";
import {cardsTC} from "../../m2-bll/r3-thunks/ThunkCards";
import {useDispatch} from "react-redux";
import {RoutesXPaths} from "../routes/routes";

const Cards = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useFridaySelector<boolean>(state => state.login.isLoggedIn)
    const {packId} = useParams<'packId'>();
    const actualPack = useFridaySelector<PackType[]>(state => state.packs.cardPacks.filter(f => f._id === packId))[0]

    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setSearchParams({pathCards: location.pathname})
        if (packId) {
            dispatch(cardsTC(packId))
        }
    }, [searchParams])

    console.log(searchParams.get('pathCards'))
    console.log(location.pathname)

    if (!isLoggedIn) {
        return <Navigate to={RoutesXPaths.LOGIN}/>
    }

    return (
        <div>
            <CardsList name={actualPack?.name} user_id={actualPack?.user_id}/>
        </div>
    );
};

export default Cards;