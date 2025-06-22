// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with JavaScript",
        content: "JavaScript is a powerful programming language that can add interactivity to your website. In this post, we'll cover the basics of JavaScript syntax, variables, and functions to get you started on your coding journey.\n\nWe'll explore how to write your first script, understand data types, and work with functions. By the end of this article, you'll have a solid foundation to build upon.",
        excerpt: "Learn the fundamentals of JavaScript and how to use it to make your websites interactive.",
        date: "October 15, 2023",
        image: "images/post1.jpg",
        category: "JavaScript",
        featured: true,
        comments: [
            {
                name: "John Doe",
                date: "October 16, 2023",
                message: "Great introduction to JavaScript! Looking forward to more advanced topics."
            },
            {
                name: "Jane Smith",
                date: "October 17, 2023",
                message: "Very helpful for beginners. The examples were clear and easy to follow."
            }
        ]
    },
    {
        id: 2,
        title: "CSS Grid Layout Explained",
        content: "CSS Grid is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.\n\nThis article will explain all the key concepts including grid containers, grid items, grid lines, and grid tracks. We'll also compare Grid with Flexbox to help you understand when to use each.",
        excerpt: "Discover how to create modern layouts with CSS Grid and revolutionize your web designs.",
        date: "October 10, 2023",
        image: "images/post4.png",
        category: "CSS",
        featured: true,
        comments: [
            {
                name: "Mike Johnson",
                date: "October 11, 2023",
                message: "Finally understand CSS Grid after reading this. Thanks!"
            }
        ]
    },
    {
        id: 3,
        title: "The Future of HTML5",
        content: "HTML5 continues to evolve with new features and APIs being added regularly. In this post, we'll explore some of the upcoming features in HTML5 and how they might change the way we build websites in the future.\n\nWe'll look at new semantic elements, form enhancements, and multimedia capabilities that are coming down the pipeline.",
        excerpt: "Explore the upcoming features in HTML5 and how they will shape web development.",
        date: "October 5, 2023",
        image: "images/post5.jpg",
        category: "HTML",
        featured: false,
        comments: []
    },
    {
        id: 4,
        title: "Responsive Design Principles",
        content: "Responsive design is no longer optional in today's multi-device world. This article covers the core principles of responsive design including fluid grids, flexible images, and media queries.\n\nWe'll walk through practical examples and discuss how to approach responsive design systematically to create websites that work beautifully on any device.",
        excerpt: "Master the principles of responsive web design to create sites that work on any device.",
        date: "September 28, 2023",
        image: "images/post8.png",
        category: "Design",
        featured: true,
        comments: []
    },
    {
        id: 5,
        title: "React Hooks Fundamentals",
        content: "React Hooks have revolutionized how we write React components. In this deep dive, we'll explore useState, useEffect, useContext, and custom hooks.\n\nYou'll learn how hooks can simplify your component logic, reduce code duplication, and make your React code more maintainable. We'll also cover best practices and common pitfalls to avoid.",
        excerpt: "Learn how React Hooks can simplify your component logic and make your code more maintainable.",
        date: "September 20, 2023",
        image: "images/post7.png",
        category: "React",
        featured: false,
        comments: []
    },
    {
        id: 6,
        title: "Node.js Performance Optimization",
        content: "Node.js is known for its performance, but there are always ways to make your applications faster. This guide covers profiling techniques, memory management, cluster mode, and other optimization strategies.\n\nWhether you're building APIs or server-side rendered applications, these tips will help you get the most out of your Node.js applications.",
        excerpt: "Discover techniques to optimize your Node.js applications for maximum performance.",
        date: "September 15, 2023",
        image: "images/post6.jpg",
        category: "Node.js",
        featured: false,
        comments: []
    }
];

// DOM Elements
const featuredPostsContainer = document.getElementById('featured-posts-container');
const allPostsContainer = document.getElementById('all-posts-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedPosts();
    displayAllPosts();
    setupNavigation();
    setupContactForm();
});

// Display featured posts on home page
function displayFeaturedPosts() {
    const featuredPosts = blogPosts.filter(post => post.featured);
    renderPosts(featuredPosts, featuredPostsContainer);
}

// Display all posts on posts page
function displayAllPosts() {
    renderPosts(blogPosts, allPostsContainer);
}

