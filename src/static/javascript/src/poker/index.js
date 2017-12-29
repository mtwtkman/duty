import m from 'mithril';


const model = {
    username: '',
    members: [],
    updateUsername(v) {
        model.username = v.trim();
    },
    async fetchMembers() {
        const response = await m.request({
            url: '/members/api/members',
            method: 'GET',
        })
        model.members = response.data;
    }
};

const state = {
    joined: false,
};

const InputComponent = {
    view(vnode) {
        return m('div.input-group',
            m('input.form-control', {
                oninput: m.withAttr('value', model.updateUsername),
                placeholder: 'input name',
                'aria-label': 'input name',
                value: model.username,
                maxlength: 20,
            }),
            m('span.input-group-btn',
                m('button.btn.btn-success[type=button]', {
                    onclick: vnode.attrs.join,
                    disabled: !model.username
                }, 'Join'),
            ),
        );
    },
}

const Component = {
    oninit(vnode) {
        vnode.join = () => {
            const conn = new WebSocket(`ws://${location.host}/planning/`);
            conn.onmessage = e => {
                state.joined = true;
                m.redraw();
            }
            conn.onopen = () => {
                conn.send('');
            }
        }
    },
    view(vnode) {
        return m('div',
            (() => {
                if (!state.joined) {
                    return m(InputComponent, { join: vnode.join });
                }
                return m('div', model.username);
            })(),
        );
    }
}

m.mount(document.getElementById('app'), Component);
