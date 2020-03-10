import React from 'react'
import { Route, Switch, Router } from 'react-router-dom';
import history from '../Routes/history';
import Login from "../containers/Login/Login";
import CreateTicket from "../components/TicketingSystem/CreateTicket/CreateTicket";
import Ticketlisting from "../components/TicketingSystem/TicketingSystem";
import Layout from "../components/Layout/Layout";
import CreateTask from "../components/TicketingSystem/CreateTask/CreateTask";
import HabitTemplate from "../components/HabbitTemplate/Habittemplate";
import Registration from "../containers/Registration/Registration"
import gRegistration from "../containers/Registration/gRegistration"
import RegistrationCompanyDetails from "../containers/Registration/RegistrationCompanyDetails";
import RegistrationUserDetails from "../containers/Registration/UserDetails";
import ResetPassword from "../containers/Registration/ResetPassword";
import ChangePassword from "../containers/Registration/ChangePassword";
import Confirmation from "../containers/Registration/Confirmation";
import ForgotPassword from "../containers/Registration/ForgotPassword";
import Congratulation from '../containers/Registration/Congratulation';
// import AgentAssign from "../components/TicketingSystem/AgentTicketIngSystem/agentTicketSchema";
import GridView from "../components/TicketingSystem/GridView/GridView"
import RegistrationStepper from "../containers/Registration/RegistrationUsingStepper";
import CreateHabits from "../components/CreateHabits/CreateHabits";
import HabitsList from "../components/TicketingSystem/HabitList/HabitList";
import { Redirect } from "react-router-dom";
import ChatWindow from '../containers/ChatWindow/ChatWindow';
import TicketTable from '../containers/TicketTable/TicketTable';
import PrivacyPolicy from "../containers/TermsAndPolicy/PrivacyPolicy";
import TermsOfUse from "../containers/TermsAndPolicy/TermsOfUse";
import Help from "../containers/TermsAndPolicy/Help";
import Chat from '../containers/Chat/Chat';
import Taskdetails from '../containers/Taskdetails/Taskdetails';
import OkrListing from '../containers/OkrListing/OkrListing';
import HabitListing from '../components/CreateHabitDrawer/CreateHabitDrawer';
import TicketDetails from '../containers/TicketTable/TicketDetails/TicketDetails';
import FooterButton from "../components/FooterButtonWithCheckBox/index";

import LoginNew from '../containers/Registration/LoginNew/LoginNew';

import Tasks from "../containers/NewTaskListing/NewTaskListing"
import NewTaskDetails from "../containers/NewTaskListing/TaskDetails/TaskDetails";
import OkrObjectives from '../containers/OkrObjectives';
import OtpAuthentication from '../containers/Registration/Otpathentication/otpathentication'
class Routes extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/oldlogin' component={Login} />
          <Route path='/registration' component={Registration} />
          <Route path='/rConfirmation/:token' component={gRegistration} />
          <Route path='/confirmation/:token' component={Confirmation} />
          {/* <Route path='/uploadhabits' component={UploadHabits} /> */}
          <Route path='/resetpassword/:token' component={ResetPassword} />
          <Route path='/changepassword' component={ChangePassword} />
          <Route path='/forgotpassword' component={ForgotPassword} />
          <Route path='/ticketTable' component={() => <Ticketlisting client={this.props.client} />} />
          {/* <Route path='/agentlisting' component={AgentAssign} /> */}
          <Route path="/gridView" component={GridView} />
          <Route path='/createtask' component={() => <CreateTask client={this.props.client} />} />
          <Route path='/habitList' component={() => <HabitsList client={this.props.client} />} />
          <Route path='/createticket' component={() => <CreateTicket client={this.props.client} />} />
          <Route path='/tasks' component={() => <Tasks client={this.props.client} />} />
          {/* <Route path='/tasksDetails' component={() => <TasksDetails client={this.props.client} />} /> */}
          <Route path='/habitTemplate' component={HabitTemplate} />
          <Route path='/taskDetails' render={(props) => <NewTaskDetails {...props} client={this.props.client} />} />
          <Route path='/chat' component={() => <Chat client={this.props.client} />} />
          <Route path='/privacy' component={PrivacyPolicy} />
          <Route path='/termsOfUse' component={TermsOfUse} />
          <Route path='/help' component={Help} />
          <Route path='/ticketlisting' component={() => <TicketTable client={this.props.client} />} />
          <Route path='/chatWindow' component={() => <ChatWindow client={this.props.client} />} />
          <Route path='/OkrListing' component={() => <OkrListing client={this.props.client} />} />
          <Route path='/HabitListing' component={() => <HabitListing client={this.props.client} />} />
          <Route path='/ticketDetails' render={(props) => <TicketDetails {...props} client={this.props.client} />} />
          <Route path='/okrobjectives' component={OkrObjectives} />
          <Route path='/otpauthentication' component={OtpAuthentication} />
          <Route path='/' component={LoginNew} client={this.props.client}/>
          <Layout>
            <Route path='/createHabits' component={CreateHabits} />
            {/* <Route path='/habitList' component={HabitsList} /> */}
            <Route path='/companydetails' component={RegistrationCompanyDetails} />
          </Layout>

        </Switch>
      </Router>
    )
  }
}

export default Routes;
