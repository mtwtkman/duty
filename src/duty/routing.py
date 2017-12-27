from channels.routing import route_class
from planning.consumers import Planning


channel_routing = [
    route_class(Planning, path='^/planning/$'),
]
