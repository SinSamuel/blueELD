const sgMail = require("@sendgrid/mail");
//const Token = require('../api/models/token');
sgMail.setApiKey(process.env.SEND_GRID_API);

exports.sendEmailVerification = async (data, emailTo) => {
  try {
    const msg = {
      to: emailTo,
      from: {
        email: "dummy70324@gmail.com",
        name: "BlueELD",
      },
      templateId: process.env.EMIAL_VERIFY_TEMPLATE,
      dynamic_template_data: {
        email: emailTo,
        code: data?.code,
      },
    };
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};

exports.resetPasswordVerification = async (data, emailTo) => {
  try {
    const msg = {
      to: emailTo,
      from: {
        email: "dummy70324@gmail.com",
        name: "BlueELD",
      },
      templateId: process.env.RESET_PASSWORD_TEMPLATE,
      dynamic_template_data: {
        email: emailTo,
        code: data?.code,
      },
    };
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};

exports.employeeInvitation = async (data, emailTo) => {
  try {
    const msg = {
      to: emailTo,
      from: {
        email: "dummy70324@gmail.com",
        name: "BlueELD",
      },
      templateId: process.env.INVITATION_TEMPLATE,
      dynamic_template_data: {
        email: emailTo,
        name: data?.name,
        id: data?.id,
        role: data?.role,
      },
    };
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};
