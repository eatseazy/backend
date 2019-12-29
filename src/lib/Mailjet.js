const mailjet = require('node-mailjet').connect('d827f7832a6ef8ec14fd852e84f8ca94', 'a9bba1ef8e623d35d64e9945f92cee71')

export const sendVerificationEmail = (to, token) => {
  return mailjet
    .post('send', { 'version' : 'v3.1' })
    .request({
      'Messages': [
        {
          'From': {
            'Email': 'sarah.lasfar@eatseazy.com',
            'Name': 'Eats Eazy'
          },
          'To': [
            { 'Email': to },
          ],
          'TemplateID': 1156910,
          'TemplateLanguage': true,
          "Variables": {
            token,
            email: to,
          }
        }
      ]
    })
}

export const sendResetPasswordEmail = (to, from = { 'Email': 'sarah.lasfar@eatseazy.com', 'Name': 'Eats Eazy'}) => {
  return mailjet
    .post('send', { 'version' : 'v3.1' })
    .request({
      'Messages': [
        {
          'From': from,
          'To': to,
          'TemplateID': 1156976,
          'TemplateLanguage': true,
        }
      ]
    })
}

