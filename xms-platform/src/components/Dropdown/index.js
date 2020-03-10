import React from 'react';
import './theme.scss';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }
    container = React.createRef();

    componentDidMount() {
        document.addEventListener("mousedown", this.clickOutSide);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.clickOutSide);
    }
    clickOutSide= event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    render() {
        let { mainContainer, container, placeholder, toggleIcon, dropdownIcon, dropdownBody } = this.props.styles;
        return (
            <div className={`customeDropdownContainer ${mainContainer} ${ this.state.open ? 'openStateZindex': 'closedStateZindex'}` } ref={this.container} onClick={()=> this.setState({open: true})}>
                <div className={`placeholderContainer ${container}`}>
                    {this.props.dropdownIcon ? <img className={dropdownIcon} src={this.props.dropdownIcon}/> : null }
                        <div className={`placeholder ${placeholder}`}>{this.props.selected}</div>
                    {this.props.toggleIcon ? <img className={toggleIcon} src={this.props.toggleIcon}/> : null }
                </div>
                <div className={`dropdownBodyContainer ${this.state.open ? `openState ${dropdownBody}` : 'closedState'}`}>
                    <div className='dropdownScrollableContainer'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dropdown;