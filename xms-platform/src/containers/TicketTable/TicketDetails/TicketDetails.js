import React from 'react'
import './TicketDetails.scss';
import Button from '@material-ui/core/Button';
import TicketsCollapsableSection from '../TicketsCollapsableSection/TicketsCollapsableSection';
import Header from '../../Header/Header';
import SubHeaderTicketDetails from './SubHeaderTicketDetails/SubHeaderTicketDetails';
import statusDoneIcon from '../../../assets/icons/SVG/Group-11792.svg'
import assignToIcon from '../../../assets/profile.png'
import MainLayout from '../../MainLayout/MainLayout';
import moreIcon from '../../../assets/icons/SVG/Group-11752.svg';
import mailIcon from '../../../assets/icons/SVG/Icon-feather-mail.svg'
import linkIcon from '../../../assets/icons/SVG/Icon-grey-link.svg'
import phoneIcon from '../../../assets/icons/SVG/Icon-feather-phone.svg'
import webIcon from '../../../assets/icons/SVG/Icon-feather-globe.svg'
import addressIcon from '../../../assets/icons/SVG/Icon-awesome-address-book.svg';
import attacheIcon from '../../../assets/icons/SVG/Icon-metro-attachment.svg';
import fullScreenIcon from '../../../assets/icons/SVG/Icon-ionic-md-expand.svg';
import priorityIcon from '../../../assets/icons/SVG/Group-11789.svg';
//import pdfIcon from '../../../assets/icons/SVG/icon-metro-file-pdf.svg';
import closeIcon from '../../../assets/icons/SVG/Group-11753.svg';
import history from "../../../Routes/history";
import doneIcon from '../../../assets/icons/SVG/Group-11771.svg'
import {
    getAllCompanies, getCompanyById, getPriorityById, getAllUsersData,
    getStatusById
} from "../../../graphQl/companyDetailQueries";
import TicketDetailsCard from "./TicketDetailsCard/TicketDetailsCard";

const tickesViewPermisionBtns = [
    { id: 0, name: 'All', count: 7 },
    { id: 1, name: 'Public', count: 4 },
    { id: 2, name: 'Alinternal Notes', count: 1 },
    { id: 3, name: 'Attachments', count: 2 },
    { id: 4, name: 'Activity Log', count: '' }
]

