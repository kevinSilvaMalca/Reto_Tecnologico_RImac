const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})

const Dynamo = {

    async saveItem(TableName, Item){
        const data = await db.put({
            TableName: TableName,
            Item: Item
        }).promise();

        return data;
    },

    async getByID(ID, TableName){
        const data = await db.get(
            {
                TableName: TableName,
                Key: {
                    id: ID
                }
            }
        ).promise();
        
       return data;
    },

    async getAll(TableName, type){
        const data = await db.scan(
            {
                TableName: TableName,
                Key: {
                    type: type
                }
            }
        ).promise();

        return data;
    },

    async updateItem(ID, TableName, KeyAttribute, KeyValue){
        const data = await db.update({
            TableName: TableName,
            Key: {id: ID},
            UpdateExpression: `set ${KeyAttribute} = :v`,
            ExpressionAttributeValues: {
                ':v': KeyValue
            }
        }).promise();

        return data;
    },

    async deleteIten(ID, TableName){
        const data = await db.delete({
            TableName: TableName,
            Key: {id: ID}
        }).promise();

        return data;
    },

    async getItemLimit(TableName, Limit){
        const data = await db.scan({
            TableName: TableName,
            Limit: Limit
        }).promise();
        
        return data;
    }
}

module.exports = Dynamo;