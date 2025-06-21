Deployment of frontend using aws
Commands and steps
- launch an instance
- create key value pair
- chmod 400 "devTinder-secret.pem"
- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-222-130-111.compute-1.amazonaws.com
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
- nvm install 20.10.0
- git clone https://github.com/vashud112223/devTinder_frontend.git
- git clone https://github.com/vashud112223/nodejs.git
- npm run build in vscode to bundle the code
Frontend: 
1. npm install in terminal
2. npm run build
3. sudo apt update
4. sudo apt install nginx
5. sudo systemctl start nginx
6. sudo systemctl enable nginx
7. Copy code from dist(build files) to /var/www/html/
8. sudo scp -r dist/* /var/www/html/
9. Enable port 80 of your instance -> Go to Security -> Security Group -> Add the rule
10. Now frontend is working on the public ip

Backend: 

1. go to directory -> npm install
2. npm run start
3. we cannot keep our terminal open all time if we will close our app will be not running and to avoid that we have pm2(process manager) npm install pm2 -g
4.  npm --name "devTinderbackend" -- start
5. pm2 list, pm2 flush <name>, pm2 stop, pm2 delete <name>

Frontend = http://13.222.130.111/
Backend = http://13.222.130.111:3000/

Domain name = devtinder.com => 13.222.130.111

Frontend = devtinder.com
Backend = devtinder.com:3000 => devtinder.com/api

nginx config:

server_name 13.222.130.111;

 location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    sudo systemctl restart nginx

- modify the BASE_URL in frontend project to "/api"
