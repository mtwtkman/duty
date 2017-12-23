from django import template


register = template.Library()


@register.simple_tag(takes_context=True)
def active_link(context, app):
    print(app in context.request.path)
    return 'active' if app in context.request.path else ''
