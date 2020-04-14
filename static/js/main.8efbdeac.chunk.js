(this.webpackJsonpcovid19estimatorui=this.webpackJsonpcovid19estimatorui||[]).push([[0],{19:function(e,t,a){e.exports=a(43)},24:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(17),s=a.n(o),l=(a(24),a(1)),i=a(4),c=a(5),m=a(3),u=a(7),d=a(6),p=a(18),h=a.n(p),g=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).transformXML=n.transformXML.bind(Object(m.a)(n)),n}return Object(c.a)(a,[{key:"transformXML",value:function(e){if(!window.DOMParser||!window.XSLTProcessor)return e;var t=(new DOMParser).parseFromString(' \n        <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n        \x3c!-- Here is the magic: set indent to format the output --\x3e\n        <xsl:output omit-xml-declaration="yes" indent="yes"/>\n    \n        \x3c!-- Match any element or attribute --\x3e\n        <xsl:template match="node()|@*">\n          <xsl:copy>\n            <xsl:apply-templates select="node()|@*"/>\n          </xsl:copy>\n        </xsl:template>\n      </xsl:stylesheet>',"text/xml"),a=new XSLTProcessor;a.importStylesheet(t);var n=(new DOMParser).parseFromString(e.trim(),"text/xml"),r=a.transformToDocument(n);return r?(new XMLSerializer).serializeToString(r):e}},{key:"render",value:function(){return this.transformXML(this.props.data)}}]),a}(r.a.Component),v=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return JSON.stringify(this.props.data,void 0,4)}}]),a}(r.a.Component),b=(a(42),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={request_data:{region:{name:"Africa",avgAge:19.7,avgDailyIncomeInUSD:5,avgDailyIncomePopulation:.71},periodType:"days",timeToElapse:58,reportedCases:674,population:66622705,totalHospitalBeds:1380614},response:null},n.fetchImpactEstimate=n.fetchImpactEstimate.bind(Object(m.a)(n)),n.displayFormatDecider=n.displayFormatDecider.bind(Object(m.a)(n)),n}return Object(c.a)(a,[{key:"displayFormatDecider",value:function(e){return"application/xml"===e.mimetype?r.a.createElement(g,{data:e.data}):r.a.createElement(v,{data:e.data})}},{key:"fetchImpactEstimate",value:function(e){var t=this;e.preventDefault();var a="https://covid19-estimator.herokuapp.com/api/v1/on-covid-19";this.state.response_data_format&&(a="".concat(a,"/").concat(this.state.response_data_format)),h.a.post(a,this.state.request_data).then((function(e){t.setState({response:{data:e.data,mimetype:e.headers["content-type"].split(";")[0]}})})).catch((function(e){console.error(e)}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"py-5"},r.a.createElement("div",{className:"body"},r.a.createElement("h1",null,"Covid19Estimator UI"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"request-from"},r.a.createElement("h2",null,"Request"),r.a.createElement("form",{onSubmit:this.fetchImpactEstimate},r.a.createElement("label",{htmlFor:"data-region-name"},"Region"),r.a.createElement("input",{type:"text",className:"form-control",id:"data-region-name",value:this.state.request_data.region.name,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{region:Object(l.a)({},e.state.request_data.region,{name:t.target.value})})})}}),r.a.createElement("label",{htmlFor:"data-region-avgage"},"Average Age"),r.a.createElement("input",{type:"number",className:"form-control",id:"data-region-avgage",value:this.state.request_data.region.avgAge,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{region:Object(l.a)({},e.state.request_data.region,{avgAge:Number(t.target.value)})})})}}),r.a.createElement("label",{htmlFor:"data-region-avgDailyIncomeInUSD"},"Average Daily Income (USD)"),r.a.createElement("input",{type:"number",className:"form-control",id:"data-region-avgDailyIncomeInUSD",value:this.state.request_data.region.avgDailyIncomeInUSD,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{region:Object(l.a)({},e.state.request_data.region,{avgDailyIncomeInUSD:Number(t.target.value)})})})}}),r.a.createElement("label",{htmlFor:"data-region-avgDailyIncomePopulation"},"Population with Daily Income"),r.a.createElement("input",{type:"number",className:"form-control",id:"data-region-avgDailyIncomePopulation",value:this.state.request_data.region.avgDailyIncomePopulation,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{region:Object(l.a)({},e.state.request_data.region,{avgDailyIncomePopulation:Number(t.target.value)})})})}}),r.a.createElement("label",{htmlFor:"data-population"},"Population"),r.a.createElement("input",{type:"number",className:"form-control",id:"data-population","data-population":!0,value:this.state.request_data.population,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{population:t.target.value})})}}),r.a.createElement("label",{htmlFor:"data-time-to-elapse"},"Time to Elapse"),r.a.createElement("input",{type:"number",className:"form-control",id:"data-time-to-elapse","data-time-to-elapse":!0,value:this.state.request_data.timeToElapse,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{timeToElapse:t.target.value})})}}),r.a.createElement("label",{htmlFor:"data-reported-cases"},"Reported Cases"),r.a.createElement("input",{type:"number",className:"form-control",id:"data-reported-cases","data-reported-cases":!0,value:this.state.request_data.reportedCases,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{reportedCases:t.target.value})})}}),r.a.createElement("label",{htmlFor:"data-total-hospital-beds"},"Total Hospital Beds"),r.a.createElement("input",{type:"number",className:"form-control",id:"data-total-hospital-beds","data-total-hospital-beds":!0,value:this.state.request_data.totalHospitalBeds,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{totalHospitalBeds:t.target.value})})}}),r.a.createElement("label",{htmlFor:"data-period-type"},"Period Type"),r.a.createElement("select",{className:"custom-select",id:"data-period-type",defaultValue:"days","data-period-type":!0,onChange:function(t){return e.setState({request_data:Object(l.a)({},e.state.request_data,{periodType:t.target.value})})}},r.a.createElement("option",{value:"days"},"days"),r.a.createElement("option",{value:"weeks"},"weeks"),r.a.createElement("option",{value:"months"},"months")),r.a.createElement("label",{htmlFor:"data-format"},"Response Data Format"),r.a.createElement("select",{className:"custom-select",id:"data-format",defaultValue:"json",onChange:function(t){return e.setState({response_data_format:t.target.value})}},r.a.createElement("option",{value:"json"},"json"),r.a.createElement("option",{value:"xml"},"xml")),r.a.createElement("button",{type:"submit",className:"btn btn-primary",name:"data-go-estimate","data-go-estimate":!0},"Estimate"))),r.a.createElement("div",{className:"request-preview"},r.a.createElement("h2",null,"Response"),r.a.createElement("div",{className:"response-view gatsby-highlight"},r.a.createElement("pre",{id:"response"},this.state.response&&this.displayFormatDecider(this.state.response)))))))}}]),a}(r.a.Component));var f=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(b,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.8efbdeac.chunk.js.map