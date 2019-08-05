import React from 'react';
import {API_URL} from '../../config'
import { handleResponse } from '../../helper';
import Loading from './Loading';
import {withRouter} from 'react-router-dom';
import './search.css';

class Search extends React.Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            searchQuery : '',
            serchResult : [],
            loading : false
        }
    }

    handleChange (event) {
        const searchQuery = event.target.value;
        this.setState({
            searchQuery, /* searchQuery = searchQuery */
        });

        this.setState({
            loading : true
        });

        if(!searchQuery){
            this.setState({
                loading : false
            });

            return ""
        }

        

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then(result => {
            this.setState({
                serchResult : result,
                loading : false, 
            });
        })
    }

    handleRedirect(currencyId) {
        this.props.history.push(`/currency/${currencyId}`);

        this.setState({
            serchResult : "",
            searchQuery: "",
        });
    }

    renderSearchReasults () {
        const { searchQuery , serchResult , loading } = this.state; 
        if(!searchQuery){
            return ""
        }    
       
        if(serchResult.length > 0) { 
            return (
                <div className = "Search-result-container">
                    {
                        serchResult.map(item => (
                            <div
                                key={item.id}
                                className="Search-result"
                                onClick={ () => this.handleRedirect(item.id) }
                                >
                                {item.name} {item.symbol}
                            </div>
                        ))
                    }
                </div>
            )
        }

        {
            return(
                <div className="Search-result-container">
                    <div className = "Search-no-result">
                        No result found
                    </div>
                </div>
            )
        }

    }


    render () {
        const { searchQuery , loading } = this.state; 

        return(
                <div className="Search">
                    <span className="Search-icon"/>
                    <input
                        value={searchQuery}
                        className="Search-input" 
                        type="text" 
                        name="searchQuery"
                        onChange= {this.handleChange}
                        placeholder="Currency Name"
                    />
                    {
                        // loading && 
                        // <div className = "Search-loading">
                        //     <Loading/>
                        // </div>

                        loading ? <div className = "Search-loading">
                                        <Loading
                                            width = "16px"
                                            height = "16px"
                                        />
                                    </div> : null

                    }
                    {this.renderSearchReasults()}

                </div>
        )
    }
}

export default withRouter(Search);