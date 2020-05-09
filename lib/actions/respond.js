const handle = ({res, opts}) => {
    // ! todo: support headers.
    res.statusCode = opts.code
    res.write(opts.content)
}

module.exports = {
    inbound: handle,
    outbound: handle
}
