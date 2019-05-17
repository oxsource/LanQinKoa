async function echo(ctx, _) {
    ctx.response.body = "Hello, LanQin API."
}

module.exports = {
    'GET /': echo
}