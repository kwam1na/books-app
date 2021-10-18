import React from "react";
import BookCard from "./BookCard";
import "./list.css";

class List extends React.Component {

  handleAction = (book) => {
    this.props.handleAction(book)
  }

  render() {
    let { result } = this.props;
    if (!result) {
      return null
    }
    
    return (
      <>
        <div className="output">
          {result.map((book, index) =>
            <BookCard 
              key={index}
              book={book}
              handleAction={this.handleAction}
              buttonTitle={this.props.buttonTitle}
              textColor={this.props.textColor}
              bgColor={this.props.bgColor}
            />
          )}
        </div>
      </>
    );
  }
}

export default List;
