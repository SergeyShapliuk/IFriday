import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import regS from "../a2-register/RegisterForm.module.css";
import {useFridaySelector} from "../../../n1_main/m2-bll/store";
import {RoutesXPaths} from "../../../n1_main/m1-ui/routes/routes";
import {Navigate, NavLink} from 'react-router-dom'
import {passwordRecoveryTC} from "../../../n1_main/m2-bll/r3-thunks/ThunksActionsRegisterAndRecoveryPassReducer";
import {Nullable} from "../../../types/Nullable";

const PasswordRecoveryForm = () => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const error = useFridaySelector<Nullable<string>>(state => state.regForNewPass.e)
    const isLoggedIn = useFridaySelector<boolean>(state => state.login.isLoggedIn)

    const [email, setEmail] = useState<string>('')

    const send = () => {
        dispatch(passwordRecoveryTC(email))
    }

    if (isLoggedIn) {
        return <Navigate to={RoutesXPaths.PROFILE}/>
    }

    return (
        <div className={regS.registerPage}>
            <div className={regS.registerContainer}>
                <div className={regS.titles}>
                    <h1>Cards</h1>
                    <h4>Forgot your password?</h4>
                    <h4>Write your email</h4>
                    {
                        error
                            ? <h6 style={{color: 'red'}}>{error}</h6>
                            : <h5>After entering, visit your email</h5>
                    }
                </div>
                <div className={regS.second}>
                    <input disabled={isLoad}
                        type="text"
                           value={email}
                           onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <div className={regS.buttonsDiv}>
                        <button className={regS.cancelButton} type="button" disabled={isLoad}>
                            <NavLink to={RoutesXPaths.LOGIN} style={{textDecoration: 'none'}}>
                                Cancel
                            </NavLink>
                        </button>
                        <button className={regS.registerButton} onClick={send} disabled={isLoad}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordRecoveryForm