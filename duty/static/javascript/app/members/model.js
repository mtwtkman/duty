import m from 'mithril';

const endpoint = '/members/api/members';
const model = {
    data: [],
    value: '',
    updateValue(v) {
        model.value = v;
    },
    async fetch() {
        try {
            const response = await m.request({url: endpoint, method: 'GET'});
            model.data = response.data;
            return response;
        } catch(e) {
            throw e;
        }
    },
    async create() {
        try {
            const response = await m.request({
                url: endpoint,
                method: 'POST',
                data: { name: model.value },
            });
            model.data.push(response.data);
            return response;
        } catch(e) {
            throw e;
        }
    },
    async delete(id) {
        try {
            const response = await m.request({url: `${endpoint}/${id}`, method: 'DELETE'});
            model.data = model.data.filter(x => x.id !== response.data);
            return response;
        } catch(e) {
            throw e;
        }
    },
};

export default model;
