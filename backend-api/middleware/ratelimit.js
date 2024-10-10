const setRateLimit = require("express-rate-limit");

// Rate limit middleware

//ony 5 attempts within 60 seconds
const rateLimit5x60 = setRateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "You have exceeded your 5 requests per minute limit.",
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// 3 attempts mas in 10 seconds
const rateLimit3x10 = setRateLimit({
    max: 3,
    windowMS: 1000, //10 seconds 
    message: "Too many sign-in attempts. Try again later.",
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

module.exports = {
    rateLimit5x60,
    rateLimit3x10
};