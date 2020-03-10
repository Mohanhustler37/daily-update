import React, {Component} from 'react';
import './TicketDetailsCards.scss';
import assignToIcon from '../../../../assets/profile.png';
import linkIcon from '../../../../assets/icons/SVG/Icon-grey-link.svg';
import attacheIcon from '../../../../assets/icons/SVG/Icon-metro-attachment.svg';
import fullScreenIcon from '../../../../assets/icons/SVG/Icon-ionic-md-expand.svg';
import priorityIcon from '../../../../assets/icons/SVG/Group-11789.svg';
import closeIcon from '../../../../assets/icons/SVG/Group-11753.svg';
import statusDoneIcon from '../../../../assets/icons/SVG/Group-11792.svg';
import Button from '@material-ui/core/Button';

const cards = [
    {id:0, icon:assignToIcon, name: 'John Doe', time: '15 minutes ago', title: 'Dear Ryan, Urgent, please call!', enlarge: fullScreenIcon},
    {id:1, icon:assignToIcon, name: 'Ryan Pazos', time: '50 minutes ago', title: 'Dear John, The issue has been solved!', enlarge: fullScreenIcon},
    {id:2, icon:assignToIcon, name: 'Varun', time: '1 hour ago', title: 'Order number #xxx xx xxx xxxx need to take...', enlarge: fullScreenIcon}
];
class TicketDetailsCard extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="tckts-dtls-bdy-crd">

                <div className='ticketDescriptionCard'>
                    <div className='cardHeader'>
                        <div className='cardAvathar'>
                            <img src={assignToIcon} alt='' />
                            <div>
                                <label>John Doe</label>
                                <label>13 minutes ago</label>
                            </div>
                        </div>

                        <div className='cardHeaderRightSection'>
                            <div className='permalink'><img src={linkIcon} alt='linkIcon' /><label>Permalink</label></div>
                            <label className='verticalDevaider'></label>
                            <div className='attachCount'><img src={attacheIcon} alt='linkIcon' /><label>3</label></div>
                            <img className='fullScreenIcon' src={fullScreenIcon} alt='fullScreenIcon' />
                        </div>
                    </div>

                    <div className='cardBody'>
                        <div className='cardMessageSection'>
                            <p>Dear John,</p>
                            <p>We would like to inform you that your issue has been solved and we are closing the ticket. You can again reopen  this ticket anytime.</p>
                            <p>Thanks for giving us the opportunity to work with you</p>
                            <p>Regards,</p>
                            <p>Ryan Pazos</p>
                        </div>


                        <div className='attachementsConatiner'>
                            <div className='attachmentIcon'>
                                <img className='priorityIcon' src={priorityIcon} alt='priorityIcon' />
                                <label>Errorscre.pdf</label>
                                <img className='closeIcon' src={closeIcon} alt='closeIcon' />
                            </div>
                        </div>
                    </div>
                    <div className='cardFooter'>
                        <div className='statusPriorityContainer'>
                            <div className='statusSection'>
                                <img src={statusDoneIcon} alt='statusDoneIcon' />
                                <div className='statusWrapper'>
                                    <label>status</label>
                                    <label>In Progress</label>
                                </div>
                            </div>

                            <div className='prioritySection'>
                                <img src={priorityIcon} alt='priorityIcon' />
                                <div className='statusWrapper'>
                                    <label>Priority</label>
                                    <label>High</label>
                                </div>
                            </div>
                        </div>
                        <Button className='cardMoreButton' variant="contained">More</Button>

                    </div>
                </div>
                <div className="tsk-mltipl-crds">
                    {
                        cards.map(mCards=>{
                            return <div className="slct-crds-in-mltpl-crds">
                                        <div className="card-header">
                                            <div className='card-prfl'>
                                                <img src={assignToIcon} alt='' />
                                                <div className="crd-prf-nm-lst-seen">
                                                    <label>{mCards.name}</label>
                                                    <label>{mCards.time}</label>
                                                </div>
                                            </div>
                                            <div className="crd-ttle-area">
                                                <label className="crd-ttl-txt">{mCards.title}</label>
                                            </div>

                                            <div className='crd-hdr-rght-sctn'>
                                                <img className='fullScreenIcon-icon' src={fullScreenIcon} alt='fullScreenIcon' />
                                            </div>
                                        </div>
                                    </div>
                        }  
                        )
                    }
                </div>
            </div>
        )
    }
}
export default  TicketDetailsCard;