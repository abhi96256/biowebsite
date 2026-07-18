import React, { useState } from 'react';
import './Blog.css';

// ─── Mock Data ────────────────────────────────────────────────────────────────
// Jab backend ready ho, yahan API call karein: fetch('/api/blogs')
const MOCK_BLOGS = [
  {
    id: 1,
    category: 'Governance',
    title: 'The Art of Policy Implementation: Lessons From the Field',
    excerpt:
      "After four decades in public service, I have come to understand one fundamental truth -- the distance between a policy document and its impact on a farmer's life is vast, and it is filled with the work of honest administrators.",
    date: '2024-06-10',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    category: 'Public Health',
    title: "Rebuilding Rural Healthcare: What the Numbers Don't Tell You",
    excerpt:
      "Statistics can show bed occupancy and infant mortality rates -- but they cannot capture the relief on a mother's face when a functional primary health centre finally opens in her village.",
    date: '2024-05-22',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    featured: false,
  },
  {
    id: 3,
    category: 'Agriculture',
    title: "From Paddy Fields to Policy Rooms: The Farmer's Voice in Planning",
    excerpt:
      'My most humbling experience as Collector of Karnal was sitting on a charpoy and listening -- truly listening -- to what farmers needed, not what we assumed they did.',
    date: '2024-04-14',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    featured: false,
  },
  {
    id: 4,
    category: 'Infrastructure',
    title: 'Building Roads, Building Futures: The G20 Infrastructure Story',
    excerpt:
      'When India hosted the G20 summit, the infrastructure challenge was enormous. But behind every highway and convention centre was a team of civil servants who worked tirelessly through the night.',
    date: '2024-03-05',
    readTime: '10 min read',
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    featured: false,
  },
  {
    id: 5,
    category: 'Leadership',
    title: 'Leading Without Authority: The Quiet Power of Persuasion',
    excerpt:
      'The IAS does not grant you the power to command people into productivity -- it gives you the responsibility to inspire them. The difference is everything.',
    date: '2024-02-18',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    featured: false,
  },
  {
    id: 6,
    category: 'Education',
    title: 'The Silent Revolution: How District-Level Education Reform Works',
    excerpt:
      'Transforming government schools is not about grand announcements. It is about fixing broken toilet doors, ensuring teachers arrive on time, and putting chalk in classrooms.',
    date: '2024-01-30',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    featured: false,
  },
];

const CATEGORIES = ['All', 'Governance', 'Public Health', 'Agriculture', 'Infrastructure', 'Leadership', 'Education'];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ blog, featured }) => (
  <article className={`blog-card ${featured ? 'blog-card--featured' : ''}`}>
    <div className="blog-card__img-wrap">
      <img src={blog.image} alt={blog.title} className="blog-card__img" loading="lazy" />
      <span className="blog-card__category">{blog.category}</span>
    </div>
    <div className="blog-card__body">
      <div className="blog-card__meta">
        <span className="blog-card__date font-label-caps">
          <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }}>calendar_today</span>
          {formatDate(blog.date)}
        </span>
        <span className="blog-card__dot">·</span>
        <span className="blog-card__read font-label-caps">
          <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }}>schedule</span>
          {blog.readTime}
        </span>
      </div>
      <h3 className={`blog-card__title ${featured ? 'font-headline-md' : ''}`}>{blog.title}</h3>
      <p className="blog-card__excerpt font-body-md">{blog.excerpt}</p>
      <button className="blog-card__btn">
        Read Article
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
      </button>
    </div>
  </article>
);

// ─── Main Blog Section ─────────────────────────────────────────────────────────
const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);

  const filtered = activeCategory === 'All'
    ? MOCK_BLOGS
    : MOCK_BLOGS.filter(b => b.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <section className="blog-section" id="blog">
      <div className="max-w-container-max px-margin-mobile md-px-margin-desktop blog-section__inner">

        {/* Header */}
        <div className="blog-section__header">
          <span className="font-label-caps blog-section__label">Perspectives &amp; Reflections</span>
          <h2 className="font-headline-lg blog-section__title">From the Desk of <br />Rajesh Kumar IAS</h2>
          <p className="font-body-md blog-section__subtitle">
            Candid reflections on governance, leadership, and four decades of public service — straight from the field.
          </p>
        </div>

        {/* Category Filter */}
        <div className="blog-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`blog-filter__btn font-label-caps ${activeCategory === cat ? 'blog-filter__btn--active' : ''}`}
              onClick={() => { setActiveCategory(cat); setVisibleCount(5); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured + Grid */}
        {featured && (
          <>
            <div className="blog-featured-wrap">
              <BlogCard blog={featured} featured={true} />
            </div>

            {rest.length > 0 && (
              <div className="blog-grid">
                {rest.map(blog => (
                  <BlogCard key={blog.id} blog={blog} featured={false} />
                ))}
              </div>
            )}
          </>
        )}

        {filtered.length === 0 && (
          <div className="blog-empty">
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>article</span>
            <p className="font-body-md" style={{ color: 'var(--outline)' }}>No articles in this category yet.</p>
          </div>
        )}

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="blog-load-more">
            <button className="blog-load-btn font-label-caps" onClick={() => setVisibleCount(v => v + 3)}>
              Load More Articles
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>expand_more</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
