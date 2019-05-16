const passport = require("passport");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("hi");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/current_user", (req, res) => {
    console.log("req.user: ", req.user);
    res.send(req.user);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
