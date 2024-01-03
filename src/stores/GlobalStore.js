import { makeAutoObservable } from 'mobx';

export class GlobalStore {
  _favorites = [];

  constructor() {
    makeAutoObservable(this);
  }

  setData = (key, value) => {
    this[key] = value;
  };

  handleAddToFavorite = (item, isInFav) => {
    if (isInFav) {
      const newArr = this._favorites.filter(i => i.name !== item.name);
      this.setData('_favorites', newArr);
    } else {
      this.setData('_favorites', [...this._favorites, item]);
    }
  };
}
