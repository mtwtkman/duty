#! /bin/sh

d=docker-compose
de="${d} exec"
w="${de} web python manage.py"
a="${de} assets"
p="${de} db"

case $1 in
  up)      ${d} up -d;;
  restart) ${d} restart;;
  stop)    ${d} stop;;
  migrate) ${w} migrate domain;;
  pip)     ${w} pip install $2;;
  sh)      ${w} shell;;
  build)   ${a} npm run build;;
  psql)    ${p} psql -U postgres;;
  *)       ${d} $2;;
esac
