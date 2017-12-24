import m from 'mithril';

  const d = new Date();
  const state = {
    fetching: false,
    fetchingMembers: false,
    today: `${d.getFullYear()}/${d.getDate()}/${d.getMonth() + 1}`,
  };
  const endpoint = '/standup/api/';
  const membersEndpoint = '/members/api/members';
  const Model = {
    members: [],
    chairman: null,
    connecting() {
      return state.fetching ||
        state.fetchingMembers
      ;
    },
    fetch() {
      state.fetching = true;
      return m.request({url: endpoint, method: 'GET'})
        .then(response => {
          state.fetching = false;
          Model.chairman = response.data;
        });
    },
    fetchMembers() {
      state.fetchingMessage = true;
      return m.request({url: membersEndpoint, method: 'GET'})
        .then(response => {
        state.fetchingMessage = false;
          Model.members = response.members;
        });
    },
  };
  Model.fetch();
  Model.fetchMembers();
  const Component = {
    view(vnode) {
      return m('div.wrapper',
        m('div', `${state.today}の司会は`),
      );
    },
  };
  m.mount(document.getElementById('app'), Component);

