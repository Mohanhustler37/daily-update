import React,{Component} from 'react';
import "./Habittemplate.scss";
import Button from '@material-ui/core/Button';
import IconAwesomeEllipsis from "../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import IconAwesomeSort from "../../assets/icons/SVG/Icon awesome-sort.svg";
import Googleimage from "../../assets/icons/LoginAndRegistration_icons/MaskGroup1.svg";
import Addimage from "../../assets/icons/01-10-2019/Group 10948.svg";
import Bookoneimage from "../../assets/icons/LoginAndRegistration_icons/books.png";
import Facewashimage from "../../assets/icons/LoginAndRegistration_icons/wash-face.png";
import Sleepimage from "../../assets/icons/LoginAndRegistration_icons/sleep.png";
import Timeimage from "../../assets/icons/LoginAndRegistration_icons/time-management.png";
import Yogaimage from "../../assets/icons/LoginAndRegistration_icons/yoga.png";
import Book2image from "../../assets/icons/LoginAndRegistration_icons/books (1).png";

class Habittemplate extends Component{
    constructor(props){
        super()
    }
    render(){
        return(
            <div className="mainclass">
             <div className="header">
                       <div className="header-left">
                            <div className="header-left-content">
                            <p className="header-text">HABIT TEMPLATES</p>
                            <div>
                            <p className="header-left-bottom-text">300 habit template for me</p>
                            </div>
                            </div>
                       </div>



            <div className="header-right">
                <Button className="header-icon-one">
                     <img src={IconAwesomeSort}></img>
                 </Button>
                <div className="header-icon-one1">
                   <Button><img src={IconAwesomeSort}></img></Button> 
                   <div className="imgtext">SORT</div>
                </div>
                 
                 <div className="spacing">
                     <div className="header-icon-two">
                     <img src={IconAwesomeSort}></img>
                      </div>
                      <div className="header-icon-two">
                     <img src={IconAwesomeSort}></img>
                      </div>
                 </div>
                 <div className="header-icon">
                     <img src={IconAwesomeEllipsis}></img>
                </div>
            </div>

         </div><hr/>
         
         <div className="articlesection">
            <div className="leftsection">
                <img src={ Bookoneimage}></img>
                <div className="leftsectioncontent">
                    <p className="lefttext">Must-have habits</p>
                </div>
                <div>
                    <p className="leftsectionbottomtext">Small habits, big results</p>
                </div>
            </div>

            <div className="rightsection">
                {/* <div> */}
                <img src={Addimage}></img>
                {/* </div> */}
                <div className="awesomeicon">
                    <img src={IconAwesomeEllipsis}></img>
                </div>
            </div>
                         
      </div> <hr/>

      <div className="articlesection">
            <div className="leftsection">
            <img src={Facewashimage}></img>
                <div className="leftsectioncontent">
                    <p className="lefttext">Morning routine</p>
                </div>
                <div>
                    <p className="leftsectionbottomtext">Open the door to be productive day</p>
                </div>
            </div>

            <div className="rightsection">
                {/* <div className=""> */}
                <img src={Addimage}></img>
                {/* </div> */}
                <div className="awesomeicon" >
                    <img src={IconAwesomeEllipsis}></img>
                </div>
            </div>
                         
      </div> <hr/>
      <div className="articlesection">
            <div className="leftsection">
                <img src={ Sleepimage}></img>
                <div className="leftsectioncontent">
                    <p className="lefttext">Better sleep</p>
                </div>
                <div>
                    <p className="leftsectionbottomtext">It's a key of healthly lifestyle</p>
                </div>
            </div>

            <div className="rightsection">
                {/* <div > */}
                <img src={Addimage}></img>
                {/* </div> */}
                <div className="awesomeicon" >
                    <img src={IconAwesomeEllipsis}></img>
                </div>
            </div>
                         
      </div> <hr/>
      <div className="articlesection">
            <div className="leftsection">
                <img src={Timeimage }></img>
                <div className="leftsectioncontent">
                    <p className="lefttext">Getting stuff done</p>
                </div>
                <div>
                    <p className="leftsectionbottomtext">Boost your productivity</p>
                </div>
            </div>

            <div className="rightsection">
                {/* <div> */}
                <img src={Addimage}></img>
                {/* </div> */}
                <div  className="awesomeicon" >
                    <img src={IconAwesomeEllipsis}></img>
                </div>
            </div>
                         
      </div> <hr/>
      <div className="articlesection">
            <div className="leftsection">
                <img src={Yogaimage}></img>
                <div className="leftsectioncontent">
                    <p className="lefttext">Stress relief</p>
                </div>
                <div>
                    <p className="leftsectionbottomtext">Calm down and release tension</p>
                </div>
            </div>

            <div className="rightsection">
                {/* <div> */}
                <img src={Addimage}></img>
                {/* </div> */}
                <div className="awesomeicon">
                    <img src={IconAwesomeEllipsis}></img> 
                </div>
            </div>
                         
      </div> <hr/>
      <div className="articlesection">
            <div className="leftsection">
                <img src={Book2image}></img>
                <div className="leftsectioncontent">
                    <p className="lefttext">Learn and explore</p>
                </div>
                <div>
                    <p className="leftsectionbottomtext">Stay hungry for knowledge</p>
                </div>
            </div>

            <div className="rightsection">
                {/* <div> */}
                <img src={Addimage}></img>
                {/* </div> */}
                <div  className="awesomeicon">
                    <img src={IconAwesomeEllipsis}></img>
                </div>
            </div>
                         
      </div> <hr/>

</div>


          
        );
    }
}
export default Habittemplate;