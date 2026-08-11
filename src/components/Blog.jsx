import React, { useState } from 'react';
import './Blog.css';
import { useContent } from '../context/ContentContext';

const resolveBlogImage = (src) => {
  if (!src) return '';
  if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:')) return src;
  if (src.startsWith('/uploads')) return `http://localhost:5000${src}`;
  return src;
};

const normalizeCategory = (v) => (v || '').toString().trim().toLowerCase();

const DEFAULT_BLOGS = [
  {
    id: 1,
    category: 'Governance',
    title: 'The Future of Digital Governance',
    excerpt: 'Exploring how technology is transforming public administration and citizen services.',
    date: '2024-06-10',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    featured: true
  },
  {
    id: 2,
    category: 'Governance',
    title: 'Building Citizen-Centric Administration',
    excerpt: 'Putting citizens at the center of policy design and service delivery.',
    date: '2024-05-22',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 3,
    category: 'Innovation',
    title: 'Innovation in Public Service',
    excerpt: 'How innovative approaches are solving complex governance challenges.',
    date: '2024-04-14',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 4,
    category: 'Development',
    title: 'Sustainable Rural Development',
    excerpt: 'Strategies for inclusive growth in rural communities.',
    date: '2024-03-05',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 5,
    category: 'Policy',
    title: 'Women Empowerment through Policy',
    excerpt: 'Creating opportunities for women through targeted policy interventions.',
    date: '2024-02-18',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 6,
    category: 'Youth',
    title: 'Youth as Nation Builders',
    excerpt: 'Empowering the next generation of leaders and change-makers.',
    date: '2024-01-30',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 7,
    category: 'Leadership',
    title: 'Leadership Lessons in Administration',
    excerpt: 'Key insights from decades of public service leadership.',
    date: '2024-01-15',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 8,
    category: 'Technology',
    title: 'Technology for Better Governance',
    excerpt: 'Leveraging digital tools for efficient and transparent administration.',
    date: '2024-01-01',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop',
    featured: false
  }
];

const DEFAULT_CATEGORIES = [
  'All',
  'Governance',
  'Innovation',
  'Development',
  'Policy',
  'Youth',
  'Leadership',
  'Technology'
];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BlogCard = ({ blog, featured }) => (
  <article className={`blog-card ${featured ? 'blog-card--featured' : ''}`}>
    <div className="blog-card__img-wrap">
      <img
        src={resolveBlogImage(blog.image)}
        alt={blog.title}
        className="blog-card__img"
        loading="lazy"
      />
      <span className="blog-card__category">{blog.category}</span>
    </div>
    <div className="blog-card__body">
      <div className="blog-card__meta">
        <span className="blog-card__date font-label-caps">
          <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }}>
            calendar_today
          </span>
          {formatDate(blog.date)}
        </span>
        <span className="blog-card__dot">·</span>
        <span className="blog-card__read font-label-caps">
          <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }}>
            schedule
          </span>
          {blog.readTime}
        </span>
      </div>
      <h3 className={`blog-card__title ${featured ? 'font-headline-md' : ''}`}>{blog.title}</h3>
      <p className="blog-card__excerpt font-body-md">{blog.excerpt}</p>
      <button className="blog-card__btn">
        Read Article
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          arrow_forward
        </span>
      </button>
    </div>
  </article>
);

const Blog = () => {
  const { getContent, getJSON } = useContent();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);

  const label = getContent('blog', 'label', 'Blog & Insights');
  const headline = getContent('blog', 'headline', 'Recent Articles');
  const description = getContent(
    'blog',
    'description',
    'Insights on governance, leadership, and public service.'
  );
  const blogs = getJSON('blog', 'items', DEFAULT_BLOGS);
  const categories = getJSON('blog', 'categories', DEFAULT_CATEGORIES);

  const activeNormalized = normalizeCategory(activeCategory);
  const filtered =
    activeNormalized === 'all'
      ? blogs
      : blogs.filter((b) => normalizeCategory(b.category) === activeNormalized);

  const visible = filtered.slice(0, visibleCount);
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <section className="blog-section" id="blog">
      <div className="max-w-container-max px-margin-mobile md-px-margin-desktop blog-section__inner">
        <div className="blog-section__header">
          <span className="font-label-caps blog-section__label">{label}</span>
          <h2 className="font-headline-lg blog-section__title">{headline}</h2>
          <p className="font-body-md blog-section__subtitle">{description}</p>
        </div>

        <div className="blog-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`blog-filter__btn font-label-caps ${
                normalizeCategory(activeCategory) === normalizeCategory(cat)
                  ? 'blog-filter__btn--active'
                  : ''
              }`}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(5);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {featured && (
          <>
            <div className="blog-featured-wrap">
              <BlogCard blog={featured} featured={true} />
            </div>

            {rest.length > 0 && (
              <div className="blog-grid">
                {rest.map((blog) => (
                  <BlogCard key={blog.id || blog.title} blog={blog} featured={false} />
                ))}
              </div>
            )}
          </>
        )}

        {filtered.length === 0 && (
          <div className="blog-empty">
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>
              article
            </span>
            <p className="font-body-md" style={{ color: 'var(--outline)' }}>
              No articles in this category yet.
            </p>
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="blog-load-more">
            <button className="blog-load-btn font-label-caps" onClick={() => setVisibleCount(filtered.length)}>
              Load All Articles
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                expand_more
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
