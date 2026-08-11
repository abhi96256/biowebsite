const http = require('http');

function request(method, path, headers, body) {
    return new Promise((resolve, reject) => {
        const req = http.request(
            { hostname: 'localhost', port: 5000, path, method, headers },
            (res) => {
                let data = '';
                res.on('data', (c) => (data += c));
                res.on('end', () => resolve({ status: res.statusCode, body: data }));
            }
        );
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

(async () => {
    const loginBody = JSON.stringify({ username: 'admin', password: 'admin123' });
    const login = await request('POST', '/api/login', {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginBody)
    }, loginBody);
    console.log('LOGIN', login.status, login.body);

    const token = JSON.parse(login.body).token;
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const form =
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="value"\r\n\r\n` +
        `SURESH IAS\r\n` +
        `--${boundary}--\r\n`;

    const put = await request(
        'PUT',
        '/api/content/1',
        {
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Content-Length': Buffer.byteLength(form)
        },
        form
    );
    console.log('PUT', put.status, put.body);

    const bad = await request(
        'PUT',
        '/api/content/1',
        {
            Authorization: 'Bearer badtoken',
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Content-Length': Buffer.byteLength(form)
        },
        form
    );
    console.log('PUT_BAD', bad.status, bad.body);
})();
