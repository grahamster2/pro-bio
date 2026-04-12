import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Wrench, Phone, MapPin, Star, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Plumber Website Builder | Get More Plumbing Jobs with Rovult',
  description: 'Build a professional plumbing website in 3 minutes. The #1 website builder for plumbers. Get more local plumbing leads, rank higher in "plumber near me" searches, and win bigger jobs.',
  keywords: [
    'plumber website builder',
    'plumbing website',
    'website for plumbers',
    'plumber marketing',
    'plumbing lead generation',
    'local plumber SEO',
    'emergency plumber website',
    'plumbing business website',
    'plumber online presence',
    'get more plumbing jobs',
    'plumber digital marketing',
    'mobile website for plumbers',
    'plumbing contractor website'
  ],
  openGraph: {
    title: 'Plumber Website Builder | Get More Plumbing Jobs with Rovult',
    description: 'Build a professional plumbing website in 3 minutes. Get more local plumbing leads and rank higher in "plumber near me" searches.',
    url: 'https://rovult.com/plumber-website-builder',
    type: 'website',
  },
  alternates: {
    canonical: 'https://rovult.com/plumber-website-builder',
  },
}

const plumberBenefits = [
  {
    icon: Phone,
    title: 'More Emergency Calls',
    description: 'Customers searching "emergency plumber near me" find you first with our local SEO optimization.'
  },
  {
    icon: MapPin,
    title: 'Local Service Areas',
    description: 'Show exactly which neighborhoods you serve. Get calls from your actual service areas only.'
  },
  {
    icon: Star,
    title: 'Professional Trust',
    description: 'Display licenses, insurance, and customer reviews to win high-value residential and commercial jobs.'
  },
  {
    icon: Wrench,
    title: 'Showcase Your Work',
    description: 'Upload photos of your plumbing projects with location tags to prove your expertise.'
  }
]

const plumberFeatures = [
  'Emergency service availability toggle',
  'Service area ZIP code management',
  'Before/after project galleries',
  'Customer testimonials section',
  'Mobile-optimized for on-the-go customers',
  'Instant quote request forms',
  'QR code for truck magnets and business cards',
  'Google Maps integration',
  'Licensed & insured badges'
]

export default function PlumberLandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Plumbing Website Builder",
    "provider": {
      "@type": "Organization",
      "name": "Rovult",
      "url": "https://rovult.com"
    },
    "areaServed": "United States",
    "description": "Professional website builder specifically designed for plumbers and plumbing contractors",
    "keywords": "plumber website builder, plumbing marketing, plumber lead generation"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-2xl font-bold text-blue-900">
                Rovult
              </Link>
              <Link 
                href="/onboarding" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Build Your Plumbing Website
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                #1 Website Builder for Plumbers
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get More Plumbing Jobs with a
              <span className="text-blue-600"> Professional Website</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stop losing plumbing jobs to competitors with better websites. Build a professional, mobile-first plumbing website in 3 minutes that ranks higher in "plumber near me" searches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/onboarding" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Build Your Plumbing Website <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free to start - No credit card required</span>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.9/5 from 2,500+ plumbers</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>3x more emergency calls</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>Better local rankings</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Plumbers Choose Rovult
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built specifically for the plumbing industry to help you get more jobs and grow your business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plumberBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Win More Plumbing Jobs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional features designed specifically for plumbing contractors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plumberFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get More Plumbing Jobs?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of plumbers who are winning more jobs with their Rovult websites.
            </p>
            <Link 
              href="/onboarding" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Start Building Free <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-blue-100 mt-4 text-sm">
              No credit card required • Set up in 3 minutes • Cancel anytime
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2024 Rovult. All rights reserved.</p>
            <div className="mt-4 space-x-6">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/tos" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
