const {Schema, model, connection} = require("mongoose")


const reportSchema = new Schema({
    user:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String,
        minLength: 100
    },
    connectionName:{
        required:true,
        type:String
    }
    ,connection:{
        required:true,
        type:String
    },
    viewType:{
        required:true,
        type:String
    }
})

reportSchema.statics.publish = async(info)=>{
    const newReport = new Report({
        user:info.user,
        description:info.description,
        connectionName: info.conName,
        connection: info.connection,
        viewType:info.type
    })
    await newReport.save();

    return;
}

const Report = model("Reports", reportSchema);

module.exports = Report;