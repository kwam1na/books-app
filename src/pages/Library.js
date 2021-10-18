import React, { Component } from "react";
import "./page.css";
import axios from 'axios'
import config from '../config'
import List from '../components/List'


class Library extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      books: []
    }
    this.handleRemove = this.handleRemove.bind(this)
  }


  componentDidMount() {
    this.handleLoadBooks()
  }


  handleLoadBooks() {
    this.setState({
      loading: true
    })

    axios.get(`http://localhost:${config.apiPort}/api`)
      .then(books => {
        this.setState({
          loading: false,
          books: books.data
        })
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.Error)
          
        } else {
          this.setState({
            loading: false
          })
          alert("The server looks to be offline.")
        }
      })
  }


  handleRemove(book) {
    axios.delete(`http://localhost:${config.apiPort}/api/library/${book.id}`)
      .then(res => {

        if (res.status === 200) {
          this.handleLoadBooks()

        } else {
          alert("Something went wrong. Please try again.")
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


  render() {

    return (
      <div className="App">
        <article className="App-header">
          <h2 style={{ margin: '0px' }}>
            Hi, Kwamina!
          </h2>
          <p style={{ fontSize: '1.2rem' }}>
            Here are all the books you've read
          </p>
          {this.state.loading ? (
            <h3>Loading...</h3>
          ) : this.state.books === [] ? (
            <h3>No books Found</h3>
          ) : (
                <>
                  <List 
                    result={this.state.books} 
                    buttonTitle="REMOVE" 
                    handleAction={this.handleRemove} 
                    textColor="red"
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
      </div >
    );
  }
}


export default Library;