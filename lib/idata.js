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
    const read = (addr, toString) => {

        return window.safeImmutableData.fetch(handle, addr)
        .then((idReaderHandle) => {

            return window.safeImmutableData.read(idReaderHandle);
        })
        .then((data) => {

            if (toString) {
                data = String.fromCharCode.apply(null, new Uint8Array(data));
            }

            return data;
        });
    };

    return Object.freeze({
        write: write,
        read: read
    });
};
