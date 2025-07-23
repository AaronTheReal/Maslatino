const prerender = require('prerender-node');

const token = 'rDjdSfG9AiLjP4fYB9Xd';

prerender.set('prerenderToken', token);

exports.handler = async (event, context) => {
  const req = {
    method: event.httpMethod,
    headers: event.headers,
    url: event.rawUrl,
  };

  let res = {
    send: (body) => ({ statusCode: 200, body }),
    setHeader: () => {},
    status: () => res,
  };

  // Lógica de prerender-node adaptada a Netlify
  return new Promise((resolve, reject) => {
    prerender.whitelisted(() => true); // permite todo
    prerender(req, res, () => {
      // No hacer nada si no es bot
      resolve({
        statusCode: 404,
        body: 'Not a bot request',
      });
    }).then((r) => resolve(r));
  });
};
