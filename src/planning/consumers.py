from urllib.parse import parse_qs as qs

from channels import Group
from channels.generic.websockets import WebsocketConsumer


class Planning(WebsocketConsumer):
    groups = ['planning']

    def connect(self, message, **kwargs):
        self.message.channel_session['user'] = qs(message.content['query_string'])[b'username'][0].decode()
        self.message.reply_channel.send({'accept': True})

    def receive(self, text=None, bytes=None, **kwargs):
        Group('planning').send({
            'text': '[{}] - {}'.format(self.message.channel_session['user'], text)
        })
