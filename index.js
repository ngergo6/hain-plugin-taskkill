(function () {
    'use strict';

    const os = require('os');
    const spawn = require('child_process').execFile;

    module.exports = (context) => {
        function search(query, res) {
            const trimmedQuery = query.trim();

            if (!trimmedQuery.length) {
                return;
            }

            res.add({
                id: trimmedQuery,
                payload: "kill",
                title: trimmedQuery,
                desc: "Kill process"
            });
        }

        function execute(id, payload) {
            if (payload !== "kill") {
                return;
            }

            var child = spawn('taskkill', ['/f', '/im', id], {
                detached: true,
                stdio: 'ignore',
                cwd: os.homedir()
            });

            child.unref();
        }

        return { search, execute };
    };
})();