import React from "react";
import Button from './Button'

class BookCard extends React.Component {

  constructor(props) {
    super(props)
    this.handleAction = this.handleAction.bind(this)
  }


  handleAction() {
    this.props.handleAction(this.props.book);
  }

  render() {

    const styles = {
      cardOuter: {
        width: 180,
        height: 320,
        backgroundColor: "#F8F9FA",
        color: "grey",
        margin: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "",
        textAlign: "center",
        overflow: "hidden",
        cursor: "pointer",
      },
      cardInnerTop: {
        display: "flex",
        height: "70%",
        flexDirection: "column",
        justifyContent: "flex-end",
        fontSize: "0.8rem",
        padding: "0 5px",
        color: "white",
      },
      cardInnerBottom: {
        display: "flex",
        height: "0%",
        justifyContent: "space-around",
        alignItems: "center",
        fontSize: "0.8rem",
        backgroundColor: "white",
        padding: "0 5px",
      },
      buttons: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    };

    return (
      <div>
        <a href={this.props.book.link} target="__blank">
          <div style={styles.cardOuter}>
            <div
              style={Object.assign({}, styles.cardInnerTop, {
                backgroundImage: `url(${this.props.book.thumbnail})`,
                backgroundRepeat: "none",
                backgroundSize: "cover",
              })}
            >
            </div>

          </div>
        </a>
        <div style={styles.buttons}>
          <Button 
            title={this.props.buttonTitle}
            handleAction={this.handleAction} 
            textColor={this.props.textColor}
            bgColor={this.props.bgColor}
            />
        </div>
      </div>

    );
  }
}


export default BookCard;
