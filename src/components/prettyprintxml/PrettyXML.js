import React from 'react'

class PrettyXML extends React.Component{
    constructor(props){
        super(props)
        this.transformXML = this.transformXML.bind(this)
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

    render(){
        return this.transformXML(this.props.data)
    }
    
}

export default PrettyXML