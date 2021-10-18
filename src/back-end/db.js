const Pool = require('pg').Pool

const pool = new Pool({
    user: 'Ernest',
    host: 'localhost',
    database: 'library',
    password: 'pwd',
    port: 5432,
})

const db = {}



db.addBook = (req, res) => {

    const { author, title, thumbnail, link } = req.body

    if (author && title && thumbnail && link) {

        pool.query('SELECT * FROM books WHERE title = $1', [title], (error, results) => {

            if (error) {
                res.status(500).json({ Error: 'Could not add book.' })

            } else if (results.rowCount > 0) {
                res.status(400).json({ Error: 'This book has already been added.' })

            } else {
                

                pool.query('INSERT INTO books (title, thumbnail, link, author) VALUES ($1, $2, $3, $4)', [title, thumbnail, link, author], (error, results) => {
                    if (error) {
                        res.status(500).json({ Error: 'Could not add book.' })

                    } else {
                        res.status(201).json({ Sucess: 'Book has been added.' })
                    }


                })
            }
        })


    } else {
        res.status(400).json({ Error: 'Details of the book must be provided (author, title, link, thumbnailURL).' })
    }
}



db.getBooks = (req, res) => {

    const { author, title } = req.query

    if (author || title) {
        db.getBooksByAuthorOrTitle(author, title, res)

    } else {
        pool.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({ Error: 'Could not retrieve books.' })

            } else {
                res.status(200).json(results.rows)
            }

        })
    }


}



db.getBooksByID = (req, res) => {

    const { id } = req.params

    pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(500).json({ Error: 'Could not retrieve book.' })

        } else {
            res.status(200).json(results.rows)
        }

    })
}



db.getBooksByAuthorOrTitle = (author, title, res) => {

    pool.query('SELECT * FROM books WHERE author = $1 OR title = $2', [author, title], (error, result) => {
        if (error) {
            res.status(500).json({ Error: `Could not retrieve books by author ${author}.` })

        } else {
            res.status(200).json(result.rows)
        }
    })
}



db.updateBook = (req, res) => {

    const { id } = req.params
    const { author, title } = req.body

    pool.query('UPDATE books SET author = $1, title = $2 WHERE id = $3', [author, title, id], (error, results) => {
        if (error) {
            res.status(500).json({ Error: 'Could not update book.' })

        } else if (results.rowCount === 0) {
            res.status(400).json({ Error: `No book with ID: ${id} exists` })

        } else {
            res.status(200).json({ Success: `Book modified with ID: ${id}` })
        }

    }
    )
}



db.deleteBook = (req, res) => {

    const { id } = req.params

    pool.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(500).json({ Error: 'Could not delete book.' })

        } else if (results.rowCount === 0) {
            res.status(400).json({ Error: `No book with ID: ${id} exists` })

        } else {
            res.status(200).json({ Message: `Deleted book with ID: ${id}` })
        }

    })
}



module.exports = db