const urlData = import.meta.env.VITE_URL_API + '/users'

export default class UsersRepository {
  async getAllUsers() {
    const response = await fetch(urlData)
    if (!response.ok) {
      throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
    }
    const myData = await response.json()
    return myData
  }

  async getUserById(id) {
    const response = await fetch(urlData + '/' + id)
    if (!response.ok) {
      throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
    }
    const myData = await response.json()
    return myData
  }

  async addUser(newUser) {
    const response = await fetch(urlData, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const myData = await response.json()
    return myData
  }

  async removeUser(idUser) {
    const response = await fetch(urlData + '/' + idUser, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw 'Error ${response.status} de la BBDD: ${response.statusText}'
    }

    const myData = await response.json()
    return myData
  }

  async changeUser(user) {
    const response = await fetch(urlData + '/' + user.id, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const myData = await response.json()
    return myData
  }

  async updatePriceOfUser(idUser, userPrice) {
    const response = await fetch(urlData + '/' + idUser, {
      method: 'PATCH',
      body: JSON.stringify({ price: userPrice }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const myData = await response.json()
    return myData
  }

  async updateUserPassword(idUser, newPassword) {
    const response = await fetch(urlData + '/' + idUser, {
      method: 'PATCH',
      body: JSON.stringify({ password: newPassword }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const myData = await response.json()
    return myData
  }
}
