import m from 'mithril';

import model from './model.js';
import Component from '../common/components/events';


m.mount(
    document.getElementById('app'),
    {
        view(vnode) {
            return m(Component, {
                model,
                assigneeType: '司会',
            });
        },
    },
);
