import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../context/ContentContext';
import { resolveServerMediaUrl } from '../config/api';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import { DEFAULT_BLOGS } from './Blog';
import './BlogDetails.css';

const resolveBlogImage = (src) => {
    if (!src) return '';
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:')) return src;
    if (src.startsWith('/uploads')) return resolveServerMediaUrl(src);
    return src;
};

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BlogDetails = () => {
    const { id } = useParams();
    const { getJSON } = useContent();
    
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const blogs = getJSON('blog', 'items', DEFAULT_BLOGS);
    
    const blog = useMemo(() => {
        return blogs.find(b => String(b.id) === id || b.title === decodeURIComponent(id));
    }, [blogs, id]);

    const relatedBlogsList = useMemo(() => {
        if (!blog || !blog.relatedBlogs || !Array.isArray(blog.relatedBlogs)) return [];
        return blogs.filter(b => {
            const idMatch = blog.relatedBlogs.some(r => String(r) === String(b.id));
            const titleMatch = blog.relatedBlogs.includes(b.title);
            return idMatch || titleMatch;
        });
    }, [blogs, blog]);

    if (!blog) {
        return (
            <SmoothScroll>
                <div className="app-container selection-theme">
                    <Navbar />
                    <div className="blog-details-empty">
                        <h2>Article not found</h2>
                        <Link to="/#blog" className="back-link">Return to Home</Link>
                    </div>
                    <Footer />
                </div>
            </SmoothScroll>
        );
    }

    const contentHtml = blog.content || `<p>${blog.excerpt}</p>`;
    const metaTitle = blog.metaTitle || `${blog.title} - Dr.D.Suresh IAS`;
    const metaDescription = blog.metaDescription || blog.excerpt;
    const metaKeywords = blog.metaKeywords || "IAS, Blog, Governance, Administration, Suresh IAS";

    return (
        <SmoothScroll>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={resolveBlogImage(blog.image)} />
            </Helmet>
            <div className="app-container selection-theme">
                <Navbar />
                <div className="blog-details-page">
                    <div className="blog-details-hero">
                        <img src={resolveBlogImage(blog.image)} alt={blog.title} className="blog-details-hero__img" />
                        <div className="blog-details-hero__overlay"></div>
                        <div className="max-w-container-max px-margin-mobile md-px-margin-desktop blog-details-hero__content">
                            <span className="blog-details__category">{blog.category}</span>
                            <h1 className="blog-details__title">{blog.title}</h1>
                            <div className="blog-details__meta">
                                <span>
                                    <span className="material-symbols-outlined icon">calendar_today</span>
                                    {formatDate(blog.date)}
                                </span>
                                <span>·</span>
                                <span>
                                    <span className="material-symbols-outlined icon">schedule</span>
                                    {blog.readTime}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-container-max px-margin-mobile md-px-margin-desktop blog-details-layout">
                        <div className="blog-details-main">
                            <div 
                                className="blog-details-content rich-text-content"
                                dangerouslySetInnerHTML={{ __html: contentHtml }}
                            />
                            <div className="blog-details-footer">
                                <Link to="/#blog" className="back-link">
                                    <span className="material-symbols-outlined icon">arrow_back</span>
                                    Back to All Articles
                                </Link>
                            </div>
                        </div>

                        <aside className="blog-details-sidebar">
                            <h3 className="sidebar-title">Related Articles</h3>
                            {relatedBlogsList.length > 0 ? (
                                <div className="related-blogs-list">
                                    {relatedBlogsList.map((rb, idx) => (
                                        <Link to={`/blog/${encodeURIComponent(rb.id || rb.title)}`} key={idx} className="related-blog-card">
                                            <div className="related-blog-card__img-wrap">
                                                <img src={resolveBlogImage(rb.image)} alt={rb.title} loading="lazy" />
                                            </div>
                                            <div className="related-blog-card__info">
                                                <span className="related-category">{rb.category}</span>
                                                <h4 className="related-title">{rb.title}</h4>
                                                <span className="related-date">{formatDate(rb.date)}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="empty-related">No related articles selected.</p>
                            )}
                        </aside>
                    </div>
                </div>
                <Footer />
            </div>
        </SmoothScroll>
    );
};

export default BlogDetails;
