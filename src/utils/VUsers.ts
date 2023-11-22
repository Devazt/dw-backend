import * as Joi from 'joi';

export const CrUserRegSchema = Joi.object({
    fullname: Joi.string().min(5).required(),
    username: Joi.string().min(5).required(),
    password: Joi.string().min(8).required()
})

export const CrUserLogSchema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(8).required()
})