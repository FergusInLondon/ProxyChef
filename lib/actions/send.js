const handle = ({res, content}) => {
    res.write(content)
    res.end()
}

module.exports = {
    inbound: handle,
    outbound: handle
}
