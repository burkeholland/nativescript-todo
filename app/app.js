try {
    var application = require("application");
    application.start({ moduleName: "main-page" });
}
catch (err) {
    console.log(err);
}
