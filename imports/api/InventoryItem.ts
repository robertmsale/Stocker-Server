import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SetRequired } from 'type-fest'
import { Meteor } from 'meteor/meteor';


export const Collection = new Mongo.Collection<MongoType>('intentory_item');

export interface Args {
    name: string,
    description: string,
    imageURL: string,
    cost: number
}

export interface Type extends Args {
    _id?: Mongo.ObjectID,
    createdAt: Date,
    createdBy: String
}

export type MongoType = SetRequired<Type, '_id'>;


Meteor.methods({
    'inventoryItem.insert'(item: Args) {
        check(item.cost, Number)
        check(item.imageURL, String)
        check(item.name, String)
        check(item.description, String)

        if(!this.userId) {
            throw new Meteor.Error('Not authorized.')
        }

        Collection.insert({
            createdAt: new Date(),
            createdBy: Meteor.users.findOne(this.userId).username,
            name: item.name,
            description: item.description,
            imageURL: item.imageURL,
            cost: item.cost,
        })
    }
})