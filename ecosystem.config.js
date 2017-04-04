module.exports = {
  apps: [{
    name: 'ensongble-app',
    script: './app.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-52-34-3-61.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/aws-key-fast-ai.pem',
      ref: 'origin/master',
      repo: 'git@github.com:programng/ensongble-app.git',
      path: '/home/ubuntu/ensongble-app',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
};
