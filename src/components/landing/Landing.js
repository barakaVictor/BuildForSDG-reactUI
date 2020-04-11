import React from 'react'
import axios from 'axios'
import './Landing.css'

class Landing extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            request_data: {
                "region": {
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
        this.transformXML = this.transformXML.bind(this)
        this.displayFormatDecider = this.displayFormatDecider.bind(this)
        
    }
    transformXML(xmlText) {
        var xsltText = ` 
        <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <!-- Here is the magic: set indent to format the output -->
        <xsl:output omit-xml-declaration="yes" indent="yes"/>
    
        <!-- Match any element or attribute -->
        <xsl:template match="node()|@*">
          <xsl:copy>
            <xsl:apply-templates select="node()|@*"/>
          </xsl:copy>
        </xsl:template>
      </xsl:stylesheet>`

        // Bomb out if this browser does not support DOM parsing and transformation
        if (!(window.DOMParser && window.XSLTProcessor)) {
          return xmlText;
        }
        
        // Load the XSLT into a document
        var xsltDoc = new DOMParser().parseFromString(xsltText, "text/xml");
      
        // Apply that document to as a stylesheet to a transformer
        var xslt = new XSLTProcessor();
        xslt.importStylesheet(xsltDoc);
      
        // Load the XML into a document.
        // Trim any preceding whitespace to prevent parse failure.
        var xml = new DOMParser().parseFromString(xmlText.trim(), "text/xml");
      
        // Transform it
        var transformedXml = xslt.transformToDocument(xml);
      
        // Apply the transformed document if it was successful
        return (!transformedXml) ? xmlText :
          new XMLSerializer().serializeToString(transformedXml);
    }
    displayFormatDecider(data){
        if(data.mimetype === "application/xml"){
            return this.transformXML(data.data)
        }
        return JSON.stringify(data.data, undefined, 4)
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
                    <h1>covid19estimator UI</h1>
                    <div className="row">
                        <div className="request-from">
                            <form onSubmit={this.fetchImpactEstimate}>
                                <label for="data-population">Population</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-population" 
                                    value={this.state.request_data.population}
                                    onChange={(e)=>this.setState({request_data:{...this.state.request_data, population: e.target.value}})}/>
                                
                                <label for="data-time-to-elapse">Time to Elapse</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-time-to-elapse" 
                                    value={this.state.request_data.timeToElapse}
                                    onChange={(e)=>this.setState({request_data:{...this.state.request_data, timeToElapse: e.target.value}})}/>
                                
                                <label for="data-reported-cases">Reported Cases</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-reported-cases" 
                                    value={this.state.request_data.reportedCases}
                                    onChange={(e)=>this.setState({request_data:{...this.state.request_data, reportedCases: e.target.value}})}
                                    />
                                
                                <label for="data-total-hospital-beds">Total Hospital Beds</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="data-total-hospital-beds" 
                                    value={this.state.request_data.totalHospitalBeds}
                                    onChange={(e)=>this.setState({request_data: {...this.state.request_data, totalHospitalBeds: e.target.value}})}
                                    />

                                <label for="data-period-type">Period Type</label>    
                                <select 
                                    className="custom-select" 
                                    id="data-period-type"
                                    defaultValue="days"
                                    onChange={(e)=>this.setState({request_data: {...this.state.request_data, periodType: e.target.value}})}
                                    >
                                        <option value="days">days</option>
                                        <option value="weeks">weeks</option>
                                        <option value="months">months</option>
                                </select>

                                <lable for="data-format">Response Data Format</lable>
                                <select 
                                    className="custom-select" 
                                    id="data-format"
                                    defaultValue="json"
                                    onChange={(e)=>this.setState({response_data_format: e.target.value})}
                                    >
                                        <option value="json">json</option>
                                        <option value="xml">xml</option>
                                </select>
                                <button type="submit" className="btn btn-primary" name="data-go-estimate">Estimate</button>
                            </form>
                        </div>
                        <div className='request-preview'>
                            <pre>
                                { JSON.stringify(this.state.request_data, undefined, 4)}
                            </pre>
                        </div>
                    </div>
                    <div className="row">
                        <h1>response</h1>
                        <div className="response-view gatsby-highlight">
                            <pre id="response">{this.state.response &&
                            this.displayFormatDecider(this.state.response)
                            }
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing