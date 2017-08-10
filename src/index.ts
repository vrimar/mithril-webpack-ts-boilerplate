import * as m from 'mithril';
import 'normalize.css';

const component = {
  view() {
    return m('h1', 'Mithril-webpack-typescript-boilerplate');
  }
};

m.mount(document.getElementById('App'), component);
