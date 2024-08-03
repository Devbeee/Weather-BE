export const verificationEmail = (url: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác thực Email</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #333;">Confirmation Email</h2>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Click here to confirm your email</p>
        <div style="text-align: center; margin-top: 20px;">
            <a href="${url}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Verify Email</a>
        </div>
        <p style="font-size: 14px; color: #888; margin-top: 20px; text-align: center;">If the requestor is not you, please ignore this email.</p>
    </div>

</body>
</html>`;

export const confirmSuccessHtml = (url: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirm email successfully</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .container {
        text-align: center;
      }

      h1 {
        color: #333;
      }

      p {
        color: #666;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }

      .button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Confirm email successfully</h1>
      <p>Your email has confirmed</p>
      <a href="${url}" class="button">Click here to back home</a>
    </div>
  </body>
</html>
`;
export const newsWeatherForecast = (url:string,news:string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div style="font-size: 1.2rem; margin: 35px 0;">
        <h2 style="text-align: center; margin-bottom: 35px;">4-Day Forecast</h2>`+news+
      `
      </div>
    </div>
    <a href="${url}" style="display: block; width: 30%; font-weight: bold; text-align: center; text-decoration: none; padding: 20px 40px;margin-left: 100px; background-color: aqua; color: #fff;">Our website</a>
  </body>
</html>`
