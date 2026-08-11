/**
 * Helper: build CMS rows for a section
 * Each field: { key, value?, image_url? }
 */
function section(name, fields) {
    return fields.map((f) => [
        name,
        f.key,
        f.value ?? null,
        f.image_url ?? null
    ]);
}

module.exports = { section };
