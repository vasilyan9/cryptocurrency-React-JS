import React from  'react';
import {API_URL} from '../../config'
import {handleResponse, renderChangePercent} from '../../helper';
import './detail.css';
import Loading from '../common/Loading';

class Detail extends React.Component {
    constructor() {
        super()
        this.state = {
            loading : false,
            currency : {},
            error: null
        }
    } 

    componentDidMount(){
        const currencyId = this.props.match.params.id;
        this.setState({
            loading:true
        })
        this.fetchCurrency(currencyId)
    }

    componentWillReceiveProps(nextProps) {
        const newCurencyId = nextProps.match.params.id;
        this.fetchCurrency(newCurencyId)
    }

    fetchCurrency(currencyId) {
        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
        .then(handleResponse)
        .then((currency) => {  
            this.setState({
                loading:false,
                currency
            });
        })
        .catch((error)=> {
            this.setState({
                error: error.errorMessage,
                loading: false
            });
        })
    }

    render() {
        const { currency, error, loading } = this.state;
        if(loading){
            return (
                <div className="loading-container">
                    <Loading />
                </div>
            )
        }

        if(error){
            return (
                <div className="error">
                    {error}
                </div>
            )
        }

        return(
            <div className="Detail">
                <h1 className="Detail-heading">
                    {currency.name}
                    ({currency.symbol})
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        <span>Price</span> <span className="Detail-value">${currency.price}</span>
                    </div>

                    <div className="Detail-item">
                        <span>Rank</span> <span className="Detail-value">{currency.rank}</span>
                    </div>

                    <div className="Detail-item">
                        <span>PercentChange24h</span> <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
                    </div>

                    <div className="Detail-item">
                        <span>Volume24h</span> <span className="Detail-value">${currency.volume24h}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;