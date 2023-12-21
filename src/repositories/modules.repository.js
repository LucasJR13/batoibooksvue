const urlData = import.meta.env.VITE_URL_API + '/modules'

export default class ModulesRepository {
  async getAllModules() {
    const response = await fetch(urlData)
    if (!response.ok) {
      throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
    }
    const myData = await response.json()
    return myData
  }

  async getModuleById(id) {
    const response = await fetch(urlData + '/' + id)
    if (!response.ok) {
      throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
    }
    const myData = await response.json()
    return myData
  }

  async addModule(newModule) {
    const response = await fetch(urlData, {
      method: 'POST',
      body: JSON.stringify(newModule),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const myData = await response.json()
    return myData
  }

  async changeModule(module) {
    const response = await fetch(urlData + '/' + module.id, {
      method: 'PUT',
      body: JSON.stringify(module),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const myData = await response.json()
    return myData
  }

  async updatePriceOfModule(idModule, modulePrice) {
    const response = await fetch(urlData + '/' + idModule, {
      method: 'PATCH',
      body: JSON.stringify({ price: modulePrice }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const myData = await response.json()
    return myData
  }
}
