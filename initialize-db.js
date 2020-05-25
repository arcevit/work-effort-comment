const {defaultState} =require('./defaultState')
let {connectDB} =require('./connect-db')

async function initializeDB() {
    let db = await connectDB()
    let user = await db.collection(`comments`).findOne({ id: 1 })
    if (!user) {
        for (let collectionName in defaultState) {
            let collection = db.collection(collectionName);
            await collection.insertMany(defaultState[collectionName])
        }
    }


}

module.exports.initializeDB=initializeDB

