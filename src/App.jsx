import React, { useState, useEffect } from 'react';
import './App.css';
import tecImage from './tec.png';
import appImage from './app.png';
import logoImage from './log.png';
import backgroundImage from './background.png';

import { getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';

// Gmail enquiry function
const handleGmailEnquiry = (serviceTitle, customMessage = null) => {
  const recipient = "info@funsofthealth.com";
  const subject = encodeURIComponent(`Enquiry about Service: ${serviceTitle}`);
  
  let body;
  if (customMessage) {
    body = encodeURIComponent(customMessage);
  } else {
    body = encodeURIComponent(
      `Hello,\n\nI'm interested in your service: ${serviceTitle}.\n\nPlease provide more information about this service, including pricing and availability.\n\nThank you.`
    );
  }
  
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`, '_blank');
};

// WhatsApp consultation function
const handleScheduleDemo = () => {
  window.open('https://wa.me/254714433693?text=Hello%2C%20I%27d%20like%20to%20schedule%20a%20personalized%20demo%20of%20your%20healthcare%20solutions.', '_blank');
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = ['home', 'services', 'about', 'testimonials', 'contact'];

  const scrollToMap = () => {
    setActiveTab('contact');
    setTimeout(() => {
      const mapElement = document.getElementById('map-section');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => {
            setActiveTab('home');
            setMobileMenuOpen(false);
          }}>
            <img src={logoImage} alt="FUNSOFT Healthcare Systems Logo" className="logo-image" />
          </div>
          
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="nav-buttons">
            <button className="nav-demo" onClick={handleScheduleDemo}>
              Schedule Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} scrollToMap={scrollToMap} />}
        {activeTab === 'services' && <ServicesSection setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'testimonials' && <TestimonialsSection />}
        {activeTab === 'contact' && <ContactSection />}
      </main>

      <Footer setActiveTab={setActiveTab} scrollToMap={scrollToMap} logoImage={logoImage} />
    </div>
  );
}

// ==================== HOME SECTION ====================
function HomeSection({ setActiveTab, scrollToMap }) {
  const mainStats = [
    { value: "200+", label: "Healthcare Facilities", icon: "🏥" },
    { value: "15K+", label: "Daily System Users", icon: "👥" },
    { value: "2M+", label: "Patient Records", icon: "📋" },
    { value: "15+", label: "African Countries", icon: "🌍" },
  ];

  const reviewStats = [
    { number: "98.5%", label: "Patient Satisfaction", trend: "+5.2% vs last month" },
    { number: "60%", label: "Reduced Wait Times", trend: "Average decrease" },
    { number: "120%", label: "Revenue Increase", trend: "For partner hospitals" },
    { number: "99.9%", label: "System Uptime", trend: "24/7 Availability" },
  ];

  const features = [
    { icon: "⚡", title: "Real-time Analytics", desc: "Live dashboard with actionable insights" },
    { icon: "📊", title: "Electronic Health Records", desc: "Seamless patient data management" },
    { icon: "🔄", title: "Multi-department Integration", desc: "Fully integrated hospital operations" },
    { icon: "💳", title: "M-PESA Ready", desc: "Built-in mobile payment processing" },
    { icon: "📢", title: "SMS & Email", desc: "Automated patient communication" },
    { icon: "⏰", title: "Workflow Alerts", desc: "Smart reminders & notifications" },
  ];

  const products = [
    { name: "Basic Clinic", price: "$3,999", beds: "0-50 Bed Hospital", tag: "POPULAR" },
    { name: "Standard Hospital", price: "$5,999", beds: "0-50 Bed Hospital", tag: "FEATURED", popular: true },
    { name: "Enterprise Plus", price: "$8,999", beds: "51-100+ Bed Hospital", tag: "NEW" }
  ];

  return (
    <div className="home-section">
      <div className="section-content">
        {/* Hero Section */}
        <div className="home-grid">
          <div className="home-left">
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              MOH Approved & Certified
            </div>
            <h1 className="hero-title">
              Cloud-Based
              <span className="gradient-text"> Healthcare Platform</span>
            </h1>
            <p className="hero-desc">
              Trusted by 200+ healthcare facilities across Africa. Real-time analytics, 
              M-PESA integration, and electronic health records in one seamless system.
            </p>
            
            <div className="hero-stats-row">
              {mainStats.map((stat, i) => (
                <div key={i} className="hero-stat-card">
                  <div className="hero-stat-icon">{stat.icon}</div>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-right">
            <div className="hero-background-container">
              <img src={backgroundImage} alt="Healthcare System Overview" className="hero-background-image" />
            </div>
          </div>
        </div>

        {/* System Review Section */}
        <div className="system-review-section">
          <div className="review-header">
            <h2>System Performance Review</h2>
            <p>Key metrics & analytics from our healthcare platform</p>
          </div>
          <div className="review-stats-grid">
            {reviewStats.map((stat, i) => (
              <div key={i} className="review-stat-card">
                <span className="review-stat-number">{stat.number}</span>
                <div className="review-stat-label">{stat.label}</div>
                <div className="review-stat-trend">{stat.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Overview Section - 4 Cards */}
        <div className="system-overview-section">
          <div className="system-overview-title">
            <h2>System Overview Dashboard</h2>
            <p>Real-time patient insights and operational metrics</p>
          </div>
          
          <div className="overview-grid">
            {/* SYSTEM HEALTH CARD */}
            <div className="overview-card">
              <div className="card-header">
                <div className="card-icon">🖥️</div>
                <h3>SYSTEM HEALTH</h3>
              </div>
              <div className="system-health-stats">
                <div className="health-metric">
                  <div className="health-metric-title">System Uptime</div>
                  <div className="health-metric-value">99.9%</div>
                  <div className="health-metric-bar">
                    <div className="health-metric-fill" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
                <div className="health-metric">
                  <div className="health-metric-title">Response Time</div>
                  <div className="health-metric-value">&lt;200ms</div>
                  <div className="health-metric-bar">
                    <div className="health-metric-fill" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="health-metric">
                  <div className="health-metric-title">Data Sync Rate</div>
                  <div className="health-metric-value">100%</div>
                  <div className="health-metric-bar">
                    <div className="health-metric-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="health-metric">
                  <div className="health-metric-title">Backup Success</div>
                  <div className="health-metric-value">99.99%</div>
                  <div className="health-metric-bar">
                    <div className="health-metric-fill" style={{ width: '99.99%' }}></div>
                  </div>
                </div>
                <div className="server-status">
                  <div className="status-dot"></div>
                  <span style={{ color: '#2dd4bf', fontSize: '0.7rem' }}>All Systems Operational</span>
                </div>
              </div>
            </div>

            {/* PATIENT SATISFACTION CARD */}
            <div className="overview-card">
              <div className="card-header">
                <div className="card-icon">⭐</div>
                <h3>PATIENT SATISFACTION</h3>
              </div>
              <div className="performance-stats">
                <div className="stat-row">
                  <span className="stat-label">Overall Rating:</span>
                  <span className="stat-value">4.8/5.0</span>
                </div>
                <div className="satisfaction-bar">
                  <div className="bar-container">
                    <div className="bar-fill-satisfaction" style={{ width: '96%' }}></div>
                  </div>
                  <div className="satisfaction-stats">
                    <span className="satisfaction-item"><span>78%</span> Very Satisfied</span>
                    <span className="satisfaction-item"><span>16%</span> Satisfied</span>
                    <span className="satisfaction-item"><span>4%</span> Neutral</span>
                    <span className="satisfaction-item"><span>2%</span> Dissatisfied</span>
                  </div>
                </div>
                <div className="stat-row" style={{ marginTop: '0.5rem' }}>
                  <span className="stat-label">Would Recommend:</span>
                  <span className="stat-value">94%</span>
                </div>
              </div>
            </div>

            {/* GLOBAL REACH CARD */}
            <div className="overview-card">
              <div className="card-header">
                <div className="card-icon">🌍</div>
                <h3>GLOBAL REACH</h3>
              </div>
              <div style={{ textAlign: 'center', marginTop: '0.25rem' }}>
                <div className="global-number">15+</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.5rem' }}>African Countries</div>
                <div className="global-number" style={{ fontSize: '1.3rem', marginTop: '0' }}>200+</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.5rem' }}>Healthcare Facilities</div>
                <div className="satisfaction-bar">
                  <div className="bar-container">
                    <div className="bar-fill-satisfaction" style={{ width: '85%' }}></div>
                  </div>
                  <div className="satisfaction-stats">
                    <span className="satisfaction-item"><span>85%</span> Active Usage</span>
                    <span className="satisfaction-item"><span>92%</span> Renewal Rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FINANCIAL METRICS CARD */}
            <div className="overview-card">
              <div className="card-header">
                <div className="card-icon">💰</div>
                <h3>FINANCIAL METRICS</h3>
              </div>
              <div className="amount">$12.5M</div>
              <div style={{ textAlign: 'center', fontSize: '0.6rem', color: '#64748B', marginBottom: '0.25rem' }}>Annual Revenue Processed</div>
              <div className="followup">92% Collection Rate</div>
              <div className="metrics-row">
                <div className="metric-item">
                  <span className="metric-value">+120%</span>
                  <span className="metric-label">Revenue Growth</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">$3.2B+</span>
                  <span className="metric-label">Claims Processed</span>
                </div>
              </div>
              <div className="metrics-row" style={{ marginTop: '0.3rem', paddingTop: '0.3rem' }}>
                <div className="metric-item">
                  <span className="metric-value">40%</span>
                  <span className="metric-label">Cost Reduction</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">3.5x</span>
                  <span className="metric-label">ROI Average</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="tech-stack-section-home">
          <div className="section-header">
            <span className="section-badge">Our Technology Stack & Capabilities</span>
            <div className="tech-image-container">
              <img src={tecImage} alt="Technology Stack" className="tech-full-image" />
            </div>
            <h2>Powered by Funsoft</h2>
            <div className="powered-image-container">
              <img src={appImage} alt="Powered by Funsoft" className="powered-full-image" />
            </div>
            <p>Enterprise-grade technologies powering healthcare across Africa</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="section-header">
            <span className="section-badge">Key Features</span>
            <h2>Comprehensive Healthcare Management</h2>
            <p>Everything you need to run a modern healthcare facility</p>
          </div>
          <div className="features-grid">
            {features.map((feature, i) => (
              <div key={i} className="feature-card-large">
                <div className="feature-icon-large">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section-home">
          <div className="section-header">
            <span className="section-badge">Our Products</span>
            <h2>Ministry of Health Approved Solutions</h2>
            <p>Flexible pricing for facilities of all sizes</p>
          </div>
          <div className="products-grid">
            {products.map((product, i) => (
              <div key={i} className={`product-card ${product.popular ? 'popular' : ''}`}>
                {product.popular && <div className="popular-badge">⭐ Most Popular</div>}
                <div className="product-tag">{product.tag}</div>
                <h3>OUT PATIENT CENTRE</h3>
                <div className="product-price">
                  <span className="price">{product.price}</span>
                  <span className="price-note">+ VAT (16%)</span>
                </div>
                <p className="product-beds">{product.beds}</p>
                <button 
                  className="product-btn" 
                  onClick={() => handleGmailEnquiry(
                    `${product.name} Package - ${product.price}`,
                    `Hello,\n\nI'm interested in the ${product.name} package (${product.price}) for ${product.beds}.\n\nPlease provide more information about:\n- Implementation timeline\n- Training requirements\n- Ongoing support options\n\nThank you.`
                  )}
                >
                  Enquire Now →
                </button>
                <p className="product-note">Training & support fees billed separately</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== SERVICES SECTION - WITH FIREBASE INTEGRATION ====================
