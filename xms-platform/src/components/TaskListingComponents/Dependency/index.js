import React, {Component} from 'react'
import './theme.scss'
import InputBase from '@material-ui/core/InputBase';
import searchIcon from '../../../assets/Sidenavbar-icons/Icon feather-search-small.svg'
import Checkbox from '@material-ui/core/Checkbox';
import { Scrollbars } from 'react-custom-scrollbars';

class DependencyPop extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className={`custme-tsks-lstng-dpndncy-pup ${this.props.styles.popUpMain}`}>
                <div className={`tsks-lstng-dpndnc-sctn ${this.props.styles.dpndncySctn}`}>
                    <div className={`tsk-lstng-dpndnc-inpt-icn ${this.props.styles.inptSctn}`}>
                        <InputBase
                            placeholder="Search Tasks"
                            className={`tsk-lstng-dpnd-srch-inpt ${this.props.styles.srchinpt}`}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <img src={searchIcon} alt="add-tag" className={`src-icn ${this.props.styles.srchIcn}`}></img>
                    </div>
                    <div className={`task-lstng-slct-tsk-dpdncy-ls ${this.props.styles.dpndcyLst}`}>
                        <p className={`tsk-lstng-dpdncy-hdr-tx ${this.props.styles.hdrTxt}`}>{this.props.header.placeholder}</p>
                        <Scrollbars className={`tsk-lstng-dpndncy-cstm-scr ${this.props.styles.cstmScrl}`}>
                            <ul className={`ttsk-lstng-dpndcy-ls ${this.props.styles.ulList}`}>

                                {
                                    this.props.backlogData ? this.props.backlogData.map(tasksList => {
                                        return <li className={`task-lstng-dpndncy-menu d-flex ${this.props.styles.menu}`}>

                                            <div className= {`tsk ${this.props.styles.lstName}`}>
                                                <div className= {`tsk-lstn-dpndncy-chck-bx ${this.props.styles.cgckBx}`}>
                                                    <Checkbox
                                                        className={`tsk-lstn-chckbx ${this.props.styles.lstChck}`}
                                                        onChange={this.props.changeHandle}
                                                        value="checkedA"
                                                        inputProps={{
                                                            'aria-label': 'primary checkbox',
                                                        }}
                                                    />
                                                </div>

                                                <p className= {`dpndncy-ls-nme ${this.props.styles.lstNme}`}>{this.props.taskData.taskTitle}</p>
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
}
export default DependencyPop;