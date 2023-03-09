const { default: Navbar } = require("../components/Navbar");
const { default: Completion } = require("../components/Completion");

function StripeCompletion() {
    return(
        <div>
            <Navbar />
            <Completion />
        </div>
    );
}

export default StripeCompletion;