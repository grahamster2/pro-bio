import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap, Phone, MapPin, Star, CheckCircle, Bolt } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Electrician Website Builder | Get More Electrical Jobs with Rovult',
  description: 'Build a professional electrician website in 3 minutes. The #1 website builder for electricians. Get more local electrical leads, rank higher in "electrician near me" searches, and win bigger commercial jobs.',
  keywords: [
    'electrician website builder',
    'electrical website',
    'website for electricians',
    'electrician marketing',
    'electrical lead generation',
    'local electrician SEO',
    'emergency electrician website',
    'electrical contractor website',
    'electrician online presence',
    'get more electrical jobs',
    'electrician digital marketing',
    'mobile website for electricians',
    'electrical contractor website'
  ],
  openGraph: {
    title: 'Electrician Website Builder | Get More Electrical Jobs with Rovult',
    description: 'Build a professional electrician website in 3 minutes. Get more local electrical leads and rank higher in "electrician near me" searches.',
    url: 'https://rovult.com/electrician-website-builder',
    type: 'website',
  },
  alternates: {
    canonical: 'https://rovult.com/electrician-website-builder',
  },
}

const electricianBenefits = [
  {
    icon: Zap,
    title: 'Emergency Service Calls',
    description: 'Customers searching "emergency electrician near me" find you first with our local SEO optimization.'
  },
  {
    icon: Bolt,
    title: 'Commercial Contracts',
    description: 'Win bigger commercial electrical jobs with a professional website that showcases your expertise.'
  },
  {
    icon: Star,
    title: 'License & Insurance Display',
    description: 'Build trust with homeowners and businesses by displaying your electrical licenses and insurance.'
  },
  {
    icon: MapPin,
    title: 'Service Area Coverage',
    description: 'Show exactly which cities and ZIP codes you serve. Get calls from your actual service areas.'
  }
]

const electricianFeatures = [
  '24/7 emergency availability toggle',
  'Electrical license verification display',
  'Service area ZIP code management',
  'Commercial project galleries',
  'Residential work showcase',
  'Mobile-optimized for emergency calls',
  'Instant electrical quote requests',
  'QR code for service vehicles',
  'Customer testimonials',
  'Electrical service descriptions'
]

export default function ElectricianLandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Electrician Website Builder",
    "provider": {
      "@type": "Organization",
      "name": "Rovult",
      "url": "https://rovult.com"
    },
    "areaServed": "United States",
    "description": "Professional website builder specifically designed for electricians and electrical contractors",
    "keywords": "electrician website builder, electrical marketing, electrician lead generation"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-orange-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-2xl font-bold text-orange-900">
                Rovult
              </Link>
              <Link 
                href="/onboarding" 
                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Build Your Electrician Website
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                #1 Website Builder for Electricians
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get More Electrical Jobs with a
              <span className="text-orange-600"> Professional Website</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stop losing electrical jobs to competitors with better websites. Build a professional, mobile-first electrician website in 3 minutes that ranks higher in "electrician near me" searches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/onboarding" 
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                Build Your Electrician Website <ArrowRight className="w-5 h-5" />
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
                <span>4.9/5 from 2,500+ electricians</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>2x more emergency calls</span>
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
                Why Electricians Choose Rovult
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built specifically for the electrical industry to help you get more jobs and grow your business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {electricianBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-orange-600" />
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
                Everything You Need to Win More Electrical Jobs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional features designed specifically for electrical contractors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {electricianFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get More Electrical Jobs?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join thousands of electricians who are winning more jobs with their Rovult websites.
            </p>
            <Link 
              href="/onboarding" 
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Start Building Free <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-orange-100 mt-4 text-sm">
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
