FROM devops1fin/ubuntu22-node18-python310-awscli:latest

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV LC_MONETARY en_IN.UTF-8

CMD [ "npm", "run", "start:prod" ]