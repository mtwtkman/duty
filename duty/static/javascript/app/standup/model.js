import m from 'mithril';

const apiBase = '/standup/api/standup/';
const endpoint = `${apiBase}chairman`;
const membersEndpoint = `${apiBase}members`;

const model = {
    members: [],
    chairman: null,
    async fetch() {
        try {
            const response = await m.request({url: endpoint, method: 'GET'});
            model.chairman = response.data;
            return response;
        } catch(e) {
            throw e;
        }
    },
    async fetchMembers() {
        try{
            const response = await m.request({url: membersEndpoint, method: 'GET'});
            model.members = response.members;
            return response;
        } catch(e) {
            throw e
        }
    },
};

export default model;
