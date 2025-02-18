class Middleware {
  constructor() {
    this.middlewares = [];
  }

  use(func) {
    if (typeof func !== "function") {
      throw new TypeError("Middleware must be a function");
    }
    this.middlewares.push(func);
  }

  start(req) {
    let index = 0;
    const middlewares = this.middlewares;

    const next = (error) => {
      if (index >= middlewares.length) return;

      const current = middlewares[index];
      index++;

      try {
        if (error) {
          if (current.length === 3) {
            current(error, req, next);
          } else {
            next(error);
          }
        } else {
          if (current.length === 2) {
            current(req, next);
          } else {
            next();
          }
        }
      } catch (err) {
        next(err);
      }
    };

    next();
  }
}
