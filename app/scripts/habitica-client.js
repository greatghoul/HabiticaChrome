import Habitica from 'habitica';

export default class HabiticaClient extends Habitica {
  getUser() {
    return this.get('/user');
  }

  getGroups() {
    return this.get('/groups?type=tavern,party,guilds')
  }

  getUserWithGroups() {
    return Promise.all([this.getUser(), this.getGroups()]);
  }
}