var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var CDModel = new Schema({
        title:{
            type: String
        },
        author: {
            type: String
        },
        genre:{type: String},
        played: {type: Boolean, default:false},
      links: {
            self: {href:""},
            collection: {  href : "" }
        }
    });

    module.exports= mongoose.model('CD',CDModel);