const stepperSteppes = [
    { id: 1, stepperIndex: '1', status: 'done', notification: true, verticleStepper: [] },
    { id: 2, stepperIndex: '2', status: 'done', notification: true, verticleStepper: [] },
    { id: 3, stepperIndex: '3', status: 'inProgress', notification: false, verticleStepper: [] },
    {
        id: 4, stepperIndex: '4', status: 'notDone', notification: true, verticleStepper: [
            { id: 1, stepperIndex: '4.1', status: 'notDone', notification: false },
        ]
    },
    {
        id: 5, stepperIndex: '5', status: 'notDone', notification: true, verticleStepper: [
            { id: 1, stepperIndex: '5.1', status: 'notDone', notification: false },
            { id: 2, stepperIndex: '5.2', status: 'notDone', notification: true, },
        ]
    },

]
let clientData = "";
class TicketDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonId: 0,

            commpanyApiData: [],
            companyDetails: ""
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (token === null || token === undefined || token === '') {
            history.push('/');
        }
        clientData = this.props.client;
        this.getAllCompaniesData();
        this.getCompanyDataById();
        this.getPriorityDataById();
        this.getAllUsers();
        this.getStatusDataById();
    }

    viewPermissionButton = (id) => {
        this.setState({ buttonId: id })
    }

    // ------------Get Company Details--------- //
    getAllCompaniesData = async () => {
        const result = await getAllCompanies(clientData);
        if (result) {
            if (this.state.companyApiData == '' || this.state.companyApiData == undefined
                || this.state.companyApiData == null) {
                this.setState({ companyApiData: result })
            }
        }
    }
    getCompanyDataById = async () => {
        const compId = this.props.location.state.ticketData.companyId;
        const result = await getCompanyById(clientData, compId);
        if (result) {
            this.setState({ companyDetails: result })
        }
    }
    getPriorityDataById = async () => {
        const priorityId = this.props.location.state.ticketData.priorityId;
        const result = await getPriorityById(clientData, priorityId);
        if (result) {
            this.setState({ priorityData: result })
        }
    }
    getAllUsers = async () => {
        const result = await getAllUsersData(clientData);
        if (result) {
            this.setState({ usersData: result });
        }
    }
    getStatusDataById = async () => {
        const statusid = this.props.location.state.ticketData.statusId;
        const result = await getStatusById(clientData, statusid)
        if (result) {
            this.setState({ statusData: result });
        }
    }
    bodySection = () => {
        const compData = this.props.location.state.ticketData;
        return (
            <div className='ticketDetailsContainer'>
                <Header />
                <SubHeaderTicketDetails ticketDetails={compData} />
                <div className='ticketDetailsBodySection'>

                    {/* --------------------ticketDetailsMainSection-------------------- */}
                    <div className='ticketDetailsMainSection'>

                        <div className='ticketDetailsStepper'>
                            {
                                stepperSteppes.map((step, index) => (
                                    <div className='stepperContainer'>
                                        {index !== 0 ? <hr className='leftHr' /> : null}<div className={`horizontalStepperStep ${step.status == 'done' ? 'stepperDone' : step.status == 'inProgress' ? 'stepperInProgress' : step.status == 'notDone' ? 'stepperPending' : null}`}>{step.stepperIndex}{step.status === 'done' ? <img className='stepperDoneIcon' src={doneIcon} /> : null} {step.notification ? <i class="fa fa-star stepperNotification" aria-hidden="true"></i> : null}</div>{index !== stepperSteppes.length - 1 ? <hr className='rightHr' /> : null}
                                        <div className='varticleStepperContainer'>
                                            {
                                                step.verticleStepper ? step.verticleStepper.map((vStep, index) => (
                                                    <>{index !== 0 ? <div className='vl downVl' /> : null} <div className={`verticleStepperStep  ${step.status == 'done' ? 'stepperDone' : step.status == 'inProgress' ? 'stepperInProgress' : step.status == 'notDone' ? 'stepperPending' : null}`}>{vStep.stepperIndex}{vStep.status === 'done' ? <img className='stepperDoneIcon' src={doneIcon} /> : null} {vStep.notification ? <i class="fa fa-star stepperNotification" aria-hidden="true"></i> : null} </div>{index !== 0 ? <div className='vl upVl' /> : null}</>
                                                )) : null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='cardPermissionBtnsContainer'>
                            {
                                tickesViewPermisionBtns.map(button => {
                                    return <Button className={`viewPermission ${this.state.buttonId === button.id ? 'viewPermissionActive' : null}`} variant="contained" onClick={() => this.viewPermissionButton(button.id)}>{button.name}  {button.count ? '(' + button.count + ')' : null}</Button>
                                })
                            }
                            <Button className='expandAllCardsButton' variant="contained"><img className='fullScreenIcon' src={fullScreenIcon} alt='fullScreenIcon' />EXPAND ALL</Button>
                        </div>

                            <TicketDetailsCard/>

                    </div>
                    {/* --------------------ticketDetailsMainSection-------------------- */}







                    {/* --------------------ticketDetailsSubSection-------------------- */}
                    <div className='ticketDetailsSubSection'>
                        {/* --------------------ticketDetailsSubSection-------------------- */}
                        <div className='ticketDetailsStatusCard'>
                            <div className='statusSection'>
                                <img src={statusDoneIcon} alt='statusDoneIcon' />
                                <div className='statusWrapper'>
                                    <label>STATUS</label>
                                    <label>
                                        {
                                            this.state.statusData ? this.state.statusData.statusName : ""
                                        }
                                    </label>
                                </div>
                            </div>
                            {
                                console.log("STATUS", this.state.statusData)
                            }
                            <hr />
                            <div className='assignToSection'>
                                <img src={assignToIcon} alt='assignToIcon' />
                                <div className='statusWrapper'>
                                    <label>STATUS</label>
                                    <label>IN PROGRess</label>
                                </div>
                            </div>
                        </div>
                        {/* ---------------------- Sub ticket information section------------------------- */}
                        <div className='ticketInformationContainer'>
                            <label className='heading'>Ticket Information</label>

                            <div className='typeRow rowCommonStyle'>
                                <label className='rowHeading'>Type</label>
                                <label className='ticketType'>
                                    {
                                        compData ? compData.ticketType : ""
                                    }
                                    
                                </label>
                            </div>


                            <div className='ticketTagsRow rowCommonStyle'>
                                <label className='rowHeading'>Tags</label>
                                <label className='ticketTags'>
                                    {compData ? compData.tags ? compData.tags.map(data => {
                                        return <label>{data}&nbsp;</label>
                                    }) : "" : ''}
                                    {console.log("compData_compData", this.props)}
                                    {/* 
                                        <label>Risk </label>
                                        <label>Phase1</label> 
                                    */}
                                    <img src={moreIcon} alt='moreIcon' />
                                </label>
                            </div>

                            <div className='ticketPriorityRow rowCommonStyle'>
                                <label className='rowHeading'>Priority</label>
                                <label className='ticketPriority'>
                                    <label>
                                        {
                                            this.state.priorityData ? this.state.priorityData.priorityname : ""
                                        }
                                    </label>
                                </label>
                            </div>

                            <div className='ticketDueDateRow rowCommonStyle'>
                                <label className='rowHeading'>Due date</label>
                                <label className='ticketDueDate'>28 Sep, 2019</label>
                            </div>

                            <div className='ticketEstimatedTimeRow rowCommonStyle'>
                                <label className='rowHeading'>Estimated Time</label>
                                <label className='ticketEstimatedTime'>4hrs 30mins</label>
                            </div>

                            <div className='ticketReporterRow rowCommonStyle'>
                                <label className='rowHeading'>Reporter</label>
                                <label className='ticketReporter'>
                                    <img src={assignToIcon} alt='' />
                                    <label>
                                        {/* Ryan pazos */}
                                        {
                                            this.state.usersData ? this.state.usersData.map(data => {
                                                if (compData.managerId == data.id) {
                                                    return data.firstName
                                                }
                                            }) : ""
                                        }
                                    </label>
                                </label>
                            </div>
                        </div>
                        {/* --------------------ticketDetailsSubSection-------------------- */}





                        {/* --------------------companyInformationContainer-------------------- */}
                        <div className='companyInformationContainer'>
                            <label className='heading'>Company Information</label>

                            <div className='companyNameRow rowCommonStyle'>
                                <label className='rowHeading'>Company</label>
                                <label className='companyName'>
                                    {
                                        this.state.companyDetails ?
                                            this.state.companyDetails.companyName : "Company Name"
                                    }
                                </label>
                            </div>


                            <div className='contactRow rowCommonStyle'>
                                <label className='rowHeading'>Contact</label>
                                <label className='ticketReporter'>
                                    <img src={assignToIcon} alt='' />
                                    <label>
                                        {
                                            this.state.companyDetails ?
                                                this.state.companyDetails.companyPrimaryContact : "Contact Name"
                                        }
                                    </label>
                                </label>
                            </div>

                            <div className='emailRow rowCommonStyle'>
                                <label className='rowHeading'><img src={mailIcon} alt='mailIcon' />Email</label>
                                <label className='email'>
                                    {
                                        this.state.companyDetails ?
                                            this.state.companyDetails.email : "Email"
                                    }
                                </label>
                            </div>

                            <div className='PhoneRow rowCommonStyle'>
                                <label className='rowHeading'><img src={phoneIcon} alt='phoneIcon' /> Phone</label>
                                <label className='Phone'>
                                    {
                                        this.state.companyDetails ?
                                            this.state.companyDetails.phone : "Phone"
                                    }
                                </label>
                            </div>


                            <div className='webRow rowCommonStyle'>
                                <label className='rowHeading'><img src={webIcon} alt='webIcon' /> Web</label>
                                <label className='web'>
                                    {
                                        this.state.companyDetails ?
                                            this.state.companyDetails.website : ""
                                    }
                                </label>
                            </div>


                            <div className='addressRow rowCommonStyle'>
                                <label className='rowHeading'><img src={addressIcon} alt='webIcon' /> Address</label>
                                <label className='address'>4580 Weaver Parkway Suite 202, Warrenville</label>
                            </div>
                        </div>
                        {/* --------------------companyInformationContainer-------------------- */}


                    </div>
                </div>
            </div>
        )
    }

    render() {
        console.log("PROPS DATA", this.props.location.state.ticketData);
        return (
            <MainLayout secondSidebar={<TicketsCollapsableSection allState={this.state} thisObj={this} />} bodySection={this.bodySection()} />
        )
    }
}

export default TicketDetails;