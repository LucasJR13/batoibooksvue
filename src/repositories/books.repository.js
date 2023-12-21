const urlData = import.meta.env.VITE_URL_API + '/books'

export default class BooksRepository {
  async getAllBooks() {
    const response = await fetch(urlData)
    if (!response.ok) {
      throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
    }
    const myData = await response.json()
    return myData
  }

  async getBookById(id) {
    const response = await fetch(urlData + '/' + id)
    if (!response.ok) {
      throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
    }
    const myData = await response.json()
    return myData
  }

  async addBook(newBook) {
    const response = await fetch(urlData, {
      method: 'POST',
      body: JSON.stringify(newBook),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const myData = await response.json()
    return myData
  }

  async removeBook(idBook) {
    const response = await fetch(urlData + '/' + idBook, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
    }

    const myData = await response.json()
    return myData
  }

  async changeBook(book) {
    const response = await fetch(urlData + '/' + book.id, {
      method: 'PUT',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const myData = await response.json()
    return myData
  }

  async updatePriceOfBook(idBook, bookPrice) {
    const response = await fetch(urlData + '/' + idBook, {
      method: 'PATCH',
      body: JSON.stringify({ price: bookPrice }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const myData = await response.json()
    return myData
  }

  async bookWithModuleExists(idModule, idUser) {
    const response = await fetch(urlData + '?idUser=' + idUser + '&idModule=' + idModule)
    if (!response.ok) {
      throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
    }
    const myData = await response.json()
    return myData
  }
}
