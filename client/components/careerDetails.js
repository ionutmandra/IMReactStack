import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import CareerSeniorDeveloper from './careerSeniorDeveloper';
import CareerJuniorDeveloper from './careerJuniorDeveloper';
import CareerQualityEngineer from './careerQualityEngineer';
import { Link } from 'react-router';

class CareerDetails extends Component {

     constructor(props) {
        super(props);
        this.handleBackToCareersClick = this.handleBackToCareersClick.bind(this);
        this.renderJobDescription = this.renderJobDescription.bind(this);
    }

    handleBackToCareersClick(event) {
        this.props.disableScenes();
          this.props.dispatchTransition({
              type: 'content',
              column: 6,
              target: event.target,
          });        
    }
    

    renderJobDescription(){
        switch (this.props.params.key){
            case 'seniorsoftwaredeveloper':
                    return (<CareerSeniorDeveloper onBackClick={this.handleBackToCareersClick} />);
                break;
            case 'juniorsoftwaredeveloper':
                    return (<CareerJuniorDeveloper onBackClick={this.handleBackToCareersClick} />);
                break;
            case 'qualityengineer':
                    return (<CareerQualityEngineer onBackClick={this.handleBackToCareersClick}/>);
                break; 
            default:
                return (<div></div>);
        }     
    }

    render() {
            return (
                <article className="page page-career-details">
                    <Header title={'Careers'} />
                    <section className="content">
                        <div className="spacer-100 show-for-medium"></div>
                        <div className="spacer-60 show-for-small-only"></div>

                        {
                         this.renderJobDescription()
                        }
                        <div className="spacer-100"></div>
                    </section>
                    <Footer />
            </article>
        );
    }
}

CareerDetails.propTypes = {
    strings: PropTypes.object.isRequired,
};

CareerDetails.defaultProps = {
    strings: {
    },
};

export default CareerDetails;