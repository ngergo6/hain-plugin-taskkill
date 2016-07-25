(function () {
    'use strict';

    const os = require('os');
    const spawn = require('child_process').execFile;

    const validPayloads = ["kill", "force_kill"];

    module.exports = (context) => {
        const { toast } = context;

        function search(query, res) {
            const trimmedQuery = query.trim();

            if (!trimmedQuery.length) {
                return;
            }

            res.add({
                id: "kill",
                payload: trimmedQuery,
                title: trimmedQuery,
                desc: "Kill process"
            });

            res.add({
                id: "force_kill",
                payload: trimmedQuery,
                title: trimmedQuery,
                desc: "Force kill process"
            });
        }

        function execute(id, payload) {
            if (validPayloads.indexOf(id) === -1) {
                return;
            }

            const args = ["/im", payload];

            if (id === "force_kill") {
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