import React from 'react'
import './theme.scss'
import TextField from '@material-ui/core/TextField';
import { Scrollbars } from 'react-custom-scrollbars';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';

const AssignPopup = props=> {
    let {popMain, asgnDtls, hdreSctn, toglr, hdrTxt, srchBr, srchFild, srchIcnSctn, icnSrch, prfl,
        scrl, prflLst, asgnMenu, prflName, MnuPrfl, prfllbl, chckBx, asgnChckBx} = props.styles;

    return(
        <div className={`${popMain} assign-pop-main `}>
        <div className={`${asgnDtls} assign-pop-bdy`}>
            <div className={`${hdreSctn}`}>
                <img className={`${toglr}`} src={props.toogglerIcn} alt='' onClick={props.sidebarToggler}/>
                <p className={`${hdrTxt} asgn-hdr-txt`}>{props.assignText.placeholder}</p>
            </div>
            <div className={`${srchBr} srch-br`}>
                <InputBase
                    placeholder="Search people"
                    className={`${srchFild} asgn-srch-fld`}
                    inputProps={{ 'aria-label': 'search' }}
                    onClick={props.changeSearch}
                />
                <div className={`${srchIcnSctn}`}>
                    <img className={`${icnSrch} icn-srch`} src={props.searchIcon} alt='searchIcon' />
                    </div>
            </div>
            <div className={`${prfl} prfl`}>
                <Scrollbars className={`${scrl} cstm-scrl`}>
                    <ul className={`${prflLst} prfl-lst`}>

                        {
                            props.users != null || props.users != undefined ?
                                props.users.map(user => {
                                    return <li className={`${asgnMenu} asg-mnu`}>

                                        <div className={`${prflName} prfl-nm`}>
                                            <img className={`${MnuPrfl} mnu-prfl`} src={props.taskListProfile} alt=""></img>
                                            <p className={`${prfllbl} prfl-lbl`}>{user.firstName} {user.lastName}</p>
                                        </div>
                                        <div className={`${chckBx} chk-bx`}>
                                            <Checkbox
                                                className={`${asgnChckBx} asgn-chk-bx`}
                                                onChange={props.handleChangeAssignTo(props.taskData, user.id)}
                                                value="checkedA"
                                                checked={props.assignedUser == user.id}
                                                inputProps={{
                                                    'aria-label': 'primary checkbox',
                                                }}
                                            />
                                        </div>
                                    </li>
                                }) : null

                        }

                    </ul>
                </Scrollbars>
            </div>
        </div>
    </div>
    )
}
export default AssignPopup;