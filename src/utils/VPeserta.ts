import * as Joi from 'joi';

export const CrPesertaSchema = Joi.object({
    usersId: Joi.number().required(),
    paslonId: Joi.number().required()
})