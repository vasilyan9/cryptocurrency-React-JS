import React from 'react'
import Table from './Table'
import Pagination from './Pagination'
import { handleResponse } from '../../helper';
import {API_URL} from '../../config'
import Loading from '../common/Loading';
import './table.css'


class List extends React.Component {
    constructor() {
        super();
        this.state = {
            loading : false,
            currencies : [],
            error: null,
            totalPages:0,
            page:1,
        }
    }
    
    componentDidMount(){
        this.fetchCurrencies()
    }
    fetchCurrencies(){
        this.setState({
            loading:true
        })
        const {page} = this.state
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {  
            this.setState({
                currencies:data.currencies,
                totalPages: data.totalPages,
                loading:false,
            });
        })
    }

    handlePaginationClick = direction => {
        let nextPage = this.state.page; 
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
        this.setState({
            page: nextPage,   
        },()=>{this.fetchCurrencies()})
    }

    render() {
            const {loading, currencies, error,totalPages,page} = this.state;//destrukturizacia;

           
            if(loading){
                return (
                    <div className="loading-container">
                        <Loading />
                    </div>
                )
            }
            return(
                <div >
                    <Table
                        currencies = {currencies} 
                        renderChangePercent = {this.renderChangePercent}

                    />
                    <Pagination 
                        page = {page}
                        totalPages = {totalPages}
                        handlePaginationClick = {this.handlePaginationClick}
                    />
                </div>
            )
               
        }
    
}
export default List ;
