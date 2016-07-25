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

            res.add({
                id: trimmedQuery,
                payload: "force_kill",
                title: trimmedQuery,
                desc: "Force kill process"
            });
        }

        function execute(id, payload) {
            if (payload !== "kill" || payload !== "force_kill") {
                return;
            }

            const args = ["/im", id];

            if (payload === "force_kill") {
                args.push("/f");
            }

            var child = spawn('taskkill', args, {
                detached: true,
                stdio: 'ignore',
                cwd: os.homedir()
            });

            child.unref();
        }

        return { search, execute };
    };
})();