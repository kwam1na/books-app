import React, { Component } from "react";
import List from "../components/List";
import config from '../config'
import "./page.css";
import { Book } from '../back-end/model/book'
const axios = require('axios')

class Books extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      book: "",
      books: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  
  handleSubmit() {
    this.setState({
      loading: true
    })

    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.book + "&key=" + config.apiKey)
      .then(books => {
        let result = books.data.items.filter(book => (
          book.volumeInfo.imageLinks && book.volumeInfo.authors
        ))

        let data = result.map(book => 
          new Book(book.volumeInfo.title, book.volumeInfo.authors[0], book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.previewLink)
          )

        this.setState({
          loading: false,
          books: data
        })
      })

  }


  handleAdd(book) {
    axios.post(`http://localhost:${config.apiPort}/api/library`, book)
      .then(res => {
        
        if (res.status === 201) {
          alert(`${book.title} has been added to your library!`)

        }

      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.Error)

        } else {
          alert("The server looks to be offline.")
        }
        
      })
  }


  handleChange(e) {
    this.setState({
      book: e.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <article className="App-header">
          <h2 style={{ margin: '0px'}}>
            Hi, Kwamina!
          </h2>
          <p style={{ fontSize: '1.2rem' }}>
            Did you read anything new?
          </p>
          <div className="search-container">
            <input
              type="text"
              name="search"
              id="search"
              className="search-box"
              placeholder="Enter author or title"
              onChange={this.handleChange}
            />
            <button className="search-button" onClick={this.handleSubmit}>
              Search
            </button>
          </div>
          {this.state.loading ? (
            <h3>Loading...</h3>
          ) : this.state.books === [] ? (
            <h3>No books Found</h3>
          ) : (
                <>
                  <List 
                    result={this.state.books} 
                    handleAction={this.handleAdd} 
                    buttonTitle="ADD" 
                    textColor="black"
                    bgColor="lightGray"
                  />
                </>
              )}
        </article>
        <div class="container">
          <h5 class="footer">
            &copy; 2021 Kwamina Essuah Mensah
          </h5>
        </div>
      </div>
    );
  }
}

export default Books;
