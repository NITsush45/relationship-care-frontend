import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaBookmark,
  FaShareAlt,
  FaComment,
  FaArrowRight,
  FaSearch,
  FaCalendarAlt,
  FaUserEdit,
  FaClock,
  FaTag,
  FaEye,
  FaThumbsUp,
  FaBookOpen,
  FaFeatherAlt,
  FaQuoteLeft,
  FaLeaf,
  FaStar,
  FaRegBookmark,
  FaRegHeart,
  FaFire,
  FaSeedling
} from "react-icons/fa";
import { IoMdFlower } from "react-icons/io";
import { API_BASE } from "../config";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [hoveredPost, setHoveredPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState("trending");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState({ type: null, text: "" });
  const [userId, setUserId] = useState("");
  const [starCounts, setStarCounts] = useState({});
  const [starredPosts, setStarredPosts] = useState({});
  const [openDiscussionPostId, setOpenDiscussionPostId] = useState(null);
  const [discussionsByPost, setDiscussionsByPost] = useState({});
  const [discussionInputByPost, setDiscussionInputByPost] = useState({});
  const [discussionLoading, setDiscussionLoading] = useState({});

  const categories = [
    "All", "Relationships", "Self-Care", "Communication", 
    "Love", "Personal Growth", "Mental Health", "Tips"
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Building Stronger Relationships",
      excerpt: "Discover practical advice to strengthen your relationships and create deeper connections with those around you.",
      link: "https://www.powerofpositivity.com/make-relationships-stronger-things/",
      category: "Relationships",
      readTime: "5 min read",
      author: "Sarah Johnson",
      date: "Mar 15, 2024",
      tags: ["Love", "Connection", "Growth"],
      featured: true,
      color: "from-pink-500 to-rose-500",
      icon: <FaHeart className="text-pink-500" />
    },
    {
      id: 2,
      title: "How to Resolve Conflicts Effectively",
      excerpt: "Learn powerful strategies to resolve conflicts peacefully and improve communication in all your relationships.",
      link: "https://www.psychologytoday.com/us/blog/close-encounters/201704/10-tips-solving-relationship-conflicts",
      category: "Communication",
      readTime: "7 min read",
      author: "Michael Chen",
      date: "Mar 12, 2024",
      tags: ["Conflict", "Resolution", "Peace"],
      color: "from-blue-500 to-cyan-500",
      icon: <FaComment className="text-blue-500" />
    },
    {
      id: 3,
      title: "The Importance of Self-Love in Relationships",
      excerpt: "Understand why self-love is the foundation of healthy relationships and how to cultivate it daily.",
      link: "https://relationshipsmag.com/the-importance-of-self-love-in-healthy-relationships/",
      category: "Self-Care",
      readTime: "6 min read",
      author: "Emma Wilson",
      date: "Mar 10, 2024",
      tags: ["Self-Love", "Wellness", "Healing"],
      featured: true,
      color: "from-purple-500 to-pink-500",
      icon: <FaLeaf className="text-green-500" />
    },
    {
      id: 4,
      title: "5 Communication Skills to Master",
      excerpt: "Improve your communication to foster better connections and understanding in every interaction.",
      link: "https://writeharbor.com/2024/09/10/effective-communication-skills-to-master",
      category: "Communication",
      readTime: "8 min read",
      author: "David Miller",
      date: "Mar 8, 2024",
      tags: ["Skills", "Listening", "Expression"],
      color: "from-teal-500 to-emerald-500",
      icon: <FaFeatherAlt className="text-teal-500" />
    },
    {
      id: 5,
      title: "Overcoming Challenges in Long-Distance Relationships",
      excerpt: "Explore practical tips to make long-distance relationships thrive despite the physical distance.",
      link: "https://meziesblog.com/how-to-overcome-challenges-in-long-distance-relationships/",
      category: "Relationships",
      readTime: "9 min read",
      author: "Lisa Rodriguez",
      date: "Mar 5, 2024",
      tags: ["Distance", "Commitment", "Trust"],
      color: "from-orange-500 to-yellow-500",
      icon: <FaFire className="text-orange-500" />
    },
    {
      id: 6,
      title: "How to Rebuild Trust in a Relationship",
      excerpt: "Learn the essential steps to rebuild trust and create a stronger foundation after challenges.",
      link: "https://counselingnow.com/10-proven-strategies-to-rebuild-trust",
      category: "Relationships",
      readTime: "10 min read",
      author: "Robert Kim",
      date: "Mar 3, 2024",
      tags: ["Trust", "Healing", "Renewal"],
      color: "from-red-500 to-pink-500",
      icon: <FaSeedling className="text-green-500" />
    },
    {
      id: 7,
      title: "Understanding Love Languages",
      excerpt: "Discover the five love languages and practical ways to express love in meaningful ways.",
      link: "https://amazingmemovement.com/understanding-love-languages/",
      category: "Love",
      readTime: "6 min read",
      author: "Jennifer Lee",
      date: "Feb 28, 2024",
      tags: ["Love", "Expression", "Connection"],
      color: "from-rose-500 to-pink-500",
      icon: <FaHeart className="text-rose-500" />
    },
    {
      id: 8,
      title: "Self-Care Tips for a Healthier Relationship",
      excerpt: "Prioritize self-care to improve your emotional availability and connection with others.",
      link: "https://www.marriage.com/advice/relationship/relationship-self-care-tips",
      category: "Self-Care",
      readTime: "5 min read",
      author: "Alex Morgan",
      date: "Feb 25, 2024",
      tags: ["Self-Care", "Balance", "Wellness"],
      color: "from-indigo-500 to-purple-500",
      icon: <FaBookOpen className="text-indigo-500" />
    },
    {
      id: 9,
      title: "Breaking Up Amicably: A Guide",
      excerpt: "Learn how to end a relationship with mutual respect, understanding, and compassion.",
      link: "https://markmanson.net/how-to-break-up-with-someone",
      category: "Personal Growth",
      readTime: "7 min read",
      author: "Thomas Wright",
      date: "Feb 22, 2024",
      tags: ["Growth", "Closure", "Respect"],
      color: "from-gray-600 to-gray-800",
      icon: <FaQuoteLeft className="text-gray-500" />
    }
  ];


  useEffect(() => {
    const key = "blog_user_id";
    let id = localStorage.getItem(key);
    if (!id) {
      id = "u_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(key, id);
    }
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const loadInteractions = async () => {
      try {
        const res = await fetch(
          API_BASE + "/api/blog/interactions?user_id=" + encodeURIComponent(userId)
        );
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setStarCounts(data.starCounts || {});
          setStarredPosts(data.starredPosts || {});
        }
      } catch (_) {
        // Keep UI usable even if interaction API fails
      }
    };

    loadInteractions();
  }, [userId]);

  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleBookmark = (postId) => {
    setBookmarkedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleStar = async (postId) => {
    if (!userId) return;

    try {
      const res = await fetch(API_BASE + "/api/blog/" + postId + "/star", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStarCounts(data.starCounts || {});
        setStarredPosts(data.starredPosts || {});
      }
    } catch (_) {
      // Keep UI stable when star call fails
    }
  };

  const loadDiscussion = async (postId) => {
    setDiscussionLoading((prev) => ({ ...prev, [postId]: true }));
    try {
      const res = await fetch(API_BASE + "/api/blog/" + postId + "/discussions");
      const data = await res.json().catch(() => []);
      if (res.ok) {
        setDiscussionsByPost((prev) => ({ ...prev, [postId]: Array.isArray(data) ? data : [] }));
      }
    } catch (_) {
      setDiscussionsByPost((prev) => ({ ...prev, [postId]: [] }));
    } finally {
      setDiscussionLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleDiscuss = (postId) => {
    setOpenDiscussionPostId((prev) => {
      if (prev === postId) return null;
      if (!discussionsByPost[postId]) {
        loadDiscussion(postId);
      }
      return postId;
    });
  };

  const submitDiscussion = async (postId) => {
    const text = (discussionInputByPost[postId] || "").trim();
    if (!text || !userId) return;

    try {
      const res = await fetch(API_BASE + "/api/blog/" + postId + "/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, text }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setDiscussionsByPost((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), data],
        }));
        setDiscussionInputByPost((prev) => ({ ...prev, [postId]: "" }));
      }
    } catch (_) {
      // Keep UI stable when posting discussion fails
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitting(true);
    setNewsletterMessage({ type: null, text: "" });
    try {
      const res = await fetch(`${API_BASE}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setNewsletterMessage({ type: "success", text: data.message || "Thank you for subscribing!" });
        setNewsletterEmail("");
      } else {
        setNewsletterMessage({ type: "error", text: data.error || "Subscription failed. Please try again." });
      }
    } catch (err) {
      setNewsletterMessage({
        type: "error",
        text: "Unable to connect. Please ensure the backend is running and try again.",
      });
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-10 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center mb-12 relative z-10"
      >
        <motion.div
          className="inline-block mb-6"
          animate={floatingAnimation}
        >
          <IoMdFlower className="text-6xl text-pink-500" />
        </motion.div>
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          Blooming Insights
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Cultivate meaningful relationships through knowledge and self-discovery
        </motion.p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        className="max-w-6xl mx-auto mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <motion.div
            className="flex-1 relative"
            whileHover={{ scale: 1.02 }}
          >
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, topics, or authors..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none shadow-lg bg-white/80 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["trending", "newest", "popular", "featured"].map((filter) => (
              <motion.button
                key={filter}
                className={`px-6 py-3 rounded-xl font-medium capitalize whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-white text-gray-700 border-2 border-gray-200"
                }`}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Tags */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              variants={itemVariants}
              className={`px-5 py-2 rounded-full flex items-center gap-2 transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTag className="text-sm" />
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 ${
                    post.featured ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  whileHover={{ y: -8 }}
                >
                  {/* Post Header with Gradient */}
                  <div className={`relative h-48 bg-gradient-to-br ${post.color} p-6`}>
                    {post.featured && (
                      <motion.div
                        className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        ✨ Featured
                      </motion.div>
                    )}
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.button
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                        onClick={() => handleBookmark(post.id)}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {bookmarkedPosts[post.id] ? (
                          <FaBookmark className="text-white" />
                        ) : (
                          <FaRegBookmark className="text-white" />
                        )}
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                        onClick={() => handleLike(post.id)}
                        whileHover={{ scale: 1.2, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {likedPosts[post.id] ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-white" />
                        )}
                      </motion.button>
                    </div>

                    <motion.div
                      className="absolute bottom-6 left-6"
                      animate={hoveredPost === post.id ? { x: 10 } : { x: 0 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
                      <div className="flex items-center gap-3 text-white/90">
                        <span className="flex items-center gap-1">
                          <FaUserEdit /> {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt /> {post.date}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-sm font-medium">
                        {post.icon}
                        {post.category}
                      </span>
                      <span className="flex items-center gap-2 text-gray-500">
                        <FaClock />
                        {Math.ceil((post.excerpt.split(" ").length + post.title.split(" ").length) / 200) || 5} min read
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          whileHover={{ scale: 1.1 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <motion.button
                          className="flex items-center gap-2 text-gray-600 hover:text-pink-600"
                          whileHover={{ scale: 1.1, x: 5 }}
                          onClick={() => toggleDiscuss(post.id)}
                        >
                          <FaComment />
                          <span>Discuss</span>
                        </motion.button>
                        <motion.button
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                          whileHover={{ scale: 1.1, x: 5 }}
                        >
                          <FaShareAlt />
                          <span>Share</span>
                        </motion.button>
                      </div>

                      <motion.a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium"
                        whileHover={{ scale: 1.05, gap: 4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read Article
                        <motion.span
                          animate={hoveredPost === post.id ? { x: 5 } : { x: 0 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <FaArrowRight />
                        </motion.span>
                      </motion.a>
                    </div>

                    {openDiscussionPostId === post.id && (
                      <div className="mt-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
                        <p className="text-xs text-gray-500 mb-3">Discuss as: {userId || "loading..."}</p>

                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                          {discussionLoading[post.id] ? (
                            <p className="text-sm text-gray-500">Loading discussions...</p>
                          ) : (discussionsByPost[post.id] || []).length === 0 ? (
                            <p className="text-sm text-gray-500">No discussions yet. Start the conversation.</p>
                          ) : (
                            (discussionsByPost[post.id] || []).map((item) => (
                              <div key={item.id} className="bg-white border border-pink-100 rounded-lg p-2">
                                <p className="text-xs text-pink-600 font-semibold">{item.userId}</p>
                                <p className="text-sm text-gray-700">{item.text}</p>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="mt-3 flex gap-2">
                          <input
                            type="text"
                            value={discussionInputByPost[post.id] || ""}
                            onChange={(e) =>
                              setDiscussionInputByPost((prev) => ({ ...prev, [post.id]: e.target.value }))
                            }
                            className="flex-1 px-3 py-2 rounded-lg border border-pink-200 text-sm focus:outline-none focus:border-pink-500"
                            placeholder="Write your thoughts..."
                          />
                          <button
                            type="button"
                            onClick={() => submitDiscussion(post.id)}
                            className="px-3 py-2 bg-pink-600 text-white rounded-lg text-sm"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaEye /> 1.2k views
                      </span>
                      <span className="flex items-center gap-1">
                        <FaThumbsUp /> 345 likes
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStar(post.id)}
                        className={"flex items-center gap-1 " + (starredPosts[post.id] ? "text-yellow-500" : "text-gray-500")}
                      >
                        <FaStar /> {starCounts[String(post.id)] || 0}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <IoMdFlower className="text-8xl text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Newsletter Subscription */}
      <motion.div
        className="max-w-4xl mx-auto mt-20 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 0, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Bloom with Us 🌸
          </motion.h2>
          <p className="text-lg mb-8 opacity-90">
            Get weekly relationship insights and self-care tips delivered to your inbox
          </p>

          {newsletterMessage.text && (
            <p className={`mb-4 text-sm font-medium ${newsletterMessage.type === "success" ? "text-green-200" : "text-red-200"}`}>
              {newsletterMessage.text}
            </p>
          )}
          <motion.form
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/30"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              disabled={newsletterSubmitting}
            />
            <motion.button
              type="submit"
              disabled={newsletterSubmitting}
              className="px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:bg-gray-100 disabled:opacity-70"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {newsletterSubmitting ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center text-white"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaFeatherAlt className="text-xl" />
      </motion.button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .filter-multiply {
          mix-blend-mode: multiply;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;