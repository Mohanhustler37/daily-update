import React from 'react'
import './theme.scss'
import Checkbox from '@material-ui/core/Checkbox'
import { Scrollbars } from 'react-custom-scrollbars'
import InputBase from '@material-ui/core/InputBase'
import { CirclePicker, TwitterPicker } from 'react-color'
import tskLstngClrAdd from '../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Group 11594.svg'
import ClrPckrTray from '../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/ionic-ios-color-palette.svg'
import PrvcyIcn from '../../../assets/icons/assets_Task list_2019-11-20/Tsk_lst_tgs/Icon feather-lock.svg'

const ColorPcikerPop = props =>{
    return  (
        <div className={`ppup-fr-one ${props.styles.popupOne}`}>
    <div className={`tsks-lstng-clr-sctn ${props.styles.clrSctn}`}>
        <p className={`tsk-lstng-clr-pckr-hdr-txt ${props.styles.clrHdrTxt}`}>MY TAGS</p>

        <div className={`task-lstng-clr-pckr-lst ${props.styles.clrPckrLst}`}>
            <Scrollbars className={`custom-scroll ${props.styles.cstScrl}`}>
                <ul className={`tsk-lstng-clr-pckr-popup-lst ${props.styles.popupLst}`}>

                    {
                        props.colorPicker.map(user => {
                            return <li className={`tasks-lstng-clr-pckr-menu d-flex justify-space-between ${props.styles.pckrMenu}`}>

                                <div className={`tsk-lstng-lst-name d-flex align-items-center ${props.styles.lstname}`}>
                                    <div className={`tsk-lstng-chck-bx ${props.styles.chckBox}`}>
                                        <Checkbox
                                            className={`tsk-lstng-asgn-chckbx ${props.styles.asgnChkBx}`}
                                            onChange={props.handleChange}
                                            value="checkedA"
                                            inputProps={{
                                                'aria-label': 'primary checkbox',
                                            }}
                                        />
                                    </div>

                                    <p className={`lst-nme ${props.styles.listname}`}>{user.title}</p>

                                </div>
                                <div className= {`menu-profile ${props.menuPrf}`} style={{ background: user.color }}></div>
                            </li>
                        })

                    }

                </ul>
            </Scrollbars>
        </div>
        <hr className= {`tsk-lstng-brk ${props.styles.brk}`}></hr>
        <div className= {`tsk-lstng-inpt-add ${props.styles.add}`}>
            <InputBase
                placeholder="Enter tag name"
                className= {`tsk-lstng-clr-pckr-srch-inpt ${props.styles.srchInpt}`}
                inputProps={{ 'aria-label': 'search' }}
            />
            <img src={tskLstngClrAdd} alt="add-tag" className={`add-icn ${props.styles.addIcn}`}></img>
        </div>
        <div className= {`tsk-lstng-clrs-slct-sctn ${props.styles.slctSctn}`}>
            <img src={ClrPckrTray} alt="tray" className={`tgs-clr-pckr-tray ${props.styles.tray}`}
                onClick={props.isShowColorPallet }
            ></img>
            {props.pallet ? props.palletPop : null}
            <div className= {`tgs-crcl-clr-pckr ${props.styles.picker}`}>
                <CirclePicker colors={props.color} circleSize={12} circleSpacing={2} onChangeComplete={props.handleChangeComplete} className={`tsk-lstng-clrs ${props.styles.lstngClr}`} />
            </div>
        </div>
        <div className= {`prvcy-icn-txt${props.styles.icnTxt}`}>
            <img className={`prvcy-lck ${props.styles.prcyIcn}`} src={PrvcyIcn} alt="privacy-icn"></img>
            <label className= {`mke-prvt-txt ${props.styles.mkTxt}`}>Make it private</label>
            <Checkbox
                className= {`tsk-lstng-prvcy-chckbx ${props.styles.clrSctn}`}
                onChange={props.handleChange}
                value="checkedA"
                inputProps={{
                    'aria-label': 'primary checkbox',
                }}
            />
        </div>

    </div>
</div>
    )
    
}

export default ColorPcikerPop;