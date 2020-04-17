module.exports = (scope) => (ctx, next) => {
  ctx.scope = scope;
  return next();
};