function ServicesSection({ setActiveTab }) {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded services data as fallback
  const hardcodedServices = [
    {
      id: "hardcoded-1",
      title: "Health Management Information Systems (HMIS)",
      description: "Comprehensive digital solutions for healthcare facilities including patient records, appointment scheduling, billing, and clinical decision support. Streamline operations and improve patient care with our integrated HMIS platform.",
      type: "image",
      url: null,
      uploadDate: new Date().toISOString(),
      icon: "🏥",
      fullDesc: "The system covers all operations: patient registration, doctors consultations, Outpatient/Inpatient, cash collection & billing, banking, theatre, laboratory, pharmacy, stores/stocks, procurement, and more.",
      features: ["EMR", "Patient Portal", "Billing", "Analytics", "Pharmacy", "Laboratory", "Theatre", "Procurement"]
    },
    {
      id: "hardcoded-2",
      title: "Enterprise Resource Planning (ERP)",
      description: "End-to-end business management solutions integrating finance, HR, procurement, inventory, and operations. Optimize resources, reduce costs, and enhance productivity with our customizable ERP systems.",
      type: "image",
      url: null,
      uploadDate: new Date().toISOString(),
      icon: "📊",
      fullDesc: "Optimize resource allocation and streamline administrative processes with our comprehensive ERP solution designed specifically for healthcare facilities.",
      features: ["Finance", "HR", "Procurement", "Inventory", "Payroll", "Asset Management", "Supply Chain"]
    },
    {
      id: "hardcoded-3",
      title: "Artificial Intelligence Systems",
      description: "Cutting-edge AI solutions including machine learning, predictive analytics, natural language processing, and computer vision. Transform data into actionable insights and automate complex processes.",
      type: "image",
      url: null,
      uploadDate: new Date().toISOString(),
      icon: "🤖",
      fullDesc: "Leverage the power of AI to predict patient inflow, optimize resource allocation, assist in diagnostics, and improve overall healthcare delivery.",
      features: ["ML Models", "Predictions", "NLP", "Computer Vision", "Diagnostics", "Analytics"]
    }
  ];

  // Service type colors mapping
  const serviceTypeColors = {
    image: "#722ed1",
    video: "#eb2f96",
    pdf: "#fadb14",
    default: "#722ed1"
  };

  // Service type icons mapping
  const serviceTypeIcons = {
    image: "🖼️",
    video: "🎥",
    pdf: "📄",
    default: "📁"
  };

  // Hardcoded service icons mapping
  const hardcodedIcons = {
    "Health Management Information Systems (HMIS)": "🏥",
    "Enterprise Resource Planning (ERP)": "📊",
    "Artificial Intelligence Systems": "🤖"
  };

  // Fetch services from Firebase
  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesRef = collection(db, "services", "media", "media");
      const snapshot = await getDocs(servicesRef);
      let data = [];
      
      snapshot.forEach((doc) => {
        const d = doc.data();
        data.push({ 
          id: doc.id, 
          ...d,
          uploadDate: d.uploadDate?.toDate ? d.uploadDate.toDate() : d.uploadDate,
        });
      });

      // Sort by upload date (newest first)
      data.sort((a, b) => new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0));
      
      if (data.length > 0) {
        setServices(data);
      } else {
        // If no Firebase data, use hardcoded services
        setServices(hardcodedServices);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      // On error, use hardcoded services as fallback
      setServices(hardcodedServices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openServiceModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  // Get service color based on type
  const getServiceColor = (type) => {
    return serviceTypeColors[type] || serviceTypeColors.default;
  };

  // Get service icon based on type or hardcoded icon
  const getServiceIcon = (service) => {
    if (service.id?.startsWith('hardcoded')) {
      return hardcodedIcons[service.title] || "📁";
    }
    return serviceTypeIcons[service.type] || serviceTypeIcons.default;
  };

  const allFeatures = [
    { icon: "📅", title: "Smart Appointment Booking", desc: "Connect with healthcare providers and book consultations seamlessly" },
    { icon: "🎥", title: "Virtual Telehealth", desc: "Virtual consultations with qualified professionals from anywhere" },
    { icon: "🔒", title: "Secure Messaging", desc: "Safe communication with providers for follow-ups and non-urgent needs" },
    { icon: "🛡️", title: "Privacy & Data Security", desc: "Enterprise-grade authentication and encrypted medical records" },
    { icon: "📚", title: "Health Education Hub", desc: "Informative articles from medical professionals on various health topics" },
    { icon: "💳", title: "Secure Payments", desc: "Integrated with trusted providers including M-PESA for safe transactions" },
  ];

  return (
    <div className="services-section">
      <div className="section-content">
        <div className="services-header">
          <span className="section-badge">Our Technology Stack & Capabilities</span>
          <h2 className="white-heading">Technology Stack and Integrations</h2>
          <p className="white-text">Delivering innovative technology solutions including Health Management Information Systems (HMIS), Enterprise Resource Planning, Artificial Intelligence, and comprehensive IT services.</p>
        </div>

        {/* Services Grid - Loading State */}
        {loading ? (
          <div className="services-loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="services-empty-container">
            <div className="empty-icon">📁</div>
            <p className="empty-text">No services available at the moment</p>
          </div>
        ) : (
          <div className="services-grid-clean">
            {services.map((service) => {
              const serviceColor = getServiceColor(service.type);
              const serviceIcon = getServiceIcon(service);
              const isHardcoded = service.id?.startsWith('hardcoded');
              
              return (
                <div 
                  key={service.id}
                  className={`service-card-clean ${isHardcoded ? 'hardcoded-card' : ''}`}
                >
                  {/* Image/Icon Section */}
                  <div className="service-card-image-clean">
                    {service.type === 'image' && service.url ? (
                      <img 
                        src={service.url} 
                        alt={service.title}
                        className="service-image-clean"
                      />
                    ) : (
                      <div className="service-icon-clean" style={{ 
                        background: `linear-gradient(135deg, ${serviceColor} 0%, ${serviceColor}dd 100%)`
                      }}>
                        <span className="service-emoji-clean">{serviceIcon}</span>
                      </div>
                    )}
                    {isHardcoded && (
                      <div className="hardcoded-badge">Core Service</div>
                    )}
                  </div>

                  {/* Content Below Image */}
                  <div className="service-card-content-clean">
                    <h3 className="service-title-clean">{service.title || 'Untitled Service'}</h3>
                    
                    <p className="service-description-clean">
                      {service.description && service.description.length > 120 
                        ? service.description.substring(0, 120) + '...' 
                        : service.description || 'No description available'}
                    </p>

                    {/* Footer with actions */}
                    <div className="service-footer-clean">
                      <div className="service-actions-clean">
                        <button 
                          className="service-action-btn view-btn-clean"
                          onClick={() => openServiceModal(service)}
                          title="View Details"
                        >
                          👁️ View
                        </button>
                        <button 
                          className="service-action-btn enquire-btn-clean"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGmailEnquiry(service.title);
                          }}
                          style={{ background: serviceColor }}
                          title="Enquire"
                        >
                          ✉️ Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Features Showcase */}
        <div className="features-showcase">
          <h3>Some of Our Features</h3>
          <div className="features-slider">
            {allFeatures.map((feature, i) => (
              <div key={i} className="feature-showcase-card">
                <div className="feature-showcase-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="ready-transform">
          <h3>Ready to Transform?</h3>
          <p>Partner with us for cutting-edge IT solutions tailored to your needs.</p>
          <button className="schedule-btn" onClick={handleScheduleDemo}>Schedule Consultation →</button>
        </div>
      </div>

      {/* Service Detail Modal */}
      {isModalOpen && selectedService && (
        <div className="modal-overlay" onClick={closeServiceModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeServiceModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-header" style={{ 
                background: `linear-gradient(135deg, ${getServiceColor(selectedService.type)} 0%, ${getServiceColor(selectedService.type)}dd 100%)`
              }}>
                <h2 className="modal-title">{selectedService.title || 'Untitled Service'}</h2>
              </div>
              
              <div className="modal-body">
                {/* Media Preview */}
                {selectedService.type === 'image' && selectedService.url && (
                  <div className="modal-media">
                    <img 
                      src={selectedService.url} 
                      alt={selectedService.title}
                      className="modal-image"
                    />
                  </div>
                )}

                {selectedService.type === 'video' && selectedService.url && (
                  <div className="modal-media">
                    <video 
                      src={selectedService.url} 
                      controls
                      className="modal-video"
                    />
                  </div>
                )}

                {selectedService.type === 'pdf' && selectedService.url && (
                  <div className="modal-media">
                    <a 
                      href={selectedService.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-pdf-link"
                      style={{ background: getServiceColor(selectedService.type) }}
                    >
                      <span className="pdf-icon">📄</span>
                      <span>Open PDF Document</span>
                      <span className="pdf-arrow">→</span>
                    </a>
                  </div>
                )}

                {/* Description */}
                {selectedService.description && (
                  <div className="modal-description-section">
                    <p className="modal-description">{selectedService.description}</p>
                  </div>
                )}

                {/* Full Description for hardcoded services */}
                {selectedService.fullDesc && (
                  <div className="modal-description-section">
                    <h4 style={{ marginBottom: '8px', color: '#722ed1' }}>Complete Overview</h4>
                    <p className="modal-description">{selectedService.fullDesc}</p>
                  </div>
                )}

                {/* Features for hardcoded services */}
                {selectedService.features && selectedService.features.length > 0 && (
                  <div className="modal-features-section">
                    <h4 style={{ marginBottom: '8px', color: '#722ed1' }}>Key Features</h4>
                    <div className="modal-features-list">
                      {selectedService.features.map((feature, idx) => (
                        <span key={idx} className="modal-feature-tag">{feature}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="modal-actions">
                  <button className="modal-btn-secondary" onClick={closeServiceModal}>
                    Close
                  </button>
                  <button 
                    className="modal-btn-primary"
                    style={{ background: getServiceColor(selectedService.type) }}
                    onClick={() => {
                      handleGmailEnquiry(selectedService.title);
                      closeServiceModal();
                    }}
                  >
                    <span className="btn-icon">✉️</span>
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx="true">{`
        .services-grid-clean {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin: 40px 0;
        }

        .service-card-clean {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
        }

        .service-card-clean:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 30px rgba(114, 46, 209, 0.12);
          border-color: rgba(114, 46, 209, 0.2);
        }

        .hardcoded-card {
          border-left: 4px solid #722ed1;
        }

        .service-card-image-clean {
          height: 160px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
        }

        .service-image-clean {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .service-card-clean:hover .service-image-clean {
          transform: scale(1.08);
        }

        .service-icon-clean {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-emoji-clean {
          font-size: 56px;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15));
        }

        .hardcoded-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(114, 46, 209, 0.9);
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          backdrop-filter: blur(4px);
          z-index: 2;
        }

        .service-card-content-clean {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .service-title-clean {
          font-size: 16px;
          font-weight: 700;
          color: #1A237E;
          margin: 0 0 8px 0;
          line-height: 1.4;
          min-height: 44px;
        }

        .service-description-clean {
          font-size: 12px;
          color: #5C6BC0;
          line-height: 1.5;
          margin: 0 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
          min-height: 54px;
        }

        .service-footer-clean {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .service-actions-clean {
          display: flex;
          gap: 6px;
        }

        .service-action-btn {
          padding: 5px 12px;
          border: none;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }

        .view-btn-clean {
          background: #f0f0f0;
          color: #333;
          border: 1px solid #e0e0e0;
        }

        .view-btn-clean:hover {
          background: #e5e5e5;
          transform: translateY(-2px);
        }

        .enquire-btn-clean {
          color: white;
        }

        .enquire-btn-clean:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        .services-loading-container,
        .services-empty-container {
          text-align: center;
          padding: 60px 20px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid #f0f0f0;
          border-top: 3px solid #722ed1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text,
        .empty-text {
          color: #666;
          font-size: 14px;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .features-showcase {
          margin: 60px 0 40px;
        }

        .features-showcase h3 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 30px;
          color: #1A237E;
        }

        .features-slider {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .feature-showcase-card {
          background: white;
          padding: 20px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .feature-showcase-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(114, 46, 209, 0.1);
        }

        .feature-showcase-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .feature-showcase-card h4 {
          font-size: 14px;
          font-weight: 700;
          color: #1A237E;
          margin-bottom: 8px;
        }

        .feature-showcase-card p {
          font-size: 11px;
          color: #666;
          line-height: 1.5;
        }

        .ready-transform {
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px;
          border-radius: 24px;
          margin: 40px 0;
        }

        .ready-transform h3 {
          font-size: 24px;
          color: white;
          margin-bottom: 12px;
        }

        .ready-transform p {
          color: rgba(255,255,255,0.9);
          margin-bottom: 20px;
        }

        .schedule-btn {
          background: white;
          color: #722ed1;
          border: none;
          padding: 12px 28px;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .schedule-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-container {
          background: white;
          border-radius: 24px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalSlideUp 0.3s ease;
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: none;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          transform: rotate(90deg);
        }

        .modal-header {
          padding: 20px 25px 15px;
          color: white;
          border-radius: 24px 24px 0 0;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }

        .modal-body {
          padding: 20px 25px 25px;
        }

        .modal-media {
          margin: 15px 0;
          text-align: center;
        }

        .modal-image,
        .modal-video {
          max-width: 100%;
          max-height: 250px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .modal-pdf-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          color: white;
          text-decoration: none;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .modal-pdf-link:hover {
          transform: translateY(-2px);
        }

        .modal-description-section {
          margin: 15px 0;
        }

        .modal-description {
          color: #666;
          line-height: 1.6;
          font-size: 13px;
          text-align: center;
        }

        .modal-features-section {
          margin: 15px 0;
        }

        .modal-features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-top: 10px;
        }

        .modal-feature-tag {
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: #722ed1;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .modal-btn-primary,
        .modal-btn-secondary {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .modal-btn-primary {
          color: white;
        }

        .modal-btn-primary:hover {
          transform: translateY(-2px);
        }

        .modal-btn-secondary {
          background: #f5f5f5;
          color: #333;
          border: 1px solid #e0e0e0;
        }

        .modal-btn-secondary:hover {
          background: #e8e8e8;
        }

        @media (max-width: 768px) {
          .services-grid-clean {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
          }
          .features-slider {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .services-grid-clean {
            grid-template-columns: 1fr;
          }
          .modal-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

// ==================== ABOUT SECTION ====================
function AboutSection() {
  const values = [
    { icon: "💡", title: "Innovation", desc: "Continuously evolving through client feedback" },
    { icon: "🛡️", title: "Reliability", desc: "100+ successful implementations" },
    { icon: "🤝", title: "Collaboration", desc: "Partnerships with leading hospitals" },
    { icon: "⭐", title: "Excellence", desc: "Proven results and revenue growth" },
  ];

  const provenResults = [
    { icon: "📈", title: "Revenue Growth", desc: "Within months of Funsoft installation, partner hospitals more than doubled their revenues" },
    { icon: "📊", title: "Comprehensive Reporting", desc: "All required reports produced directly from Funsoft I-HMIS system" },
    { icon: "⚡", title: "Improved Efficiency", desc: "Tremendous improvements in service delivery across all facilities" },
  ];

  const keyPartners = [
    "Moi Teaching and Referral Hospital",
    "Machakos Level 5 Hospital", 
    "Thika Level 5 Hospital",
    "Nakuru Provincial General Hospital",
    "Enugu State University Teaching Hospital, Nigeria"
  ];

  return (
    <div className="about-section">
      <div className="section-content">
        <div className="about-header">
          <span className="section-badge">About System Partners Ltd</span>
          <h2 className="white-heading">Transforming Healthcare Through Technology Since 2001</h2>
        </div>

        <div className="foundation-grid">
          <div className="foundation-card">
            <div className="foundation-icon">👥</div>
            <h3>Who We Are</h3>
            <p>Founded in 2001, System Partners Limited (SPL) is a specialized software development and IT consultancy organization focused on creating comprehensive healthcare technology solutions across Africa.</p>
          </div>
          <div className="foundation-card">
            <div className="foundation-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>Revolutionize healthcare accessibility through innovative technology solutions that bridge the gap between healthcare providers and communities.</p>
          </div>
          <div className="foundation-card">
            <div className="foundation-icon">🔭</div>
            <h3>Our Vision</h3>
            <p>Create a healthier nation with equitable access to quality healthcare services through technology and collaboration.</p>
          </div>
        </div>

        <div className="implementation-stats">
          <div className="stat-big">
            <span className="stat-number">100+</span>
            <span className="stat-label">Health Systems Implemented</span>
          </div>
          <div className="implementation-text">
            <p>In SPL's continued effort to contribute towards quality health services, the company has successfully implemented over 100 systems in the health sector. In about 5 cases, we replaced previous in-house systems, while all others were completely new installations from scratch.</p>
            <p className="mt-1">Our software evolved through these installations as facilities requested new menus and functionalities, continuously improving our system to meet diverse healthcare needs. Facilities where the system is installed have recorded tremendous improvements in service delivery.</p>
          </div>
        </div>

        <div className="key-partners">
          <h3>Key Hospital Partners:</h3>
          <div className="partner-list">
            {keyPartners.map((partner, i) => (
              <span key={i} className="partner-badge">{partner}</span>
            ))}
          </div>
        </div>

        <div className="stats-row-three">
          <div className="stat-box">
            <span className="stat-number">100+</span>
            <span className="stat-label">Health Systems</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">2x+</span>
            <span className="stat-label">Revenue Increase</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">5</span>
            <span className="stat-label">Countries</span>
          </div>
        </div>

        <div className="proven-results">
          <h3>Proven Results</h3>
          <div className="results-grid">
            {provenResults.map((result, i) => (
              <div key={i} className="result-card">
                <div className="result-icon">{result.icon}</div>
                <h4>{result.title}</h4>
                <p>{result.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="values-section">
          <h3>Our Core Values</h3>
          <div className="values-grid">
            {values.map((value, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TESTIMONIALS SECTION ====================
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sarah Mwakisha",
      role: "Medical Director",
      facility: "Kenyatta National Hospital",
      text: "Funsoft I-HMIS has transformed our operations. We've seen a 60% reduction in patient wait times and a 120% increase in revenue collection. The real-time analytics dashboard gives us unprecedented visibility into our operations.",
      rating: 5
    },
    {
      name: "John Otieno",
      role: "IT Manager",
      facility: "Moi Teaching Referral Hospital",
      text: "The real-time analytics and M-PESA integration have made billing seamless. The local support team is responsive and knowledgeable. We've processed over KES 3.2B in claims through the system.",
      rating: 5
    },
    {
      name: "Dr. Amina Mohammed",
      role: "CEO",
      facility: "Kisumu County Hospital",
      text: "Best HMIS we've used in 15 years. The system is intuitive, robust, and has helped us achieve near-perfect inventory management. The workflow alerts have dramatically reduced medication expiry.",
      rating: 5
    },
    {
      name: "Prof. James Nduati",
      role: "Hospital Administrator",
      facility: "Machakos Level 5 Hospital",
      text: "The implementation was smooth, training was comprehensive, and the results speak for themselves. Within months of Funsoft installation, we more than doubled our revenues.",
      rating: 5
    }
  ];

  const kenyaFacilities = [
    "Kenyatta National Hospital", "Moi Teaching Referral Hospital", "Kisumu County Hospital",
    "Coast Province General Hospital", "Nanyuki Teaching Referral Hospital", "Kisii Teaching Referral Hospital",
    "Machakos Level 5 Hospital", "Thika Level 5 Hospital"
  ];

  const internationalFacilities = [
    "St. Nicholas Hospital Lagos, Nigeria", "Juba Teaching Hospital, South Sudan",
    "Enugu State University Teaching Hospital, Nigeria", "Ahfad University for Women, Sudan"
  ];

  return (
    <div className="testimonials-section">
      <div className="section-content">
        <div className="testimonials-header">
          <span className="section-badge">TESTIMONIALS</span>
          <h2 className="white-heading">Trusted Across Africa</h2>
          <p className="white-text">Serving healthcare facilities across 15+ African countries with proven results and satisfied clients</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-rating">★★★★★</div>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}, {testimonial.facility}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="facilities-showcase">
          <h3 className="white-heading">📍 Key Facilities in Kenya</h3>
          <div className="facilities-list">
            {kenyaFacilities.map((facility, i) => (
              <span key={i} className="facility-badge">{facility}</span>
            ))}
          </div>
          
          <h3 className="white-heading">🌍 International Facilities</h3>
          <div className="facilities-list">
            {internationalFacilities.map((facility, i) => (
              <span key={i} className="facility-badge">{facility}</span>
            ))}
          </div>
        </div>

        <div className="trust-badges">
          <div className="trust-badge">
            <span>🏥 200+ Healthcare Facilities</span>
            <span>⭐ 98.5% Satisfaction Rate</span>
            <span>⏰ 24/7 Local Support</span>
            <span>💰 KES 3.2B+ Claims Processed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CONTACT SECTION ====================
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGmailEnquiry(
      formData.subject || 'Contact Form Submission',
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-section">
      <div className="section-content">
        <div className="contact-header">
          <span className="section-badge">Contact Information</span>
          <h2 className="white-heading">Get In Touch With Us</h2>
          <p className="white-text">Please complete the form to connect with our team and we'll get back to you immediately.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h4>Office Address</h4>
              <p>Westlands Business Park, 4th Floor<br/>Chiromo Ln, Nairobi, Kenya</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h4>Email Addresses</h4>
              <p>info@funsofthealth.com</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h4>Phone Numbers</h4>
              <p>+254 714 433693<br/>+254 20 7857779</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🕐</div>
              <h4>Business Hours</h4>
              <p>Monday - Friday: 8:00 AM - 5:00 PM<br/>Saturday: 9:00 AM - 1:00 PM<br/>Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>
              <div className="form-group">
                <label>Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <input 
                  type="text" 
                  placeholder="Enter message subject" 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea 
                  rows="5" 
                  placeholder="Enter your message here..." 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9H15M15 9L11 5M15 9L11 13" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div id="map-section" className="map-section">
          <h3 className="white-heading">Find Our Location</h3>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819231312441!2d36.845883!3d-1.31235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f112f7a8d5b0d%3A0x8e7b8b5b5b5b5b5b!2sWestlands%20Business%20Park!5e0!3m2!1sen!2ske!4v1699999999999!5m2!1sen!2ske" 
              width="100%" 
              height="300" 
              style={{ border: 0, borderRadius: '16px' }} 
              allowFullScreen="" 
              loading="lazy"
              title="FUNSOFT Headquarters Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== FOOTER ====================
function Footer({ setActiveTab, scrollToMap, logoImage }) {
  const quickLinks = [
    { name: 'Home', tab: 'home' },
    { name: 'Services', tab: 'services' },
    { name: 'About Us', tab: 'about' },
    { name: 'Testimonials', tab: 'testimonials' },
    { name: 'Contact Us', tab: 'contact' }
  ];

  const solutions = [
    'Hospital Management System',
    'Electronic Medical Records',
    'Telemedicine Platform',
    'Pharmacy Management',
    'Lab Information System'
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoImage} alt="FUNSOFT Healthcare Systems Logo" className="footer-logo-image" />
            <p>Transforming healthcare management across Africa. Trusted by 200+ healthcare facilities.</p>
            
            <div className="footer-email">
              <span className="email-icon">✉️</span>
              <span>info@funsofthealth.com</span>
            </div>

            <div className="footer-socials">
              <a href="https://www.facebook.com/funsofthealth" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                </svg>
              </a>
              <a href="https://twitter.com/funsofthealth" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.68-11.783c0-.21-.005-.422-.014-.632A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/funsoft" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/funsofthealth" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://wa.me/254714433693" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.032 2.017c-5.523 0-10 4.477-10 10 0 1.821.487 3.53 1.336 5.004L2 22l5.099-1.351a9.96 9.96 0 004.933 1.368c5.523 0 10-4.477 10-10s-4.477-10-10-10zm-.001 18.334c-1.416 0-2.755-.366-3.92-1.016l-.28-.166-3.027.803.808-2.945-.183-.297a8.283 8.283 0 01-1.284-4.379c0-4.591 3.735-8.326 8.326-8.326 4.59 0 8.325 3.735 8.325 8.326 0 4.59-3.735 8.326-8.325 8.326zm4.564-6.232c-.25-.125-1.479-.73-1.708-.813-.229-.083-.396-.125-.563.125-.167.25-.646.813-.792.979-.146.166-.292.187-.542.062-.25-.125-1.055-.389-2.01-1.24-.743-.663-1.244-1.482-1.39-1.732-.146-.25-.016-.385.11-.51.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.062-.125-.563-1.354-.771-1.855-.203-.49-.409-.424-.563-.432-.146-.008-.313-.008-.479-.008-.167 0-.438.063-.667.313-.229.25-.875.854-.875 2.083 0 1.229.896 2.417 1.021 2.583.125.167 1.762 2.69 4.269 3.771.596.257 1.061.41 1.424.525.599.19 1.144.163 1.575.099.48-.072 1.479-.604 1.688-1.188.208-.584.208-1.084.146-1.188-.063-.104-.229-.167-.479-.292z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button onClick={() => setActiveTab(link.tab)}>{link.name}</button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Our Solutions</h4>
            <ul>
              {solutions.map((solution, i) => (
                <li key={i}>{solution}</li>
              ))}
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>📞 +254 714 433693 / +254 20 7857779</p>
            <p>✉️ info@funsofthealth.com</p>
            <p>📍 Westlands Business Park, 4th Floor, Chiromo Ln, Nairobi, Kenya</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Funsoft Healthcare Systems. All rights reserved.</p>
          <div className="footer-legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;