module.exports = {
  apps:[
    {
    name:'react-eq',
    script:'./build/server.js',
    env:{
      "PORT":8080,
      NODE_ENV:"development",
    },
    env_production:{
      "PORT":"80",
      NODE_ENV: "production"
    },

  }]
}