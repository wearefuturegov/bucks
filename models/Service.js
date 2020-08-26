const mongoose = require("mongoose")

const strToLower = v => {
    return v.toLowerCase()
}

const arrayToLower = v =>{
    return v.map(el =>{
        return el.toLowerCase()
    })
}

const Service = new mongoose.Schema({

    assetId: {
        type: Number,
        required: [true, "All services need a unique asset ID"],
//         unique: true
    },

    name: String,
    parentOrganisation: String,
    description: String,
    price: String,

    category: {type: String, set: strToLower},

    keywords: {type: [String], set: arrayToLower},
    ageGroups: {type: [String], set: arrayToLower},
    accessibility: {type: [String], set: arrayToLower},
    suitability: {type: [String], set: arrayToLower},

    venue: String,
    area: String,
    postcode: String,
    // latitude: Number,
    // longitude: Number,

    promoted: Boolean,

    geo: {
        type: Object,
        default: {}
    },

    // daytime: Boolean,
    frequency: String,
    days: {type: [String], set: arrayToLower},

    contactName: String,
    email: {type: String, set: strToLower},
    phone: String,
    url: {type: String, set: strToLower},

    lastUpdated: Date,

    // PRIVATE/BACK OFFICE FIELDS

    reviewDate: {
        type: Date,
        default: Date.now
    },

    reviewStatus: String,
    reviewNotes: String,
    cloNotes: String,
    reviewNumber: Number,
    assignedTo: String,

    // lafArea: String,
    // ccgLocality: String,

    cloCheckMeetings: Boolean,

    volDbsCheck: String,
    safeguarding: String,
    healthSafety: String,
    insurance: String,

    confidDataProtect: String,
    equalityDiversity: String,

    legacyCategories: [String],

    comment1: String,
    comment2: String,
    comment3: String,

    genericField1: String,
    genericField2: String,
    genericField3: String,
    genericField4: String,
    genericField5: String

},{
    timestamps: true 
})

module.exports = mongoose.model("Service", Service)
