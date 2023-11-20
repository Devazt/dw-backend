import * as Joi from 'joi';

export const CrPesertaSchema = Joi.object({
    name: Joi.string().min(5).max(70).required(),
    address: Joi.string().min(5).required(),
    gender: Joi.string().required(),
    vote_paslon: Joi.string().min(5).required()
})