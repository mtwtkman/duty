from urllib.parse import parse_qs as qs

from channels import Group
from channels.generic.websockets import WebsocketConsumer


class Planning(WebsocketConsumer):
    groups = ['planning']
    http_user = True

    @property
    def user(self):
        return self.message.channel_session['user']

    def connect(self, message, **kwargs):
        super().connect(message, **kwargs)
        Group('planning').add(self.message.reply_channel)

    def receive(self, text=None, bytes=None, **kwargs):
        Group('planning').send({ 'text': 'connected' })
