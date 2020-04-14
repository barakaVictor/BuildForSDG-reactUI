import React from 'react'
import axios from 'axios'
import PrettyXML from '../prettyprintxml/PrettyXML'
import PrettyJSON from '../prettyjson/PrettyJSON'
import './Landing.css'

class Landing extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            request_data: {
                region: {
                    "name": "Africa",
                    "avgAge": 19.7,
                    "avgDailyIncomeInUSD": 5,
                    "avgDailyIncomePopulation": 0.71
                },
                "periodType": "days",
                "timeToElapse": 58,
                "reportedCases": 674,
                "population": 66622705,
                "totalHospitalBeds": 1380614
            },
            response: null,
            
        }
        this.fetchImpactEstimate = this.fetchImpactEstimate.bind(this)
        this.displayFormatDecider = this.displayFormatDecider.bind(this)
        
    }
    
    displayFormatDecider(data){
        if(data.mimetype === "application/xml"){
            return <PrettyXML data={data.data} />
        }
        return <PrettyJSON data={data.data}/>
    }

    fetchImpactEstimate(event){
        event.preventDefault()
        let api_url = "https://covid19-estimator.herokuapp.com/api/v1/on-covid-19"
        if(this.state.response_data_format){
            api_url = `${api_url}/${this.state.response_data_format}`
        }
        axios.post(api_url,
        this.state.request_data
        ).then((response) =>  {
           this.setState({response: {data: response.data, mimetype: response.headers["content-type"].split(";")[0] }})
        }).catch((error) => {
            console.error(error)
        })
    }

    render(){
        return(
            <div className="py-5">
                <div className='body'>
                    <h1>Covid19Estimator UI</h1>
                    <div className="row">
                        <div className="request-from">
                            <h2>Request</h2>
                            <form onSubmit={this.fetchImpactEstimate}>
                                <label htmlFor="region">Region</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="data-region-name" 
                                    value={this.state.request_data.region.name}
                                    onChange={(e)=>this.setState({
                                        request_data:{
                                            ...this.state.request_data, region:{
                                                ...this.state.request_data.region, name: e.target.value
                                            }
                                        }
                                    })}/>
                                
                                <label htmlFor="data-region-avgage">Average Age</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-region-avgage" 
                                    value={this.state.request_data.region.avgAge}
                                    onChange={(e)=>this.setState({
                                        request_data:{
                                            ...this.state.request_data, region:{
                                                ...this.state.request_data.region, avgAge: Number(e.target.value)
                                            }
                                        }
                                    })}/>
                                
                                <label htmlFor="data-region-avgDailyIncomeInUSD">Average Daily Income (USD)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-region-avgDailyIncomeInUSD" 
                                    value={this.state.request_data.region.avgDailyIncomeInUSD}
                                    onChange={(e)=>this.setState({
                                        request_data:{
                                            ...this.state.request_data, region:{
                                                ...this.state.request_data.region, avgDailyIncomeInUSD: Number(e.target.value)
                                            }
                                        }
                                    })}/>
                                
                                <label htmlFor="data-region-avgDailyIncomePopulation">Population with Daily Income</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-region-avgDailyIncomePopulation" 
                                    value={this.state.request_data.region.avgDailyIncomePopulation}
                                    onChange={(e)=>this.setState({
                                        request_data:{
                                            ...this.state.request_data, region:{
                                                ...this.state.request_data.region, avgDailyIncomePopulation: Number(e.target.value)
                                            }
                                        }
                                    })}/>
                                
                                <label htmlFor="data-population">Population</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-population" 
                                    data-population
                                    value={this.state.request_data.population}
                                    onChange={(e)=>this.setState({request_data:{...this.state.request_data, population: e.target.value}})}/>
                                
                                <label htmlFor="data-time-to-elapse">Time to Elapse</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-time-to-elapse" 
                                    data-time-to-elapse
                                    value={this.state.request_data.timeToElapse}
                                    onChange={(e)=>this.setState({request_data:{...this.state.request_data, timeToElapse: e.target.value}})}/>
                                
                                <label htmlFor="data-reported-cases">Reported Cases</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-reported-cases" 
                                    data-reported-cases
                                    value={this.state.request_data.reportedCases}
                                    onChange={(e)=>this.setState({request_data:{...this.state.request_data, reportedCases: e.target.value}})}
                                    />
                                
                                <label htmlFor="data-total-hospital-beds">Total Hospital Beds</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-total-hospital-beds"
                                    data-total-hospital-beds 
                                    value={this.state.request_data.totalHospitalBeds}
                                    onChange={(e)=>this.setState({request_data: {...this.state.request_data, totalHospitalBeds: e.target.value}})}
                                    />

                                <label htmlFor="data-period-type">Period Type</label>    
                                <select 
                                    className="custom-select" 
                                    id="data-period-type"
                                    defaultValue="days"
                                    data-period-type
                                    onChange={(e)=>this.setState({request_data: {...this.state.request_data, periodType: e.target.value}})}
                                    >
                                        <option value="days">days</option>
                                        <option value="weeks">weeks</option>
                                        <option value="months">months</option>
                                </select>

                                <label htmlFor="data-format">Response Data Format</label>
                                <select 

                                    className="custom-select" 
                                    id="data-format"
                                    defaultValue="json"
                                    onChange={(e)=>this.setState({response_data_format: e.target.value})}
                                    >
                                        <option value="json">json</option>
                                        <option value="xml">xml</option>
                                </select>
                                <button 
                                type="submit" 
                                className="btn btn-primary" 
                                name="data-go-estimate"
                                data-go-estimate>Estimate</button>
                            </form>
                        </div>
                        <div className='request-preview'>
                            <h2>Response</h2>
                            <div className="response-view gatsby-highlight">
                                <pre id="response">{this.state.response &&
                                this.displayFormatDecider(this.state.response)
                                }
                                </pre>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                            <pre><PrettyJSON data={this.state.request_data}/></pre>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing