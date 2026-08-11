# IAS Website CMS Server

## Folder structure

```
server/
  server.js                 # App entry
  config/db.js              # MySQL pool + JWT secret
  middleware/
    auth.js                 # JWT auth
    upload.js               # Multer image upload
  routes/
    auth.routes.js          # POST /api/login
    content.routes.js       # /api/content CRUD
  sections/                 # ★ One file per website section
    index.js                # Registry of all sections
    _helper.js
    hero.js
    introduction.js
    mission.js
    about.js
    core_values.js
    timeline.js
    leadership.js
    vision_mission.js
    initiatives.js
    awards.js
    media_gallery.js
    testimonials.js
    blog.js
    faqs.js
    contact.js
    footer.js
  seed/initialize.js        # Creates tables + seeds defaults
  uploads/                  # Uploaded images
```

## Add a new section

1. Create `server/sections/my_section.js` (copy `about.js`)
2. Register it in `server/sections/index.js`
3. Restart server (`npm start`) — new fields seed with `INSERT IGNORE`
4. Wire frontend with `useContent().getContent('my_section', 'key')`

## Admin

- Login: `admin` / `admin123`
- Panel: `/admin`
- API sections list: `GET /api/content/sections`
