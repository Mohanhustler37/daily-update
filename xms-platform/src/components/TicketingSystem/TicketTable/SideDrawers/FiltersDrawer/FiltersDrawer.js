import React from 'react';
import './FiltersDrawer.scss';
  
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import DatePicker from 'react-date-picker';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import incrementIcon from '../../../../../assets/icons/01-10-2019/Group 10948.svg'
import fProjectIcon1 from '../../../../../assets/icons/filter-icons/Icon material-sort-by-alpha.svg';
import fProjectIcon2 from '../../../../../assets/icons/filter-icons/Icon awesome-object-ungroup.svg';
import fProjectIcon3 from '../../../../../assets/icons/filter-icons/Icon awesome-headphones-alt.svg';
import fProjectIcon4 from '../../../../../assets/icons/filter-icons/Icon simple-graphcool.svg';
import fProjectIcon5 from '../../../../../assets/icons/filter-icons/Icon awesome-r-project.svg';
import featherChevronRight from '../../../../../assets/icons/01-10-2019/Icon feather-chevron-right.svg'
import IconFeatherSettings from '../../../../../assets/icons/SVG/Icon feather-filter.svg';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const tags = [
  {id: 1, tagTitle: "Risk"},
  {id: 2, tagTitle: "Critical Customer"},
  {id: 3, tagTitle: "Service Request"}
];


class FiltersDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      dueDate: new Date(),
      fCustomer: '',
      fContact: '',
      fDepartment: '',
      fTeam: '',
      fManager: '',
      fAssignedTo: '',
      fCreatedBy: '',
      personName: [],
      tags: []
    }
  }

  closeFDrawerHandler=()=>{
    this.props.thisObj.setState({isFDrawerOpen: false})
  }

  clearFilterStateHandler=()=> {
    console.log('clearFilterStateHandler')
  }

  SelectMenuChangeHandler =event=> {
    console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }


  chooseStartHandler = date => {
    this.setState({startDate: date})
  }

  chooseDueHandler = date => {
    this.setState({dueDate: date})
  }
  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, [side]: open });
  };

  sideList = side => (
    <div className={'filter-drawer-bodySection'} role="presentation">
      <div className='filter-drawer-heading-section'>
        <img src={IconFeatherSettings} alt='' />
        <p className='filter-drawer-heading'>Filters</p>
        
        
        <Button variant="contained" className='clear-filter-button' onClick={this.clearFilterStateHandler}>
          Clear filter
        </Button>
      </div>

        <div className='filter-drawer-date-range-container'>
          <div className='fd-date-picker-container'>
            <div className='fd-calender-icon-date-container'>
              <DatePicker onChange={this.chooseStartHandler} value={this.state.startDate} clearIcon={null}/>
              <div className='label-date-container'>
                <p>Start date</p>
                <p>{moment(this.state.startDate).format("MMM DD, YYYY")}</p>
              </div>

            </div>
          </div>  
          {/* <div className='start-end-date-seperator'> </div> */}
          <img className='start-end-date-seperator' src={featherChevronRight} alt=''/>
          <div className='fd-date-picker-container'>
            <div className='fd-calender-icon-date-container'>
              <DatePicker  onChange={this.chooseDueHandler} value={this.state.dueDate} clearIcon={null}/>
              <div className='label-date-container'>
                <p>Due date</p>
                <p>{moment(this.state.dueDate).format("MMM DD, YYYY")}</p>
              </div>

            </div>
          </div> 
        </div>

        <div className='flex-dropdown-menu-container'>
          <FormControl variant="outlined" className='customised-dropdown-menu'>
          <InputLabel htmlFor="age-simple">Customer</InputLabel>
            <Select name='fCustomer' value={this.state.fCustomer} onChange={this.SelectMenuChangeHandler} inputProps={{}}>
              <MenuItem value={1}>Customer</MenuItem>
              <MenuItem value={2}>Customer</MenuItem>
              <MenuItem value={3}>Customer</MenuItem>
              <MenuItem value={4}>Customer</MenuItem>

            </Select>
          </FormControl> 


          <FormControl variant="outlined" className='customised-dropdown-menu'>
          <InputLabel htmlFor="age-simple">Contact</InputLabel>
            <Select name='fContact' value={this.state.fContact} onChange={this.SelectMenuChangeHandler} inputProps={{}}>
              <MenuItem value={1}>Contact</MenuItem>
              <MenuItem value={1}>Contact</MenuItem>
              <MenuItem value={1}>Contact</MenuItem>
              <MenuItem value={1}>Contact</MenuItem>
            </Select>
          </FormControl>
        </div>

        <FormControl className='customised-multi-dropdown-menu'>
        <InputLabel htmlFor="age-simple">Keywords</InputLabel>
          <Select name='personName' multiple value={this.state.personName} onChange={this.SelectMenuChangeHandler} input={<Input id="select-multiple-checkbox" />} renderValue={selected => selected.join(', ')} MenuProps={'MenuProps'}> 
            {names.map(name => (  
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <div className='flex-dropdown-menu-container'>
          <FormControl variant="outlined" className='customised-dropdown-menu'>
          <InputLabel htmlFor="age-simple">Department</InputLabel>
            <Select name='fDepartment' value={this.state.fDepartment} onChange={this.SelectMenuChangeHandler} inputProps={{}} >
              <MenuItem value={1}>Department</MenuItem>
              <MenuItem value={2}>Department</MenuItem>
              <MenuItem value={3}>Department</MenuItem>
              <MenuItem value={4}>Department</MenuItem>
              <MenuItem value={5}>Department</MenuItem>
            </Select>
          </FormControl> 


          <FormControl variant="outlined" className='customised-dropdown-menu'>
          <InputLabel htmlFor="age-simple">Team</InputLabel>
            <Select name='fTeam' value={this.state.fTeam} onChange={this.SelectMenuChangeHandler} inputProps={{}} >
              <MenuItem value={1}>Team</MenuItem>
              <MenuItem value={2}>Team</MenuItem>
              <MenuItem value={3}>Team</MenuItem>
              <MenuItem value={4}>Team</MenuItem>
              <MenuItem value={5}>Team</MenuItem>
            </Select>
        </FormControl> 
        </div>   

        <div className='filter-drawer-projects-section'>
         <span>Projects</span>
         <div>
            <div className='fd-projects-icons-container'>
              <div>
                <img src={fProjectIcon1} alt='' /> 
                <span>All</span>
              </div>

              <div>
                <img src={fProjectIcon2} alt='' />  
                <span>All</span>
              </div>

              <div>
                <img src={fProjectIcon3} alt='' />  
                <span>All</span>
              </div>

              <div>
                <img src={fProjectIcon4} alt='' />  
                <span>All</span>
              </div>

              <div>
                <img src={fProjectIcon5} alt='' />  
                <span>All</span>
              </div>
            </div>
            <img  className='fd-projects-icons-adder' src={incrementIcon} alt='' />
         </div>
        </div>

        <div className='flex-dropdown-menu-container'>
          <FormControl variant="outlined" className='customised-dropdown-menu'>
          <InputLabel htmlFor="age-simple">Manager</InputLabel>
            <Select name='fManager' value={this.state.fManager} onChange={this.SelectMenuChangeHandler} inputProps={{ }}>
            <MenuItem value={1}>Manager</MenuItem>
            <MenuItem value={2}>Manager</MenuItem>
            <MenuItem value={3}>Manager</MenuItem>
            <MenuItem value={4}>Manager</MenuItem>
            <MenuItem value={5}>Manager</MenuItem>
            </Select>
          </FormControl> 


          <FormControl variant="outlined" className='customised-dropdown-menu'>
          <InputLabel htmlFor="age-simple">Assigned To</InputLabel>
            <Select name='fAssignedTo' value={this.state.fAssignedTo} onChange={this.SelectMenuChangeHandler} inputProps={{ }}>
              <MenuItem value={1}>Assigned to</MenuItem>
              <MenuItem value={2}>Assigned to</MenuItem>
              <MenuItem value={3}>Assigned to</MenuItem>
              <MenuItem value={4}>Assigned to</MenuItem>
              <MenuItem value={5}>Assigned to</MenuItem>

            </Select>
          </FormControl> 
        </div>  

        <div className='flex-dropdown-menu-container'>
          <FormControl variant="outlined" className='customised-dropdown-menu'>
          <InputLabel htmlFor="age-simple">Created by</InputLabel>
            <Select name='fCreatedBy' value={this.state.fCreatedBy} onChange={this.SelectMenuChangeHandler} inputProps={{ }}>
              <MenuItem value={1}>Created by</MenuItem>
              <MenuItem value={2}>Created by</MenuItem>
              <MenuItem value={3}>Created by</MenuItem>
              <MenuItem value={4}>Created by</MenuItem>
              <MenuItem value={5}>Created by</MenuItem>


            </Select>
          </FormControl> 

          <FormControl className='customised-multi-dropdown-menu-second'>
          <InputLabel htmlFor="age-simple">Tags</InputLabel>
            <Select name='tags' multiple value={this.state.tags} onChange={this.SelectMenuChangeHandler} input={<Input id="select-multiple-checkbox" />} renderValue={selected => selected.join(', ')} MenuProps={'MenuProps'}>
              {tags.map(tag => (
                <MenuItem key={tag.id} value={tag.id}>
                  <Checkbox checked={this.state.tags.indexOf(tag) > -1} />
                  <ListItemText primary={tag.tagTitle} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>          
        </div>    

              <hr/>

        <div className='filter-bottom-buttons'>
          <Button variant="contained" className="ch-save-button" onClick={this.closeFDrawerHandler}>
            Cancel
          </Button>

          <Button variant="contained" className="ch-submit-button">
            Save
          </Button>
        </div>
       
    </div>
  );

  render() {
    return (
      <div>
        {/* {this.props.isFDrawerOpen ? <div className='drawer-closer' onClick={this.closeFDrawerHandler}></div> : null} */}
        <Drawer anchor="right" open={this.props.isFDrawerOpen} onClose={this.toggleDrawer('right', false)} className='filters-drawer'>
        {this.sideList('right')}
      </Drawer>
      </div>

    )
  }

}

export default FiltersDrawer;
