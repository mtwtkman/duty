#! /bin/sh

d=docker-compose
de="${d} exec"
w="${de} web python manage.py"
a="${de} assets"
p="${de} db"
r="${de} redis"
l="${d} logs -f"

case $1 in
  up)      ${d} up -d;;
  worker)  ${w} runworker -v 2;;
  migrate) ${w} migrate $2;;
  pip)     ${de} web pip install $2;;
  app)     ${w} startapp $2;;
  sh)      ${w} shell;;
  jsbuild) ${a} npm run build;;
  psql)    ${p} psql -U postgres;;
  redis)   ${r} redis-cli;;
  log)     ${l} $2;;
  *)       ${d} $1;;
esac
