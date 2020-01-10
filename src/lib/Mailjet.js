const mailjet = require('node-mailjet').connect('d827f7832a6ef8ec14fd852e84f8ca94', 'a9bba1ef8e623d35d64e9945f92cee71')

const sendEmailWithTemplate = async (TemplateId, to, Variables = {}) => {
  try {
    await mailjet
      .post('send', {'version': 'v3.1'})
      .request({
        'Messages': [
          {
            'From': {
              'Email': 'sarah.lasfar@eatseazy.com',
              'Name': 'Eats Eazy',
            },
            'To': [
              {'Email': to}
            ],
            TemplateId,
            'TemplateLanguage': true,
            Variables,
          }
        ]
      })

    return true
  } catch (error) {
    console.log('[lib][Mailjet:sendEmailWithTemplate] :', error)
    return false
  }
}

export const sendVerificationEmail = (to, verificationToken) => {
  return sendEmailWithTemplate(1156910, to, {
    verificationToken,
    email: to,
  })
}

export const sendResetPasswordEmail = (to, resetToken) => {
  return sendEmailWithTemplate(1160710, to, {
    resetToken,
    email: to,
  })
}

export const sendResetPasswordEmailConfirmation = to => {
  return sendEmailWithTemplate(1160360, to, {
    email: to,
  })
}

export const sendActivationEmailConfirmation = (to, userRole) => {
  return sendEmailWithTemplate((userRole === 'RESTAURANT') ? 1161686:1161686 , to, {
    email: to,
  })
}