// Render posts to a container
function renderPosts(posts, container) {
    container.innerHTML = '';
    
    if (posts.length === 0) {
        container.innerHTML = '<p class="no-posts">No posts found. Try a different search.</p>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        postElement.id = `post-${post.id}`;
        
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
            <div class="post-content">
                <h2 class="post-title">${escapeHTML(post.title)}</h2>
                <div class="post-meta">Published on ${post.date} • ${post.category}</div>
                <p class="post-excerpt">${escapeHTML(post.excerpt)}</p>
                <button class="read-more" data-post-id="${post.id}">Read More</button>
            </div>
        `;
        
        container.appendChild(postElement);
    });
}

// Show full post with comments (updated version)
function showFullPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    // Hide all sections
    contentSections.forEach(section => section.classList.remove('active'));
    
    // Create a temporary section for the single post view
    let singlePostSection = document.getElementById('single-post-section');
    if (!singlePostSection) {
        singlePostSection = document.createElement('section');
        singlePostSection.id = 'single-post-section';
        singlePostSection.className = 'content-section active';
        document.querySelector('main').appendChild(singlePostSection);
    } else {
        singlePostSection.innerHTML = '';
        singlePostSection.classList.add('active');
    }
    
    singlePostSection.innerHTML = `
        <button onclick="goBack()" class="back-btn">← Back to Posts</button>
        <article class="blog-post single-post">
            <div class="post-header">
                <img src="${post.image}" alt="${post.title}" class="post-image-large">
                <div class="post-header-text">
                    <h1 class="post-title">${escapeHTML(post.title)}</h1>
                    <div class="post-meta">Published on ${post.date} • ${post.category}</div>
                </div>
            </div>
            <div class="post-full-content">${paragraphize(post.content)}</div>
            
            <div class="comments-container">
                <h2 class="comments-heading">Comments (${post.comments.length})</h2>
                
                <div class="comments-list" id="comments-list-${postId}">
                    ${post.comments.length > 0 ? 
                        post.comments.map(comment => `
                            <div class="comment-card">
                                <div class="comment-header">
                                    <div class="comment-author">${escapeHTML(comment.name)}</div>
                                    <div class="comment-date">${comment.date}</div>
                                </div>
                                <div class="comment-body">
                                    <p>${escapeHTML(comment.message)}</p>
                                </div>
                            </div>
                        `).join('') : 
                        '<p class="no-comments">No comments yet. Be the first to comment!</p>'
                    }
                </div>
                
                <div class="comment-form-container">
                    <h3 class="comment-form-title">Leave a Comment</h3>
                    <div class="comment-form">
                        <div class="form-group">
                            <input type="text" id="comment-name-${postId}" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <textarea id="comment-message-${postId}" placeholder="Your thoughts..." required></textarea>
                        </div>
                        <button onclick="addComment(${postId})" class="submit-btn">Post Comment</button>
                    </div>
                </div>
            </div>
        </article>
    `;
    
    // Scroll to the top of the section
    singlePostSection.scrollIntoView({ behavior: 'smooth' });
}

// Go back to previous view
function goBack() {
    const singlePostSection = document.getElementById('single-post-section');
    if (singlePostSection) {
        singlePostSection.classList.remove('active');
    }
    
    // Show the posts section
    document.getElementById('posts').classList.add('active');
    document.querySelector('a[href="#posts"]').classList.add('active');
}

// Add a new comment (updated to work with new structure)
function addComment(postId) {
    const nameInput = document.getElementById(`comment-name-${postId}`);
    const messageInput = document.getElementById(`comment-message-${postId}`);
    
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!name || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    const newComment = {
        name,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        message
    };
    
    post.comments.push(newComment);
    
    // Update the comments list
    const commentsList = document.getElementById(`comments-list-${postId}`);
    const noCommentsMsg = commentsList.querySelector('.no-comments');
    
    if (noCommentsMsg) {
        commentsList.innerHTML = '';
    }
    
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-card';
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-author">${escapeHTML(newComment.name)}</div>
            <div class="comment-date">${newComment.date}</div>
        </div>
        <div class="comment-body">
            <p>${escapeHTML(newComment.message)}</p>
        </div>
    `;
    
    commentsList.appendChild(commentElement);
    
    // Clear the form
    nameInput.value = '';
    messageInput.value = '';
    
    // Update comment count
    const commentsHeading = document.querySelector('.comments-heading');
    if (commentsHeading) {
        commentsHeading.textContent = `Comments (${post.comments.length})`;
    }
}

// Search functionality
function searchPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
        displayAllPosts();
        return;
    }
    
    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.content.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
    );
    
    renderPosts(filteredPosts, allPostsContainer);
    
    // Show the posts section
    document.querySelector('.content-section.active').classList.remove('active');
    document.getElementById('posts').classList.add('active');
    
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('a[href="#posts"]').classList.add('active');
}

// Setup navigation between sections
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            // Show the corresponding section
            const targetId = link.getAttribute('href');
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId.substring(1)) {
                    section.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Setup contact form
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real app, you would send the form data to a server
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Helper function to escape HTML
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}

// Helper function to convert plain text to paragraphs
function paragraphize(text) {
    return text.split('\n').map(paragraph => paragraph.trim() ? `<p>${paragraph}</p>` : '').join('');
}

// Event Listeners
searchBtn.addEventListener('click', searchPosts);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchPosts();
    }
});

// Event delegation for dynamic elements
document.addEventListener('click', (e) => {
    if (e.target.matches('.read-more')) {
        const postId = parseInt(e.target.dataset.postId);
        showFullPost(postId);
    }
});