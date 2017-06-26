import Habitica from 'habitica';

class HabiticaClient extends Habitica {
  getUser() {
    return this.get('/user')
  }

  getUserTasks(type) {
    if (type == 'todos') {
      return Promise.all([
        this.get('/tasks/user', { type: 'todos' }),
        this.get('/tasks/user', { type: 'completedTodos' })
      ]).then(resps => [].concat(resps[0].data, resps[1].data))
    } else {
      return this.get('/tasks/user', { type }).then(resp => resp.data)
    }
  }

  getGroups() {
    return this.get('/groups?type=tavern,party,guilds')
  }

  getUserWithGroups() {
    return Promise.all([this.getUser(), this.getGroups()])
  }
}

export default function() {
  const auth = JSON.parse(localStorage.getItem('auth'))
  return new HabiticaClient(Object.assign({ platform: 'HabiticaChrome' }, auth))
}