import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Mongo } from 'meteor/mongo';
import {Merge, SetRequired} from "type-fest";
import _ from 'lodash'

export const Collection = new Mongo.Collection<MongoType>('stocker-user')

export interface Args {
    userId: string
    isAdmin: boolean
}

export interface Type extends Args {
    _id?: Mongo.ObjectID
    createdAt: Date
}

export type MongoType = SetRequired<Type, '_id'>

Meteor.methods({
    'stockerUser.insert'(user: Args) {
        check(user.isAdmin, Boolean)
        check(user.userId, String)

        let thisUserInfo = Collection.find({userId: this.userId}).fetch()
        if (thisUserInfo.length <= 0 || !thisUserInfo[0].isAdmin) {
            throw new Meteor.Error('Not authorized.');
        }
        let existing = Collection.findOne({userId: user.userId})
        if (_.isUndefined(existing)) {
            Collection.insert({
                userId: user.userId,
                isAdmin: user.isAdmin,
                createdAt: new Date()
            })
        } else {
            existing.isAdmin = user.isAdmin
            existing.userId = user.userId
            existing.
        }
    }
})