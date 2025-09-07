# BlueBharat - Blue Carbon MRV System 🌊

A comprehensive ecosystem for Monitoring, Reporting, and Verification (MRV) of Blue Carbon restoration projects in India, consisting of a mobile fieldworker app and a government dashboard.

## 🏗️ **System Architecture**

```
BlueBharat Ecosystem
├── 📱 Fieldworker Mobile App (React Native/Expo)
│   ├── Data Collection & Submission
│   ├── GPS Location Capture
│   ├── Photo Documentation
│   └── Offline Data Storage
│
├── 🖥️ MRV Dashboard (React Web App)
│   ├── Project Verification
│   ├── Data Analytics
│   ├── Blockchain Integration
│   └── Carbon Credit Minting
│
└── ⛓️ Blockchain Layer
    ├── Smart Contracts
    ├── Carbon Credit Registry
    └── Verification System
```

## 📱 **Fieldworker Mobile App**

### Features
- **Data Collection**: Submit plantation data with species, tree count, and area
- **GPS Integration**: Capture precise location coordinates
- **Photo Capture**: Take and attach photos to submissions
- **Offline Support**: Works without internet connection
- **Cross-Platform**: Runs on iOS, Android, and Web

### Tech Stack
- **Framework**: Expo SDK 53
- **Language**: TypeScript
- **UI**: React Native
- **Navigation**: Expo Router
- **Storage**: AsyncStorage
- **Maps**: React Native Maps
- **Camera**: Expo Image Picker
- **Location**: Expo Location

### Getting Started (Mobile App)
```bash
cd fieldworker-app
npm install
npm start
```

## 🖥️ **MRV Dashboard**

### Features
- **Role-Based Authentication**: Field Worker, NGO, NCCR Admin
- **Interactive Map**: Visual representation of restoration sites
- **Verification Panel**: Admin interface for project verification
- **Analytics**: Carbon sequestration trends and reporting
- **Blockchain Integration**: MetaMask wallet and carbon credit minting

### Tech Stack
- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Maps**: React Leaflet, OpenStreetMap
- **Charts**: Recharts
- **Blockchain**: Ethers.js, MetaMask

### Getting Started (Dashboard)
```bash
cd src
npm install
npm start
```

## 🔄 **Data Flow**

1. **Field Workers** collect data using the mobile app
2. **Data** is stored locally and synced when online
3. **NGO Representatives** review submitted projects
4. **NCCR Admins** verify projects and approve for credits
5. **Blockchain** mints carbon credits for verified projects

## 🌍 **Use Cases**

### Environmental Conservation
- Mangrove restoration monitoring
- Seagrass bed protection
- Salt marsh conservation
- Blue carbon sequestration tracking

### Government Compliance
- NCCR (National Carbon Credit Registry) integration
- Environmental impact reporting
- Carbon credit verification
- Project transparency and accountability

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension (for dashboard)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/prayasPradzzy/BlueBharat-MRV.git
cd BlueBharat-MRV
```

2. **Set up Mobile App**
```bash
cd fieldworker-app
npm install
npm start
```

3. **Set up Dashboard**
```bash
cd src
npm install
cp env.example .env
npm start
```

## 📊 **Project Structure**

```
BlueBharat-MRV/
├── fieldworker-app/          # Mobile app (React Native/Expo)
│   ├── app/                  # App screens and routing
│   ├── components/          # Reusable components
│   ├── assets/             # Images, fonts, etc.
│   └── package.json        # Mobile app dependencies
├── src/                     # Dashboard (React Web App)
│   ├── components/         # UI components
│   ├── pages/             # Application pages
│   ├── context/           # React context providers
│   └── data/              # Mock data and API functions
├── public/                 # Static assets
├── .github/               # GitHub workflows
└── README.md              # This file
```

## 🔐 **Authentication & Roles**

### Field Worker
- Submit restoration data
- Track project progress
- Upload photos and GPS coordinates

### NGO Representative
- Review submitted projects
- Manage verification requests
- Coordinate with field workers

### NCCR Admin
- Verify projects and data
- Approve carbon credit minting
- Manage blockchain transactions

## 🌍 **Environmental Impact**

This system supports India's blue carbon conservation efforts by:
- Enabling accurate data collection in remote coastal areas
- Providing real-time monitoring of restoration projects
- Facilitating transparent carbon credit verification
- Supporting government environmental policies

## 🔧 **Development**

### Mobile App Development
```bash
cd fieldworker-app
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser
```

### Dashboard Development
```bash
cd src
npm run build      # Production build
npm run analyze    # Bundle analysis
```

## 🚀 **Deployment**

### Mobile App
- **Expo**: Built-in deployment to app stores
- **EAS Build**: Custom development builds
- **Web**: Deploy to any static hosting

### Dashboard
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: `npx gh-pages -d build`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

For support and questions:
- Check the documentation in each component
- Review the demo scenarios
- Contact the development team

## 🔮 **Future Enhancements**

- Real-time data synchronization
- Advanced analytics and AI insights
- Multi-language support
- Advanced blockchain features
- IoT sensor integration
- Satellite imagery integration

---

**Built for the Government of India's Blue Carbon MRV Initiative**

*Supporting environmental conservation through technology*
