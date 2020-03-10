import React from 'react';
import './theme.scss';

import { utils } from '../../../../../utilFunctions/utils';
import ProfileItemWithCheckBox from '../../../../ProfileItemWithCheckBox';
import AssignToAvathar from '../../../../AssignToAvathar';
import profileIcon from '../../../../../assets/profile.png';

class MultipleSelectDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEmailDropdown: false,
            selectedItems: []
        }
    }
    createRef = node => this.tagsDropdownRef = node;

    dropdownToggler =event=> {
        if(this.tagsDropdownRef.contains(event.target) ) {
            this.setState({ isShowTagsDrop: true })
        } else {
            this.setState({ isShowTagsDrop: false })
        }
    }
    
    componentDidMount() {
        console.log('this.props.selectedElements', )
        if(typeof(this.props.selectedElements) !== 'object') 
            this.setState({ selectedItems: [this.props.selectedElements] })
        else 
        this.setState({ selectedItems: this.props.selectedElements })
    }

    pushIntoArrayHandler =(element)=> {
        let array = this.state.selectedItems;
        if(!array.includes(element)) 
            array.push(element)
        this.setState({ selectedItems: array })
    }

    render() {
        return (
            <div className="dropdownComponentContainer" ref={this.createRef}>
                <div className='menu-container'>
                    <div className={`dropdownHeaderSection ${this.state.isEmailDropdown ? 'dropdownZindex': ''}`} onClick={()=> this.setState({isEmailDropdown: !this.state.isEmailDropdown})} >
                        {this.props.dropdownIcon ? <img src={this.props.dropdownIcon} alt="emailIcon" /> : null}
                        <div className={`dropdownSelectedItemsHolder ${this.props.checkboxCopy == false ? 'disabled' : ''}`}>
                        {
                            this.state.selectedItems.length > 0 ? this.state.selectedItems.map(item => (
                                <AssignToAvathar 
                                    profileIcon={profileIcon} 
                                    firstName={item.firstName} 
                                    lastName={item.lastName}
                                    onClick={e => { utils.elementPopHandler(this.state.selectedItems, item) }}
                                />
                            )) : <p className="dropdownPlaceholder">{this.props.placeholder}</p>
                        }
                        </div>
                        <img className="email-drp-dwn-img" src={this.props.dropdownTogglerIcon}  />
                    </div>
                    <div className={`dropdownBodySection  ${this.state.isEmailDropdown ? 'dropdownBodyZindex openDropdown ' : 'close-dropdown'}`}>
                        {
                            this.props.itemList ? this.props.itemList.map((item, index) => (
                                <ProfileItemWithCheckBox 
                                    profileIcon={profileIcon} 
                                    firstName={item.firstName}
                                    lastName={item.lastName}   
                                    onClick={()=> this.pushIntoArrayHandler(item)}
                                    onChange={()=> this.pushIntoArrayHandler(item)}
                                    checked={this.state.selectedItems.includes(item)}
                                />
                            )) : 'No users found'
                        }
                    </div>
                </div>
                { this.props.selectedElementsHandler(this.state.selectedItems) }
            </div>
        )
    }
}

export default MultipleSelectDropdown;

