export default (handle) => {

    // write immutable data and get the address
    const write = (value) => {

        return window.safeImmutableData.create(handle)
        .then((idWriterHandle) => {

            // write data
            return window.safeImmutableData.write(idWriterHandle, value)
            .then(_ => {
                return window.safeCipherOpt.newPlainText(handle);
            })
            .then((cipherOptHandle) => {

                // close writeable stream
                return window.safeImmutableData.closeWriter(idWriterHandle, cipherOptHandle);

            });
        });
    };

    // fetch immutable data with an address
    const read = (addr) => {
        return window.safeImmutableData.fetch(handle, addr)
        .then(window.safeImmutableData.read);
    };

    const readUtf8 = (addr) => {
        return read(addr).then((data) => {
            return String.fromCharCode.apply(null, new Uint8Array(data));
        });
    };

    return Object.freeze({
        write: write,
        read: read,
        readUtf8: readUtf8
    });
};
