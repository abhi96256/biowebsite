/**
 * Central registry of all CMS sections.
 * Add a new file in /sections and require it here.
 */
const hero = require('./hero');
const introduction = require('./introduction');
const mission = require('./mission');
const about = require('./about');
const coreValues = require('./core_values');
const timeline = require('./timeline');
const leadership = require('./leadership');
const visionMission = require('./vision_mission');
const initiatives = require('./initiatives');
const awards = require('./awards');
const mediaGallery = require('./media_gallery');
const testimonials = require('./testimonials');
const blog = require('./blog');
const faqs = require('./faqs');
const contact = require('./contact');
const footer = require('./footer');

const ALL_SECTIONS = [
    hero,
    introduction,
    mission,
    about,
    coreValues,
    timeline,
    leadership,
    visionMission,
    initiatives,
    awards,
    mediaGallery,
    testimonials,
    blog,
    faqs,
    contact,
    footer
];

function getAllSeedRows() {
    return ALL_SECTIONS.flatMap((s) => s.fields);
}

function getSectionList() {
    return ALL_SECTIONS.map((s) => ({
        name: s.name,
        label: s.label
    }));
}

module.exports = {
    ALL_SECTIONS,
    getAllSeedRows,
    getSectionList
};
