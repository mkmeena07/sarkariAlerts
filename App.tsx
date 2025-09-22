import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import AdminPage from './pages/AdminPage'; // Lazy loaded now
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import { Post, PostCategory, AdSenseConfig, StaticPage, SocialLink, HomePageSection, SEOSettings } from './types';
import { INITIAL_POSTS, INITIAL_STATIC_PAGES, INITIAL_SOCIAL_LINKS, INITIAL_HOME_PAGE_SECTIONS, INITIAL_SEO_SETTINGS } from './constants';

const AdminPage = lazy(() => import('./pages/AdminPage'));

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    // On initial load, filter out any posts that have already expired.
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare against the start of the current day.

    return INITIAL_POSTS.filter(post => {
      if (!post.expiryDate) {
        return true; // No expiry date means it never expires.
      }
      // Assumes expiryDate is in 'YYYY-MM-DD' format.
      const [year, month, day] = post.expiryDate.split('-').map(Number);
      const expiry = new Date(year, month - 1, day);
      expiry.setHours(23, 59, 59, 999); // The post is valid for the entire expiry day.

      return expiry >= today;
    });
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('admin');
  const [adSenseConfig, setAdSenseConfig] = useState<AdSenseConfig>({
    client: '',
    slots: {
      header: { id: '' },
      sidebar: { id: '' },
      inArticle: { id: '' },
    },
  });
  const [staticPages, setStaticPages] = useState<StaticPage[]>(INITIAL_STATIC_PAGES);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);
  const [homePageSections, setHomePageSections] = useState<HomePageSection[]>(INITIAL_HOME_PAGE_SECTIONS);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(INITIAL_SEO_SETTINGS);


  useEffect(() => {
    // Load state from localStorage
    const storedPassword = localStorage.getItem('adminPassword');
    if (storedPassword) setPassword(storedPassword);
    
    const storedAdConfig = localStorage.getItem('adSenseConfig');
    if (storedAdConfig) {
      try {
        const parsed = JSON.parse(storedAdConfig);
        // Backwards compatibility for old string-based slot config
        if (parsed.slots && typeof parsed.slots.header === 'string') {
          parsed.slots.header = { id: parsed.slots.header };
          parsed.slots.sidebar = { id: parsed.slots.sidebar };
          parsed.slots.inArticle = { id: parsed.slots.inArticle };
        }
        setAdSenseConfig(parsed);
      } catch (e) { console.error("Failed to parse AdSense config", e); }
    }
    
    const storedStaticPages = localStorage.getItem('staticPages');
    if (storedStaticPages) {
      try {
        setStaticPages(JSON.parse(storedStaticPages));
      } catch (e) { console.error("Failed to parse static pages", e); }
    }
    
    const storedSocialLinks = localStorage.getItem('socialLinks');
    if (storedSocialLinks) {
      try {
        setSocialLinks(JSON.parse(storedSocialLinks));
      } catch (e) { console.error("Failed to parse social links", e); }
    }
    
    const storedHomePageSections = localStorage.getItem('homePageSections');
    if (storedHomePageSections) {
      try {
        setHomePageSections(JSON.parse(storedHomePageSections));
      } catch (e) { console.error("Failed to parse homepage sections", e); }
    }

    const storedSeoSettings = localStorage.getItem('seoSettings');
    if (storedSeoSettings) {
      try {
        setSeoSettings(JSON.parse(storedSeoSettings));
      } catch (e) { console.error("Failed to parse SEO settings", e); }
    }
  }, []);

  useEffect(() => {
    if (adSenseConfig.client) {
      const scriptId = 'adsense-script';
      document.getElementById(scriptId)?.remove();

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseConfig.client}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);

      return () => {
        document.getElementById(scriptId)?.remove();
      };
    }
  }, [adSenseConfig.client]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      setPosts(currentPosts => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activePosts = currentPosts.filter(post => {
          if (!post.expiryDate) {
            return true;
          }
          const [year, month, day] = post.expiryDate.split('-').map(Number);
          const expiry = new Date(year, month - 1, day);
          expiry.setHours(23, 59, 59, 999);
          return expiry >= today;
        });

        // Only update state if the number of posts has changed to avoid unnecessary re-renders
        if (activePosts.length < currentPosts.length) {
          return activePosts;
        }
        return currentPosts;
      });
    }, 3600000); // Check for expired posts every hour.

    return () => clearInterval(checkInterval); // Cleanup interval on component unmount.
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);
  
  const handlePasswordReset = (newPassword: string) => {
    setPassword(newPassword);
    localStorage.setItem('adminPassword', newPassword);
  };

  const handleAdSenseConfigSave = (config: AdSenseConfig) => {
    setAdSenseConfig(config);
    localStorage.setItem('adSenseConfig', JSON.stringify(config));
  };

  const handleStaticPageSave = (updatedPage: StaticPage) => {
    const updatedPages = staticPages.map(p => p.id === updatedPage.id ? updatedPage : p);
    setStaticPages(updatedPages);
    localStorage.setItem('staticPages', JSON.stringify(updatedPages));
  };
  
  const handleSocialLinksSave = (links: SocialLink[]) => {
    setSocialLinks(links);
    localStorage.setItem('socialLinks', JSON.stringify(links));
  };

  const handleHomePageSectionsSave = (sections: HomePageSection[]) => {
    setHomePageSections(sections);
    localStorage.setItem('homePageSections', JSON.stringify(sections));
  }

  const handleSeoSettingsSave = (settings: SEOSettings) => {
    setSeoSettings(settings);
    localStorage.setItem('seoSettings', JSON.stringify(settings));
  };

  const addPost = (postData: Omit<Post, 'id'>) => {
    setPosts(prevPosts => [
      {
        id: Date.now(),
        ...postData
      },
      ...prevPosts
    ]);
  };

  const updatePost = (id: number, updatedData: Omit<Post, 'id'>) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id ? { ...post, ...updatedData } : post
      )
    );
  };
  
  const deletePost = (id: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPostsByCategory = (category: PostCategory) => {
    return filteredPosts.filter(post => post.category === category);
  };

  const featuredPosts = posts.filter(post => post.isFeatured).slice(0, 3);
  
  const pageProps = {
    searchQuery,
    onSearchChange: setSearchQuery,
    isAuthenticated,
    onLogout: handleLogout,
    seoSettings,
  };
  
  const findPage = (id: StaticPage['id']) => staticPages.find(p => p.id === id) || { id, title: '', content: ''};

  const adminLoadingFallback = (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700">Loading Admin Panel...</h1>
      </div>
    </div>
  );

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <HomePage
            {...pageProps}
            featuredPosts={featuredPosts}
            homePageSections={homePageSections}
            getPostsByCategory={getPostsByCategory}
            adSenseConfig={adSenseConfig}
            socialLinks={socialLinks}
          />
        } />
        <Route path="/login" element={
          <LoginPage 
            onLogin={handleLogin} 
            currentPassword={password}
            onPasswordReset={handlePasswordReset}
          />
        } />
        <Route path="/admin" element={
          isAuthenticated ? (
            <Suspense fallback={adminLoadingFallback}>
              <AdminPage 
                posts={posts}
                addPost={addPost} 
                updatePost={updatePost}
                deletePost={deletePost}
                onLogout={handleLogout}
                adSenseConfig={adSenseConfig}
                onAdSenseConfigSave={handleAdSenseConfigSave}
                staticPages={staticPages}
                onStaticPageSave={handleStaticPageSave}
                socialLinks={socialLinks}
                onSocialLinksSave={handleSocialLinksSave}
                homePageSections={homePageSections}
                onHomePageSectionsSave={handleHomePageSectionsSave}
                seoSettings={seoSettings}
                onSeoSettingsSave={handleSeoSettingsSave}
              />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/post/:postId" element={
          <PostPage 
            {...pageProps}
            posts={posts}
            adSenseConfig={adSenseConfig}
            socialLinks={socialLinks}
          />
        } />
        <Route path="/about-us" element={<AboutPage {...pageProps} page={findPage('about-us')} />} />
        <Route path="/contact-us" element={<ContactPage {...pageProps} page={findPage('contact-us')} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage {...pageProps} page={findPage('privacy-policy')} />} />
        <Route path="/disclaimer" element={<DisclaimerPage {...pageProps} page={findPage('disclaimer')} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;