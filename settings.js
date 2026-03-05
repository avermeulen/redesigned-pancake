module.exports = {
    // The TCP port that the Node-RED web server is listening on
    uiPort: process.env.PORT || 1880,

    // Retry time in milliseconds for TCP socket connections
    socketReconnectTime: 10000,

    // Timeout in milliseconds for TCP server socket connections
    socketTimeout: 120000,

    // The maximum number of log entries stored in memory
    debugMaxLength: 1000,

    // The file containing the flows. Default: flows_<hostname>.json
    flowFile: 'flows.json',

    // To enable pretty-printing of the flow within the flow file, set the following property to true
    flowFilePretty: true,

    // By default, credentials are encrypted in storage using a generated key.
    // To specify your own secret, set the following property.
    // credentialSecret: "a-secret-key",

    // Set the following property to false to disable the Node-RED editor. The admin API
    // will still be available.
    disableEditor: false,

    // The following property can be used to enable HTTPS
    // See http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
    // for details on its contents. See the following recipe:
    //   https://nodered.org/docs/user-guide/runtime/securing-node-red
    // for information on securing Node-RED with HTTPS.
    // https: {
    //  key: require("fs").readFileSync('privkey.pem'),
    //  cert: require("fs").readFileSync('cert.pem')
    // },

    // The following property can be used to enable static content from a directory.
    // This directory is relative to the userDir directory.
    // httpStatic: '/home/nol/node-red-static/',

    // The maximum size of HTTP request that will be accepted by the runtime api.
    // Default: 5mb
    apiMaxLength: '5mb',

    // Securing Node-RED
    // -----------------
    // To password protect the Node-RED editor and admin API, the following
    // property can be used. See http://nodered.org/docs/security.html for details.
    // adminAuth: {
    //  type: "credentials",
    //  users: [{
    //      username: "admin",
    //      password: "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
    //      permissions: "*"
    //  }]
    // },

    // Logging
    // -------
    // Level of logging to be recorded. Options are:
    // fatal - only those errors which make the application unusable should be recorded
    // error - record errors which are deemed fatal for a particular request + fatal errors
    // warn - record problems which are non fatal + errors + fatal errors
    // info - record information about the general running of the application + warn + error + fatal errors
    // debug - record information which is more verbose than info + info + warn + error + fatal errors
    // trace - record very detailed logging + debug + info + warn + error + fatal errors
    // off - turn off all logging (doesn't affect metrics or audit)
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },

    // Editor configuration
    // --------------------
    editorTheme: {
        projects: {
            // To enable the Projects feature, set this value to true
            enabled: false
        }
    }
};
