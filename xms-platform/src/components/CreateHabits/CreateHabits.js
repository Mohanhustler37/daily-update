import React from 'react';
import './CreateHabits.scss';
import { baseUrl } from "../../constants";
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import BookIcon from "../../assets/icons/LoginAndRegistration_icons/Icon feather-bookmark.svg";
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import CreateTicketTag from "../../assets/icons/01-10-2019/Icon-awesome-tags.svg";
import CreateTicketDownload from "../../assets/icons/01-10-2019/Icon-awesome-tags.svg";
import CreateTicketMore from "../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import CompanyLogo from '../../assets/icons/01-10-2019/company-logo.svg';
import CompanyEditIcon from "../../assets/icons/SVG/Iconfeather-edit-3.svg";
import RequestorProfile from '../../assets/images/profile.png';
import RequestorDropDown from "../../assets/icons/LoginAndRegistration_icons/Icon-ionic-md-arrow-dropdown.svg";
import bellIcon from '../../assets/icons/SVG/Iconfeather-bell.svg'


import hTemplateBooks from '../../assets/icons/LoginAndRegistration_icons/books.png'
import hTemplateWashFace from '../../assets/icons/LoginAndRegistration_icons/wash-face.png'
import hTemplateSleep from '../../assets/icons/LoginAndRegistration_icons/sleep.png'
import hTemplateTimeManagement from '../../assets/icons/LoginAndRegistration_icons/time-management.png'
import hTemplateYoga from '../../assets/icons/LoginAndRegistration_icons/yoga.png'
import hTemplateBook from '../../assets/icons/LoginAndRegistration_icons/books (1).png'
import ticketTypeAvathar from '../../assets/images/profile.png'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import history from "../../Routes/history";


const habitTemplateData = [
  { templateName: 'Must-have habits', templateDscr: 'Small habits, big results', tmplImage: hTemplateBooks },

]

