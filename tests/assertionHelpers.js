const assert = require('chai').assert;

function handleAssertionStatusCode(result, testname, expectedStatusCode) {
    const actualStatusCode = result.status;
    try {
        assert.equal(actualStatusCode, expectedStatusCode);
    } catch {
        writeAssertionDetails(result, testname);
    }

}

function handleNegativeTestError(result, testname, expectedErrCode, expectedInnerErr, expectedInnerErrMsg) {
    if (typeof result.response == "undefined") {
        console.log("Response didn't return any content.");
    } else {
        const response = result.response;
        const data = response.data;
        try {
            assert.equal(data.Code, expectedErrCode);
            if (typeof expectedInnerErr !== "undefined") {
                assert.equal(data.InnerErrors[0].Code, expectedInnerErr);
                if(typeof expectedInnerErrMsg !== "undefined") {
                    assert.include(data.InnerErrors[0].Message, expectedInnerErrMsg);
                }
            }
        } catch {
            console.log(`Error at ${testname}:\nPrinting actual error message: `)
            writeErrors(response, testname);
            assert.fail("Errors didn't match.");
        }
    }
}

function handleUnexpectedErrorMsg(error, testname) {
    console.log(`Error at ${testname}:\nPrinting actual error message: `);
    if (typeof error.response == "undefined") {
        console.log(`${testname} didn't return response.`);
    } else {
        writeErrors(error.response, testname);
    }
}

function writeAssertionDetails(result, testname) {
    const response = result.response;
    if (response.status == 500) {
        assert.fail("Internal Server Error.");
    } else {
        console.log(`Error at ${testname}`);
        console.log(`Response Status Code for ${testname}: ${response.status}`);
        if (typeof response !== "undefined") {
            writeErrors(response, testname);
        } else {
            assert.fail("Response didn't return any content.");
        }
    }
}

function writeErrors(response, testname) {
    const data = response.data;
    console.log(`Code: ${data.Code}`);
    console.log(`Message: ${data.Message}`);
    if (typeof data.InnerErrors !== "undefined") {
        const innerErrors = data.InnerErrors;
        for (i = 0; i < innerErrors.length; i++) {
            console.log(`InnerErrorCode: ${innerErrors[i].Code}`);
            console.log(`InnerErrorMessage: ${innerErrors[i].Message}`);
        }
    }
}

module.exports = { handleAssertionStatusCode, handleNegativeTestError, handleUnexpectedErrorMsg }