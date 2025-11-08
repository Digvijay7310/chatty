import Joi from "joi";

export const sendMessageSchema = Joi.object({
    receiver: Joi.string().required(),
    text: Joi.string().allow(''),
    media: Joi.string().allow(null, '')
})