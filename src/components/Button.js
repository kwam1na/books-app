import React from "react";
import './button.css'

class Button extends React.Component {
    
    
    render() {
        const style = {
            border: "none",
            borderRadius: "4px",
            backgroundColor: this.props.bgColor,
            color: this.props.textColor,
            height: "32px",
            marginBottom: "16px",
            cursor: "pointer",
            fontWeight: 'bold'
        }
    
        return (
            <button className="button"
                style={style}
                onClick={this.props.handleAction}>{this.props.title}
            </button>
        )
    }
}

export default Button;