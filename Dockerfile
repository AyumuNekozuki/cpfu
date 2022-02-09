FROM --platform=linux/x86_64 node:14.18.2-alpine

RUN apk add g++ make py3-pip

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    fb_apiKey=AIzaSyBwvyIyXEOJCq9fxRkcu47wiqyJBkauxSo \
    fb_authDomain=cpfu-nekozuki-me.firebaseapp.com \
    fb_projectId=cpfu-nekozuki-me \
    fb_storageBucket=cpfu-nekozuki-me.appspot.com \
    fb_messagingSenderId=935076507912 \
    fb_appId=1:935076507912:web:5bcb5bbcb227bf7461bcbd \
    fb_measurementId=G-XNWR91F5WB \
    cropura_demouser_email=cropura_demo_user@nekozuki.me \
    cropura_demouser_password=Hq_ctCzjuLp99KVMBaMnH2tg

RUN mkdir -p /app
COPY /src /app
WORKDIR /app

ARG ENV
ENV ENV $ENV

RUN yarn && yarn build

EXPOSE 3000

CMD ["yarn", "start"]