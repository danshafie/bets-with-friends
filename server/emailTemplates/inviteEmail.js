const numbersWithCommas = require("../utils");

module.exports = (props, id) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Demystifying Email Design</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0;">
<table align="center" cellpadding="0" cellspacing="0" width="600">
        <tr>
            <td align="center" style="padding: 40px 0 30px 0;">
                <img src="cid:cute-image@cid" cid:cute-image@cid alt="Creating Email Magic" width="600" height="300" style="display: block;" />
            </td>
        </tr>
        <tr style="padding: 40px 30px 40px 30px;text-align:center;"> 
            <td>Hey, <span style='text-transform:capitalize;'>${
              props.name
            }</span>, ${
    props.loggedInUser
  } has challenged you to a bet! Its for $${numbersWithCommas(
    props.value
  )}<br/><br/>
            To accept or decline, hit a button below!
            </td>
        </tr>
        <tr style="padding: 40px 30px 40px 30px;text-align:center;">
            <td style='padding:40px 0 30px 0;'>
                Your friends message is: <br/>
                ${props.comment}
            </td>
        </tr>
        <tr style="padding: 40px 30px 40px 30px;text-align:center;">
            <td style='padding:40px 0 30px 0;'>
                 <a href='http://localhost:3000/email-response?accepted=true&id=${id}' style='padding: 5px 10px 5px 10px;background:green;margin-right: 10px;border-radius:5px;text-decoration:none;color:white'>Accept</a><a href='http://localhost:3000/email-response?accepted=declined&id=${id}' style='padding: 5px 10px 5px 10px;background:red;border-radius:5px;text-decoration:none;color:white'>Decline</a>
            </td>
        </tr>
</table>
</body>
</html>`;
};
