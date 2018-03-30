FROM nginx

ADD build /usr/share/nginx/html

ADD default.conf.template /etc/nginx/conf.d/default.conf.template

ENV HELLO_API_URL=http://hello-api:8080

ENTRYPOINT [ "/bin/bash", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'" ]
