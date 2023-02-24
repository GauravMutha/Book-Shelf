const mongoose= require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/drive', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to the Database'));

db.once('open',function(){
    console.log('Server successfully connected to Database');
})