install nginx on server

```
apt install nginx
```

clone repository to `/var/www/decent_social_app/`

```
git clone git@github.com:decentsocial/app.git /var/www/decent_social_app/
```

create file `vim /etc/nginx/sites-available/decent_social_app`

```
server {
        listen 80;
        listen [::]:80;

        server_name app.decent.social;

        location / {
                proxy_pass http://127.0.0.1:3000;
        }
}
```

link to `sites-enabled`

```
ln -s /etc/nginx/sites-available/decent_social_app /etc/nginx/sites-enabled/
```

verify nginx config is correct

```
nginx -t
```

reload nginx

```
service nginx reload
```

# update app.decent.social

```
ssh root@decent.social "cd /var/www/decent_social_app/; git pull; docker-compose build --parallel; docker-compose stop; docker-compose up -d"
```