import m from 'mithril';


const Component = {
    view(vnode) {
        return m('div', 'hoge');
    }
}

m.mount(document.getElementById('app'), Component);
