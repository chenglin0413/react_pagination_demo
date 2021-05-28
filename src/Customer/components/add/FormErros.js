import React, { Component } from 'react'
const errorStyle = {
    color: 'red',
  };
export default class FormErros extends Component {
    render() {
        const {formErrors}=this.props
        // console.log(formErrors);
        return (
            <div className="formErrors">
            
                {Object.keys(formErrors).map((fieldName,i)=>{
                    if(formErrors[fieldName].length > 0){
                        return (
                            <p style={errorStyle} key={i}>{fieldName} {formErrors[fieldName]}</p>
                            
                        )
                    }else{
                        return "";
                    }
                })
                }
            </div>
        )
    }
}