class CreateHabits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketType: '1',
      selectedDate: '',
      checkedA: false,
      sendCopyTarget: "Enter email",
      habitTitle: '',
      location: '',
      habitDescription: '',
      tags: '',
      startTime: '',
      count: '',
      goal: '',
      setTime: '',
      alertTime: 10,
      isSaveTemplateOpen: '',
      saveTemplateText: '',
      getAllHabitTemplates: []

    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token === null || token === undefined || token === '') {
      history.push('/');
    }
    this.fetchHabits();
  }
  fetchHabits = () => {
    const requestBody = {
      query: `
          query {
            getAllHabitTemplates {
              templateName,
            }
          }
        `
    };

    fetch(baseUrl.server, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        //console.log(resData);
        let getAllHabitTemplates = resData.data.getAllHabitTemplates;
        this.setState({ getAllHabitTemplates: getAllHabitTemplates });
      })
      .catch(err => {
        console.log(err);
      });
  };
  submitHandler = event => {
    event.preventDefault();
    const habitTitle = this.state.habitTitle;
    const habitDescription = this.state.habitDescription;
    const location = this.state.location;
    const tags = this.state.tags;
    const startTime = this.state.startTime;
    //const startTime = new Date(time);
    const count = this.state.count;
    const goal = this.state.goal;
    // let requestBody = {
    //   query: `
    //   mutation {
    //     addHabit(
    //       habitTitle: "${habitTitle}",
    //       habitDescription: "${habitDescription}",
    //       location: "${location}",
    //       tags: ${tags},
    //       count: ${count},
    //       startTime:"${startTime}",
    //       setTime:"${startTime}",
    //       goal:"${goal}"){
    //       habitTitle
    //       }
    //     }
    //   `
    // };
    let requestBody = {
      query: `
        mutation AddHabit(
            $habitTitle: String!,
            $habitDescription:String!, 
            $tenantId:Int!,
            $saveTemplateText:String!
          ) 
          {
            addHabit(
              habitTitle: $habitTitle,
              habitDescription: $habitDescription,
              tenantId:$tenantId,
              saveTemplate:$saveTemplateText
            ){
              id
              habitTitle
            }
          }
      `,
      variables: {
        habitTitle: this.state.habitTitle,
        habitDescription: this.state.habitDescription,
        tenantId: Number(1),
        saveTemplateText: this.state.saveTemplateText
        // location: this.state.location,
        // tags: this.state.tags,
        // startTime: this.state.startTime,
        //  startTime = new Date(time),
        // count: this.state.count,
        // goal: this.state.goal,
      }
    };
    fetch(baseUrl.server, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();

      })
      .then(resData => {
        window.location.href = "/habitList"
      })
      .catch(err => {
        console.log(err);
      });
  };

  saveTemplate = () => {
    this.setState({
      isSaveTemplateOpen: true,
      saveTemplateText: "saveTemplate"
    })

  }

  saveTemplateClose = () => {
    this.setState({
      isSaveTemplateOpen: false,
      saveTemplateText: ""
    })
  }

  handleChangeInput = (event) => {
    this.setState({ habitTitle: event.target.value })
  }
  handleChangeInputTwo = (event) => {
    this.setState({ habitDescription: event.target.value })
  }

  handleSaveTemplate = () => {
  }
  handleDateChange(date) {
    this.setState({
      selectedDate: date
    })
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  chooseHandler = startTime => this.setState({ startTime })

  alertIncrementor = () => { }

  alertDecrementer = () => { }

  render() {
    const AntSwitch = withStyles(theme => ({
      root: {
        width: 28,
        height: 16,
        padding: 0,
        margin: 10,
        display: 'flex',
      },
      switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
          transform: 'translateX(12px)',
          color: theme.palette.common.white,
          '& + $track': {
            opacity: 1,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
          },
        },
      },
      thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
      },
      track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
      },
      checked: {},
    }))(Switch);
    return (
      <div className='elements-container'>
        <div>
          <div className="create-habit-container">
            <div className="create-habits-heading-container">
              <div className="create-ticket-left-side">
                <div className="create-habit-heading">
                  <span>Create Habits</span>
                </div>
                <div className="create-habit-sub-heading">
                  <span>Create habits using template</span>
                </div>
              </div>
              <div className="create-ticket-right-side">
                <div className="create-ticket-sub-header-icon-one">
                  <Button variant="contained" className="">
                    <img src={CreateTicketTag} alt="tag"></img>
                  </Button>
                </div>
                <div className="create-ticket-sub-header-icon">
                  <Button variant="contained" className="">
                    {/* <img src={CreateTicketTag} alt="download"></img> */}
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </Button>
                </div>
                <div className="create-ticket-sub-header-icon-two">
                  <Button variant="contained" className="">
                    <img src={CreateTicketMore} alt="more"></img>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='create-habit-body-section'>
          <div className='create-habit-main-section'>
            <div className="create-habit-create-template">
              <div className="create-habit-using-template">
                <img src={BookIcon} alt='BookIcon' />
                <p>Create habits using template</p>
                <AntSwitch value="checkedC" />
              </div>
              <div className="create-habit-choose-template-input">
                <FormControl>
                  <InputLabel htmlFor="demo-controlled-open-select">Choose Template</InputLabel>
                  <div className="create-habit-menu-item">
                    <Select
                      open={this.state.open}
                      onClose={this.handleOpenClose}
                      onOpen={this.handleOpenClose}
                      value={this.state.priority}
                      onChange={e => this.setState({ priority: e.target.value })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="1">Low</MenuItem>
                      <MenuItem value="2">Medium</MenuItem>
                      <MenuItem value="3">High</MenuItem>
                    </Select>
                  </div>
                </FormControl>
              </div>
            </div>

            <div className='separator-section'>
              <hr />
              <span>Create new from scratch</span>
              <hr />
            </div>


            <div className="create-habit-title-profile-section">
              <div className="ticket-title-container">
                <InputBase
                  placeholder="Habit Title"
                  className="ticket-title"
                  name="habitTitle"
                  onChange={e => this.setState({ habitTitle: e.target.value })}
                  value={this.state.habitTitle}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className="ticket-type-container">

                <FormControl>
                  <InputLabel htmlFor="demo-controlled-open-select">Ticket Type</InputLabel>
                  <div className="ticket-type-avathar-dropdown">
                    <Select
                      open={this.state.open}
                      onClose={this.handleOpenClose}
                      onOpen={this.handleOpenClose}
                      value={this.state.ticketType}
                      onChange={e => this.setState({ ticketType: e.target.value })}
                    >
                      <MenuItem value="1">{
                        <div className='ticket-type-template'>
                          <img className='responsible-avathar' src={ticketTypeAvathar} alt='' />
                          <div className='responsible-avathar-description'>
                            <span>responsible</span>
                            <span>Ram</span>
                          </div>
                        </div>
                      }</MenuItem>
                    </Select>
                  </div>
                </FormControl>

              </div>
            </div>



            <div className="create-habit-description-area">
              <TextareaAutosize aria-label="minimum height" rows={3} placeholder="Habit description" name="habitDescription"
                onChange={e => this.setState({ habitDescription: e.target.value })} value={this.state.habitDescription} />
            </div>

            <div className='create-habit-location-tags-section'>
              <div className="create-habit-location-tag-input">
                <InputBase
                  placeholder="Location"
                  className=""
                  name="location"
                  onChange={e => this.setState({ location: e.target.value })}
                  value={this.state.location}
                  inputProps={{ 'aria-label': 'search' }}
                />
                <span></span>
              </div>

              <div className="create-habit-location-tag-input">
                <InputBase
                  placeholder="Tags"
                  className=""
                  name="tags"
                  onChange={e => this.setState({ tags: e.target.value })}
                  value={this.state.tags}
                  inputProps={{ 'aria-label': 'search' }}
                />
                <span><i class="fa fa-plus" aria-hidden="true"></i></span>
              </div>
            </div>

            <div className='create-habit-goal-daily-section'>
              <div className='CHabit-goal-section'>
                <span>GOAL</span>
                <div className='radio-label-section'>
                  <FormControlLabel
                    className='inactive-radio-button'
                    name="goal"
                    onChange={e => this.setState({ goal: e.target.value })}
                    control={<Radio color="primary" />}
                    value="achieveItAll"
                  />
                  <span>Achieve it all</span>
                </div>

                <div className='radio-label-section'>
                  <FormControlLabel
                    className='active-radio-button'
                    control={<Radio color="primary" />}
                    value="reachACertainAmount"
                    name="goal"
                    onChange={e => this.setState({ goal: e.target.value })}
                  />
                  <span>Reach a certain amount</span>
                </div>
              </div>

              <div className='CH-daily-section'>
                <span>DAILY</span>

                <div className="CH-daily-count-input">
                  <InputBase
                    placeholder="Count"
                    className=""
                    name="count"
                    onChange={e => this.setState({ count: e.target.value })}
                    value={this.state.count}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  <span></span>
                </div>

                {/* <div className="CH-daily-set-time-input">
                      <InputBase
                        placeholder="Set time"
                        className=""
                        name="setTime"
                        onChange={e => this.setState({ setTime: e.target.value })}
                        value = {this.state.setTime}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                      <span><i class="fa fa-clock-o" aria-hidden="false"></i></span>
                  </div>   */}

                <div className="CH-daily-set-time-input">
                  <InputBase placeholder="Set time" className="" inputProps={{ 'aria-label': 'search' }} />
                  <div className='customised-date-picker-container'>
                    <DatePicker onChange={this.setTimeHandler} value={this.state.date} clearIcon={null} />
                  </div>
                </div>

                <span className='CH-goal-daily-adder'><i class="fa fa-plus" aria-hidden="true"></i></span>
              </div>
            </div>


            <div className='create-habit-frequency-pickday-section'>
              <div className='CHabit-frequency-section'>
                <span>Frequency</span>
                <div className='radio-label-section'>
                  <FormControlLabel
                    className='active-radio-button'
                    control={<Radio color="primary" />}
                    value="female"
                  />
                  <span>Daily</span>
                </div>

                <div className='radio-label-section'>
                  <FormControlLabel
                    className='inactive-radio-button'
                    control={<Radio color="primary" />}
                    value="female"
                  />
                  <span>Weekly</span>
                </div>

                <div className='radio-label-section'>
                  <FormControlLabel
                    className='inactive-radio-button'
                    control={<Radio color="primary" />}
                    value="female"
                  />
                  <span>Monthly</span>
                </div>

                <div className='radio-label-section'>
                  <FormControlLabel
                    className='inactive-radio-button'
                    control={<Radio color="primary" />}
                    value="female"
                  />
                  <span>Custom</span>
                </div>

              </div>

              <div className='CH-pick-days-section'>
                <span>Pick days</span>
                <div className='CH-daily-section-buttons-container'>
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className='CH-daily-section-button-inactive'
                  >
                    All
                  </Fab>

                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className='CH-daily-section-button-active'
                  >
                    Mon
                  </Fab>

                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className='CH-daily-section-button-inactive'
                  >
                    Tue
                  </Fab>

                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className='CH-daily-section-button-inactive'
                  >
                    Wed
                  </Fab>

                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className='CH-daily-section-button-inactive'
                  >
                    Thu
                  </Fab>

                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className='CH-daily-section-button-active'
                  >
                    Fri
                  </Fab>

                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className='CH-daily-section-button-inactive'
                  >
                    Sat
                  </Fab>

                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className='CH-daily-section-button-inactive'
                  >
                    Sun
                  </Fab>
                </div>
              </div>
            </div>

            <div className='create-habit-date-time-section'>
              <div className='ch-date-picker-container'>
                <span>{this.state.startTime ? moment(this.state.startTime).format('DD:MM:YYYY') : 'Start Date'}</span>
                <DatePicker onChange={this.chooseHandler} value={this.state.startTime} clearIcon={null} />
              </div>

              <div className='ch-time-assigner' >
                <img src={bellIcon} alt='bellIcon' />
                <div className='mins-increment-decrement-section'>
                  <span>10 mins before</span>
                  <span onClick={this.alertIncrementor}>s</span>
                </div>
                <span className='increment-icon'><i class="fa fa-plus" aria-hidden="true" onClick={this.alertDecrementer}></i></span>
              </div>


            </div>


            <div className='ch-email-section'>
              <Checkbox
                className='ch-send-copy-checkBox'
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
              />
              <span>Send a copy</span>

              <FormControl variant="outlined" className='ch-send-copy-target'>
                <Select
                  value={this.state.sendCopyTarget}
                  onChange={'handleChange'}
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <hr />

            <div className='ch-save-submit-buttons-section'>
              <Button variant="contained" className="ch-save-button"
                onClick={this.saveTemplate}
              >
                Save Template
                </Button>

              <Button variant="contained" className="ch-submit-button" onClick={this.submitHandler}>
                Submit
                </Button>
            </div>
          </div>

          <div className='create-habit-right-section'>
            <div className="create-ticket-company-details">
              <div className="create-ticket-company-description">
                <img src={CompanyLogo}></img>
                <div className="create-ticket-company-text">
                  <p className="create-ticket-company-text-one">Company name</p>
                  <p className="create-ticket-company-text-two">short description</p>
                </div>
                <div className="create-ticket-company-details-edit">
                  <img src={CompanyEditIcon}></img>
                </div>
              </div>
              <div className="department-and-team-name">
                <p>Department Name</p>
                <p className="team-name">Team Name</p>
              </div>
              <p className="project-name">Project name</p>
              <div className="requestor-container">
                <img src={RequestorProfile}></img>
                <div className="requestor-text">
                  <p className="requestor-text-one">Requestor</p>
                  <p>Sugatha Maji</p>
                </div>
                <div className="requestor-drop-down">
                  <img src={RequestorDropDown}></img>
                </div>
              </div>
            </div>



            <div className='habit-templates-section'>
              <div className='habit-templates-heading'>
                <span>Habit templates</span>
                <span>See all</span>
              </div>

              {
                habitTemplateData.map(template => {
                  return (
                    <div className='habit-templates-card'>
                      <div className='habit-templates-card-details'>
                        <p>{template.templateName}</p>
                        <p>{template.templateDscr}</p>
                      </div>
                      <div className='habit-templates-card-image'>
                        <img src={template.tmplImage} alt='hTemplateBook' />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.isSaveTemplateOpen}
          onClose={this.saveTemplateClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Habit Template"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div style={{ width: '100%' }}>
                <TextField
                  id="standard-name"
                  label="Habit title"
                  name="habitTitle"
                  value={this.state.habitTitle}
                  onChange={this.handleChangeInput}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="standard-name"
                  label="Habit description"
                  multiline
                  rows="2"
                  name="habitDescription"
                  value={this.state.habitDescription}
                  onChange={this.handleChangeInputTwo}
                  margin="normal"
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={this.saveTemplateClose} color="default">
              Close
          </Button>
            <Button onClick={this.submitHandler}
              className="submit-dialog"
              variant="contained"
            >
              Confirm
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default CreateHabits;
