(function () {
    'use strict';

    const os = require('os');
    const spawn = require('child_process').execFile;

    const validPayloads = [
        "kill", "force_kill",
        "kill_exe", "force_kill_exe"
        ];

    module.exports = (context) => {
        const { toast, app } = context;

        function search(query, res) {
            const trimmedQuery = query.trim();

            if (!trimmedQuery.length) {
                return;
            }

            res.add({
                id: "kill_exe",
                payload: `${trimmedQuery}.exe`,
                title: `${trimmedQuery}.exe`,
                desc: "Kill process",
                icon: "#fa fa-fire-extinguisher"
            });

            res.add({
                id: "force_kill_exe",
                payload: `${trimmedQuery}.exe`,
                title: `${trimmedQuery}.exe`,
                desc: "Force kill process",
                icon: "#fa fa-bomb"
            });

            res.add({
                id: "kill",
                payload: trimmedQuery,
                title: trimmedQuery,
                desc: "Kill process",
                icon: "#fa fa-fire-extinguisher"
            });

            res.add({
                id: "force_kill",
                payload: trimmedQuery,
                title: trimmedQuery,
                desc: "Force kill process",
                icon: "#fa fa-bomb"
            });
        }

        function execute(id, payload) {
            if (validPayloads.indexOf(id) === -1) {
                return;
            }

            const args = ["/im", payload];

            if (id === "force_kill" || id === "force_kill_exe") {
                args.push("/f");
            }

            var child = spawn('taskkill', args, {
                detached: true,
                stdio: 'ignore',
                cwd: os.homedir()
            });

            child.unref();

            app.close();
        }

        return { search, execute };
    };
})();